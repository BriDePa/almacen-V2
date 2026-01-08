import { useState, useEffect } from "react";
import { reportesService, materialesService } from "../../services/api";
import FiltrosReportes from "./FiltrosReportes";
import StockBajo from "./StockBajo";
import TablaReportes from "./TablaReportes";
import { printSection } from "../../utils/print";

const Reportes = () => {
  const [stockBajo, setStockBajo] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [filtros, setFiltros] = useState({
    fecha_inicio: "",
    fecha_fin: "",
    tipo_movimiento: "",
    material: "",
    marca: "",
    uso: "",
  });
  const [loading, setLoading] = useState(true);

  const cargarDatos = async (params = {}) => {
    try {
      setLoading(true);

      const [stockRes, movRes, matRes] = await Promise.all([
        reportesService.getStockBajo(),
        reportesService.getMovimientosFiltrados(params),
        materialesService.getAll(),
      ]);

      setStockBajo(stockRes.data);
      setMovimientos(movRes.data);
      setMateriales(matRes.data);
    } catch (err) {
      console.error("Error al cargar reportes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleFiltrar = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);

    // Convertir filtros a query params
    const params = {};
    Object.entries(nuevosFiltros).forEach(([key, value]) => {
      if (value) params[key] = value;
    });

    cargarDatos(params);
  };

  const handleLimpiar = () => {
    const filtrosVacios = {
      fecha_inicio: "",
      fecha_fin: "",
      tipo_movimiento: "",
      material: "",
      marca: "",
      uso: "",
    };

    setFiltros(filtrosVacios);
    cargarDatos();
  };

  // Usar utilidad centralizada de impresión

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reportes</h2>

      <div className="mb-6">
        <FiltrosReportes
          filtros={filtros}
          materiales={materiales}
          onFiltrar={handleFiltrar}
          onLimpiar={handleLimpiar}
          onPrint={() => printSection("movimientos-section")}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div id="stock-bajo-section">
            <StockBajo
              stockBajo={stockBajo}
              onPrint={() => printSection("stock-bajo-section")}
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div id="movimientos-section">
            <TablaReportes movimientos={movimientos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
