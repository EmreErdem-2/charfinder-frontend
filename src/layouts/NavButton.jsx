import { useNavigate } from 'react-router-dom';
import './NavButton.css'

import { useCreationProgress } from './create-tabs/CreationProgressContext';

const NavButton = ({ to, label, replace = false, className = '', ...props }) => {
  const navigate = useNavigate();
  const { unlockStep } = useCreationProgress();

  const handleClick = () => {
    unlockStep(to);
    navigate(to, { replace });
  };

  return (
    <button onClick={handleClick} className={`nav-button ${className}`} {...props}>
      {label}
    </button>
  );
};

export default NavButton;