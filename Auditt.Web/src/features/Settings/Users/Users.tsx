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
        <div className="p-4 sm:p-6">
            <div className="mb-6">
                <LinkSettings />
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-1 gap-4">
                {users?.map((user) => (
                    <div
                        key={user.id}
                        className="flex items-center justify-between text-center space-x-6 border border-gray-400 p-4 rounded-xl shadow-md xl:w-7/12 hover:bg-gray-50 transition-colors cursor-pointer">
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

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {users?.map((user) => (
                    <div key={user.id} className="bg-white border border-gray-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                        <div className="flex items-start space-x-4 mb-4">
                            <img
                                src={user.urlProfile}
                                alt="avatar"
                                className="w-16 h-16 rounded-full flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 uppercase text-sm truncate">
                                    {user.firstName} {user.lastName}
                                </h3>
                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-sm font-bold uppercase ${user.roleName === "ADMIN" ? "text-audittprimary" : "text-audittpurple"}`}>
                                        {user.roleName}
                                    </span>
                                    <span className="text-sm font-semibold text-lime-600">
                                        <UserStatusLabel idEstado={Number(user.idEstado)} />
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
                            {user.roleName !== "ADMIN" && (
                                <button 
                                    className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-300 text-blue-900 hover:bg-blue-50 transition-colors"
                                    onClick={() => handleVisibleInstitutions(user)}
                                >
                                    <FontAwesomeIcon icon={faBars} className="text-blue-400" />
                                </button>
                            )}

                            <button 
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-green-200 text-green-600 hover:bg-green-300 transition-colors"
                                onClick={() => handleClickDetail(user)}
                            >
                                <FontAwesomeIcon icon={faPen} />
                            </button>
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