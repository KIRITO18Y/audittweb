import { useEffect, useRef, useState } from "react";
import { useClient } from "../Clients/useClient";
import { ClientModel } from "./ClientModel";

export const ClientUpdate = ({ data }: { data: ClientModel }) => {
    const { updateClient } = useClient();
    const [client, setClient] = useState<ClientModel>(data);
    const refForm = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (data) {
            setClient(data);
        }
    }, [data, setClient])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await updateClient.mutateAsync(client);

        if (response.isSuccess) {
            refForm.current?.reset();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <form ref={refForm} className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium mb-1">Gerente</label>
                    <input 
                    type="text" 
                    name="manager" 
                    value={client.manager} 
                    required 
                    className="w-full border border-gray-300 rounded px-3 py-2 transition duration-200 hover:border-indigo-500
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">SubGerente</label>
                    <input 
                    type="text" 
                    name="assistantManager" 
                    value={client.assistantManager} 
                    required 
                    className="w-full border border-gray-300 rounded px-3 py-2 transition duration-200 hover:border-indigo-500
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    onChange={handleChange} />
                </div>
        
                <div>
                    <label className="block text-sm font-medium mb-1">Razón Social</label>
                    <input 
                    type="text" 
                    name="name" 
                    value={client.name} 
                    required 
                    className="w-full border border-gray-300 rounded px-3 py-2 transition duration-200 hover:border-indigo-500
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Abreviatura</label>
                    <input 
                    type="text" 
                    name="abbreviation" 
                    value={client.abbreviation} 
                    required 
                    className="w-full border border-gray-300 rounded px-3 py-2 transition duration-200 hover:border-indigo-500
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    onChange={handleChange} />
                </div>

                <div>

                    <label className="block text-sm font-medium mb-1">NIT</label>
                    <input 
                    type="text" 
                    name="nit" 
                    required 
                    value={client.nit} 
                    className="w-full border border-gray-300 rounded px-3 py-2 transition duration-200 hover:border-indigo-500
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400" 
                    onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Ciudad</label>
                    <input 
                    type="text" 
                    name="city" 
                    value={client.city} 
                    className="w-full border border-gray-300 rounded px-3 py-2 transition duration-200 hover:border-indigo-500
                         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onChange={handleChange} />
                </div>

                <div>
                    <button type="submit" className="cursor-pointer  bg-[#392F5A] hover:bg-indigo-900 text-white px-8 py-2 rounded-lg font-semibold">
                        {updateClient.isPending ? "Actualizando..." : "Actualizar"}
                    </button>
                </div>
            </form>
        </div>
    );
}