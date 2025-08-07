import { useEffect, useState } from "react";
import { EquivalenceSelect } from "../Settings/Scales/Equivalence/EquivalenceSelect"
import { ValuationModel } from "./AssessmentModel"
import { useAssessments } from "./useAssessment";
import Swal from "sweetalert2";
import { Checkbox } from "../../shared/components/Forms/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { EmptyData } from "../../shared/components/Navigation/EmptyData";

export const AssessmentValuations = ({ valuations, idScale, idAssessment, xSave }:
    {
        valuations: ValuationModel[] | undefined,
        idScale: number | undefined,
        idAssessment?: number,
        xSave?: (valuation: ValuationModel[]) => void
    }) => {

    const [values, setValues] = useState<ValuationModel[]>([]);
    const { deleteAssessment } = useAssessments();
    const [equivalenceValue, setEquivalenceValue] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (!valuations) {
            return;
        }
        setValues(valuations ?? []);
    }, [valuations]);

    if (!valuations) {
        return <EmptyData message="No hay evaluaciones disponibles, intente diligenciar un nuevo paciente" theme="empty" />;
    }

    const handleChange = (newValue: HTMLSelectElement, valuation: ValuationModel) => {
        const newValueNumber = values.map((x) => {
            if (x.id === valuation.id) {
                x.idEquivalence = Number(newValue.value);
                return x;
            }
            return x;
        })

        setValues(newValueNumber);
    }

    const handleSave = () => {
        if (xSave)
            xSave(values);
    }

    const handleAssign = () => {
        const updatedValues = values.map((v) => {
            if (v.isSelected) {
                v.idEquivalence = equivalenceValue ?? 0;
                v.isSelected = false;
                return v;
            }
            return v;
        });
        setValues(updatedValues);
        if (xSave)
            xSave(updatedValues);
    }

    const handleCheck = (checked: boolean, valuation: ValuationModel) => {
        const newValueNumber = values.map((x) => {
            if (x.id === valuation.id) {
                x.isSelected = checked;
            }
            return x;
        });

        setValues(newValueNumber);
    }

    function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar esta evaluación?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                const res = await deleteAssessment.mutateAsync(id);
                if (res.isSuccess) {
                    setValues([]);
                }
            }
        })
    }

    return (
        <div>
            <div className="bg-white font-semibold mb-4 flex gap-4">
                <Checkbox
                    text="Seleccionar todo"
                    checked={values.every(v => v.isSelected)}
                    onChange={(checked) => {
                        const updatedValues = values.map(v => ({ ...v, isSelected: checked }));
                        setValues(updatedValues);
                    }}
                    name="select-all"
                    className="pl-2"
                />

            </div>
            <div className="font-semibold mb-4 flex gap-4 bg-gray-50 p-4 rounded-lg fixed z-10 bottom-4 border border-gray-200 ml-4 shadow-md">
                <button
                    className="bg-[#392F5A] border-2 transition-all hover:bg-purple-950 text-white  px-6 py-2 rounded-lg font-semibold cursor-pointer"
                    onClick={handleSave}
                >
                    <FontAwesomeIcon icon={faSave} className=" text-white" />
                </button>
                <button
                    className="border-[#FF677D] border-2 hover:bg-[#ff677e88] transition-all text-[#921729c4]  px-6 py-2 rounded-lg font-semibold cursor-pointer"
                    onClick={(e) => handleDelete(e, idAssessment ?? 0)}
                >
                    <FontAwesomeIcon icon={faTrash} className=" text-red-900" />
                </button>

                <div className="inline-flex space-x-2 rounded-lg overflow-hidden border border-gray-300 bg-white">
                    <button
                        className="px-4 py-2 font-semibold text-sm sm:text-base text-white bg-[#392F5A] hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        onClick={handleAssign}
                    >
                        Asignar
                    </button>
                    <EquivalenceSelect
                        idScale={idScale ?? 1}
                        selectedValue={equivalenceValue?.toString() ?? "1"}
                        name="valorationLst"
                        xChange={(x) => {
                            setEquivalenceValue(Number(x.value));
                        }}
                        isDisabled={false}
                        className="px-4 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                {values.map((valuation) => (
                    <div key={valuation.id} className="w-full text-sm bg-green-100 border-2 border-green-200 rounded-2xl p-2 flex gap-1 justify-between items-center">
                        <Checkbox text={valuation.text} checked={valuation.isSelected} onChange={(checked) => handleCheck(checked, valuation)} name={`valuation-${valuation.id}`} />
                        <EquivalenceSelect idScale={idScale ?? 1} xChange={(x) => handleChange(x, valuation)} selectedValue={valuation.idEquivalence.toString()} name="idValoration" isDisabled={false} />
                    </div>
                ))}
            </div>
        </div>
    )
}