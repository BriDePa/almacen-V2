import { useState } from 'react';
import { movimientosService } from '../../services/api';

const RegistrarMovimiento = ({ materiales, onSuccess }) => {
  const [formData, setFormData] = useState({
    id_material: '',
    tipo_movimiento: 'entrada',
    cantidad: '',
    responsable: '',
    proyecto_destino: '',
    observaciones: 'Sin Observaciones',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await movimientosService.create({
        ...formData,
        cantidad: parseFloat(formData.cantidad) || 0,
      });
      
      alert('Movimiento registrado correctamente');
      
      // Reset form
      setFormData({
        id_material: '',
        tipo_movimiento: 'entrada',
        cantidad: '',
        responsable: '',
        proyecto_destino: '',
        observaciones: 'Sin Observaciones',
      });
      
      // Notificar al componente padre
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Error al registrar movimiento';
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
          <label className="form-label">Material *</label>
          <select
            name="id_material"
            value={formData.id_material}
            onChange={handleChange}
            className="form-input"
            required
          >
            <option value="">Seleccionar...</option>
            {materiales.map((mat) => (
              <option key={mat.id_material} value={mat.id_material}>
                {mat.codigo} - {mat.nombre}
              </option>
            ))}
          </select>
        </div>

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

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </div>
    </form>
  );
};

export default RegistrarMovimiento;