import useUserContext from "../../shared/context/useUserContext";
import { DashboradStatistcs } from "../Dashboard/DashbordStatistcs";

const adminContact = {
   name: "Administrador del Sistema",
   email: "	louisroche86@hotmail.com",
   phone: "+57 301 525 2348"
};

export const Home = () => {

   const { user } = useUserContext();

   const renderWelcomeContent = () => {
      if (user?.roleName === "ADMIN") {
         return (
            <div className="bg-white rounded-lg shadow-md p-6">
               <h2 className="text-2xl font-semibold text-[#392F5A] mb-4">
                  ¡Hola {user?.firstName}!
               </h2>
               <p className="text-gray-700 mb-4">
                  En el aplicativo de <span className="font-semibold text-audittprimary">Auditoria Médica</span> como usuario <span className="font-semibold text-audittprimary">Admin</span>,
                  tienes acceso completo a todas las funcionalidades de Medical Audit:
               </p>
               <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Gestión completa de usuarios y roles</li>
                  <li>Configuración de clientes e instituciones</li>
                  <li>Acceso a todos los reportes y métricas</li>
                  <li>Administración del sistema</li>
               </ul>

               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Video Tutorial Recomendado</h3>
                  <p className="text-blue-700 text-sm mb-3">
                     Te recomendamos ver este video para conocer todas las funcionalidades disponibles:
                  </p>

                  {/* Video Mockup SVG */}
                  <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center">
                     <svg width="200" height="120" viewBox="0 0 200 120" className="text-gray-400">
                        <rect width="200" height="120" fill="currentColor" rx="8" />
                        <circle cx="100" cy="60" r="20" fill="white" />
                        <polygon points="92,50 92,70 108,60" fill="currentColor" />
                        <text x="100" y="95" textAnchor="middle" className="text-xs fill-white">
                           Tutorial Medical Audit
                        </text>
                     </svg>
                  </div>
               </div>
            </div>
         );
      } else {
         return (
            <div className="bg-white rounded-lg shadow-md p-6 ">
               <h2 className="text-2xl font-semibold text-[#392F5A] mb-4">
                  ¡Hola {user?.firstName}!
               </h2>
               <p className="text-gray-700 mb-4">
                  En el aplicativo de <span className="font-semibold text-audittprimary">Auditoria Médica</span> como usuario <span className="font-semibold text-audittprimary">Estándar</span>,
                  puedes acceder a las siguientes funcionalidades:
               </p>
               <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                  <li>Realizar mediciones de adherencia</li>
                  <li>Consultar indicadores e informes</li>
                  <li>Acceso a datos de clientes e instituciones asociadas</li>
               </ul>
               {/* Video Mockup SVG */}
               <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center mb-6">
                  <svg width="200" height="120" viewBox="0 0 200 120" className="text-gray-400">
                     <rect width="200" height="120" fill="currentColor" rx="8" />
                     <circle cx="100" cy="60" r="20" fill="white" />
                     <polygon points="92,50 92,70 108,60" fill="currentColor" />
                     <text x="100" y="95" textAnchor="middle" className="text-xs fill-white">
                        Tutorial Medical Audit
                     </text>
                  </svg>
               </div>

               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">¿Necesitas más información?</h3>
                  <p className="text-yellow-700 text-sm mb-3">
                     Para solicitar la asociación de nuevos clientes o más información sobre la aplicación,
                     contacta al administrador:
                  </p>

                  <div className="bg-white rounded border p-3">
                     <p className="font-medium text-gray-800">{adminContact.name}</p>
                     <p className="text-gray-600 text-sm">
                        📧 <a href={`mailto:${adminContact.email}`} className="text-blue-600 hover:underline">
                           {adminContact.email}
                        </a>
                     </p>
                     <p className="text-gray-600 text-sm">
                        📞 <a href={`tel:${adminContact.phone}`} className="text-blue-600 hover:underline">
                           {adminContact.phone}
                        </a>
                     </p>
                  </div>
               </div>
            </div>
         );
      }
   };

   return (
      <div>
         <div className="max-w-[1200px] mx-auto p-4 ">
            <h1 className="text-4xl sm:text-6xl lg:text-6xl mb-8 sm:mb-12 lg:mb-8 text-center lg:text-left">
               <span className="text-[#392F5A] font-bold">Bienvenido a
               </span>
               <span className="text-[#392F5A]"> Medical</span>
               <span className="text-audittprimary font-bold">Audit</span>
            </h1>

            {renderWelcomeContent()}
            <DashboradStatistcs />
         </div>

      </div>

   );
};
