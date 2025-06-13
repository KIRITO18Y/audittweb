export interface ClientModel {
	id?: number;
	name: string;
	abbreviation: string;
	nit: string;
	city: string;
	manager: string;
	assistantManager: string;
	idState?: number;
}

export interface ClientUpdateStatusModel {
	id: number;
	statusId: number;
}

export interface ClientsResponseModel {
	id: number;
	firstName: string;
	lastName: string;
	sex: number;
	identificationTypeId: number;
	identificationNumber: string;
	email: string;
	address: string;
	cellPhoneNumber: string;
	phoneNumber: string;
	idState: number;
}

export interface ClientPagerModel {
	id: number;
	fullName: string;
	firstName: string;
	lastName: string;
	identificationType: string;
	identificationAbbreviation: string;
	identificationNumber: string;
	sex: number;
	updateDate?: Date;
}

export interface ClientStoryResponseModel {
	id: number;
	idBusiness: number;
	idClient: number;
	clientName: string;
	description: string;
	date: string;
	number: number;
	state: string;
	tags: string[];
	diagnosis: { name: string }[];
	formulaId?: number;
}
