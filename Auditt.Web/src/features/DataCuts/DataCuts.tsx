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
        <div className="flex-1 p-8">
            <div>
                <div className="flex items-center space-x-4 mb-4">
                    <span className="font-medium">IPS</span>
                    <ClientSelect
                        className="w-lg"
                        selectedValue={selectedClient}
                        xChange={handleChangeClient}
                        isSearchable={true}
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <h1 className="text-2xl mr-2 font-semibold mb-3">Cortes trimestrales de auditoría</h1>

                <div className="flex">
                    <div className="relative mr-2"  >
                        <div className=" inline-flex mb-5">
                            <input type="text"
                                value={searDataCuts}
                                onChange={(e) => setSearDataCuts(e.target.value)}
                                placeholder="Buscar Trimestrales"
                                className="border rounded bg-white px-3 py-1 transition duration-200 border-gray-300 hover:border-indigo-500 
                                                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute right-2 top-2 text-gray-400" />
                        </div>
                    </div>
                    <button
                        onClick={handleCreateClick}
                        className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 py-1 rounded-lg font-semibold mb-5 mr-2">
                        Crear Cortes
                    </button>
                </div>
            </div>
            <div>
                <div className="grid grid-cols-5">
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Nombre</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Max Historias</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Fecha Inicial</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Fecha Final</div>
                    <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center"></div>
                </div>
                <div className="bg-white px-2 py-2 border border-gray-200">
                    {filteredDataCut?.map((item) => (
                        <div key={item.id} className="grid grid-cols-5 hover:bg-[#F4EDEE] transition-colors">
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{item.name}</div>
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{item.maxHistory}</div>
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{item.initialDate.toString()}</div>
                            <div className="text-sm px-2 py-2 border border-gray-300 text-center">{item.finalDate.toString()}</div>
                            <div className="flex justify-center text-sm px-2 border border-gray-300 py-1">
                                <div onClick={() => handleUpdateClick(item)}>
                                    <ButtonUpdate/>
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
                {selectedDataCut && (
                    <OffCanvas
                        titlePrincipal="Actualizar Cortes" visible={visibleUpdate} xClose={() => { setVisibleUpdate(false); setSelectedDataCut(null); }} position={Direction.Right}>
                        <DataCutUpdateForm dataCut={selectedDataCut} />
                    </OffCanvas>
                )}
            </div>
        </div>
    );
};
