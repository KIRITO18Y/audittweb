import { useState } from "react";
import OffCanvas from "../../shared/components/OffCanvas/Index";
import { Direction } from "../../shared/components/OffCanvas/Models";
import { GuidesCreate } from "./GuidesCreate";
import { useGuide } from "./useGuide";
import ButtonDelete from "../../shared/components/Buttons/ButtonDelete";
import Swal from "sweetalert2";
import { Bar } from "../../shared/components/Progress/Bar";
import { GuideModel } from "./GuideModel";
import { GuideUpdate } from "./GuideUpdate";
import { GuideImport } from "./GuideImport";
import { ButtonPlay } from "../../shared/components/Buttons/ButtonPlay";
import { ButtonUpdate } from "../../shared/components/Buttons/ButtonDetail";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Guide = () => {
    const [visible, setVisible] = useState(false);
    const [visibleUpdate, setUpdateVisible] = useState(false);
    const [visibleImport, setVisibleImport] = useState(false);
    const { guides, queryGuide, deleteGuide } = useGuide();
    const [guide, setGuide] = useState<GuideModel>();
    const [searGuide, setSearGuide] = useState('');

    const handleGuideDetail = (guideSelected: GuideModel) => {
        setGuide(guideSelected);
        setUpdateVisible(true);

    };

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar esta Guide?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteGuide.mutateAsync(id);
            }
        })
    }

    if (queryGuide.isLoading) return <Bar />

    const normalizeText = (text: string) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const search = normalizeText(searGuide.trim());
    const filterdGuide = guides?.filter(guide => {
        const fields = `${guide?.name}`;
        const words = normalizeText(fields).split(/\s+/);
        return words.some(word => word.startsWith(search));
    })

    return (
        <div className="p-6 w-full">
            <div>
                <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold mr-2 mb-5 ">Instrumentos o Guías</h2>
                    <div className="flex">
                        <div className="relative mr-4">
                            <div className=" inline-flex mr-2">
                                <input type="text"
                                    value={searGuide}
                                    onChange={(e) => setSearGuide(e.target.value)}
                                    placeholder="Buscar Guidas"
                                    className="border rounded bg-white px-3 py-1 transition duration-200 border-gray-300 hover:border-indigo-500 
                                 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"/>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="fas fa-search absolute right-2 top-2 mr-2 text-gray-400" />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button onClick={() => setVisible(true)} className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base">
                                Crear Instrumento
                            </button>
                            <button onClick={() => setVisibleImport(true)} className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base">
                                Importar Guías
                            </button>
                        </div>
                    </div>
                </div>

                {/* Desktop Table */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-4">
                        <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Nombre</div>
                        <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Descripción</div>
                        <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Preguntas</div>
                        <div className="font-semibold bg-gray-300 text-gray-800 px-2 py-1 text-center">Opciones</div>
                    </div>
                    <div className="bg-white px-2 py-2 border border-gray-200">
                        {filterdGuide?.map((guide) => (
                            <div className="grid grid-cols-4 hover:bg-[#F4EDEE] transition-colors" key={guide.id}>
                                <div className="text-sm px-2 py-2 border border-gray-300 text-center">{guide.name}</div>
                                <div className="text-sm px-2 py-2 border border-gray-300 text-center">{guide.description}</div>
                                <div className="text-sm px-2 py-2 border border-gray-300 text-center">{guide.questionsCount}</div>
                                <div className="flex justify-center text-sm px-2 border border-gray-300 py-1">
                                    <div onClick={() => handleGuideDetail(guide)}>
                                        <ButtonUpdate />
                                    </div>
                                    <div>
                                        <ButtonPlay url={"Questions"} />
                                    </div>
                                    <ButtonDelete id={guide.id ?? 0} onDelete={handleDelete} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4">
                    {filterdGuide?.map((guide) => (
                        <div key={guide.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-4">
                                <h3 className="font-semibold text-lg text-gray-900 mb-2">{guide.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-2">{guide.description}</p>
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-500">Preguntas:</span>
                                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                                        {guide.questionsCount}
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                                <div onClick={() => handleGuideDetail(guide)}>
                                    <ButtonUpdate />
                                </div>
                                <div>
                                    <ButtonPlay url={"Questions"} />
                                </div>
                                <ButtonDelete id={guide.id ?? 0} onDelete={handleDelete} />
                            </div>
                        </div>
                    ))}
                </div>

                <OffCanvas titlePrincipal="Crear Instrumentos" visible={visible} xClose={() => setVisible(false)} position={Direction.Right}>
                    <GuidesCreate />
                </OffCanvas>
                <OffCanvas titlePrincipal="Importar Guías y Preguntas" visible={visibleImport} xClose={() => setVisibleImport(false)} position={Direction.Right}>
                    <GuideImport />
                </OffCanvas>
                {guide && (
                    <OffCanvas titlePrincipal="Detalle Instrumentos" visible={visibleUpdate} xClose={() => setUpdateVisible(false)} position={Direction.Right}>
                        <GuideUpdate data={guide} />
                    </OffCanvas>
                )}
            </div>
        </div>
    );
};
