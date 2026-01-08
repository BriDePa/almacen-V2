import { layoutClasses, buttonClasses } from "../../utils/tailwindClasses";
import { printSection } from "../../utils/print";

const TablaReportes = ({ movimientos }) => {
  const formatFecha = (fecha) => {
    return new Date(fecha)
      .toLocaleString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .slice(0, 16);
  };

  return (
    <div
      id="print-reportes"
      className={`${layoutClasses.card} bg-green-50 border border-green-200`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-800">
          Movimientos Recientes
        </h3>
        <button
          type="button"
          onClick={() =>
            printSection("print-reportes", "Movimientos Recientes")
          }
          className={`${buttonClasses.secondary} text-sm no-print`}
        >
          Imprimir
        </button>
      </div>

      <div className={layoutClasses.tableContainer}>
        <table className={layoutClasses.table}>
          <thead>
            <tr className="bg-green-50">
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Material
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Tipo
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Cantidad
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Responsable
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Destino
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-green-700">
                Observación
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-green-100">
            {movimientos.map((mov) => (
              <tr key={mov.id_movimiento} className="hover:bg-green-50/40">
                <td className="px-4 py-3 text-sm">
                  {formatFecha(mov.fecha_movimiento)}
                </td>
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
                <td className="px-4 py-3 text-sm">{mov.responsable}</td>
                <td className="px-4 py-3 text-sm">{mov.proyecto_destino}</td>
                <td className="px-4 py-3 text-sm max-w-xs truncate">
                  {mov.observaciones}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaReportes;
