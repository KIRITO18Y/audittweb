import { useState } from "react";
import ButtonDelete from "../../../shared/components/Buttons/ButtonDelete";
import { LinkClients } from "../../Dashboard/LinkClients";
import OffCanvas from "../../../shared/components/OffCanvas/Index";
import { Direction } from "../../../shared/components/OffCanvas/Models";
import { PatientsCreate } from "./PatientsCreate";
import Swal from "sweetalert2";
import { usePatients } from "./UsePatients";
import { PatientsModel } from "./PantientsModel";
import { PatientsUpdate } from "./PatientsUpdate";
import { Bar } from "../../../shared/components/Progress/Bar";
import { ButtonUpdate } from "../../../shared/components/Buttons/ButtonDetail";
import { PatientsImport } from "./PatientsImport";
import { useFileDownload } from "../../../shared/components/FilesDowload";
import { format } from "date-fns";
import { TitlePrincipal } from "../../../shared/components/Text/TitlePrincipal";
import { InputSearch } from "../../../shared/components/Forms/InputSearch";
export const Patients = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleImport, setVisibleImport] = useState(false);
    const { patients, queryPatients, deletePatients, } = usePatients();
    const [patient, setPatient] = useState<PatientsModel>();
    const [searPantients, setSearPantients] = useState('');
    const { descargarArchivo } = useFileDownload();

    const handleClickDetail = (patientSelected: PatientsModel) => {
        if (patientSelected) {
            setPatient(patientSelected);
            setVisibleUpdate(true);
        }
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number): void => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este Paciente?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {

                await deletePatients.mutateAsync(id);
                queryPatients.refetch();
            }
        });
    };

    const handleClose = () => {
        setVisible(false);
    }

    const handleDownloadTemplate = () => {
        const url = '/api/patients/template-import';
        descargarArchivo(url, 'PlantillaPacientes_' + new Date().toISOString().split('T')[0] + '.xlsx');
    }

    if (queryPatients.isLoading)
        return <Bar />

    const filteredPatients = patients?.filter(patient =>
        `${patient.identification}  ${patient.birthDate} ${patient.eps}`.toLowerCase().includes(searPantients.toLowerCase())
    )

    return (
        <div className="w-full p-6">
            <div>
                <div className="flex-1">
                    <div className="flex space-x-8 text-lg font-medium mb-0 mr-2">
                        <LinkClients />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-4 mb-2">
                        <TitlePrincipal title="Pacientes o historias" />
                        <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                            <InputSearch
                                value={searPantients}
                                onChange={(e) => setSearPantients(e.target.value)}
                                placeholder="Buscar Paciente"
                            />
                            <button onClick={() => setVisible(true)} className="cursor-pointer bg-[#392F5A] hover:bg-indigo-900 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm sm:text-base">
                                Crear Paciente
                            </button>
                            <button onClick={() => setVisibleImport(true)} className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold text-sm sm:text-base">
                                Importar
                            </button>
                        </div>
                    </div>

                    {/* Desktop Table */}
                    <div className="hidden lg:block">
                        <div className="grid grid-cols-4">
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">ID</div>
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Fecha de Nacimiento</div>
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Eps</div>
                            <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Opciones</div>
                        </div>
                        <div className="bg-white px-2 py-2 border border-gray-200">
                            {filteredPatients?.map((patient) => (
                                <div key={patient.id} className="grid grid-cols-4 hover:bg-[#F4EDEE] transition-colors">
                                    <div className="text-sm px-2 py-2 border border-gray-300 text-center">{patient.identification}</div>
                                    <div className="text-sm px-2 py-2 border border-gray-300 text-center">{format(patient.birthDate, 'dd/MM/yyyy')}</div>
                                    <div className="text-sm px-2 py-2 border border-gray-300 text-center">{patient.eps}</div>
                                    <div className="flex justify-center text-sm px-2 border border-gray-300 py-1">
                                        <div onClick={() => handleClickDetail(patient)}>
                                            <ButtonUpdate />
                                        </div>
                                        <ButtonDelete id={patient.id ?? 0} onDelete={handleDelete} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Cards */}
                    <div className="lg:hidden space-y-4">
                        {filteredPatients?.map((patient) => (
                            <div key={patient.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                                <div className="space-y-3 mb-4">
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">Identificación:</span>
                                        <span className="text-sm font-semibold text-gray-900">{patient.identification}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">Fecha de Nacimiento:</span>
                                        <span className="text-sm text-gray-900">{format(patient.birthDate, 'dd/MM/yyyy')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm font-medium text-gray-500">EPS:</span>
                                        <span className="text-sm text-gray-900">{patient.eps}</span>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                    <div onClick={() => handleClickDetail(patient)}>
                                        <ButtonUpdate />
                                    </div>
                                    <ButtonDelete id={patient.id ?? 0} onDelete={handleDelete} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <OffCanvas titlePrincipal='Crear Paciente' visible={visible} xClose={handleClose} position={Direction.Right}>
                <PatientsCreate />
            </OffCanvas>
            {patient && (
                <OffCanvas titlePrincipal='Actualizar Paciente' visible={visibleUpdate} xClose={() => setVisibleUpdate(false)} position={Direction.Right}>
                    <PatientsUpdate data={patient} />
                </OffCanvas>
            )}
            <OffCanvas titlePrincipal='Importar Paciente' visible={visibleImport} xClose={() => setVisibleImport(false)} position={Direction.Right}>
                <div>
                    <p className="mb-4">Aquí puedes importar pacientes desde un archivo Excel, a continuación descarga la plantilla.</p>
                    <button onClick={handleDownloadTemplate} className="mb-6 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg font-semibold mr-2">
                        Descargar Plantilla
                    </button>
                    <h3 className="text-xl font-semibold mb-2">Importar datos</h3>
                    {/* Aquí puedes agregar el formulario o componente para la importación */}
                    <PatientsImport />
                </div>
            </OffCanvas>
        </div>
    );
};
