import { GuideModel } from "./GuideModel";
import { QuestionsModel } from "./Questions/QuestionsModel";

export interface GuideImportModel {
	guide: GuideModel;
	questions: QuestionsModel[];
}

export interface GuideImportRowModel {
	guideName: string;
	guideDescription: string;
	idScale: number;
	questionText: string;
	questionOrder: number;
}
