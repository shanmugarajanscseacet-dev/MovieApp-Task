import { Film, Search, Menu, Star } from "lucide-react";

const Header = () => {
  return (
    <div>
      <nav className="navbar py-3 bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 border-b border-slate-700/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <a className="text-white text-2xl lg:text-3xl font-bold tracking-tight hover:text-amber-400 transition-colors duration-200">
                CineRate
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
