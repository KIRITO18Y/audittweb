import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	createGuideServices,
	deleteGuideServices,
	getGuide,
	updateGuideServices,
	importGuideServices,
} from "./GuideServices";

const KEY = "guide";
export const useGuide = () => {
	const queryGuide = useQuery({
		queryKey: [`${KEY}`],
		queryFn: getGuide,
	});

	const createGuide = useMutation({
		mutationFn: createGuideServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryGuide.refetch();
				}
			}
		},
	});

	const updateGuide = useMutation({
		mutationFn: updateGuideServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryGuide.refetch();
				}
			}
		},
	});

	const deleteGuide = useMutation({
		mutationFn: deleteGuideServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				toast.info(data.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryGuide.refetch();
				}
			}
		},
	});

	const importGuide = useMutation({
		mutationFn: importGuideServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) toast.error(data.message);
				if (data?.error) toast.error(data.error.message);
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryGuide.refetch();
				}
			}
		},
	});

	return {
		guides: queryGuide?.data?.data,
		queryGuide,
		createGuide,
		updateGuide,
		deleteGuide,
		importGuide,
	};
};
