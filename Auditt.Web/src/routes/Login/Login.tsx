import { useEffect } from "react";
import { toast } from "react-toastify";

export const Login = () => {
   const apiUrl = import.meta.env.VITE_API_URL;
   const handleLogin = async (): Promise<void> => {
      window.location.href = `${apiUrl}api/auth/google-login`;
   }

   useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const error = params.get("error");
      if (error && error === "UserNotActive") {
         toast.error("El usuario no está activo. Por favor, contacta al administrador.", {
            position: "bottom-center"
         });
      }
   }, []);

   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
         <div className="flex flex-col lg:flex-row h-screen w-full">
            {/* Left Section - Login Form */}
            <div className="w-full lg:w-1/2 min-h-1/2 bg-white flex flex-col justify-center items-center p-6 lg:p-8">
               <h1 className="text-4xl md:text-6xl lg:text-8xl text-center">
                  <span className="text-[#FF677D] font-bold">Auditt</span>
                  <span className="text-gray-800">Api</span>
               </h1>
               <button
                  onClick={handleLogin}
                  className="mt-6 lg:mt-8 cursor-pointer bg-red-500 text-white text-lg md:text-xl lg:text-2xl font-bold px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full shadow-lg hover:bg-red-700 transition duration-300 w-full max-w-sm text-center">
                  Iniciar sesión con GOOGLE
               </button>
            </div>

            {/* Right Section - Background Image  */}
            <div className="lg:block w-full min-h-1/2 lg:min-h-full relative bg-gradient-to-br bg-[url('/images/bg-login.png')] bg-cover from-indigo-700 to-purple-800 overflow-hidden">
               <defs>
                  <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                     <stop offset="0%" stopColor="#ffffff33" />
                     <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
               </defs>
               <circle cx="400" cy="400" r="300" fill="url(#grad1)" />
               <path d="M200,300 C300,100 500,100 600,300" stroke="white" strokeWidth="2" fill="none" />
               <path d="M250,400 C350,200 450,200 550,400" stroke="white" strokeWidth="2" fill="none" />
               <circle cx="100" cy="700" r="5" fill="white" />
               <circle cx="700" cy="100" r="5" fill="white" />
            </div>
         </div>
      </div>
   );
};
