import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, PanelRightOpen, Settings, User, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed raleway w-full top-0 z-50 bg-transparent mt-3">
      <div className="container mx-auto px-4 md:px-20 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer">
              <div className="size-9 rounded-lg bg-blue-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white size-10" />
              </div>
              <h1 className="tracking-wider text-lg font-bold">Chatzzz</h1>
            </Link>
          </div>

          <button
            className="md:hidden text-2xl z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <PanelRightOpen />}
          </button>

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            transition={{ type: "spring", duration: 0.3 }}
            className={`fixed top-0 right-0 h-screen w-64 bg-base-100 shadow-lg md:hidden flex flex-col items-center justify-center gap-6 transition-all ${isOpen ? "block" : "hidden"}`}
          >
            <Link to={"/settings"} className="btn btn-sm gap-2">
              <Settings className="w-6 h-8 hover:scale-105 ease-linear duration-150" />
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="w-6 h-8  hover:scale-105 ease-linear duration-150" />
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-6 hover:scale-105 ease-linear duration-150 hover:text-error" />
                </button>
              </>
            )}
          </motion.div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center gap-2">
            <Link to={"/settings"} className="btn btn-sm gap-2">
              <Settings className="w-6 hover:rotate-[90deg] h-8 hover:scale-105 ease-linear duration-150" />
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="w-6 h-8 hover:scale-105  ease-linear duration-150" />
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-6  hover:scale-105 ease-linear duration-150 hover:text-error" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
