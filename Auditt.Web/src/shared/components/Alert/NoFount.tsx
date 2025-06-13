export const NoFound = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold">No se encontraron resultados</h2>
            <p className="text-gray-500">Intenta ajustar tus filtros o buscar de nuevo.</p>
        </div>
    );
};
export default NoFound;