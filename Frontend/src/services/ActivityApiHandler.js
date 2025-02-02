import axiosInstance from "./axiosInstance";

export const getAllActivities = async (
    searchTerm,
    budget,
    date,
    category,
    rating,
    sortBy,
    sortOrder
) => {
    try {
        // Build the params object dynamically
        const params = {};

        // Only include non-default values
        if (searchTerm) params.searchTerm = searchTerm;

        if (budget) {
            params.budget = budget; // You can send both min and max or format it differently as needed
        }

        if (date && (date.start || date.end)) {
            params.date = date;
        }

        if (category) {
            params.category = category;
        }

        if (rating) {
            params.rating = rating; // Again, you can send both min and max or customize as needed
        }

        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;

        // Make the request with the dynamic params
        const response = await axiosInstance.get(`/activity/`, {
            resourceName: "Activity",
            params, // Pass the dynamically built params object
        });

        return response.data;
    } catch (error) {
        return error;
    }
};

export const getMyActivities = async (advertiserId) => {
    try {
        const response = await axiosInstance.get(
            `/activity/my-activities/${advertiserId}`,
            {
                resourceName: "Activity",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const createActivity = async (formData) => {
    try {
        const response = await axiosInstance.post(
            `/activity/`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Explicitly set for FormData
                },
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateActivity = async (activityId, formData) => {
    try {
        const response = await axiosInstance.put(
            `/activity/${activityId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Explicitly set for FormData
                },
                resourceName: "Activity",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const deleteActivity = async (activityId) => {
    try {
        const response = await axiosInstance.delete(`/activity/${activityId}`, {
            resourceName: "Activity",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getActivityById = async (activityId) => {
    try {
        const response = await axiosInstance.get(`/activity/${activityId}`, {
            resourceName: "Activity",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const bookActivity = async (activityId, userId) => {
    try {
        const response = await axiosInstance.post(
            `/activity/book/`,
            {
                activityId,
                userId,
            },
            {
                headers: {
                    resourceName: "Activity",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.message);
        return error;
    }
};

export const setActivityInappropriate = async (activityId, isInappropriate) => {
    try {
        const response = await axiosInstance.patch(
            `/activity/set-inappropriate/${activityId}`,
            isInappropriate,
            {
                resourceName: "Activity",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const addActivityRating = async (activityId, ratingData) => {
    try {
        const response = await axiosInstance.post(
            `/activity/${activityId}`,
            ratingData,
            {
                resourceName: "Activity",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const addActivityComment = async (activityId, commentData) => {
    try {
        const response = await axiosInstance.post(
            `/activity/${activityId}/comment`,
            commentData,
            {
                resourceName: "Activity",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const cancelBooking = async (activityId, userId) => {
    try {
        const response = await axiosInstance.post(
            `/activity/cancel/`,
            {
                activityId,
                userId,
            },
            {
                headers: {
                    resourceName: "Activity",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error during cancelBooking:", error);
        throw new Error(
            error.response?.data?.message || "You can't cancel this booking"
        );
    }
};
