import { useState } from "react";
import { toast } from "react-toastify";
import { usePatients } from "./UsePatients";

export const PatientsImport = () => {
    const [file, setFile] = useState<File | null>(null);
    const { importPatients, queryPatients } = usePatients();
    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            toast.info("Por favor, selecciona un archivo.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5 MB
            toast.info("El archivo no puede ser mayor a 5 MB.");
            return;
        }
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            toast.info("El archivo debe ser un archivo de Excel (.xlsx o .xls).");
            return;
        }
        if (!file.type.includes("sheet") && !file.type.includes("excel")) {
            toast.info("El archivo debe ser un archivo de Excel válido.");
            return;
        }
        if (file) {
            setFile(file);
        }
    }

    const handleImport = async () => {
        if (!file) {
            toast.info("Por favor, selecciona un archivo para importar.");
            return;
        }

        await importPatients.mutateAsync(file);
        queryPatients.refetch();

    };
    return (
        <div>
            <input
                type="file"
                accept=".xlsx, .xls"
                className="mb-4 border-2 bg-gray-100 border-gray-300 rounded p-2"
                onChange={handleChangeFile}
            />
            <button type="button" className="bg-audittpurple text-white px-4 py-2 rounded cursor-pointer" onClick={handleImport}>{importPatients.isPending ? 'Importando...' : 'Importar'}</button>
        </div>
    );
}