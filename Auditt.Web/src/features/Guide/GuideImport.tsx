import { useState } from "react";
import { useGuide } from "./useGuide";
import { toast } from "react-toastify";

export const GuideImport = () => {
    const [file, setFile] = useState<File | null>(null);
    const { importGuide, queryGuide, downloadTemplate } = useGuide();

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

        await importGuide.mutateAsync(file);
        queryGuide.refetch();
    };

    const handleDownloadTemplate = async () => {
        await downloadTemplate.mutateAsync();
    };

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Importar Guías y Preguntas</h3>
                <p className="text-gray-600 mb-4">
                    Descarga la plantilla, complétala con los datos de las guías y sus preguntas, luego súbela para importar.
                </p>
            </div>

            <div className="flex gap-4 items-center">
                <button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700"
                    onClick={handleDownloadTemplate}
                    disabled={downloadTemplate.isPending}
                >
                    {downloadTemplate.isPending ? 'Descargando...' : 'Descargar Plantilla'}
                </button>
            </div>

            <div className="border-t pt-4">
                <div className="space-y-4">
                    <input
                        type="file"
                        accept=".xlsx, .xls"
                        className="mb-4 border-2 bg-gray-100 border-gray-300 rounded p-2 w-full"
                        onChange={handleChangeFile}
                    />
                    <button
                        type="button"
                        className="bg-audittpurple text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700"
                        onClick={handleImport}
                        disabled={importGuide.isPending || !file}
                    >
                        {importGuide.isPending ? 'Importando...' : 'Importar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
