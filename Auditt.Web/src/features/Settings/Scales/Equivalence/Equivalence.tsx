import { useState } from "react";
import { useEquivalence } from "./useEquivalence";
import ButtonDeletes from "../../../../shared/components/Buttons/ButtonDeletes";
import OffCanvas from "../../../../shared/components/OffCanvas/Index";
import { Direction } from "../../../../shared/components/OffCanvas/Models";
import { EquivalenceUpdate } from "./EquivalenceUpdate";
import ButtonDetails from "../../../../shared/components/Buttons/ButtonUpdates";
import Swal from "sweetalert2";
import { EquivalenceModel } from "./EquivalenceModel";

export const Equivalence = () => {
    const { equivalences, deleteEqvalence } = useEquivalence() ?? {};
    const [visible, setVisible] = useState(false);
    const [selectedEquivalence, setSelectedEquivalence] = useState<EquivalenceModel | null>(null);

    const handleClose = () => {
        setVisible(false);
        setSelectedEquivalence(null);
    };

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar esta Equivalencia?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteEqvalence.mutateAsync(id);
            }
        });
    }

    const handleOpenEdit = (equivalence: EquivalenceModel) => {
        setSelectedEquivalence(equivalence);
        setVisible(true);
    };

    return (
        <div className="space-y-3">
            <div className="space-y-2">
                {equivalences?.length ? (
                    equivalences.map((equivalence) => (
                        <div key={equivalence.id} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-gray-50 rounded-lg border">
                            {/* Mobile Layout */}
                            <div className="sm:hidden">
                                <div className="flex flex-col space-y-1">
                                    <div className="font-semibold text-sm">{equivalence.name}</div>
                                    <div className="text-red-500 text-sm">Value: {equivalence.value}</div>
                                    <div className="flex gap-2 mt-2">
                                        <ButtonDeletes id={equivalence.id} onDelete={handleDelete} />
                                        <div onClick={() => handleOpenEdit(equivalence)}>
                                            <ButtonDetails />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Layout */}
                            <div className="hidden sm:flex sm:items-center sm:w-full">
                                <label className="font-semibold mr-3 flex-shrink-0 text-sm">{equivalence.name}</label>
                                <span className="text-red-500 mr-3 flex-shrink-0 text-sm">Value: {equivalence.value}</span>
                                <div className="flex gap-1 ml-auto">
                                    <ButtonDeletes id={equivalence.id} onDelete={handleDelete} />
                                    <div onClick={() => handleOpenEdit(equivalence)}>
                                        <ButtonDetails />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center py-4 text-sm">No hay equivalencias disponibles.</p>
                )}
            </div>

            {selectedEquivalence && (
                <OffCanvas
                    titlePrincipal="Actualizar la Equivalencia"
                    visible={visible}
                    xClose={handleClose}
                    position={Direction.Right}
                >
                    <EquivalenceUpdate data={selectedEquivalence} />
                </OffCanvas>
            )}
        </div>
    );
};
