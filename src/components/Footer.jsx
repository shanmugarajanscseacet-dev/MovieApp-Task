import { Film, Heart } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-linear-to-r from-slate-900 via-purple-900 to-slate-900 text-white items-center p-8 border-t border-slate-700/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <aside className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-pink-500 rounded-xl flex items-center justify-center">
                  <Film className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                </div>
              </div>
              <div>
                <p className="text-slate-300 text-sm">
                  © {new Date().getFullYear()} MovieDB - All rights reserved
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  Made with passion for cinema lovers
                </p>
              </div>
            </aside>

          

          
            
          </div>

      
          <div className="mt-6 pt-6 border-t border-slate-700/30 text-center">
            <p className="text-slate-400 text-xs">
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
