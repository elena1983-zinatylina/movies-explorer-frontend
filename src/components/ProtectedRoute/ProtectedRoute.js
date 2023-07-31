import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...props }) {
   return (
      <Route>
         {() =>
            props.loggedIn ? <Component {...props} /> : <Navigate to='/' />
         }
      </Route>
   );
};

export default ProtectedRoute;

// ProtectedRoute — компонент для защиты маршрутов, у которых нет надлежащей аутентификации.