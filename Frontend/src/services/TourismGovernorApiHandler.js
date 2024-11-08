import axiosInstance from "./axiosInstance";

export const getTourismGovernor = async (tourismGovernorId) => {
	try {
		const response = await axiosInstance.get(
			`/tourism-governor/${tourismGovernorId}`,
			{
				resourceName: "Tourism governor",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}

export const updateTourismGovernor = async (tourismGovernorId, data) => {
	try {
		const response = await axiosInstance.put(
			`/tourism-governor/${tourismGovernorId}`,
			data,
			{
				resourceName: "Tourism governor",
			}
		);

		return response.data;
	} catch (error) {
		return error;
	}
}