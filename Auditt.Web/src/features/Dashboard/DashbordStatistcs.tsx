import { ButtonBigLink } from "../../shared/components/Buttons/ButtonBigLink";
import { DashboardCard } from "./DashboardCard"
import { useDashboard } from "./useDashboard";

export const DashboradStatistcs = () => {
    const { dashboard } = useDashboard();
    return (
        <div className="flex-1 p-4">

            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                <ButtonBigLink text="Ir a Indicadores e Informes" to="/Reports" />
                <ButtonBigLink text="Ir a Medición de Adherencia" to="/Assessments" />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center ">
                <DashboardCard title="Total Pacientes" value={dashboard?.patientsCount ?? 0} textColor="text-pink-500 " />
                <DashboardCard title="Total Evaluaciones" value={dashboard?.valuationsCount ?? 0} textColor="text-audittprimary" />
                <DashboardCard title="Total Profesionales" value={dashboard?.functionariesCount ?? 0} textColor="text-purple-500" />
            </div>
        </div>
    )
};