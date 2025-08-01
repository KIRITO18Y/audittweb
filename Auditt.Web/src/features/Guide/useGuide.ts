import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
	createGuideServices,
	deleteGuideServices,
	getGuide,
	updateGuideServices,
	downloadGuideTemplateServices,
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

	const downloadTemplate = useMutation({
		mutationFn: downloadGuideTemplateServices,
		onSuccess: (blob) => {
			// Crear un enlace de descarga
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "plantilla-guias.xlsx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);
			toast.success("Plantilla descargada exitosamente");
		},
		onError: () => {
			toast.error("Error al descargar la plantilla");
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
		downloadTemplate,
		importGuide,
	};
};
