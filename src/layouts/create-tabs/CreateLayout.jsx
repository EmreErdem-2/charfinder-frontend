import { NavLink, Outlet } from 'react-router-dom';
import '../Layout.css'
import { useCreationProgress } from './CreationProgressContext';

const CreateLayout = () => {
  const { unlockedSteps } = useCreationProgress();

  const tabs = [
    { path: '/create', label: 'Base' },
    { path: '/create/ancestry', label: 'Ancestry' },
    { path: '/create/backgrounds', label: 'Backgrounds' },
    { path: '/create/classes', label: 'Classes' },
    { path: '/create/skills', label: 'Skills' },
    { path: '/create/feats', label: 'Feats' },
  ];

  return (
    <div className="app-layout">
      <nav className="tab-nav">
        {tabs.map(({ path, label }) => (
          <NavLink
            key={path}
            to={unlockedSteps.includes(path) ? path : '#'}
            className={`tab-link ${unlockedSteps.includes(path) ? '' : 'disabled'}`}
            onClick={(e) => {
              if (!unlockedSteps.includes(path)) e.preventDefault();
            }}
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};


export default CreateLayout