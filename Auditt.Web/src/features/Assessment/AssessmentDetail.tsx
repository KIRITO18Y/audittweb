import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { AssessmentCreate } from "./AssessmentCreate"
import { ClientSelect } from "../Clients/ClientSelect"
export const AssessmentDetail = () => {

    return (
        <div className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 p-4 lg:justify-between">
                <Link to={'/Assessments'}
                    title='Volver' className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 border border-gray-400 hover:border-gray-600 px-4 py-2 rounded font-bold flex items-center transition-all w-fit">
                    <FontAwesomeIcon
                        icon={faArrowCircleLeft}
                        className="fa-search top-3 pr-2 font-bold"
                    />Volver
                </Link>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <span className="font-medium text-sm sm:text-base">IPS</span>
                    <ClientSelect className="w-full sm:w-auto min-w-48" isSearchable={true} />
                </div>

                <div className="flex items-center">
                    <Link to={'/Reports'} className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm sm:text-base text-center" >
                        Ir a Indicadores e informes</Link>
                </div>
            </div>
            <div className="bg-white  pb-24">
                <AssessmentCreate />
            </div>
        </div>
    )
}
