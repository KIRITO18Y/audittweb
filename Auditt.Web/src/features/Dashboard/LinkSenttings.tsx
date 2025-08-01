import { SimpleNavItem } from "../../shared/components/Navigation/SimpleNavItem";

export const LinkSettings = () => {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-4">
      <SimpleNavItem to="/Users" title="Usuario" />
      <SimpleNavItem to="/Roles" title="Roles" />
      <SimpleNavItem to="/Scales" title="Escalas" />
    </div>
  );
};
