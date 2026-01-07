import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { materialesService } from '../../services/api';

const EditarMaterial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    marca: '',
    uso: '',
    unidad_medida: 'Unidad(es)',
    stock_minimo: 0,
  });
  
  const [loading, setLoading] = useState(false);
  const [loadingMaterial, setLoadingMaterial] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarMaterial();
  }, [id]);

  const cargarMaterial = async () => {
    try {
      setLoadingMaterial(true);
      const response = await materialesService.getById(id);
      setFormData({
        codigo: response.data.codigo,
        nombre: response.data.nombre,
        marca: response.data.marca || '',
        uso: response.data.uso || '',
        unidad_medida: response.data.unidad_medida,
        stock_minimo: parseFloat(response.data.stock_minimo),
      });
    } catch (err) {
      setError('Error al cargar el material');
      console.error(err);
    } finally {
      setLoadingMaterial(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock_minimo' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await materialesService.update(id, formData);
      alert('Material actualizado correctamente');
      navigate('/materiales');
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al actualizar material';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (loadingMaterial) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Editar Material</h2>
      
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Modificar datos del material</h3>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="form-label">Código *</label>
              <input
                type="text"
                name="codigo"
                value={formData.codigo}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div>
              <label className="form-label">Marca</label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Uso</label>
              <textarea
                name="uso"
                value={formData.uso}
                onChange={handleChange}
                className="form-input"
                rows="2"
              />
            </div>

            <div>
              <label className="form-label">Unidad de Medida *</label>
              <select
                name="unidad_medida"
                value={formData.unidad_medida}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="Unidad(es)">Unidad(es)</option>
                <option value="Kilo(s)">Kilo(s)</option>
                <option value="Litro(s)">Litro(s)</option>
              </select>
            </div>

            <div>
              <label className="form-label">Stock Mínimo *</label>
              <input
                type="number"
                name="stock_minimo"
                value={formData.stock_minimo}
                onChange={handleChange}
                className="form-input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/materiales')}
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

export default EditarMaterial;