import React from "react"
import { ReportModel } from "../ReportModel"

export const ReportList = ({ listReports, idSelected, setSelected }: { listReports: ReportModel[], idSelected: number, setSelected: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="w-full">
            <div className="py-2">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4">Lista de Reportes</h1>
                <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 min-w-fit">
                        {listReports.map((report) => (
                            <div
                                onClick={() => setSelected(report.idReport)}
                                key={report.idReport}
                                className={`
                                    flex flex-col border-audittpinkgray border-2 p-4 rounded-2xl transition-colors cursor-pointer min-w-48
                                    ${report.idReport === idSelected
                                        ? "bg-pink-50 shadow-md"
                                        : "hover:bg-pink-50 hover:shadow-sm"
                                    }
                                `}
                            >
                                <span className="font-semibold text-sm sm:text-base mb-2">{report.name}</span>
                                <span className="text-xs sm:text-sm text-gray-600 line-clamp-3">{report.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};