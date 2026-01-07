import { useState, useEffect } from 'react';
import { materialesService } from '../../services/api';
import AgregarMaterial from './AgregarMaterial';
import TablaMateriales from './TablaMateriales';

const Materiales = () => {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarMateriales = async () => {
    try {
      setLoading(true);
      const response = await materialesService.getAll();
      setMateriales(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar materiales');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarMateriales();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este material? NO HAY VUELTA ATRÁS')) {
      return;
    }

    try {
      await materialesService.delete(id);
      alert('Material eliminado correctamente');
      cargarMateriales();
    } catch (err) {
      alert('Error al eliminar material');
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
      <h2 className="text-2xl font-bold mb-6">Gestión de Materiales</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="card mb-6">
            <h3 className="text-lg font-semibold mb-4">Agregar Nuevo Material</h3>
            <AgregarMaterial onSuccess={cargarMateriales} />
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Inventario Actual</h3>
              <button
                onClick={() => window.print()}
                className="btn-secondary no-print"
              >
                Imprimir Inventario
              </button>
            </div>
            
            <TablaMateriales 
              materiales={materiales} 
              onEliminar={handleEliminar}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Materiales;