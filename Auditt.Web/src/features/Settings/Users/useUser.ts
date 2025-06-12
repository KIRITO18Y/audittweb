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
	const queryUser = useQuery({
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
					queryUser.refetch();
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
					queryUser.refetch();
				}
			}
		},
	});

	return {
		users: queryUser?.data?.data,
		queryUser,
		createUser,
		updateUser,
	};
};

export const useUserInstitutions = (idUser: number) => {
	const queryUser = useQuery({
		queryKey: [`${KEY}-institutions`, idUser],
		queryFn: () => getUserInstitutions(idUser),
	});

	const deleteUserInstitution = useMutation({
		mutationFn: deleteUserInstitutionServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryUser.refetch();
				}
			}
		},
	});

	const addUserInstitution = useMutation({
		mutationFn: addUserInstitutionServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryUser.refetch();
				}
			}
		},
	});

	return {
		users: queryUser?.data?.data,
		queryUser,
		deleteUserInstitution,
		addUserInstitution,
	};
};
