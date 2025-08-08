import { SimpleNavItem } from "../../shared/components/Navigation/SimpleNavItem";

export const LinkSettings = () => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <SimpleNavItem to="/Settings" title="Usuario" end />
      <SimpleNavItem to="/Settings/Roles" title="Roles" />
      <SimpleNavItem to="/Settings/Scales" title="Escalas" />
    </div>
  );
};
