import { Link } from 'react-router-dom';

const TablaMateriales = ({ materiales, onEliminar }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Uso</th>
            <th>Stock</th>
            <th>Unidad</th>
            <th>Estado</th>
            <th className="no-print">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((material) => (
            <tr key={material.id_material}>
              <td>{material.codigo}</td>
              <td>{material.nombre}</td>
              <td>{material.marca}</td>
              <td>{material.uso}</td>
              <td>{parseFloat(material.stock_actual).toFixed(2)}</td>
              <td>{material.unidad_medida}</td>
              <td>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  material.estado === 'OK' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {material.estado}
                </span>
              </td>
              <td className="no-print space-x-2">
                <Link
                  to={`/materiales/editar/${material.id_material}`}
                  className="btn-warning px-3 py-1 text-sm"
                >
                  Editar
                </Link>
                <button
                  onClick={() => onEliminar(material.id_material)}
                  className="btn-danger px-3 py-1 text-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMateriales;