export interface UsersModel {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	securePharse?: string;
}

export interface UserUpdateInstitution {
	idUser: number;
	idInstitution: number;
}

export interface UsersResponseModel {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password?: string;
	securePharse?: string;
	idRol: number;
	roleName: string;
	idEstado: number;
	idAvatar?: number;
	urlProfile?: string;
}

export interface UsersAvatarModel {
	id: number | undefined;
	idAvatar: number;
}

export interface UsersProfileModel {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
}

export interface UsersUpdatePasswordModel {
	id: number;
	email: string;
	password: string;
}

export interface passwordRecoverModel {
	id?: number;
	email: string;
	securePharse: string;
}
