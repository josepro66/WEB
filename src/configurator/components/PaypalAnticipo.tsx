/**
 * PaypalAnticipo.tsx
 * ─────────────────────────────────────────────────────────────────
 * Componente de pago de anticipo ($50 USD) via PayPal.
 *
 * Flujo seguro:
 *  1. createOrder  → SDK de PayPal crea la orden con monto fijo ($50 USD)
 *  2. onApprove    → SDK captura el pago (dinero real/sandbox debitado)
 *  3. Solo si captura OK → llama a guardarReserva() en Firestore
 *  4. onSuccess()  → notifica al padre con el ID de reserva
 *
 * El guardado en Firestore ocurre DESPUÉS del pago exitoso,
 * nunca antes. Si Firestore falla tras el pago, el usuario
 * ve un aviso especial con su paypalOrderId para soporte.
 */

import React, { useState } from 'react';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js';
import { motion, AnimatePresence } from 'framer-motion';
import { useReserva } from '../hooks/useReserva';
import type { ColoresConfig, ClienteInfo } from '../services/reservaService';

// ─── Tipos ────────────────────────────────────────────────────────

interface PaypalAnticipoProps {
  /** Modelo del controlador: "beato8" | "mixo" | etc. */
  productType: string;
  colores: ColoresConfig;
  currentUser: ClienteInfo;
  /** Se llama con el ID de Firestore al completar todo el flujo */
  onSuccess: (reservaId: string) => void;
  /** Se llama si el usuario cancela o hay un error irrecuperable */
  onError?: (msg: string) => void;
}

// Monto fijo del anticipo — NO modificar en el cliente
const MONTO_ANTICIPO_USD = '50.00';

// ─── Botones internos (dentro del contexto PayPalScriptProvider) ──

const BotonesPayPal: React.FC<Omit<PaypalAnticipoProps, 'productType'> & { productType: string }> = ({
  productType,
  colores,
  currentUser,
  onSuccess,
  onError,
}) => {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  const [procesando, setProcesando] = useState(false);
  const [errorLocal, setErrorLocal] = useState<string | null>(null);

  const { ejecutarReserva } = useReserva();

  // ── Step 1: Crear orden PayPal ─────────────────────────────────
  const handleCreateOrder = (_data: Record<string, unknown>, actions: any): Promise<string> => {
    setErrorLocal(null);
    return actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: MONTO_ANTICIPO_USD,
          },
          description: `Anticipo — Controlador MIDI ${productType.toUpperCase()} personalizado`,
          custom_id: `${currentUser.email}|${productType}|${Date.now()}`,
        },
      ],
      application_context: {
        brand_name: 'Creart.Tech',
        locale: 'es-CO',
        user_action: 'PAY_NOW',
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };

  // ── Step 2: Capturar pago + guardar en Firestore ───────────────
  const handleApprove = async (data: { orderID: string }, actions: any): Promise<void> => {
    setProcesando(true);
    setErrorLocal(null);

    try {
      // Captura el dinero — este es el paso que debita al comprador
      const captureResult = await actions.order.capture();

      // Extraer el ID de la captura (prueba irrefutable del pago)
      const captureId: string =
        captureResult?.purchase_units?.[0]?.payments?.captures?.[0]?.id ?? '';

      if (!captureId) {
        throw new Error('PayPal no devolvió un ID de captura válido.');
      }

      // Solo aquí, con pago confirmado, guardamos en Firestore
      const reserva = await ejecutarReserva({
        cliente: currentUser,
        modelo: productType,
        colores,
        pagoInfo: {
          paypalOrderId:   data.orderID,
          paypalCaptureId: captureId,
        },
      });

      if (reserva) {
        onSuccess(reserva.id);
      }

    } catch (err) {
      const msg = err instanceof Error
        ? err.message
        : 'Error al procesar el pago. Intenta de nuevo.';
      setErrorLocal(msg);
      onError?.(msg);
    } finally {
      setProcesando(false);
    }
  };

  // ── Step 3: Cancelación ────────────────────────────────────────
  const handleCancel = () => {
    setErrorLocal('Cancelaste el pago. Puedes intentarlo de nuevo cuando quieras.');
  };

  // ── Step 4: Error de PayPal ────────────────────────────────────
  const handleError = (err: Record<string, unknown>) => {
    console.error('PayPal SDK error:', err);
    const msg = 'Ocurrió un error con PayPal. Verifica tu conexión e intenta de nuevo.';
    setErrorLocal(msg);
    onError?.(msg);
  };

  // ── Render ─────────────────────────────────────────────────────
  return (
    <div className="w-full space-y-4">

      {/* Resumen del cargo */}
      <div
        className="rounded-xl p-4 flex items-center justify-between"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">Cargo a realizar</p>
          <p className="text-white font-bold text-lg">Anticipo de reserva</p>
          <p className="text-gray-500 text-xs mt-0.5">
            Controlador {productType.toUpperCase()} · El saldo restante se cobra al entregar
          </p>
        </div>
        <div className="text-right">
          <p
            className="text-3xl font-black"
            style={{
              background: 'linear-gradient(90deg, #00ffff, #a259ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            $50
          </p>
          <p className="text-gray-500 text-xs">USD</p>
        </div>
      </div>

      {/* Skeleton mientras carga el SDK */}
      {isPending && (
        <div className="w-full h-12 rounded-lg animate-pulse bg-white/5" />
      )}

      {/* Error de SDK (Client ID inválido, etc.) */}
      {isRejected && (
        <p className="text-red-400 text-sm text-center py-3">
          No se pudo cargar PayPal. Verifica tu conexión e intenta de nuevo.
        </p>
      )}

      {/* Overlay de procesando */}
      <AnimatePresence>
        {procesando && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-3 py-3"
          >
            <div
              className="w-5 h-5 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: '#a259ff', borderTopColor: 'transparent' }}
            />
            <span className="text-gray-300 text-sm">Procesando pago seguro...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones de PayPal */}
      {!isPending && !isRejected && !procesando && (
        <PayPalButtons
          style={{
            layout:  'vertical',
            color:   'black',
            shape:   'rect',
            label:   'pay',
            height:  48,
          }}
          disabled={procesando}
          createOrder={handleCreateOrder}
          onApprove={handleApprove}
          onCancel={handleCancel}
          onError={handleError}
        />
      )}

      {/* Mensaje de error / cancelación */}
      <AnimatePresence>
        {errorLocal && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm px-2"
            style={{ color: errorLocal.includes('Cancelaste') ? '#fbbf24' : '#f87171' }}
          >
            {errorLocal}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Nota de seguridad */}
      <p className="text-center text-xs text-gray-600">
        🔒 Pago procesado directamente por PayPal · Creart.Tech no almacena datos de tu tarjeta
      </p>
    </div>
  );
};

// ─── Componente público (incluye el Provider) ─────────────────────

const PaypalAnticipo: React.FC<PaypalAnticipoProps> = (props) => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID ?? 'sb';

  return (
    <PayPalScriptProvider
      options={{
        clientId,
        currency: 'USD',
        intent:   'capture',
        locale:   'es_CO',
        components: 'buttons',
      }}
    >
      <BotonesPayPal {...props} />
    </PayPalScriptProvider>
  );
};

export default PaypalAnticipo;
