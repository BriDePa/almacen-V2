import { useState } from 'react';
import { materialesService } from '../../services/api';

const AgregarMaterial = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    marca: '',
    uso: '',
    unidad_medida: 'Unidad(es)',
    stock_minimo: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await materialesService.create(formData);
      alert('Material agregado correctamente');
      
      // Reset form
      setFormData({
        codigo: '',
        nombre: '',
        marca: '',
        uso: '',
        unidad_medida: 'Unidad(es)',
        stock_minimo: 0,
      });
      
      // Notificar al componente padre
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al agregar material';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="form-label">Código o Modelo *</label>
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

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};

export default AgregarMaterial;