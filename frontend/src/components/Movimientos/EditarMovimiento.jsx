import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { movimientosService } from '../../services/api';

const EditarMovimiento = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    tipo_movimiento: 'entrada',
    cantidad: '',
    responsable: '',
    proyecto_destino: '',
    observaciones: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [loadingMovimiento, setLoadingMovimiento] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMovimiento();
  }, [id]);

  const cargarMovimiento = async () => {
    try {
      setLoadingMovimiento(true);
      const response = await movimientosService.getAll();
      const movimiento = response.data.find(m => m.id_movimiento == id);
      
      if (movimiento) {
        setFormData({
          tipo_movimiento: movimiento.tipo_movimiento,
          cantidad: movimiento.cantidad,
          responsable: movimiento.responsable,
          proyecto_destino: movimiento.proyecto_destino,
          observaciones: movimiento.observaciones,
        });
      } else {
        setError('Movimiento no encontrado');
      }
    } catch (err) {
      setError('Error al cargar el movimiento');
      console.error(err);
    } finally {
      setLoadingMovimiento(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const setTipo = (tipo) => {
    setFormData(prev => ({
      ...prev,
      tipo_movimiento: tipo
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await movimientosService.update(id, {
        ...formData,
        cantidad: parseFloat(formData.cantidad) || 0,
      });
      
      alert('Movimiento actualizado correctamente');
      navigate('/movimientos');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al actualizar movimiento';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingMovimiento) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Editar Movimiento</h2>
      
      <div className="card">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Tipo de Movimiento *</label>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    formData.tipo_movimiento === 'entrada'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                  onClick={() => setTipo('entrada')}
                >
                  Entrada
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                    formData.tipo_movimiento === 'salida'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                  }`}
                  onClick={() => setTipo('salida')}
                >
                  Salida
                </button>
              </div>
            </div>

            <div>
              <label className="form-label">Cantidad *</label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                className="form-input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="form-label">Responsable *</label>
              <input
                type="text"
                name="responsable"
                value={formData.responsable}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Proyecto/Área *</label>
              <input
                type="text"
                name="proyecto_destino"
                value={formData.proyecto_destino}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Observaciones</label>
              <textarea
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                className="form-input"
                rows="2"
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Guardar Cambios'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/movimientos')}
                className="btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarMovimiento;