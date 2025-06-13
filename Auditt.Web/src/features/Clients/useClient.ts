import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createClientServices,
	deleteClientServices,
	getClients,
	importClientServices,
	updateClientServices,
	updateStatusClientServices,
} from "./ClientServices";
import { toast } from "react-toastify";
import useUserContext from "../../shared/context/useUserContext";

const KEY = "clients";
export const useClient = () => {
	const { user } = useUserContext();
	const queryClients = useQuery({
		queryKey: [`${KEY}`],
		queryFn: () => getClients(user?.id),
	});

	const createClient = useMutation({
		mutationFn: createClientServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryClients.refetch();
				}
			}
		},
	});

	const deleteClient = useMutation({
		mutationFn: deleteClientServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryClients.refetch();
				}
			}
		},
	});

	const updateClient = useMutation({
		mutationFn: updateClientServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryClients.refetch();
				}
			}
		},
	});

	const importClient = useMutation({
		mutationFn: importClientServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryClients.refetch();
				}
			}
		},
	});

	const updateStatus = useMutation({
		mutationFn: updateStatusClientServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) toast.info(data.message);
				if (data?.error) toast.error(data.error.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryClients.refetch();
				}
			}
		},
	});

	return {
		clients: queryClients?.data?.data,
		queryClients,
		createClient,
		deleteClient,
		updateClient,
		importClient,
		updateStatus,
	};
};
