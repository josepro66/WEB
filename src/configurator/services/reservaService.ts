/**
 * reservaService.ts
 * ─────────────────────────────────────────────────────────────────
 * Servicio para guardar reservas de controladores MIDI en Firestore.
 *
 * Estructura del documento (colección "reservas"):
 * ─────────────────────────────────────────────────────────────────
 * reservas/{reservaId}
 * {
 *   cliente: {
 *     nombre: string,
 *     email:  string,
 *   },
 *   controlador: {
 *     modelo: string,            // "beato8" | "mixo" | ...
 *     colores: {
 *       chasis:   string,
 *       botones:  Record<string, string>,
 *       perillas: Record<string, string>,
 *     }
 *   },
 *   pago: {
 *     estado:          "anticipo_pagado",
 *     montoAnticipo:   50,
 *     monedaAnticipo:  "USD",
 *     paypalOrderId:   string,   // ID de la orden de PayPal (data.orderID)
 *     paypalCaptureId: string,   // ID de la captura (capture.id) — prueba real del pago
 *     pagadoEn:        Timestamp,
 *   },
 *   meta: {
 *     creadoEn:      Timestamp,
 *     actualizadoEn: Timestamp,
 *     version:       number,
 *   }
 * }
 */

import {
  collection,
  addDoc,
  serverTimestamp,
  FirestoreError,
} from 'firebase/firestore';
import { db } from '../../firebaseConfig';

// ─── Tipos ────────────────────────────────────────────────────────

export interface ClienteInfo {
  nombre: string;
  email: string;
}

export interface ColoresConfig {
  chasis: string;
  botones: Record<string, string>;
  perillas: Record<string, string>;
}

/** Datos del pago confirmado por PayPal */
export interface PagoInfo {
  paypalOrderId: string;   // data.orderID del onApprove
  paypalCaptureId: string; // capture.purchase_units[0].payments.captures[0].id
}

export interface ReservaPayload {
  cliente: ClienteInfo;
  modelo: string;
  colores: ColoresConfig;
  pagoInfo: PagoInfo;      // Solo se llama con datos reales tras captura exitosa
}

export interface ReservaGuardada {
  id: string;
  payload: ReservaPayload;
}

// ─── Constantes ───────────────────────────────────────────────────

const COLECCION      = 'reservas';
const MONTO_ANTICIPO = 50;
const MONEDA         = 'USD';
const VERSION_SCHEMA = 1;

// Mapa de códigos de error Firestore → mensajes amigables
const FIRESTORE_ERRORS: Record<string, string> = {
  'permission-denied':  'No tienes permisos para guardar la reserva. Intenta iniciar sesión nuevamente.',
  'unavailable':        'Sin conexión con el servidor. Verifica tu internet e intenta de nuevo.',
  'resource-exhausted': 'Demasiadas solicitudes. Espera un momento e intenta de nuevo.',
  'unauthenticated':    'Tu sesión expiró. Por favor vuelve a iniciar sesión.',
};

// ─── Función principal ────────────────────────────────────────────

/**
 * Guarda la reserva en Firestore SOLO después de que PayPal confirmó el pago.
 * Incluye el paypalOrderId y paypalCaptureId como prueba irrefutable del cobro.
 */
export async function guardarReserva(
  payload: ReservaPayload
): Promise<ReservaGuardada> {

  // Validaciones de entrada
  if (!payload.cliente.email?.includes('@')) {
    throw new Error('El email del cliente no es válido.');
  }
  if (!payload.modelo) {
    throw new Error('El modelo del controlador es requerido.');
  }
  if (!payload.pagoInfo?.paypalOrderId || !payload.pagoInfo?.paypalCaptureId) {
    throw new Error('Datos de pago incompletos. No se puede guardar la reserva sin confirmación de pago.');
  }

  const documento = {
    cliente: {
      nombre: payload.cliente.nombre.trim(),
      email:  payload.cliente.email.trim().toLowerCase(),
    },
    controlador: {
      modelo: payload.modelo.toLowerCase(),
      colores: {
        chasis:   payload.colores.chasis,
        botones:  payload.colores.botones,
        perillas: payload.colores.perillas,
      },
    },
    pago: {
      estado:          'anticipo_pagado',
      montoAnticipo:   MONTO_ANTICIPO,
      monedaAnticipo:  MONEDA,
      paypalOrderId:   payload.pagoInfo.paypalOrderId,
      paypalCaptureId: payload.pagoInfo.paypalCaptureId,
      pagadoEn:        serverTimestamp(),
    },
    meta: {
      creadoEn:      serverTimestamp(),
      actualizadoEn: serverTimestamp(),
      version:       VERSION_SCHEMA,
    },
  };

  try {
    const ref = await addDoc(collection(db, COLECCION), documento);
    return { id: ref.id, payload };
  } catch (err) {
    const firestoreErr = err as FirestoreError;
    const mensajeAmigable =
      FIRESTORE_ERRORS[firestoreErr.code] ??
      'Ocurrió un error al registrar tu reserva. Tu pago fue procesado correctamente — contáctanos con tu ID de orden.';
    throw new Error(mensajeAmigable);
  }
}
