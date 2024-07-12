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
    {
      level: "Dashboard ",
      href: "/dashboard",
    },
  ];

  return (
    <div>
      <div className=" flex flex-col md:flex-row items-start md:space-x-4">
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive, isPending }) =>
              isPending
                ? ""
                : isActive
                ? "bg-primary-foreground text-primary px-3 py-2 rounded-md text-sm font-medium"
                : "hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
            }
          >
            {route.level}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
