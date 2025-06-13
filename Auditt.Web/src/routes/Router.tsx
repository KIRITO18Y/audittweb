import { createBrowserRouter } from 'react-router-dom';
import App from '../App.tsx';
import { Home } from '../features/Home/Home.tsx';
import { Login } from './Login/Login.tsx';
import { UserCreate } from './Login/UserCreate.tsx';
import { BusinessCreate } from './Login/BusinessCreate.tsx';
import { PasswordRecoverForm } from './Login/PasswordRecover.tsx';
import { Clients } from '../features/Clients/Clients.tsx';
import { Patients } from '../features/Clients/Patients/Patients.tsx';
import { QuarterlyDetail } from '../features/DataCuts/QuarterlyDetail.tsx';
import { Functionary } from '../features/Clients/Professionals/Functionary.tsx';
import { Guide } from '../features/Guide/Guide.tsx';
import { GuideDetail } from '../features/Guide/GuideDetail.tsx';
import { Settings, } from '../features/Settings/Settings.tsx';
import { Users } from '../features/Settings/Users/Users.tsx';
import { Scales } from '../features/Settings/Scales/Scales.tsx';
import { Roles } from '../features/Settings/Roles/Roles.tsx';
import { DataCuts } from '../features/DataCuts/DataCuts.tsx';
import { Assessments } from '../features/Assessment/Assessments.tsx';
import { AssessmentDetail } from '../features/Assessment/AssessmentDetail.tsx';
import { ReportContainer } from '../features/Reports/ReportContainer.tsx';
import { ProtectedRoute } from '../shared/components/ProtectedRoute';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/Dashboard',
                element: <Home />,
            },
            {
                path: '/Clients',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <Clients />
                    </ProtectedRoute>
                ),
            },

            {
                path: '/Patients',
                element: <Patients />,
            },

            {
                path: '/Functionary',
                element: <Functionary />,
            },

            {
                path: '/Guide',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <Guide />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'Guide/:id',
                element: <GuideDetail />,
            },

            {
                path: '/DataCuts',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <DataCuts />
                    </ProtectedRoute>
                ),
            },

            {
                path: 'Quarterly/:Id',
                element: <QuarterlyDetail />,
            },
            {
                path: '/Assessments',
                element: <Assessments />,
            },
            {
                path: 'Assessments/Create/:Id',
                element: <AssessmentDetail />,
            },
            {
                path: 'Assessments/Create',
                element: <AssessmentDetail />,
            },
            {
                path: '/Reports',
                element: <ReportContainer />,
            },
            {
                path: '/Settings',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <Settings />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/Users',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <Users />
                    </ProtectedRoute>
                ),
            },

            {
                path: '/Scales',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <Scales />
                    </ProtectedRoute>
                ),
            },

            {
                path: '/Roles',
                element: (
                    <ProtectedRoute requiredRole="ADMIN">
                        <Roles />
                    </ProtectedRoute>
                ),
            },


        ],
    },
    {
        path: 'Login',
        element: <Login />,
    },
    {
        path: '/Create/User',
        element: <UserCreate />,
    },
    {
        path: '/Create/Business',
        element: <BusinessCreate />,
    },
    {
        path: 'PasswordRecover',
        element: <PasswordRecoverForm />,
    },
]);
