import { Route, Routes } from 'react-router-dom';
import PageNotFound from './components/page-not-found/PageNotFound';
import Header from './components/header/Header';
import AppContextProvider from './context/Context';
import Tasks from './components/tasks/Tasks';
import Login from './components/login/Login';

export function App() {
  return (
    <AppContextProvider>
      <Header />
      <div className="main container">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </AppContextProvider>
  );
}

export default App;
