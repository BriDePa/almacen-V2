import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-700";

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                AM
              </div>
              <div className="text-lg font-semibold text-gray-800">
                Almacén Minero
              </div>
            </Link>
          </div>

          <div className="flex-1 mx-6">
            <div className="max-w-xl mx-auto">
              
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/materiales"
                className={`px-3 py-2 rounded-md text-sm ${isActive(
                  "/materiales"
                )}`}
              >
                Materiales
              </Link>
              <Link
                to="/movimientos"
                className={`px-3 py-2 rounded-md text-sm ${isActive(
                  "/movimientos"
                )}`}
              >
                Movimientos
              </Link>
              <Link
                to="/reportes"
                className={`px-3 py-2 rounded-md text-sm ${isActive(
                  "/reportes"
                )}`}
              >
                Reportes
              </Link>
            </div>

            <div className="flex items-center gap-3">
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
