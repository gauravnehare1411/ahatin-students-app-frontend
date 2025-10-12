import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, userRoles } = useAuthStore();
  const location = useLocation();
  
  const isAllowed = isLoggedIn && userRoles.some(role => allowedRoles.includes(role));

  if (isAllowed) {
    return children
  }
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoute;