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
        <div className="space-y-4">
            <div className="pl-8 space-y-1 text-sm font-bold">
                {equivalences?.length ? (
                    equivalences.map((equivalence) => (
                        <div key={equivalence.id} className="flex mb-3 items-center">
                            <label className="font-semibold mr-1">{equivalence.name}</label>
                            <span className="text-red-500 mr-2">Value: {equivalence.value}</span>
                            <ButtonDeletes id={equivalence.id} onDelete={handleDelete} />
                            <div onClick={() => handleOpenEdit(equivalence)}>
                                <ButtonDetails/>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400">No hay equivalencias disponibles.</p>
                )}
            </div>
            <OffCanvas
                titlePrincipal="Actualizar la Equivalencia"
                visible={visible}
                xClose={handleClose}
                position={Direction.Right}
            >
                {selectedEquivalence && <EquivalenceUpdate data={selectedEquivalence} />}
            </OffCanvas>
        </div>
    );
};
