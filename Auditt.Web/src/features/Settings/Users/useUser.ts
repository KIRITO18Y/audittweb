import { useMutation, useQuery } from "@tanstack/react-query";
import {
	addUserInstitutionServices,
	createUsertServices,
	deleteUserInstitutionServices,
	getUser,
	getUserInstitutions,
	updateUserServices,
} from "./UserServices";
import { toast } from "react-toastify";

const KEY = "user";
export const useUser = () => {
	const queryUserInstitutions = useQuery({
		queryKey: [`${KEY}`],
		queryFn: getUser,
	});

	const createUser = useMutation({
		mutationFn: createUsertServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryUserInstitutions.refetch();
				}
			}
		},
	});

	const updateUser = useMutation({
		mutationFn: updateUserServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryUserInstitutions.refetch();
				}
			}
		},
	});

	return {
		users: queryUserInstitutions?.data?.data,
		queryUserInstitutions,
		createUser,
		updateUser,
	};
};

export const useUserInstitutions = (idUser: number) => {
	const queryUserInstitutions = useQuery({
		queryKey: [`${KEY}-institutions`, idUser],
		queryFn: () => getUserInstitutions(idUser),
	});

	const deleteUserInstitution = useMutation({
		mutationFn: deleteUserInstitutionServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) toast.info(data.message);
				if (data?.error?.message) toast.error(data.error.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryUserInstitutions.refetch();
				}
			}
		},
	});

	const addUserInstitution = useMutation({
		mutationFn: addUserInstitutionServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) toast.info(data.message);
				if (data?.error?.message) toast.error(data.error.message);
			} else {
				console.log("addUserInstitution", data);
				if (data.isSuccess) {
					toast.success(data.message);
					queryUserInstitutions.refetch();
				}
			}
		},
	});

	return {
		institutions: queryUserInstitutions?.data?.data,
		queryUserInstitutions,
		deleteUserInstitution,
		addUserInstitution,
	};
};
