import { useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import ButtonDelete from "../../shared/components/Buttons/ButtonDelete";
import { Bar } from "../../shared/components/Progress/Bar";
import { MouseEvent } from "react";
import Swal from "sweetalert2";
import { ClientModel, ClientUpdateStatusModel } from "./ClientModel";
import { ClientCreate } from "./ClientCreate";
import { ClientUpdate } from "./ClientUpdate";
import { useClient } from "./useClient";
import { LinkClients } from "../Dashboard/LinkClients";
import { ButtonUpdate } from "../../shared/components/Buttons/ButtonDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useFileDownload } from "../../shared/components/FilesDowload";
import { ClientImport } from "./ClientImport";
import { useQueryClient } from "@tanstack/react-query";
import { MsgResponse } from "../../shared/model";
export const Clients = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleImport, setVisibleImport] = useState(false);
    const { clients, queryClients, deleteClient, updateStatus } = useClient();
    const [client, setClient] = useState<ClientModel>();
    const [searClients, setSearClients] = useState('');
    const { descargarArchivo } = useFileDownload();
    const queryClient = useQueryClient();

    const handleClickDetail = (clientSelected: ClientModel) => {
        if (clientSelected) {
            setClient(clientSelected);
            setVisibleUpdate(true);
        }
    }

    function handleDelete(e: MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este Cliente?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteClient.mutateAsync(id);
            }
        })
    }

    if (queryClients.isLoading)
        return <Bar />

    const normalizeText = (text: string) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const search = normalizeText(searClients.trim());

    const filteredClient = clients?.filter(client => {
        const fields = `${client.name} ${client.abbreviation} ${client.nit} ${client.city}`;
        const words = normalizeText(fields).split(/\s+/);
        return words.some(word => word.startsWith(search));
    });

    const handleDownloadTemplate = async () => {
        const urlBlob = `/api/institutions/template-import`;
        await descargarArchivo(urlBlob, "Plantilla_Importar_Clientes_" + new Date().toISOString().split('T')[0] + ".xlsx");
    }

    const handleUpdateStatus = async (id: number, status: boolean) => {
        const model: ClientUpdateStatusModel = {
            id: id,
            statusId: status ? 1 : 2
        };
        queryClient.setQueryData(['clients'], (oldData: MsgResponse<ClientModel[]>) => {

            const updateClient = oldData?.data?.map((client: ClientModel) => {
                if (client.id === id) {
                    return { ...client, idState: model.statusId };
                }
                return client;
            });
            const updatedData: MsgResponse<ClientModel[]> = {
                ...oldData,
                data: updateClient
            };

            return updatedData;
        });
        await updateStatus.mutateAsync(model);
    }

    return (
        <div className="p-6 w-full">
            <div>
                <div className="flex space-x-8 text-lg font-medium mb-4 mr-2">
                    <LinkClients />
                </div>

                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mb-3 mr-2">Clientes o Instituciones</h2>
                    <div className="flex">
                        <div className="relative mr-4">
                            <div className="inline-flex">
                                <input type="text"
                                    value={searClients}
                                    onChange={(e) => setSearClients(e.target.value)}
                                    placeholder="Buscar Cliente"
                                    className="border rounded bg-white px-3 py-1 transition duration-200 border-gray-300 hover:border-indigo-500 
                                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute right-2 top-2 text-gray-400" />
                            </div>
                        </div>
                        <button onClick={() => setVisible(true)} className=" cursor-pointer bg-[#392f5a] cursor-por hover:bg-indigo-900 text-white px-5 rounded-lg font-semibold mb-3 mr-2">
                            Crear Cliente
                        </button>
                        <button onClick={() => setVisibleImport(true)} className=" cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg font-semibold mb-3 mr-2">
                            Importar
                        </button>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-5">
                        <div className=" font-semibold bg-gray-300  text-gray-800 px-2 py-1 text-center">Razón Social</div>
                        <div className=" font-semibold bg-gray-300  text-gray-800 px-2 py-1 text-center">Abreviatura</div>
                        <div className=" font-semibold bg-gray-300  text-gray-800 px-2 py-1 text-center">NIT</div>
                        <div className=" font-semibold bg-gray-300  text-gray-800 px-2 py-1 text-center">Ciudad</div>
                        <div className=" font-semibold bg-gray-300  text-gray-800 px-2 py-1 text-center">Opciones</div>
                    </div>
                    <div className=" bg-white px-2 py-2 border border-gray-200">
                        {filteredClient?.map((client) => (
                            <div key={client.id} className="grid grid-cols-5 hover:bg-[#F4EDEE] transition-colors">
                                <div className="text-sm px-2 py-2 border border-gray-300 text-center">{client.name}</div>
                                <div className=" text-sm px-2 py-2 border border-gray-300 text-center">{client.abbreviation}</div>
                                <div className=" text-sm px-2 py-2 border border-gray-300 text-center">{client.nit}</div>
                                <div className=" text-sm px-2 py-2 border border-gray-300 text-center">{client.city} - {client.id}</div>
                                <div className="flex justify-center text-sm px-2  border border-gray-300 py-1 ">
                                    <label className="inline-flex items-center cursor-pointer pr-2">
                                        <input id="statudId" type="checkbox" checked={client.idState === 1} className="sr-only peer" onChange={e => handleUpdateStatus(client.id ?? 0, e.target.checked)} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                                    </label>

                                    <div onClick={() => handleClickDetail(client)}>
                                        <ButtonUpdate />
                                    </div>
                                    <ButtonDelete id={client.id ?? 0} onDelete={handleDelete} />



                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <OffCanvas titlePrincipal='Crear Cliente' visible={visible} xClose={() => setVisible(false)} position={Direction.Right}>
                    <ClientCreate />
                </OffCanvas>
                {
                    client &&
                    <OffCanvas titlePrincipal='Actualizar Cliente' visible={visibleUpdate} xClose={() => setVisibleUpdate(false)} position={Direction.Right}>
                        <ClientUpdate data={client} />
                    </OffCanvas>
                }
                <OffCanvas titlePrincipal='Importar Cliente' visible={visibleImport} xClose={() => setVisibleImport(false)} position={Direction.Right}>
                    <div>
                        <p className="mb-4">Aquí puedes importar clientes desde un archivo Excel, a continuación descarga la plantilla.</p>
                        <button onClick={handleDownloadTemplate} className="mb-6 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 rounded-lg font-semibold mr-2">
                            Descargar Plantilla
                        </button>
                        <h3 className="text-xl font-semibold mb-2">Importar datos</h3>
                        {/* Aquí puedes agregar el formulario o componente para la importación */}
                        <ClientImport />
                    </div>
                </OffCanvas>

            </div>
        </div>
    );
}