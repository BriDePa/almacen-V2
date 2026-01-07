const TablaReportes = ({ movimientos }) => {
  const formatFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).slice(0, 16);
  };

  return (
    <div className="card bg-green-50 border border-green-200">
      <h3 className="text-lg font-semibold text-green-800 mb-4">Movimientos Recientes</h3>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Material</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Responsable</th>
              <th>Destino</th>
              <th>Observación</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((mov) => (
              <tr key={mov.id_movimiento}>
                <td>{formatFecha(mov.fecha_movimiento)}</td>
                <td className="max-w-xs truncate">{mov.material}</td>
                <td>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    mov.tipo_movimiento === 'entrada'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {mov.tipo_movimiento.toUpperCase()}
                  </span>
                </td>
                <td>{parseFloat(mov.cantidad).toFixed(2)}</td>
                <td>{mov.responsable}</td>
                <td>{mov.proyecto_destino}</td>
                <td className="max-w-xs truncate">{mov.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaReportes;