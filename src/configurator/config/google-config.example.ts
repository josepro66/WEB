// EJEMPLO de configuración de Google OAuth
// Copia este archivo como 'google-config.ts' y reemplaza los valores

export const GOOGLE_CONFIG = {
  // Reemplaza con tu Client ID real de Google Cloud Console
  // Formato: '123456789-abcdefghijklmnop.apps.googleusercontent.com'
  CLIENT_ID: '123456789-abcdefghijklmnop.apps.googleusercontent.com',
  
  // Dominios autorizados - AGREGA TU DOMINIO DE PRODUCCIÓN
  AUTHORIZED_ORIGINS: [
    'http://localhost:3000',           // Desarrollo local
    'http://localhost:3001',           // Puerto alternativo
    'https://yourdomain.com',          // Tu dominio de producción
    'https://www.yourdomain.com',      // Con www
    'https://configurator.yourdomain.com', // Subdominio si usas uno
  ]
};

// Función para validar si el Client ID está configurado
export const isGoogleConfigured = (): boolean => {
  return GOOGLE_CONFIG.CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID' && 
         GOOGLE_CONFIG.CLIENT_ID.length > 0 &&
         !GOOGLE_CONFIG.CLIENT_ID.includes('123456789'); // Evitar el ejemplo
};

// INSTRUCCIONES RÁPIDAS:
// 1. Ve a https://console.cloud.google.com/
// 2. Crea un proyecto o selecciona uno existente
// 3. Ve a "APIs & Services" > "Credentials"
// 4. Crea "OAuth 2.0 Client ID" > "Web application"
// 5. Agrega tus dominios en "Authorized JavaScript origins"
// 6. Copia el Client ID y pégalo arriba
// 7. Renombra este archivo a 'google-config.ts'


