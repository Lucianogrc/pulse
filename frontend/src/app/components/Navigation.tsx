import { useState } from "react";
import { Activity, Menu, X } from "lucide-react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Dashboard", href: "#dashboard" },
    { name: "Reports", href: "#reports" },
    { name: "Analytics", href: "#analytics" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* NAVBAR */}
      <nav className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto px-2">
        <div
          className="
            bg-white/90
            backdrop-blur-xl
            rounded-3xl
            md:rounded-full
            px-4
            sm:px-6
            md:px-8
            lg:px-10
            py-3
            md:py-4
            shadow-xl
            border
            border-[#ececec]
          "
        >
          <div className="flex items-center justify-between gap-6">
            
            {/* LOGO */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="size-9 rounded-full bg-gradient-to-br from-lime to-accent flex items-center justify-center">
                <Activity className="size-4 text-primary" />
              </div>

              <span className="font-semibold text-base text-black">
                Pulse
              </span>
            </div>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-5 lg:gap-7">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    text-sm
                    lg:text-base
                    font-medium
                    text-black
                    hover:text-[#9bc328]
                    transition-colors
                  "
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="
                md:hidden
                flex
                items-center
                justify-center
                size-10
                rounded-full
                hover:bg-black/5
                transition
              "
            >
              {menuOpen ? (
                <X className="size-5 text-black" />
              ) : (
                <Menu className="size-5 text-black" />
              )}
            </button>

          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className="
            fixed
            top-24
            left-1/2
            -translate-x-1/2
            z-50
            w-[90%]
            max-w-sm
            bg-white/95
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border
            border-[#ececec]
            p-6
            md:hidden
          "
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="
                  text-center
                  text-lg
                  font-medium
                  text-black
                  hover:text-[#9bc328]
                  transition-colors
                "
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}