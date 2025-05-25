import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createDataCutServices,
	deleteDataCutServices,
	GetDataCutById,
	GetDataCuts,
	updateDataCutServices,
} from "./DataCutServices";
import { toast } from "react-toastify";
import useUserContext from "../../shared/context/useUserContext";

const KEY = "DataCut";
export const useDataCuts = () => {
	const { client } = useUserContext();
	const queryDataCuts = useQuery({
		queryKey: [KEY, client?.id],
		queryFn: () => GetDataCuts(client?.id ?? 0),
	});

	const createDataCut = useMutation({
		mutationFn: createDataCutServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				toast.success(data.message);
				queryDataCuts.refetch();
			}
		},
	});

	const updateDataCut = useMutation({
		mutationFn: updateDataCutServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				toast.success(data.message);
				queryDataCuts.refetch();
			}
		},
	});

	const deleteDataCut = useMutation({
		mutationFn: deleteDataCutServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				toast.success(data.message);
				queryDataCuts.refetch();
			}
		},
	});

	return {
		dataCuts: queryDataCuts.data?.data,
		queryDataCuts,
		createDataCut,
		updateDataCut,
		deleteDataCut,
	};
};

export const useDataCutById = (id: number) => {
	const queryDataCutById = useQuery({
		queryKey: [KEY, id],
		queryFn: () => GetDataCutById(id),
	});
	return { queryDataCutById };
};
