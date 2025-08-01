import { useState } from "react";
import { Direction } from "../../shared/components/OffCanvas/Models";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { DataCutCreateForm } from "./DataCutCreateForm";
import { ButtonUpdate } from "../../shared/components/Buttons/ButtonDetail";
import { useDataCuts } from "./useDataCuts";
import { Bar } from "../../shared/components/Progress/Bar";
import { ClientSelect } from "../Clients/ClientSelect";
import { Option } from "../../shared/model";
import { SingleValue } from "react-select";
import ButtonDelete from "../../shared/components/Buttons/ButtonDelete";
import Swal from "sweetalert2";
import { DataCutUpdateForm } from "./DataCutUpdateForm";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserContext from "../../shared/context/useUserContext";
import { DataCutModel } from "./DataCutModels";
import { format } from "date-fns";

export const DataCuts = () => {
    const { client } = useUserContext();
    const [visibleCreate, setVisibleCreate] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [selectedDataCut, setSelectedDataCut] = useState<DataCutModel | null>(null);
    const { queryDataCuts, dataCuts, deleteDataCut } = useDataCuts();
    const [searDataCuts, setSearDataCuts] = useState('');
    const [selectedClient, setSelectedClient] = useState<Option | undefined>(() => ({
        value: client?.id?.toString(),
        label: client?.name,
    }));


    const handleCreateClick = () => {
        setVisibleCreate(true);
    };

    const handleChangeClient = (newValue: SingleValue<Option>) => {
        setSelectedClient({
            value: newValue?.value,
            label: newValue?.label,
        });
    };

    const handleUpdateClick = (item: DataCutModel) => {
        setSelectedDataCut(item);
        setVisibleUpdate(true);
    };

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este Corte?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteDataCut.mutateAsync(id);
            }
        });
    }

    if (queryDataCuts.isLoading) return <Bar />;

    const filteredDataCut = dataCuts?.filter(item =>
        `${item.name} `.toLocaleLowerCase().includes(searDataCuts.toLowerCase()))

    return (
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <span className="font-medium text-sm sm:text-base">IPS</span>
                    <ClientSelect
                        className="w-full sm:w-auto min-w-48"
                        selectedValue={selectedClient}
                        xChange={handleChangeClient}
                        isSearchable={true}
                    />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:justify-between items-start lg:items-center gap-4 mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold">Cortes trimestrales de auditoría</h1>

                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <div className="relative">
                        <div className="inline-flex w-full sm:w-auto">
                            <input type="text"
                                value={searDataCuts}
                                onChange={(e) => setSearDataCuts(e.target.value)}
                                placeholder="Buscar Trimestrales"
                                className="w-full sm:w-auto border rounded bg-white px-3 py-2 transition duration-200 border-gray-300 hover:border-indigo-500 
                                                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute right-2 top-3 text-gray-400" />
                        </div>
                    </div>
                    <button
                        onClick={handleCreateClick}
                        className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 py-2 rounded-lg font-semibold text-sm sm:text-base">
                        Crear Cortes
                    </button>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block">
                <div className="grid grid-cols-5">
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Nombre</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Max Historias</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Fecha Inicial</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Fecha Final</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Opciones</div>
                </div>
                <div className="bg-white px-2 py-2 border border-gray-200">
                    {filteredDataCut?.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 hover:bg-[#F4EDEE] transition-colors">
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{item.name}</div>
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{item.maxHistory}</div>
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{format(item.initialDate, 'dd/MM/yyyy')}</div>
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{format(item.finalDate, 'dd/MM/yyyy')}</div>
                            <div className="flex justify-center text-sm px-2 border border-gray-300 py-1">
                                <div onClick={() => handleUpdateClick(item)}>
                                    <ButtonUpdate />
                                </div>
                                <ButtonDelete id={item.id ?? 0} onDelete={handleDelete} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {filteredDataCut?.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="mb-4">
                            <h3 className="font-semibold text-lg text-gray-900 mb-2">{item.name}</h3>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Max Historias:</span>
                                <span className="text-sm font-semibold text-gray-900">{item.maxHistory}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Fecha Inicial:</span>
                                <span className="text-sm text-gray-900">{format(item.initialDate, 'dd/MM/yyyy')}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm font-medium text-gray-500">Fecha Final:</span>
                                <span className="text-sm text-gray-900">{format(item.finalDate, 'dd/MM/yyyy')}</span>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                            <div onClick={() => handleUpdateClick(item)}>
                                <ButtonUpdate />
                            </div>
                            <ButtonDelete id={item.id ?? 0} onDelete={handleDelete} />
                        </div>
                    </div>
                ))}
            </div>

            <OffCanvas
                titlePrincipal="Crear Cortes Trimestrales" visible={visibleCreate} xClose={() => setVisibleCreate(false)} position={Direction.Right}>
                <DataCutCreateForm idInstitution={selectedClient?.value ?? "0"} />
            </OffCanvas>
            <OffCanvas
                titlePrincipal="Actualizar Cortes" visible={visibleUpdate} xClose={() => { setVisibleUpdate(false); setSelectedDataCut(null); }} position={Direction.Right}>
                <DataCutUpdateForm dataCut={selectedDataCut} />
            </OffCanvas>
        </div>
    );
};
