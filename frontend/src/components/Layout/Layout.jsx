import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { layoutClasses } from "../../utils/tailwindClasses";

const Layout = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Aquí podrías agregar un sistema de notificaciones global
    // Por ahora, mantenemos el placeholder para mensajes flash
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Sistema de mensajes flash */}
        {messages.length > 0 && (
          <div className="mb-6 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-lg shadow-sm border-l-4 ${
                  msg.type === "success"
                    ? "bg-green-50 border-green-400 text-green-800"
                    : msg.type === "error"
                    ? "bg-red-50 border-red-400 text-red-800"
                    : "bg-blue-50 border-blue-400 text-blue-800"
                }`}
              >
                <div className="flex-1 text-sm">{msg.text}</div>
              </div>
            ))}
          </div>
        )}
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
