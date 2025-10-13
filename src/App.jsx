import AppRoutes from './AppRoutes';
import './App.css';
import HomeLayout from './layouts/root-navbar/RootLayout';
import { CreationProgressProvider } from './layouts/create-tabs/CreationProgressContext';


const App = () => (
  <>
    <AppRoutes />
    <HomeLayout />
  </>

);

export default App;