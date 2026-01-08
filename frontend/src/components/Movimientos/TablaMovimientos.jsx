import { Link } from "react-router-dom";
import { layoutClasses, buttonClasses } from "../../utils/tailwindClasses";

const TablaMovimientos = ({ movimientos, onEliminar }) => {
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={layoutClasses.tableContainer}>
      <table className={layoutClasses.table}>
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Código
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Material
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Tipo
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Cantidad
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Unidad
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Fecha
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Responsable
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Proyecto
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
              Observaciones
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {movimientos.map((mov) => (
            <tr key={mov.id_movimiento} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{mov.codigo}</td>
              <td className="px-4 py-3 text-sm max-w-xs truncate">
                {mov.material}
              </td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    mov.tipo_movimiento === "entrada"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {mov.tipo_movimiento.toUpperCase()}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">
                {parseFloat(mov.cantidad).toFixed(2)}
              </td>
              <td className="px-4 py-3 text-sm">{mov.unidad_medida}</td>
              <td className="px-4 py-3 text-sm">
                {formatFecha(mov.fecha_movimiento)}
              </td>
              <td className="px-4 py-3 text-sm">{mov.responsable}</td>
              <td className="px-4 py-3 text-sm">{mov.proyecto_destino}</td>
              <td className="px-4 py-3 text-sm max-w-xs truncate">
                {mov.observaciones}
              </td>
              <td className="px-4 py-3 text-sm text-right space-x-2">
                <Link
                  to={`/movimientos/editar/${mov.id_movimiento}`}
                  className={`${buttonClasses.secondary} text-sm`}
                >
                  Editar
                </Link>
                <button
                  onClick={() => onEliminar(mov.id_movimiento)}
                  className={`${buttonClasses.danger} text-sm`}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {movimientos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No hay movimientos registrados
        </div>
      )}
    </div>
  );
};

export default TablaMovimientos;
