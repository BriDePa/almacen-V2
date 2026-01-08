import { useState } from "react";
import { materialesService } from "../../services/api";
import { formClasses, buttonClasses } from "../../utils/tailwindClasses";

const AgregarMaterial = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    marca: "",
    uso: "",
    unidad_medida: "Unidad(es)",
    stock_minimo: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock_minimo" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await materialesService.create(formData);
      alert("Material agregado correctamente");

      // Reset form
      setFormData({
        codigo: "",
        nombre: "",
        marca: "",
        uso: "",
        unidad_medida: "Unidad(es)",
        stock_minimo: 0,
      });

      // Notificar al componente padre
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error al agregar material";
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
          <label className={formClasses.label}>Código o Modelo *</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            className={formClasses.input}
            required
          />
        </div>

        <div>
          <label className={formClasses.label}>Nombre *</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={formClasses.input}
            required
          />
        </div>

        <div>
          <label className={formClasses.label}>Marca</label>
          <input
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            className={formClasses.input}
          />
        </div>

        <div>
          <label className={formClasses.label}>Uso</label>
          <textarea
            name="uso"
            value={formData.uso}
            onChange={handleChange}
            className={formClasses.textarea}
            rows="2"
          />
        </div>

        <div>
          <label className={formClasses.label}>Unidad de Medida *</label>
          <select
            name="unidad_medida"
            value={formData.unidad_medida}
            onChange={handleChange}
            className={formClasses.select}
            required
          >
            <option value="Unidad(es)">Unidad(es)</option>
            <option value="Kilo(s)">Kilo(s)</option>
            <option value="Litro(s)">Litro(s)</option>
          </select>
        </div>

        <div>
          <label className={formClasses.label}>Stock Mínimo *</label>
          <input
            type="number"
            name="stock_minimo"
            value={formData.stock_minimo}
            onChange={handleChange}
            className={formClasses.input}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button
          type="submit"
          className={`${buttonClasses.primary} w-full justify-center`}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};

export default AgregarMaterial;
