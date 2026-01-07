import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-900' : '';
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Almacén Minero
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/materiales"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive('/materiales')}`}
            >
              Materiales
            </Link>
            <Link
              to="/movimientos"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive('/movimientos')}`}
            >
              Movimientos
            </Link>
            <Link
              to="/reportes"
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${isActive('/reportes')}`}
            >
              Reportes
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;