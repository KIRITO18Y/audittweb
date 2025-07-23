import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { NoAccess } from './Alert/NoAccess';
import { useAuth } from '../context/useAuth';
import { Bar } from './Progress/Bar';

interface ProtectedRouteProps {
    children: ReactNode;
    requiredRole: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { loading, user } = useAuth();

    if (loading)
        return <Bar Title='Cargando...' />;

    if (!user && !loading) {
        // Si no hay usuario, redirigir al login
        return <Navigate to="/login" replace />;
    }

    if (!user) {
        return <NoAccess />;
    }

    if (user.roleName !== requiredRole) {
        // Si el usuario no tiene el rol requerido, mostrar NoAccess
        return <NoAccess />;
    }

    return <>{children}</>;
};
