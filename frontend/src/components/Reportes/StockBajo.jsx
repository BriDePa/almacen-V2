const StockBajo = ({ stockBajo, onPrint }) => {
  return (
    <div className="card bg-yellow-50 border border-yellow-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-yellow-800">
          Materiales con Stock Bajo
        </h3>
        {typeof onPrint === "function" && (
          <button onClick={onPrint} className="btn-danger text-sm no-print">
            Imprimir
          </button>
        )}
      </div>

      {stockBajo.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Stock Actual</th>
                <th>Stock Mínimo</th>
              </tr>
            </thead>
            <tbody>
              {stockBajo.map((material) => (
                <tr key={material.id_material}>
                  <td>{material.codigo}</td>
                  <td>{material.nombre}</td>
                  <td className="text-red-600 font-semibold">
                    {parseFloat(material.stock_actual).toFixed(2)}
                  </td>
                  <td>{parseFloat(material.stock_minimo).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md">
          No hay materiales con stock bajo
        </div>
      )}
    </div>
  );
};

export default StockBajo;
