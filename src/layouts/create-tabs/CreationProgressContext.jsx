// CreationProgressContext.jsx
import { createContext, useContext, useState } from 'react';

const CreationProgressContext = createContext();

export const CreationProgressProvider = ({ children }) => {
  const [unlockedSteps, setUnlockedSteps] = useState(['/create']);

  const unlockStep = (path) => {
    setUnlockedSteps((prev) =>
      prev.includes(path) ? prev : [...prev, path]
    );
  };

  return (
    <CreationProgressContext.Provider value={{ unlockedSteps, unlockStep }}>
      {children}
    </CreationProgressContext.Provider>
  );
};

export const useCreationProgress = () => useContext(CreationProgressContext);