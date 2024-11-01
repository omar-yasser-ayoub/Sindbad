import axiosInstance from "./axiosInstance";

export const getTouristById = async (touristId) => {
	try {
		const response = await axiosInstance.get(`/tourist/${touristId}`);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const updateTourist = async (touristId, updatedValues) => {
	try {
		const response = axiosInstance.put(
			`/tourist/${touristId}`,
			updatedValues,
			{
				resourceName: "Tourist",
			}
		);
		return response.data;
	} catch (error) {
		return error;
	}
};