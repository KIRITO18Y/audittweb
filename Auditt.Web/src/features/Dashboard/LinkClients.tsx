import { SimpleNavItem } from "../../shared/components/Navigation/SimpleNavItem";

export const LinkClients = () => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 mb-3">
      <SimpleNavItem to="/Clients" title="Clientes" end />
      <SimpleNavItem to="/Clients/patients" title="Pacientes" />
      <SimpleNavItem to="/Clients/Functionary" title="Profesionales" />
    </div>
  );
};