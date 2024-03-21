export class AuthRequiredError extends Error {
  constructor(message = "Sesión expirada, queriere autenticación.") {
    super(message);
    this.name;
  }
}

export const handleErrorMessage = (error: { status: number }) => {
  switch (error.status) {
    case 400:
      return "El correo electrónico o nombre de usuario ya están en uso. Si ha creado una cuenta con este correo electrónico, por favor revise su bandeja de entrada.";
    case 401:
      return "Credenciales faltantes o inválidas. Inicia sesión nuevamente.";
    case 403:
      return "No tienes permiso para acceder a este recurso.";
    case 404:
      return "Recurso no encontrado.";
    case 409:
      return "Conflicto de estado. La solicitud no puede completarse debido al estado actual del recurso.";
    case 429:
      return "Demasiadas solicitudes. Inténtalo de nuevo más tarde.";
    case 500:
      return "Error interno del servidor. Inténtalo de nuevo más tarde.";
    case 503:
      return "Servicio no disponible. Inténtalo de nuevo más tarde.";
    default:
      return "Ha ocurrido un error desconocido";
  }
};
