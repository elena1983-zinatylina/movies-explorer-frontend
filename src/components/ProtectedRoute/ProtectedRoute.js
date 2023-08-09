import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.tokenExist ? (
    props.isLoggedIn && <Component {...props} />
  ) : (
    <Navigate to="/signup" replace />
  );
};

export default ProtectedRoute;