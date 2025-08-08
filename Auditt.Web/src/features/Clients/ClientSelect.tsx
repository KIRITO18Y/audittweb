import Select, { SingleValue } from "react-select";
import { useClient } from "./useClient";
import useUserContext from "../../shared/context/useUserContext";
import { useEffect, useState } from "react";

export interface Option {
    value?: string;
    label?: string;
}

export const ClientSelect = ({ name, className, xChange, xEmpty, required, isSearchable, isDisabled }: { selectedValue?: Option, name?: string, className?: string, xChange?: (newValue: SingleValue<Option>) => void, xEmpty?: () => void, required?: boolean, isSearchable?: boolean, isDisabled?: boolean }) => {
    const { queryClients, clients } = useClient();
    const { client, setClient } = useUserContext();
    const [selectedClient, setSelectedClient] = useState<Option | undefined>(() => ({
        value: client?.id?.toString(),
        label: client ? (isSearchable ? `${client.name} - ${client.nit}` : (client.name + ' ' + client.nit)) : 'Seleccione un cliente',
    }));

    useEffect(() => {
        if (!client && clients) {
            setClient(clients[0]);
            setSelectedClient({
                value: clients[0]?.id?.toString(),
                label: isSearchable ? `${clients[0].name} - ${clients[0].nit}` : (clients[0].name + ' ' + clients[0].nit),
            });
        }



    }, [client, setClient, clients, selectedClient, isSearchable]);

    useEffect(() => {
        if (!queryClients.isLoading) {
            if (!clients || clients.length === 0) {
                if (xEmpty) {
                    xEmpty();
                }
            }
        }
    }, [queryClients, clients, xEmpty]);

    const options: readonly Option[] | undefined = clients?.map((item) => ({
        value: item?.id?.toString(),
        label: isSearchable ? `${item.name} - ${item.nit} ` : (item.name + ' ' + item.nit),
    }));

    const handleChangeClient = (newValue: SingleValue<Option>) => {
        const newClient = clients?.find(x => x.id === Number(newValue?.value));
        setClient(newClient ?? null);

        if (xChange) {
            xChange(newValue);
        }
    }

    return (
        <Select
            name={name || 'idClient'}
            className={className}
            defaultValue={selectedClient}
            onChange={handleChangeClient}
            required={required}
            loadingMessage={() => 'Cargando...'}
            isDisabled={queryClients?.isLoading || isDisabled}
            isLoading={queryClients?.isLoading}
            isClearable={false}
            options={options}
        />
    )
}