/**
 * useReserva.ts
 * ─────────────────────────────────────────────────────────────────
 * Hook que guarda la reserva en Firestore tras un pago exitoso.
 * Se llama SOLO después de que PayPal confirmó la captura del cobro.
 */

import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import {
  guardarReserva,
  ReservaPayload,
  ReservaGuardada,
} from '../services/reservaService';

interface UseReservaReturn {
  guardando: boolean;
  ultimaReserva: ReservaGuardada | null;
  ejecutarReserva: (payload: ReservaPayload) => Promise<ReservaGuardada | null>;
}

export function useReserva(): UseReservaReturn {
  const [guardando, setGuardando] = useState(false);
  const [ultimaReserva, setUltimaReserva] = useState<ReservaGuardada | null>(null);

  const ejecutarReserva = useCallback(
    async (payload: ReservaPayload): Promise<ReservaGuardada | null> => {
      setGuardando(true);

      Swal.fire({
        title: 'Registrando tu reserva...',
        html: 'Guardando tu configuración y confirmación de pago.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading(),
        background: '#0d1117',
        color: '#e5e7eb',
      });

      try {
        const reserva = await guardarReserva(payload);
        setUltimaReserva(reserva);

        await Swal.fire({
          title: '¡Reserva confirmada! 🎉',
          html: `
            <p style="color:#9ca3af;margin-bottom:12px">
              Tu anticipo fue procesado y tu cupo está separado.
            </p>
            <div style="background:#111827;border:1px solid #1f2937;border-radius:8px;padding:12px;margin-bottom:12px;text-align:left">
              <p style="color:#6b7280;font-size:0.75rem;margin-bottom:4px">ID de reserva</p>
              <code style="color:#00ffff;font-size:0.8rem;word-break:break-all">${reserva.id}</code>
            </div>
            <p style="color:#6b7280;font-size:0.78rem">
              Recibirás un correo con los detalles de tu pedido.<br/>
              Guarda este ID por si necesitas soporte.
            </p>
          `,
          icon: 'success',
          confirmButtonText: '¡Perfecto!',
          confirmButtonColor: '#a259ff',
          background: '#0d1117',
          color: '#e5e7eb',
          iconColor: '#00ffff',
        });

        return reserva;

      } catch (err) {
        const mensaje = err instanceof Error
          ? err.message
          : 'Error desconocido al registrar la reserva.';

        // Caso especial: el pago sí se procesó pero Firestore falló
        // → mostrar el paypalOrderId para que el usuario pueda contactar soporte
        const esFalloPostPago = mensaje.includes('contáctanos con tu ID');

        await Swal.fire({
          title: esFalloPostPago ? 'Pago OK — Error al registrar' : 'Error al guardar',
          html: esFalloPostPago
            ? `<p style="color:#9ca3af">${mensaje}</p>
               <p style="color:#fbbf24;margin-top:8px;font-size:0.8rem">
                 ⚠️ Tu pago fue exitoso. Guarda tu ID de orden de PayPal y escríbenos.
               </p>`
            : `<p style="color:#9ca3af">${mensaje}</p>`,
          icon: esFalloPostPago ? 'warning' : 'error',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#a259ff',
          background: '#0d1117',
          color: '#e5e7eb',
        });

        return null;

      } finally {
        setGuardando(false);
      }
    },
    []
  );

  return { guardando, ultimaReserva, ejecutarReserva };
}
