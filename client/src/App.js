import 'materialize-css';
import { useRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useAuth } from 'hooks';
import { AuthContext } from 'context/AuthContext';
import NavBar from 'components/NavBar';

function App() {
  const { login, logout, userId, token } = useAuth();
  const isAuthenticated = Boolean(token);
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{ login, logout, userId, token, isAuthenticated }}>
      <BrowserRouter>
        {isAuthenticated && <NavBar />}
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
