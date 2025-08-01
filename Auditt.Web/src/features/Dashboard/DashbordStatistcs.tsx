import { ButtonBigLink } from "../../shared/components/Buttons/ButtonBigLink";
import { DashboardCard } from "./DashboardCard"
import { useDashboard } from "./useDashboard";

export const DashboradStatistcs = () => {
    const { dashboard } = useDashboard();
    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-10">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl mb-8 sm:mb-12 lg:mb-16 text-center lg:text-left">
                <span className="text-[#392F5A] font-bold">Bienvenido a
                </span> <span className="text-audittprimary font-bold">Auditt</span><span className="text-[#392F5A]">Api</span>
            </h1>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4">
                <ButtonBigLink text="Ir a Indicadores e Informes" to="/Reports" />
                <ButtonBigLink text="Ir a Medición de Adherencia" to="/Assessments" />
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                <DashboardCard title="Total Pacientes" value={dashboard?.patientsCount ?? 0} textColor="text-pink-500" />
                <DashboardCard title="Total Evaluaciones" value={dashboard?.valuationsCount ?? 0} textColor="text-audittprimary" />
                <DashboardCard title="Total Profesionales" value={dashboard?.functionariesCount ?? 0} textColor="text-purple-500" />
            </div>
        </div>
    )
};