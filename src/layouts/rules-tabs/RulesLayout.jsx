import { NavLink, Outlet } from 'react-router-dom';
import '../Layout.css'

const RulesLayout = () => {
  const tabs = [
    { path: '/rules/ancestry', label: 'Ancestry' },
    { path: '/rules/backgrounds', label: 'Backgrounds' },
    { path: '/rules/classes', label: 'Classes' },
    { path: '/rules/skills', label: 'Skills' },
    { path: '/rules/feats', label: 'Feats' },
  ];

  return (
    <div className="app-layout">
      <nav className="tab-nav">
        {tabs.map(tab => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              isActive ? "tab-link active" : "tab-link"
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};


export default RulesLayout