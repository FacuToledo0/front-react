import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import Home from './pages/Home';
import ProductosPage from './pages/ProductosPage';
import PersonasPage from './pages/PersonasPage';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const items = [
    { label: 'Inicio', icon: 'pi pi-home', command: () => navigate('/') },
    { label: 'Productos', icon: 'pi pi-box', command: () => navigate('/productos') },
    { label: 'Personas', icon: 'pi pi-users', command: () => navigate('/personas') },
  ];

  return (
    <div className="min-h-screen w-full flex flex-column bg-gray-100">
      {isHome ? (
        <div className="flex justify-content-center align-items-center h-screen w-screen">
          <Home />
        </div>
      ) : (
        <>
          <div className="w-full shadow-2">
            <Menubar model={items} />
          </div>
          <div className="flex justify-content-center p-4 flex-grow-1">
            <div className="w-full max-w-4xl">
              <Routes>
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/personas" element={<PersonasPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
