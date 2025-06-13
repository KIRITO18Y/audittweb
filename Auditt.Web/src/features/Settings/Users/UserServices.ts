import { ApiClient } from "../../../shared/helpers/ApiClient";
import { MsgResponse } from "../../../shared/model";
import {
	UserInstitution,
	UsersResponseModel,
	UserUpdateInstitution,
} from "./UsersModel";

export const getUser = async (): Promise<MsgResponse<UsersResponseModel[]>> => {
	const url = `api/users`;
	const response = await ApiClient.get<MsgResponse<UsersResponseModel[]>>(url);
	if (response.status !== 200) {
		return {
			isSuccess: false,
			message: "Error al obtener los usuario",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};

export const getUserInstitutions = async (
	id: number
): Promise<MsgResponse<UserInstitution[]>> => {
	const url = `api/users/${id}/institutions`;
	const response = await ApiClient.get<MsgResponse<UserInstitution[]>>(url);
	if (response.status !== 200) {
		return {
			isSuccess: false,
			message: "Error al obtener los usuarios de la institución",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}
	return response.data;
};

export const deleteUserInstitutionServices = async (
	model: UserUpdateInstitution
): Promise<MsgResponse<UsersResponseModel>> => {
	const url = `api/users/${model.idUser}/institutions/${model.idInstitution}`;
	const response = await ApiClient.delete<MsgResponse<UsersResponseModel>>(url);
	if (response.status !== 200) {
		return {
			isSuccess: false,
			message: "Error al eliminar el usuario de la institución",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}
	return response.data;
};

export const addUserInstitutionServices = async (
	model: UserUpdateInstitution
): Promise<MsgResponse<UsersResponseModel>> => {
	const url = `api/users/institutions`;
	const response = await ApiClient.post<MsgResponse<UsersResponseModel>>(
		url,
		model
	);
	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al agregar el usuario a la institución",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}
	return response.data;
};

export const createUsertServices = async (
	model: UsersResponseModel
): Promise<MsgResponse<UsersResponseModel>> => {
	const url = "api/users";
	const response = await ApiClient.post<MsgResponse<UsersResponseModel>>(
		url,
		model
	);

	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al crear el usuario",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}
	return response.data;
};

export const updateUserServices = async (
	model: UsersResponseModel
): Promise<MsgResponse<UsersResponseModel>> => {
	const url = "api/users";
	const response = await ApiClient.put<MsgResponse<UsersResponseModel>>(
		url,
		model
	);

	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al actualizar el usuario",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}
	return response.data;
};
