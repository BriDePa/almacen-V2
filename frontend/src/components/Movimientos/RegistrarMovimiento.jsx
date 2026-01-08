import { useState } from "react";
import { movimientosService } from "../../services/api";
import { formClasses, buttonClasses } from "../../utils/tailwindClasses";

const RegistrarMovimiento = ({ materiales, onSuccess }) => {
  const [formData, setFormData] = useState({
    id_material: "",
    tipo_movimiento: "entrada",
    cantidad: "",
    responsable: "",
    proyecto_destino: "",
    observaciones: "Sin Observaciones",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setTipo = (tipo) => {
    setFormData((prev) => ({
      ...prev,
      tipo_movimiento: tipo,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await movimientosService.create({
        ...formData,
        cantidad: parseFloat(formData.cantidad) || 0,
      });

      alert("Movimiento registrado correctamente");

      // Reset form
      setFormData({
        id_material: "",
        tipo_movimiento: "entrada",
        cantidad: "",
        responsable: "",
        proyecto_destino: "",
        observaciones: "Sin Observaciones",
      });

      // Notificar al componente padre
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Error al registrar movimiento";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className={formClasses.label}>Material *</label>
          <select
            name="id_material"
            value={formData.id_material}
            onChange={handleChange}
            className={formClasses.select}
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
          <label className={formClasses.label}>Tipo de Movimiento *</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`${
                formData.tipo_movimiento === "entrada"
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              } flex-1 px-4 py-2 rounded-md font-medium transition-colors`}
              onClick={() => setTipo("entrada")}
            >
              Entrada
            </button>
            <button
              type="button"
              className={`${
                formData.tipo_movimiento === "salida"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              } flex-1 px-4 py-2 rounded-md font-medium transition-colors`}
              onClick={() => setTipo("salida")}
            >
              Salida
            </button>
          </div>
        </div>

        <div>
          <label className={formClasses.label}>Cantidad *</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            className={formClasses.input}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className={formClasses.label}>Responsable *</label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            className={formClasses.input}
            required
          />
        </div>

        <div>
          <label className={formClasses.label}>Proyecto/Área *</label>
          <input
            type="text"
            name="proyecto_destino"
            value={formData.proyecto_destino}
            onChange={handleChange}
            className={formClasses.input}
            required
          />
        </div>

        <div>
          <label className={formClasses.label}>Observaciones</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            className={formClasses.textarea}
            rows="2"
          />
        </div>

        <button
          type="submit"
          className={`${buttonClasses.primary} w-full justify-center`}
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </div>
    </form>
  );
};

export default RegistrarMovimiento;
