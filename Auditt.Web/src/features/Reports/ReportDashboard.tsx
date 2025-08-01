import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useReportsGlobal } from "./UseReports";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { useFileDownload } from "../../shared/components/FilesDowload";
import useUserContext from "../../shared/context/useUserContext";
import useAssessmentContext from "../../shared/context/useAssessmentContext";

export const ReportDashboard = () => {
    const { selectedGuide: idGuide, selectedDataCut: dataCut } = useAssessmentContext();
    const { reportGlobal } = useReportsGlobal(dataCut, idGuide);
    const { client } = useUserContext();
    const { descargarArchivo } = useFileDownload();

    const handleDownload = async () => {
        const urlBlob = `/api/reports/${dataCut}?idGuide=${idGuide}&idInstitution=${client?.id}`;
        await descargarArchivo(urlBlob, "ReportGeneral_" + new Date().toISOString().split('T')[0] + ".xlsx");
    }


    return (
        <div className="w-full">
            <div className="py-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col items-center bg-audittpurple text-white p-6 sm:p-8 rounded-2xl text-center">
                        <span className="text-lg sm:text-xl lg:text-2xl">Adherencia Global</span>
                        <span className="text-3xl sm:text-4xl font-bold mt-2">{reportGlobal?.globalAdherence}%</span>
                    </div>
                    <div className="flex flex-col items-center bg-audittpink text-audittblack p-6 sm:p-8 rounded-2xl text-center">
                        <span className="text-lg sm:text-xl lg:text-2xl">Adherencia Estricta</span>
                        <span className="text-3xl sm:text-4xl font-bold mt-2">{reportGlobal?.strictAdherence}%</span>
                    </div>
                    <div className="flex flex-col items-center bg-audittprimary text-white p-6 sm:p-8 rounded-2xl text-center">
                        <span className="text-lg sm:text-xl lg:text-2xl">Historias</span>
                        <span className="text-3xl sm:text-4xl font-bold mt-2">{reportGlobal?.countHistories}</span>
                    </div>
                    <div className="flex flex-col gap-2 items-center bg-green-600 hover:bg-green-800 transition-all text-white p-6 sm:p-8 rounded-2xl cursor-pointer text-center" onClick={() => handleDownload()}>
                        <span className="text-lg sm:text-xl lg:text-2xl">Reporte</span>
                        <span className="text-xl sm:text-2xl font-bold mt-2">
                            <FontAwesomeIcon icon={faFileDownload} className="text-2xl sm:text-3xl" />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};