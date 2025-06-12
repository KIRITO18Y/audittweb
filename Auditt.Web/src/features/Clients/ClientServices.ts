import { ApiClient } from "../../shared/helpers/ApiClient";
import { MsgResponse } from "../../shared/model";
import { ClientModel, ClientUpdateStatusModel } from "./ClientModel";
export const getClients = async (): Promise<MsgResponse<ClientModel[]>> => {
	const url = `api/institutions`;
	const response = await ApiClient.get<MsgResponse<ClientModel[]>>(url);
	if (response.status !== 200) {
		return {
			isSuccess: false,
			message: "Error al obtener la organización",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};

export const createClientServices = async (
	model: ClientModel
): Promise<MsgResponse<ClientModel>> => {
	const url = "api/institutions";
	const response = await ApiClient.post<MsgResponse<ClientModel>>(url, model);

	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al crear el cliente",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};

export const updateClientServices = async (
	model: ClientModel
): Promise<MsgResponse<ClientModel>> => {
	const url = "api/institutions";
	const response = await ApiClient.put<MsgResponse<ClientModel>>(url, model);

	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al actualizar el cliente",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};

export const updateStatusClientServices = async (
	model: ClientUpdateStatusModel
): Promise<MsgResponse<ClientModel>> => {
	const url = `api/institutions/${model.id}/status`;
	const response = await ApiClient.put<MsgResponse<ClientModel>>(url, model);

	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al actualizar el estado del cliente",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};

export const deleteClientServices = async (
	id: number
): Promise<MsgResponse<ClientModel>> => {
	const url = `api/institutions/${id}`;
	const response = await ApiClient.delete<MsgResponse<ClientModel>>(url);

	if (response.status !== 200) {
		return {
			isSuccess: false,
			message: "Error al eliminar el cliente",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};

export const importClientServices = async (
	file: File
): Promise<MsgResponse<ClientModel[]>> => {
	const formData = new FormData();
	formData.append("file", file);

	const url = "api/institutions/import";
	const response = await ApiClient.post<MsgResponse<ClientModel[]>>(
		url,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
		}
	);

	if (response.status !== 200 && response.status !== 201) {
		return {
			isSuccess: false,
			message: "Error al importar el cliente",
			isFailure: true,
			error: {
				code: response.status.toString(),
				message: response.statusText,
			},
		};
	}

	return response.data;
};
