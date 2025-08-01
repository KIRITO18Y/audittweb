import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Questions } from "./Questions/Questions";

export const GuideDetail = () => {
    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                <Link to={'/guide'}
                    title='Volver' className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all w-fit">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver
                </Link>
                <h1 className="block text-xl sm:text-2xl font-semibold">Instrumento de Adherencia a GPC</h1>
            </div>
            <div className="w-full bg-white p-4 sm:p-6 rounded-lg mx-4">
                <Questions />
            </div>
        </div>
    )
};