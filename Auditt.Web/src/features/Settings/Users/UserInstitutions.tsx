import ButtonDelete from "../../../shared/components/Buttons/ButtonDelete";
import { Bar } from "../../../shared/components/Progress/Bar";
import useUserContext from "../../../shared/context/useUserContext";
import { ClientSelect } from "../../Clients/ClientSelect";
import { UsersResponseModel } from "./UsersModel";
import { useUserInstitutions } from "./useUser";

export const UserInstitutions = ({ user }: { user: UsersResponseModel | undefined }) => {
    const { client } = useUserContext();

    const { institutions, queryUserInstitutions, addUserInstitution, deleteUserInstitution } = useUserInstitutions(user?.id ?? 0);

    const handleAddInstitution = async () => {
        if (user?.id) {
            await addUserInstitution.mutateAsync({ idUser: user.id, idInstitution: client?.id ?? 0 });
        }
    };


    if (queryUserInstitutions.isLoading) {
        return <Bar Title="Cargando instituciones..." />;
    }


    return (
        <div className="">
            <div className="flex justify-between mb-4">
                <ClientSelect className="w-full" />
                <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600" onClick={handleAddInstitution}>
                    Agregar
                </button>
            </div>
            <h2 className="font-bold text-lg mb-2">Lista de Instituciones</h2>

            {(institutions === undefined || institutions.length === 0) &&
                <div>No hay instituciones disponibles</div>
            }

            <ul className="flex flex-col gap-2">
                {institutions && institutions.map((institution) => (
                    <li className="flex justify-between items-center border-1 border-gray-300 p-1 rounded-sm" key={institution.id}>{institution.name} <ButtonDelete onDelete={() => deleteUserInstitution.mutate({ idUser: user?.id ?? 0, idInstitution: institution.id })} id={0} /></li>
                ))}
            </ul>
        </div>
    );
}
