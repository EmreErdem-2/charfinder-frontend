import AppRoutes from './AppRoutes';
import './App.css';
import HomeLayout from './layouts/root-navbar/RootLayout';
import QueryProvider from './providers/QueryProvider';


const App = () => (
  <>
    <QueryProvider>
      <AppRoutes />
      <HomeLayout />
    </QueryProvider>
  </>

);

export default App;