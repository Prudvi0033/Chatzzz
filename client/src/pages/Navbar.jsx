import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all cursor-pointer">
              <div className="size-9 rounded-lg bg-blue-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white size-10" />
              </div>
              <h1 className="tracking-widest text-lg text-white font-bold">Chatzzz</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className='btn btn-sm gap-2'
            >
              <Settings className="w-6 hover:rotate-[90deg] text-white h-8 hover:scale-105 ease-linear duration-150" />
            </Link>

            {authUser && (
              <>
                <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                  <User className="w-6 h-8 hover:scale-105 text-white ease-linear duration-150" />
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-6 text-white hover:scale-105 ease-linear duration-150 hover:text-error"  />
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