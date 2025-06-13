import { useState } from "react";
import OffCanvas from "../../../shared/components/OffCanvas/Index";
import { LinkSettings } from "../../Dashboard/LinkSenttings";
import { Direction } from "../../../shared/components/OffCanvas/Models";
import { useUser } from "./useUser";
import { UserUpdate } from "./UserUpdate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPen } from "@fortawesome/free-solid-svg-icons";
import { UsersResponseModel } from "./UsersModel";
import { UserStatusLabel } from "./UsersEstado";
import { UserInstitutions } from "./UserInstitutions";

export const Users = () => {
    const { users } = useUser();
    const [user, setUser] = useState<UsersResponseModel>();
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [visibleInstitutions, setVisibleInstitutions] = useState(false);


    const handleClickDetail = (userSelected: UsersResponseModel) => {
        if (userSelected) {
            setUser(userSelected);
            setVisibleUpdate(true)
        }
    }

    const handleVisibleInstitutions = (userSelected: UsersResponseModel) => {
        if (!userSelected) return;
        setUser(userSelected);
        setVisibleInstitutions(true);
    }

    return (
        <div className="p-6">
            <div className="flex space-x-8 text-lg font-medium mb-6 mr-2">
                <LinkSettings />
            </div>
            <div className="grid grid-cols-1 gap-4">
                {users?.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between text-center space-x-6 border border-gray-400 p-4 rounded-xl shadow-md w-1/2 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div>
                            <img
                                src={user.urlProfile}
                                alt="logo"
                                className="min-w-16 rounded-full w-20 h-20" />
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-gray-900 uppercase">
                                {user.firstName} {user.lastName}
                            </span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                        <div className="font-bold text-sm text-indigo-900 uppercase">
                            <span className={user.roleName === "ADMIN" ? "text-audittprimary" : "text-audittpurple"}>{user.roleName}</span>
                            <div className="flex items-center space-x-1">
                                <span className="text-sm font-semibold text-lime-600">
                                    <UserStatusLabel idEstado={Number(user.idEstado)} />
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 w-20">
                            {user.roleName !== "ADMIN" && (
                                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-blue-300 text-blue-900 cursor-pointer" onClick={() => handleVisibleInstitutions(user)}>
                                    <FontAwesomeIcon icon={faBars} className="text-blue-400" />
                                </div>
                            )}

                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-200 text-green-600 cursor-pointer" onClick={() => handleClickDetail(user)} >
                                <FontAwesomeIcon icon={faPen} className="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {user && (
                <OffCanvas titlePrincipal='Actualizar Usuario' visible={visibleUpdate} xClose={() => setVisibleUpdate(false)} position={Direction.Right}>
                    <UserUpdate data={user} />
                </OffCanvas>
            )}

            <OffCanvas titlePrincipal="Instituciones" visible={visibleInstitutions} xClose={() => setVisibleInstitutions(false)} position={Direction.Right}>
                <UserInstitutions user={user} />
            </OffCanvas>
        </div>
    );
}