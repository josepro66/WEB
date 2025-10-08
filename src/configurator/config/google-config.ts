// Configuración de Google OAuth
// IMPORTANTE: Reemplaza 'YOUR_GOOGLE_CLIENT_ID' con tu Client ID real de Google Cloud Console

export const GOOGLE_CONFIG = {
  // Obtén tu Client ID desde: https://console.cloud.google.com/
  // 1. Ve a "APIs & Services" > "Credentials"
  // 2. Crea un nuevo "OAuth 2.0 Client ID"
  // 3. Configura los "Authorized JavaScript origins" con tu dominio
  // 4. Copia el Client ID aquí
  CLIENT_ID: 'YOUR_GOOGLE_CLIENT_ID',
  
  // Dominios autorizados (agrega tu dominio de producción aquí)
  AUTHORIZED_ORIGINS: [
    'http://localhost:3000',  // Para desarrollo local
    'https://yourdomain.com', // Reemplaza con tu dominio de producción
  ]
};

// Función para validar si el Client ID está configurado
export const isGoogleConfigured = (): boolean => {
  // TEMPORAL: Siempre mostrar el botón para testing
  return true;
  // return GOOGLE_CONFIG.CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID' && GOOGLE_CONFIG.CLIENT_ID.length > 0;
};
