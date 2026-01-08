import { Link } from "react-router-dom";
import { layoutClasses, buttonClasses } from "../../utils/tailwindClasses";

const TablaMateriales = ({ materiales, onEliminar }) => {
  return (
    <div className={layoutClasses.tableContainer}>
      <table className={layoutClasses.table}>
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Código
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Nombre
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Marca
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Uso
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Stock
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Unidad
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Estado
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {materiales.map((material) => (
            <tr key={material.id_material} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{material.codigo}</td>
              <td className="px-4 py-3 text-sm">{material.nombre}</td>
              <td className="px-4 py-3 text-sm">{material.marca}</td>
              <td className="px-4 py-3 text-sm max-w-xs truncate">
                {material.uso}
              </td>
              <td className="px-4 py-3 text-sm">
                {parseFloat(material.stock_actual).toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm">{material.unidad_medida}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    material.estado === "OK"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {material.estado}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-right space-x-2">
                <Link
                  to={`/materiales/editar/${material.id_material}`}
                  className={`${buttonClasses.secondary} text-sm`}
                >
                  Editar
                </Link>
                <button
                  onClick={() => onEliminar(material.id_material)}
                  className={`${buttonClasses.danger} text-sm`}
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
