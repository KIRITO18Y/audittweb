import { faHouse, faUser, faUsers, faGear, faClipboardCheck, faBoxesStacked, faLockOpen, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from './MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUserContext from '../shared/context/useUserContext';
import { useState } from 'react';

export const Sidebar = () => {
   const urlApi = import.meta.env.VITE_API_URL;
   const { user } = useUserContext();
   const isAdmin = user?.roleName === 'ADMIN';
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
   };

   return (
      <>
         {/* Mobile menu button */}
         <div className="lg:hidden fixed top-4 left-4 z-50">
            <button
               onClick={toggleMobileMenu}
               className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 transition-colors"
            >
               <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} className="w-5 h-5" />
            </button>
         </div>

         {/* Mobile backdrop */}
         {isMobileMenuOpen && (
            <div
               className="lg:hidden fixed inset-0 bg-black opacity-50 z-40"
               onClick={() => setIsMobileMenuOpen(false)}
            />
         )}

         {/* Sidebar */}
         <div
            id="sidebar"
            className={`
               fixed lg:relative inset-y-0 left-0 z-40 
               w-68 bg-gray-800 text-white flex flex-col 
               transform transition-transform duration-300 ease-in-out
               ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}
         >
            <div>
               <div className="flex flex-col items-center p-4 justify-center">
                  <div>
                     <img
                        src={`${user?.urlProfile}`}
                        alt="avatar"
                        className="min-w-16 rounded-full w-20 h-20" />
                  </div>

                  <div>
                     <h4 className="text-white font-semibold w-64 truncate overflow-hidden whitespace-nowrap pt-2 text-center">
                        {user?.firstName} {user?.lastName}
                     </h4>
                  </div>

                  <div>
                     <span className="text-gray-400 text-sm text-center line-clamp-1">
                        {user?.roleName}
                     </span>
                  </div>
               </div>
               <div className='text-center text-sm text-gray-100 bg-gray-600 py-1'></div>
               <nav>
                  <ul className="space-y-1">
                     <MenuItem icon={faHouse} path='/' text='Inicio' />
                     {isAdmin && (
                        <>
                           <MenuItem icon={faUser} path='/Clients' text='Clientes' />
                           <MenuItem icon={faUsers} path='/Guide' text='Instrumentos' />
                           <MenuItem icon={faBoxesStacked} path='/DataCuts' text='Cortes Trimestrales' />
                        </>
                     )}
                     <MenuItem icon={faClipboardCheck} path='/Assessments' text='Medición de Adherencia' />
                     {isAdmin && <MenuItem icon={faGear} path='/Settings' text='Configuraciones' />}
                     <li
                        onClick={() => {
                           window.location.href = `${urlApi}api/auth/google-logout`;
                        }}
                        className={`mt-1 cursor-pointer font-semibold text-gray-300 hover:bg-gray-700 px-4 py-2 flex items-center gap-2`}>
                        <FontAwesomeIcon
                           icon={faLockOpen}
                           className={`text-gray-300 w-6 transition-colors duration-300`}
                        />
                        <span>Salir</span>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </>
   );
};
