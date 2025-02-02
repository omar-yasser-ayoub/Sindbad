import axiosInstance from "./axiosInstance";

export const getMyItineraries = async (tourGuideId) => {
    try {
        const response = await axiosInstance.get(
            `/itinerary/my-itineraries/${tourGuideId}`,
            {
                resourceName: "Itinerary",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const updateItinerary = async (itineraryId, formData) => {
    try {
        const response = await axiosInstance.put(
            `/itinerary/${itineraryId}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Explicitly set for FormData
                },
                resourceName: "Itinerary",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const createItinerary = async (formData) => {
    try {
        const response = await axiosInstance.post(
            `/itinerary`,
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

export const deleteItinerary = async (itineraryId) => {
    try {
        const response = await axiosInstance.delete(`/itinerary/${itineraryId}`, {
            resourceName: "Itinerary",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getAllItineraries = async (
    searchTerm,
    budget,
    date,
    tag,
    rating,
    language,
    sortBy,
    sortOrder
) => {
    try {
        // Build the params object dynamically
        const params = {};

        // Only include non-default values
        if (searchTerm) params.searchTerm = searchTerm;

        // Budget filter (min and max)
        if (budget && (budget.min !== undefined || budget.max !== undefined)) {
            params.budget = {};
            if (budget.min !== undefined) params.budget.min = budget.min;
            if (budget.max !== undefined) params.budget.max = budget.max;
        }

        // Date filter
        if (date && (date.start || date.end)) {
            params.date = {};
            if (date.start) params.date.start = date.start;
            if (date.end) params.date.end = date.end;
        }

        // Category filter
        if (tag) {
            params.tag = tag;
        }

        // Rating filter (min and max)
        if (rating && (rating.min !== undefined || rating.max !== undefined)) {
            params.rating = {};
            if (rating.min !== undefined) params.rating.min = rating.min;
            if (rating.max !== undefined) params.rating.max = rating.max;
        }

        // Language filter
        if (language) {
            params.language = language;
        }

        // Sorting options
        if (sortBy) params.sortBy = sortBy;
        if (sortOrder) params.sortOrder = sortOrder;

        console.log("params:", params);

        // Make the request with the dynamic params
        const response = await axiosInstance.get(`/itinerary/`, {
            params, // Pass the dynamically built params object
            resourceName: "Itinerary",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const getItineraryById = async (itineraryId) => {
    try {
        const response = await axiosInstance.get(`/itinerary/${itineraryId}`, {
            resourceName: "Itinerary",
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

export const setItineraryInappropriate = async (
    itineraryId,
    isInappropriate
) => {
    try {
        const response = await axiosInstance.patch(
            `/itinerary/set-inappropriate/${itineraryId}`,
            isInappropriate,
            {
                resourceName: "Itinerary",
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const bookItinerary = async (
    itineraryId,
    userId,
    date,
    adultTicketCount,
    childTicketCount
) => {
    try {
        const response = await axiosInstance.post(`/itinerary/book/`, {
            itineraryId,
            userId,
            date,
            adultTicketCount,
            childTicketCount,
        });

        return response.data;
    } catch (error) {
        console.error("Error booking itinerary:", error);
        return error;
    }
};

export const cancelBooking = async (itineraryId, userId, date) => {
    try {
        const response = await axiosInstance.post(`/itinerary/cancel/`, {
            itineraryId,
            userId,
            date,
        });

        return response.data;
    } catch (error) {
        return error;
    }
};

export const addItineraryComment = async (itineraryId, commentData) => {
    try {
        const response = await axiosInstance.post(
            `/itinerary/${itineraryId}/comment`,
            commentData
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export const addItineraryRating = async (itineraryId, ratingData) => {
    try {
        const response = await axiosInstance.post(
            `/itinerary/${itineraryId}`,
            ratingData
        );
        return response.data;
    } catch (error) {
        return error;
    }
};
