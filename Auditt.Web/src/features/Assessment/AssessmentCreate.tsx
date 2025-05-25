
import { useEffect, useState } from "react";
import { Option } from "../../shared/model";
import { SingleValue } from "react-select";
import { DataCutSelect } from "../DataCuts/DataCutsSelect";
import { FunctionarySelect } from "../Clients/Professionals/FunctionarySelect";
import { GuideSelect } from "../Guide/GuideSelect";
import { useAssessmentByDocumentMutation, useAssessments, useSaveAssessment } from "./useAssessment";
import { usePatientByDocumentMutation } from "../Clients/Patients/UsePatients";
import { parseISO, differenceInYears, format } from "date-fns";
import { AssessmentDetailModel, AssessmentModel, AssessmentValuationsModel, ValuationModel } from "./AssessmentModel";
import { AssessmentValuations } from "./AssessmentValuations";
import useUserContext from "../../shared/context/useUserContext";
import { toast } from "react-toastify";
import useAssessmentContext from "../../shared/context/useAssessmentContext";

export const AssessmentCreate = () => {
    const { client, user } = useUserContext();
    const { selectedDataCut, selectedGuide } = useAssessmentContext();
    const { saveAssessment } = useSaveAssessment();
    const { createAssessment } = useAssessments();
    const { getPatientByDocumentMutation } = usePatientByDocumentMutation();
    const { getAssessmentByDocumentMutation } = useAssessmentByDocumentMutation();
    const [assessment, setAssessment] = useState<AssessmentDetailModel | undefined>(undefined);

    useEffect(() => {
        if (client?.id) {
            setAssessment(undefined);
        }
    }, [client?.id]);

    const selectedClient: Option | undefined = {
        value: client?.id?.toString(),
        label: client?.name,
    };



    const [selectedFunctionary, setSelectedFunctionary] = useState<Option | undefined>(() => ({
        value: "0",
        label: "Seleccione un corte",
    }));


    const handleChangeDataCut = () => {
        setAssessment(undefined);
    }

    const handleChangeFunctionary = (newValue: SingleValue<Option>) => {
        setSelectedFunctionary({
            value: newValue?.value,
            label: newValue?.label,
        });

        setAssessment(undefined);
    }

    const handleChangeGuide = () => {

        setAssessment(undefined);
    }

    const handlePatientFind = async (e: React.FormEvent<HTMLFormElement>) => {
        setAssessment(undefined);
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        if (selectedClient?.value === "0") {
            toast.warning("Seleccione un paciente");
            return;
        }

        if (selectedDataCut.toString() === "0") {
            toast.warning("Seleccione un corte");
            return;
        }

        if (selectedGuide.toString() === "0") {
            toast.warning("Seleccione una guía");
            return;
        }

        if (selectedFunctionary?.value === "0") {
            toast.warning("Seleccione un funcionario");
            return;
        }

        const formData = new FormData(form);
        const client = Object.fromEntries(formData.entries());
        const documentSearch = client["document"].toString();

        if (documentSearch === "") {
            toast.warning("Ingrese el número de identificación del paciente");
            return;
        }

        const patientRes = await getPatientByDocumentMutation.mutateAsync(documentSearch);

        if (patientRes.isSuccess) {
            const patient = patientRes?.data;
            const patientSearch: AssessmentModel = {
                identity: documentSearch,
                idDataCut: selectedDataCut,
                idFunctionary: Number(selectedFunctionary?.value),
                idPatient: Number(selectedClient?.value),
                idInstitution: Number(selectedClient?.value),
                idGuide: selectedGuide,
            };
            const assessment = await getAssessmentByDocumentMutation.mutateAsync(patientSearch);

            if (assessment.isSuccess) {
                setAssessment(assessment?.data);

            } else {

                const birthDate = parseISO(patient?.birthDate ?? new Date().toString()); // Año, mes (0-indexado), día
                const today = new Date();

                const age = differenceInYears(today, birthDate);

                const res = await createAssessment.mutateAsync({
                    idInstitution: Number(selectedClient?.value),
                    idDataCut: selectedDataCut,
                    idFunctionary: Number(selectedFunctionary?.value),
                    idPatient: patient?.id ?? 0,
                    date: new Date(new Date().setHours(0, 0, 0, 0)),
                    eps: patient?.eps ?? "",
                    idUser: 1,
                    idGuide: selectedGuide,
                    yearOld: age.toString(),
                });

                if (res.isSuccess) {
                    const assessment = await getAssessmentByDocumentMutation.mutateAsync(patientSearch);
                    if (assessment.isSuccess)
                        setAssessment(assessment?.data);

                }
            }
        }
    }

    const handleSave = async (values: ValuationModel[]) => {
        const assessmentUpdate: AssessmentValuationsModel = {
            id: assessment?.id ?? 0,
            idPatient: assessment?.idPatient ?? 0,
            yearOld: assessment?.yearOld ?? "",
            date: assessment?.date?.toString() ?? "",
            eps: assessment?.eps ?? "",
            valuations: values,
            idUser: user?.id ?? 0,
        };

        await saveAssessment.mutateAsync(assessmentUpdate);
    }

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (assessment) {
            setAssessment({ ...assessment, [e.target.name]: value });
        }
    }

    const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (assessment)
            setAssessment({ ...assessment, date: new Date(`${value}T00:00:00`).toISOString() });
    }

    return (
        <div className="w-full">

            <div className="flex py-2">
                <h1 className="text-2xl font-semibold mb-2">Medición de Adherencia</h1>

            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-1">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col space-x-4 mb-4">
                            <span className="font-medium">Corte de Auditoria</span>
                            <DataCutSelect className="w-full" xChange={handleChangeDataCut} isSearchable={true} />
                        </div>
                        <div className="flex flex-col space-x-4 mb-4">
                            <span className="font-medium">Instrumento de adherencia a GPC</span>
                            <GuideSelect className="w-full" xChange={handleChangeGuide} isSearchable={true} />

                        </div>
                    </div>

                    <div className="flex flex-col space-x-4 mb-4">
                        <span className="font-medium">Profesional evaluado</span>
                        <FunctionarySelect className="w-full" selectedValue={selectedFunctionary} xChange={handleChangeFunctionary} isSearchable={true} />
                    </div>

                </div>
                <div className=" bg-gray-200 rounded-2xl p-2">

                    <div className="flex flex-col space-y-4 p-1 bg-gray">
                        <div className="flex flex-col">
                            <label htmlFor="licenseInput" className="font-medium ">Id del Paciente</label>
                            <form onSubmit={handlePatientFind} className="flex">
                                <input
                                    id="licenseInput"
                                    type="text"
                                    name="document"
                                    placeholder="Ingrese el número de identificación del paciente"
                                    className="border border-gray-300 bg-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button
                                    className="bg-[#392F5A] hover:bg-purple-950 text-white px-6 py-2 rounded-r-lg font-semibold cursor-pointer"
                                    disabled={createAssessment.isPending}
                                >
                                    {createAssessment.isPending ? "Generando..." : "Diligenciar"}
                                </button>
                            </form>
                        </div>
                        <div className="flex">
                            <div>
                                <label htmlFor="licenseInput" className="font-medium mb-2">Edad</label>
                                <input
                                    type="text"
                                    disabled={!assessment?.yearOld}
                                    name="yearOld"
                                    onChange={handleChange}
                                    value={assessment?.yearOld}
                                    placeholder="Edad"
                                    className="border disabled:bg-gray-200  bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="licenseInput" className="font-medium mb-2">Fecha de Atención</label>
                                <input
                                    type="date"
                                    disabled={!assessment?.date}
                                    value={format(assessment?.date ?? new Date(), "yyyy-MM-dd")}
                                    name="date"
                                    onChange={handleChangeDate}
                                    placeholder="Fecha de Atención"
                                    className="border disabled:bg-gray-200 bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="licenseInput" className="font-medium mb-2">Eps</label>
                                <input
                                    type="text"
                                    disabled={!assessment?.eps}
                                    value={assessment?.eps}
                                    name="eps"
                                    onChange={handleChange}
                                    placeholder="Eps"
                                    className="border disabled:bg-gray-200  bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <AssessmentValuations xSave={handleSave} idScale={assessment?.idScale} idAssessment={assessment?.id} valuations={assessment?.valuations} />
        </div>
    )
}

