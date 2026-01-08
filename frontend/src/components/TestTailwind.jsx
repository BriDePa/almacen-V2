import React from 'react';

const TestTailwind = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        ✅ Tailwind CSS v4.1 Funcionando
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Clases de Utilidad</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-100 text-blue-800 rounded-lg">
              bg-blue-100 text-blue-800
            </div>
            <div className="p-4 bg-green-100 text-green-800 rounded-lg">
              bg-green-100 text-green-800
            </div>
            <div className="p-4 bg-red-100 text-red-800 rounded-lg">
              bg-red-100 text-red-800
            </div>
          </div>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Componentes Personalizados</h2>
          <div className="space-y-3">
            <button className="btn-primary w-full">Botón Primario</button>
            <button className="btn-secondary w-full">Botón Secundario</button>
            <button className="btn-danger w-full">Botón Peligro</button>
          </div>
        </div>
      </div>
      
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Grid System</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="p-4 bg-gray-100 rounded text-center">
              Col {num}
            </div>
          ))}
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Tailwind v4 Features</h2>
        <div className="space-y-2 text-gray-700">
          <p>✅ Variables CSS: <code className="bg-gray-100 px-1">var(--color-blue-600)</code></p>
          <p>✅ Sin archivo de configuración obligatorio</p>
          <p>✅ Más rápido y ligero</p>
          <p>✅ Mejor soporte para CSS moderno</p>
        </div>
      </div>
    </div>
  );
};

export default TestTailwind;