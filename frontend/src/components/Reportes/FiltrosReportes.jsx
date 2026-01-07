import { useState, useEffect } from 'react';

const FiltrosReportes = ({ filtros, materiales, onFiltrar, onLimpiar, onPrint }) => {
  const [formData, setFormData] = useState(filtros);
  const [marcas, setMarcas] = useState([]);
  const [usos, setUsos] = useState([]);

  useEffect(() => {
    // Extraer marcas y usos únicos de los materiales
    const marcasUnicas = [...new Set(materiales.map(m => m.marca).filter(Boolean))];
    const usosUnicos = [...new Set(materiales.map(m => m.uso).filter(Boolean))];
    
    setMarcas(marcasUnicas);
    setUsos(usosUnicos);
    setFormData(filtros);
  }, [filtros, materiales]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFiltrar(formData);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label htmlFor="fecha_inicio" className="form-label">Fecha inicio</label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={formData.fecha_inicio}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="fecha_fin" className="form-label">Fecha fin</label>
            <input
              type="date"
              id="fecha_fin"
              name="fecha_fin"
              value={formData.fecha_fin}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="tipo_movimiento" className="form-label">Tipo de movimiento</label>
            <select
              id="tipo_movimiento"
              name="tipo_movimiento"
              value={formData.tipo_movimiento}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Todos</option>
              <option value="entrada">Entrada</option>
              <option value="salida">Salida</option>
            </select>
          </div>

          <div>
            <label htmlFor="material" className="form-label">Material</label>
            <select
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Todos</option>
              {[...new Set(materiales.map(m => m.nombre).filter(Boolean))].map((nombre) => (
                <option key={nombre} value={nombre}>
                  {nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="marca" className="form-label">Marca</label>
            <select
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Todas</option>
              {marcas.map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="uso" className="form-label">Uso</label>
            <select
              id="uso"
              name="uso"
              value={formData.uso}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Todos</option>
              {usos.map((uso) => (
                <option key={uso} value={uso}>
                  {uso}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <button type="submit" className="btn-primary">
              Filtrar
            </button>
            <button
              type="button"
              onClick={onLimpiar}
              className="btn-secondary ml-2"
            >
              Limpiar
            </button>
          </div>

          <button
            type="button"
            onClick={onPrint}
            className="btn-success"
          >
            Imprimir movimientos
          </button>
        </div>
      </form>
    </div>
  );
};

export default FiltrosReportes;