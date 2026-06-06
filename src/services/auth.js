// autentificacion

import { http } from "./http.js"; 

/**
 * Validamos  las credenciales en json-server 
 
 * @param {string} email 
 * @param {string} password 
 */
export const login = async (email, password) => {
  try {
    // 
    const users = await http.get(`/users?email=${email}&password=${password}`);

    
    if (users && users.length > 0) {
      const user = users[0]; 
      
      // 👇 CAMBIO: Cambiado a localStorage y clave "user" para sincronizar con tu utils.js y vista
      localStorage.setItem("user", JSON.stringify(user));

      return user; 
    } else {
      // 
      throw new Error("Correo o contraseña incorrectos.");
    }
  } catch (error) {
    
    throw error; 
  }
};

/**
 
 */
export const logout = () => {
  // 👇 CAMBIO: Limpieza sincronizada con localStorage clave "user"
  localStorage.removeItem("user");
  localStorage.clear(); 
  sessionStorage.clear(); 
};
