import {
  CreditCard,
  Headset,
  Home,
  LayoutGrid,
  Package,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
  { name: "Home", icon: Home, link: "/dashboard" },
  { name: "Profile", icon: UserRound, link: "/profile" },
  { name: "Services", icon: Package, link: "/services" },
  { name: "Transactions", icon: CreditCard, link: "/transactions" },
  { name: "Wallet", icon: Wallet, link: "/wallet" },
  { name: "Support", icon: Headset, link: "/support" },
];

const BottomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const firstTwo = menuItems.slice(0, 2);
  const remainingItems = menuItems.slice(2);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Main floating bar */}
      <div className="bg-primary text-primary-foreground p-3 rounded-full fixed bottom-8 left-1/2 -translate-x-1/2 z-50 shadow-2xl flex items-center justify-between min-w-[320px] md:min-w-[350px]">
        {/* Left items */}
        <ul className="flex items-center gap-2">
          {firstTwo.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground flex items-center gap-2 text-xs font-medium rounded-full py-2 px-4 border border-primary-foreground/10 transition-all"
                    : "text-primary-foreground/70 flex items-center gap-2 text-xs font-medium rounded-full py-2 px-3 hover:bg-primary-foreground/10 transition-all"
                }
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Center Toggle Button */}
        {/* Note: The border color here (border-background) ensures it blends with the page background behind it */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle menu"
          className="absolute -top-5 left-1/2 -translate-x-1/2 bg-background border-[6px] border-background text-foreground h-14 w-14 flex items-center justify-center rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
        >
          <div className="bg-primary text-primary-foreground w-full h-full rounded-full flex items-center justify-center">
             {isOpen ? <X size={20} /> : <LayoutGrid size={20} />}
          </div>
        </button>

        {/* Right side spacer to balance the layout since the button is absolute */}
        <div className="w-[100px]" /> 
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-card text-card-foreground border border-border p-4 rounded-3xl z-50 shadow-2xl"
            >
              <ul className="grid grid-cols-2 gap-3">
                {remainingItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex flex-col items-center justify-center gap-2 text-sm font-bold bg-primary text-primary-foreground rounded-2xl p-4 transition-all shadow-md"
                          : "flex flex-col items-center justify-center gap-2 text-sm font-medium text-muted-foreground rounded-2xl bg-secondary/50 hover:bg-secondary hover:text-foreground p-4 transition-all"
                      }
                    >
                      <item.icon size={24} />
                      <span>{item.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default BottomNav;
