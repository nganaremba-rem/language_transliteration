import axios from "axios";

// const endpoint =
//   'https://api.dhruva.ai4bharat.org/services/inference/transliteration'

const endpoint = "https://xlit-api.ai4bharat.org/tl";
const apiKey = import.meta.env.VITE_TRANSLITERATION_KEY;

export const axiosInstance = axios.create({
	baseURL: endpoint,
});

export function getTransliteratedData(lang: string, text: string) {
	return axiosInstance.get(`/${lang}/${text}`);
}

export type paramType = {
	source: string;
	sourceLanguage?: string;
	targetLanguage: string;
	isSentence?: boolean;
	numSuggestions?: number;
	dataTracking?: boolean;
};

export async function fetchTransliteratedText(paramData: paramType) {
	const dataToSubmit = {
		input: [
			{
				source: paramData.source,
			},
		],
		config: {
			serviceId: "ai4bharat/indicxlit--cpu-fsv2",
			language: {
				sourceLanguage: paramData?.sourceLanguage,
				sourceScriptCode: "",
				targetLanguage: paramData?.targetLanguage,
				targetScriptCode: "",
			},
			isSentence: true,
			numSuggestions: 0,
		},
		controlConfig: {
			dataTracking: true,
		},
	};

	return await axios.post(endpoint, dataToSubmit, {
		headers: {
			Authorization: apiKey,
		},
	});
}
