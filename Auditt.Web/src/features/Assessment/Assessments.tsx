import React, { useState } from "react";
import { ClientSelect } from "../Clients/ClientSelect";
import { Option } from "../../shared/model";
import { SingleValue } from "react-select";
import { Link } from "react-router-dom";
import { useAssessments } from "./useAssessment";
import { Bar } from "../../shared/components/Progress/Bar";
import useUserContext from "../../shared/context/useUserContext";
import Swal from "sweetalert2";
import { DataCutSelect } from "../DataCuts/DataCutsSelect";
import { GuideSelect } from "../Guide/GuideSelect";
import { format } from "date-fns";

export const Assessments = () => {
    const { queryAssessments, assessments, deleteAssessment } = useAssessments();
    const { client } = useUserContext();
    const [selectedClient, setSelectedClient] = useState<Option | undefined>(() => ({
        value: client?.id?.toString(),
        label: client?.name,
    }));

    const handleChangeClient = (newValue: SingleValue<Option>) => {
        setSelectedClient({
            value: newValue?.value,
            label: newValue?.label,
        });
    }
    function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar esta evaluación?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteAssessment.mutate(id);
            }
        })
    }

    if (queryAssessments.isLoading)
        return <Bar />;



    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 p-4 lg:justify-between">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="font-medium text-sm sm:text-base">IPS</span>
                    <ClientSelect className="w-full sm:w-auto min-w-48" selectedValue={selectedClient} xChange={handleChangeClient} isSearchable={true} />
                </div>
                <div className="flex items-center">
                    <Link to={'/Reports'} className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base text-center" >
                        Ir a Indicadores e informes</Link>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 flex flex-col sm:flex-row gap-4 sm:justify-between">
                    <h1 className="text-xl sm:text-2xl font-semibold">Evaluaciones o auditorias</h1>
                    <Link to={'/Assessments/Create'} title='Crear' className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base text-center">
                        Realizar evaluaciones
                    </Link>
                </div>
                <div className="flex-1 p-4">
                    <div className="flex flex-col lg:flex-row gap-4 pb-4">
                        <div className="flex flex-col w-full lg:w-auto">
                            <span className="font-medium text-sm sm:text-base mb-2">Corte de Auditoria</span>
                            <DataCutSelect className="w-full min-w-60" isSearchable={true} />
                        </div>

                        <div className="flex flex-col w-full lg:w-auto">
                            <span className="font-medium text-sm sm:text-base mb-2">Instrumento de adherencia a GPC</span>
                            <GuideSelect className="w-full" isSearchable={true} />
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-4">
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1">Historia</div>
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1">Profesional</div>
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1">Fecha de Atención</div>
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Opciones</div>
                        </div>
                        <div className="bg-white px-2 py-2 border border-gray-200">
                            {assessments?.map((assessment) => (
                                <div key={assessment.id} className="grid grid-cols-4 hover:bg-[#F4EDEE] transition-colors">
                                    <div className="text-sm bg-white px-2 py-2 border border-gray-300">{assessment.identificationPatient}</div>
                                    <div className="text-sm bg-white px-2 py-2 border border-gray-300">{assessment.functionaryName}</div>
                                    <div className="text-sm bg-white px-2 py-2 border border-gray-300">{format(assessment.date, "dd/MM/yyyy")}</div>
                                    <div className="flex justify-center px-2 py-2 border border-gray-300">
                                        <button
                                            className="border-[#FF677D] border-2 hover:bg-[#ff677e88] transition-all text-[#921729c4] px-4 py-1 rounded-lg font-semibold cursor-pointer text-sm"
                                            onClick={(e) => handleDelete(e, assessment.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {assessments?.map((assessment) => (
                            <div key={assessment.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">Historia:</span>
                                        <span className="text-sm font-semibold text-gray-900">{assessment.identificationPatient}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">Profesional:</span>
                                        <span className="text-sm text-gray-900">{assessment.functionaryName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">Fecha de Atención:</span>
                                        <span className="text-sm text-gray-900">{format(assessment.date, "dd/MM/yyyy")}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2 border-t border-gray-100">
                                    <button
                                        className="border-[#FF677D] border-2 hover:bg-[#ff677e88] transition-all text-[#921729c4] px-4 py-2 rounded-lg font-semibold cursor-pointer text-sm"
                                        onClick={(e) => handleDelete(e, assessment.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}