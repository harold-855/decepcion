import { http } from "@/api/http";

export const getReservation = () =>
  http.get("/reservations");

export const createReservation = (data) =>
  http.post("/reservations", data);

export const getReservation = async (currentUser) => {
  if (!currentUser) throw new Error("Acceso denegado. No autenticado.");

  if (currentUser.role === "admin") {
    // El Admin tiene acceso completo a todo el listado
    return await http.get("/reservations");
  } else {
    // El usuario estándar únicamente puede ver sus propias reservas
    return await http.get(`/reservations?userId=${currentUser.id}`);
  }
};

export const createReservation = async (data, currentUser) => {
  if (!currentUser) throw new Error("Debes iniciar sesión para reservar.");

  // Regla de negocio: Validar cruce de horarios en el mismo espacio y fecha
  const existing = await http.get(`/reservations?workspace=${data.workspace}&date=${data.date}`);
  
  const hasOverlap = existing.some(res => {
    if (res.status === "cancelled") return false; // Ignoramos las canceladas
    return (data.startHour < res.endHour && data.endHour > data.startHour);
  });

  if (hasOverlap) {
    throw new Error("El espacio ya se encuentra reservada en el horario seleccionado.");
  }

  // Estructura final requerida inyectando el ID del usuario actual
  const newReservation = {
    ...data,
    userId: currentUser.id,
    status: "pending" // Estado inicial requerido
  };

  return await http.post("/reservations", newReservation);
};

/*
 * 
 * @param {number|string} id - ID de la reserva a modificar
 * @param {Object} updateData - Campos a actualizar (ej: { reason: "Nuevo motivo" })
 * @param {Object} currentUser - Usuario autenticado
 */
export const updateReservation = async (id, updateData, currentUser) => {
  if (!currentUser) throw new Error("No autenticado.");

  
  const currentRes = await http.get(`/reservations/${id}`);
  if (!currentRes) throw new Error("La reserva no existe.");

  
  if (currentRes.status === "cancelled") {
    throw new Error("Las reservas canceladas no se pueden modificar.");
  }

  
  if (currentUser.role !== "admin" && currentRes.userId !== currentUser.id) {
    throw new Error("No tienes permisos para modificar esta reserva.");
  }

  return await http.patch(`/reservations/${id}`, updateData);
};

/**
 * Cancelar una reserva propia o ajena (PATCH)
 * Reutiliza las reglas de la función update para garantizar la seguridad.
 * 
 * @param {number|string} id - ID de la reserva a cancelar
 * @param {Object} currentUser - Usuario autenticado
 */
export const cancelReservation = async (id, currentUser) => {
  return await updateReservation(id, { status: "cancelled" }, currentUser);
};

/**
 * Eliminar físicamente una reserva (DELETE)
 * Restringido únicamente para usuarios administradores.
 * 
 * @param {number|string} id - ID de la reserva a eliminar
 * @param {Object} currentUser - Usuario autenticado
 */
export const deleteReservation = async (id, currentUser) => {
  if (!currentUser) throw new Error("No autenticado.");

  // Permisos: Admin CRUD completo, User no puede eliminar registros físicamente
  if (currentUser.role !== "admin") {
    throw new Error("Acción denegada. Solo los administradores pueden eliminar registros.");
  }

  return await http.delete(`/reservations/${id}`);
};