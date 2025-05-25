import { LinkSettings } from "../../Dashboard/LinkSenttings";
import { useRoles } from "./UseRoles";
import { useEffect, useRef, useState } from "react";
import { Bar } from "../../../shared/components/Progress/Bar";
import Swal from "sweetalert2";
import ButtonDelete from "../../../shared/components/Buttons/ButtonDelete";
import { ButtonPlus } from "../../../shared/components/Buttons/ButtonMas";
import OffCanvas from "../../../shared/components/OffCanvas/Index";
import { Direction } from "../../../shared/components/OffCanvas/Models";
import { Permission } from "./Permission/Permission";
import { PermissionCreate } from "./Permission/PermissionCreate";
import { ButtonPlays } from "../../../shared/components/Buttons/ButtonPlays";

export const Roles = () => {
    const { roles, createRole, queryRoles, deleteRole } = useRoles();
    const refForm = useRef<HTMLFormElement>(null);
    const [visible, setVisible] = useState(false);
    const [rolesId, setRolesId] = useState(0);
    const [openPermissionRoles, setOpenPermissionRoles] = useState<Set<number>>(new Set());

    useEffect(() => {
     if (roles) {
        const allRolesIds = new Set(roles.map(role => role.id ?? 0));
        setOpenPermissionRoles(allRolesIds)
     }  
    }, [roles]);

    const handleEdit = (id: number) => {
        setVisible(true);
        setRolesId(id);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name")?.toString().trim();
        if (!name) return;
        const response = await createRole.mutateAsync({
            name,
            description: "",
            permissions: [],
        });

        if (response.isSuccess) {
            refForm.current?.reset()
        }
    }

    function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number): void {
        e.preventDefault();
        Swal.fire({
            title: '¿Estás seguro de eliminar este roles?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            preConfirm: async () => {
                await deleteRole.mutateAsync(id);
            }
        })
    }

    const togglePermissions = (rolesId: number) => {
        setOpenPermissionRoles(prev => {
            const newSet = new Set(prev);
            if (newSet.has(rolesId)) {
                newSet.delete(rolesId);
            } else {
                newSet.add(rolesId);
            }
            return newSet;
        });
    };

    if (queryRoles.isLoading)
        return <Bar/>

    return (
        <div className="p-6">
            <div>
                <div className="flex space-x-8 text-lg font-medium mb-6 mr-2">
                    <LinkSettings />
                </div>
            </div>

            <form onSubmit={handleSubmit} ref={refForm} className="mb-4" >
                <input
                    type="text"
                    name="name"
                    placeholder="Crear roles"
                    className="shadow appearance-none border bg-white border-gray-300 rounded px-2 py-2 transition duration-200 hover:border-indigo-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 mr-2" />
                <button
                    type="submit"
                    className="bg-[#392F5A] hover:bg-indigo-900 text-white px-4 py-2 rounded-lg font-semibold cursor-pointer">
                    Crear Roles
                </button>
            </form>

            <div>
                <div>
                    {roles?.map((role) => (
                        <div key={role.id} className="w-96 p-4 mb-2 border rounded-lg shadow">
                            <div className="flex items-center mb-2 mr-2">
                                <div className="flex items-center ">
                                    <ButtonPlays
                                        xClick={() => togglePermissions(role.id ?? 0)}
                                        isOpen={role.id !== undefined && openPermissionRoles.has(role.id)}/>
                                    <input
                                        value={role.name}
                                        readOnly
                                        className="border rounded px-2 py-1 mr-2" />
                                </div>
                                
                                <div onClick={() => handleEdit(role.id ?? 0)}>
                                    <ButtonPlus/>
                                </div>
                                
                                <div>
                                    {role.id !== undefined && (
                                        <ButtonDelete id={role.id} onDelete={handleDelete} />
                                    )}
                                </div>
                            </div>
                            {role.id !== undefined && openPermissionRoles.has(role.id) && (
                                <div className="mb-4">
                                    <Permission/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <OffCanvas titlePrincipal='Crear Permisos' visible={visible} xClose={handleClose} position={Direction.Right}  >
                <PermissionCreate/>
            </OffCanvas>
        </div>
    );
}