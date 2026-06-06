import { loginController } from "@/controllers/login.controller"; // Conservamos tu controlador si lo usas
import { navigateTo } from "../router.js";
import { login } from "../api/auth.js"; // 👈 1. CAMBIO: Importamos tu función de autenticación independiente

export default function loginView() {
  
  setTimeout(() => {
    const form = document.getElementById("loginForm");
    const errorMessage = document.getElementById("error-message");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // Evita la recarga de la página

      
      errorMessage.classList.add("hidden");
      errorMessage.textContent = "";

      
      const formData = new FormData(form);
      const email = formData.get("email").trim();
      const password = formData.get("password").trim();

      try {
      
     
        const user = await login(email, password);
          
       
        if (user.role === "admin") {
          navigateTo("/admin"); 
        } else {
          navigateTo("/home"); 
        }
        
      } catch (error) {
        
        errorMessage.textContent = error.message || "Error de conexión con el servidor.";
        errorMessage.classList.remove("hidden");
      }
    });
  }, 0);

  
  return `
    <div class="min-h-screen flex justify-center items-center bg-slate-100">

      <div class="bg-white p-8 rounded-lg shadow w-96">

        <h1 class="text-3xl font-bold mb-5">
          Login
        </h1>

        <!-- Contenedor para manejo de errores de autenticación -->
        <div id="error-message" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center"></div>

        <form id="loginForm">

          <input
            type="email"
            name="email"
            placeholder="Correo"
            class="border w-full p-2 rounded mb-3"
            required
          >

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            class="border w-full p-2 rounded mb-4"
            required
          >

          <button
            type="submit"
            class="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Ingresar
          </button>

        </form>

      </div>

    </div>
  `;
}
