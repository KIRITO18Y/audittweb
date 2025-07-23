import { SimpleNavItem } from "../../shared/components/Navigation/SimpleNavItem";

export const LinkClients = () => {
  return (
    <div className="flex  mb-3">
      <SimpleNavItem to="/Clients/Clients" title="Clientes" />
      <SimpleNavItem to="/Clients/patients" title="Pacientes" />
      <SimpleNavItem to="/Clients/Functionary" title="Profesionales" />
    </div>
  );
};