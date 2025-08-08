import { useEffect, useRef, useState } from "react";
import { ButtonPlus } from "../../../shared/components/Buttons/ButtonMas";
import { LinkSettings } from "../LinkSenttings";
import { useScales } from "./useScales";
import ButtonDelete from "../../../shared/components/Buttons/ButtonDelete";
import Swal from "sweetalert2";
import { Bar } from "../../../shared/components/Progress/Bar";
import { Equivalence } from "./Equivalence/Equivalence";
import OffCanvas from "../../../shared/components/OffCanvas/Index";
import { EquivalenceCreate } from "./Equivalence/EquivalenceCreate";
import { Direction } from "../../../shared/components/OffCanvas/Models";
import { ButtonPlays } from "../../../shared/components/Buttons/ButtonPlays";

export const Scales = () => {
    const { scales, createScale, queryScale, deleteScale } = useScales();
    const refForm = useRef<HTMLFormElement>(null);
    const [visible, setVisible] = useState(false);
    const [scaleId, setScaleId] = useState(0);
    const [openScale, setOpenScale] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (scales) {
            const allScaleId = new Set(scales.map(scale => scale.id ?? 0));
            setOpenScale(allScaleId);
        }
    }, [scales])

    const handleEdit = (id: number) => {
        setVisible(true);
        setScaleId(id);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name")?.toString().trim();

        if (!name) return;

        const response = await createScale.mutateAsync({ name });

        if (response.isSuccess) {
            refForm.current?.reset();
        }
    };

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar esta escala?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteScale.mutateAsync(id);
            }
        })
    }
    const toggleScale = (scaleId: number) => {
        setOpenScale(prev => {
            const newSet = new Set(prev);
            if (newSet.has(scaleId)) {
                newSet.delete(scaleId);
            } else {
                newSet.add(scaleId);
            }
            return newSet;
        })
    };

    if (queryScale.isLoading)
        return <Bar />

    return (
        <div className="p-4 md:p-6">
            {/* Header Navigation */}
            <div className="flex flex-wrap gap-2 text-base md:text-lg font-medium mb-4 md:mb-6">
                <LinkSettings />
            </div>

            {/* Create Scale Form */}
            <form onSubmit={handleSubmit} ref={refForm} className="mb-6">
                <div className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Crear la escala"
                        className="flex-1 shadow appearance-none bg-white border border-gray-300 rounded px-3 py-2 text-sm md:text-base transition duration-200 hover:border-indigo-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                        type="submit"
                        className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer text-sm md:text-base whitespace-nowrap">
                        Crear Escala
                    </button>
                </div>
            </form>

            {/* Scales Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {scales?.map((scale) => (
                    <div key={scale.id} className="w-full max-w-md p-4 border rounded-lg shadow bg-white">
                        {/* Scale Header */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center flex-1 min-w-0">
                                <ButtonPlays
                                    xClick={() => toggleScale(scale.id ?? 0)}
                                    isOpen={scale.id !== undefined && openScale.has(scale.id)}
                                />
                                <input
                                    value={scale.name}
                                    readOnly
                                    className="border rounded px-2 py-1 mx-2 flex-1 min-w-0 text-sm md:text-base bg-gray-50"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <div onClick={() => handleEdit(scale.id ?? 0)}>
                                    <ButtonPlus />
                                </div>
                                {typeof scale.id === 'number' && (
                                    <ButtonDelete id={scale.id} onDelete={handleDelete} />
                                )}
                            </div>
                        </div>

                        {/* Expandable Equivalence Section */}
                        {scale.id !== undefined && openScale.has(scale.id) && (
                            <div className="mt-4 border-t pt-4">
                                <Equivalence />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* OffCanvas Modal */}
            <OffCanvas titlePrincipal='Crear Equivalencia' visible={visible} xClose={handleClose} position={Direction.Right}>
                <EquivalenceCreate scaleId={scaleId} />
            </OffCanvas>
        </div>
    );
};
