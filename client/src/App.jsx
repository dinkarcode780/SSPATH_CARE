import { useLocation } from "react-router-dom";
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { checkAuthExpiry } from "./utils/helpers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      checkAuthExpiry();
    }, 60000);
    return () => clearInterval(interval);
  }, []);



  const shouldHideHeaderFooter = location.pathname.includes('/admin') ;


  return (
    <ErrorBoundary>
      <ToastContainer />
      <div className="">
        {!shouldHideHeaderFooter && <Navbar />}
        <div className={shouldHideHeaderFooter ? "" : "pt-24"}>
          <AppRoutes />
        </div>
        {!shouldHideHeaderFooter && <Footer />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
