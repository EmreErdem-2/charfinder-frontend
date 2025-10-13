import { NavLink, Outlet } from 'react-router-dom';
import '../Layout.css'

const CharacterLayout = () => (
  <div className="app-layout">
    <nav className="tab-nav">
      <NavLink to="/character" end className="tab-link">Overview</NavLink>
      <NavLink to="/character/stats" className="tab-link">Stats</NavLink>
      <NavLink to="/character/features" className="tab-link">Features</NavLink>
      <NavLink to="/character/inventory" className="tab-link">Inventory</NavLink>
    </nav>
    <div className="app-content">
      <Outlet />
    </div>
  </div>
);

export default CharacterLayout;