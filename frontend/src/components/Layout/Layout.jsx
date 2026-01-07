import { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Aquí podrías agregar un sistema de notificaciones global
    // Por ahora, mantenemos el placeholder para mensajes flash
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Sistema de mensajes flash */}
        {messages.length > 0 && (
          <div className="mb-6 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-md ${
                  msg.type === 'success' ? 'bg-green-100 text-green-800' :
                  msg.type === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default Layout;