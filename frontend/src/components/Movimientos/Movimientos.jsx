import { useState, useEffect } from 'react';
import { movimientosService } from '../../services/api';
import RegistrarMovimiento from './RegistrarMovimiento';
import TablaMovimientos from './TablaMovimientos';

const Movimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [movRes, matRes] = await Promise.all([
        movimientosService.getAll(),
        movimientosService.getMaterialesActivos()
      ]);
      setMovimientos(movRes.data);
      setMateriales(matRes.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar datos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que desea eliminar este movimiento?')) {
      return;
    }

    try {
      await movimientosService.delete(id);
      alert('Movimiento eliminado correctamente');
      cargarDatos();
    } catch (err) {
      alert('Error al eliminar movimiento');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Registro de Movimientos</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Registrar Movimiento</h3>
            <RegistrarMovimiento 
              materiales={materiales} 
              onSuccess={cargarDatos} 
            />
          </div>
        </div>

        <div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Historial Reciente</h3>
            <TablaMovimientos 
              movimientos={movimientos}
              onEliminar={handleEliminar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movimientos;