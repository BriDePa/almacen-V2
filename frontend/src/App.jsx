import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Materiales from './components/Materiales/Materiales';
import EditarMaterial from './components/Materiales/EditarMaterial';
import Movimientos from './components/Movimientos/Movimientos';
import EditarMovimiento from './components/Movimientos/EditarMovimiento';
import Reportes from './components/Reportes/Reportes';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/movimientos" />} />
          <Route path="/materiales" element={<Materiales />} />
          <Route path="/materiales/editar/:id" element={<EditarMaterial />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/movimientos/editar/:id" element={<EditarMovimiento />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;