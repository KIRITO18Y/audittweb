import { NavLink } from "react-router-dom";

export const SimpleNavItem = ({
  to,
  title,
}: {
  to: string;
  title: string;
}) => {
  return (
    <NavLink
      to={to}
      defaultValue={title}
      className={({ isActive }) =>
        `border-b-2 pb-1 px-2 transition-colors duration-300 text-lg sm:text-xl lg:text-2xl cursor-pointer whitespace-nowrap ${isActive ? "text-[#FF677D] border-[#FF677D]" : "text-gray-800 border-transparent hover:text-[#FF677D]"
        }`
      }
    >
      {title}
    </NavLink>
  );
};

