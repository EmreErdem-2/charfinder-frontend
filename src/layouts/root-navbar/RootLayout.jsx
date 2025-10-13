import { NavLink, Outlet } from 'react-router-dom';
import '../Layout.css'; // optional for styling

const HomeLayout = () => (
  <div className="app-layout">
    <header className="top-nav">
      <NavLink to="/" end className="nav-link">Home</NavLink>
      <NavLink to="/info" className="nav-link">Info</NavLink>
      <NavLink to="/rules" className="nav-link">Rules</NavLink>
      <NavLink to="/create" className="nav-link">Create</NavLink>
      <NavLink to="/saved" className="nav-link">Saved</NavLink>
    </header>

    <main className="app-content">
      <Outlet />
    </main>
  </div>
);

export default HomeLayout;