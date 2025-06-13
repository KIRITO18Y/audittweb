import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useUserContext from '../context/useUserContext';
import { NoAccess } from './Alert/NoAccess';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user } = useUserContext();

    if (!user) {
        // Si no hay usuario, redirigir al login
        return <Navigate to="/login" replace />;
    }

    if (user.roleName !== requiredRole) {
        // Si el usuario no tiene el rol requerido, mostrar NoAccess
        return <NoAccess />;
    }

    return <>{children}</>;
};
