import { NavLink } from "react-router-dom";

export default function NavItems() {
  const routes = [
    {
      level: "Home",
      href: "/",
    },
    {
      level: "Products",
      href: "/products",
    },
    {
      level: "About Us ",
      href: "/about",
    },
    {
      level: "Contact Us",
      href: "/contact",
    },
  ];

  return (
    <div>
      <div className="flex space-x-4">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                : "hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            {route.level}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
