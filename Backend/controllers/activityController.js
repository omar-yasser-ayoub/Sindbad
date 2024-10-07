const Activity = require("../models/activityModel");
const Tag = require("../models/tagModel");
const Category = require("../models/categoryModel");

/**
 * Gets an activity by ID
 * @route GET /activity/:id
 * @param {*} req - The request parameters should contain the ID of the activity. Example: /activity/66f68d4a90d0a4eaa665d343
 * @param {*} res - The Activity JSON object returned
 * @returns {Object} - A JSON object representing the activity, or an error message if the activity is not found or an error occurs
 */
const getActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate("category tags");
    res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activity",
      error: error.message,
    });
  }
};

/**
 * Retrieves activities created by a specific user
 * @route GET /activity/my-activities
 * @param {Object} req - The request object containing user data
 * @param {Object} res - The response object for sending the result
 * @returns {Object} JSON containing an array of activities or error message
 */
const getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ creatorId: req.params.creatorId });
    res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting activities",
      error: error.message,
    });
  }
};

/**
 * Creates a new activity
 *
 * @route POST /activity/
 * @param {Object} req - The request object containing activity details in the body.
 * @param {Object} res - The response object used to send the created activity or error message.
 * @returns {Object} - A JSON object of the created activity or an error message.
 */
const setActivity = async (req, res) => {
  try {
    const { category, tags, ...activityData } = req.body; // Extract category, tags, and other activity data

    console.log(req.body);
    // Check if the category exists (optional)
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res
        .status(404)
        .json({ message: "Category does not exist", x: existingCategory });
    }

    // Check if all provided tag IDs exist (optional)
    const existingTags = await Tag.find({ _id: { $in: tags } });
    if (existingTags.length !== tags.length) {
      return res.status(404).json({ message: "One or more tags do not exist" });
    }

    // Create the activity with valid category and tag IDs
    const activity = await Activity.create({
      ...activityData,
      category: existingCategory._id, // Use category ID
      tags: existingTags.map((tag) => tag._id), // Use valid tag IDs
    });

    res.status(201).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Error creating activity",
      error: error.message,
    });
  }
};

/**
 * Updates an existing activity in the database
 *
 * @route PUT /activity/:id
 * @param {Object} req - The request object containing the activity ID as a parameter and updated fields in the body.
 * @param {Object} res - The response object used to send the updated activity or an error message.
 * @returns {Object} - A JSON object of the updated activity or an error message if not found.
 */
const updateActivity = async (req, res) => {
  try {
    // Get the ID from the request parameters
    const { id } = req.params;

    // Destructure the fields from the request body
    const {
      name,
      dateTime,
      location,
      price,
      category,
      tags,
      discounts,
      isBookingOpen,
      creatorId,
      headCount,
      description,
    } = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      id,
      {
        name,
        dateTime,
        location,
        price,
        category,
        tags,
        discounts,
        isBookingOpen,
        creatorId,
        headCount,
        description,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(500).json({
      message: "Error updating activity",
      error: error.message,
    });
  }
};

/**
 * Deletes an activity by ID
 *
 * @route DELETE /activity/:id
 * @param {Object} req - The request object containing the ID of the activity to delete in the body
 * @param {Object} res - The response object used to send a confirmation message or error
 * @returns {Object} - A JSON object with a confirmation message or an error message if not found
 */
const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }
    return res.status(204).json({ message: "Activity deleted" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting activity",
      error: error.message,
    });
  }
};

/**
 * Searches, filters, and sorts activities based on search term, budget, date, category, rating, and sorting options.
 *
 * @route GET /activity
 * @param {Object} req - Request object with search, filter, and sort criteria in query parameters.
 * @param {string} [req.query.searchTerm] - Optional term to search in activity names, tags, or categories.
 * @param {Object} [req.query.budget] - Optional for filtering activities by price.
 * @param {Date} [req.query.date.start] - Optional start date for filtering activities.
 * @param {Date} [req.query.date.end] - Optional end date for filtering activities.
 * @param {string} [req.query.category] - Optional category for filtering activities.
 * @param {number} [req.query.rating] - Optional minimum rating for filtering activities.
 * @param {string} [req.query.sortBy] - Optional field to sort by ("price" or "rating").
 * @param {string} [req.query.sortOrder="asc"] - Optional sort order ("asc" or "desc"). Default is "asc".
 * @param {number} [req.query.page=1] - Optional page number for pagination. Default is 1.
 * @param {number} [req.query.limit=10] - Optional number of activities per page. Default is 10.
 * @param {Object} res - Response with matching, sorted, and paginated activities or error.
 * @returns {Object} - A JSON object containing an array of activities or an error message.
 */
const getActivities = async (req, res) => {
	try {
		const {
			searchTerm,
			budget,
			date = {},
			category,
			rating = {},
			sortBy = "dateTime", // Default sorting by activity date
			sortOrder = "asc",
			page = 1,
			limit = 10,
		} = req.query;

		// Create filter object based on provided criteria
		const filter = {
			//dateTime: { $gte: new Date() }, // Only upcoming activities by default
		};

		// Budget filter
		if (budget.min || budget.max) {
			filter.$or = [
				{
					price: {
						...(budget.min && { $gte: +budget.min }),
						...(budget.max && { $lte: +budget.max }),
					},
				},
				{
					"price.min": {
						...(budget.min && { $gte: +budget.min }),
						...(budget.max && { $lte: +budget.max }),
					},
				},
			];
		}

		// Date filter
		if (date.start || date.end) {
			filter.dateTime = {
				...(date.start && { $gte: new Date(date.start) }),
				...(date.end && {
					$lte: new Date(new Date(date.end).setHours(23, 59, 59, 999)),
				}), // End of the day
			};
		}

		// Category filter
		if (category) {
			filter.category = category;
		}

		// Rating filter
		if (rating.min || rating.max) {
			filter.rating = {
				...(rating.min && { $gte: +rating.min }),
				...(rating.max && { $lte: +rating.max }),
			};
		}

		// Search term filter (name, category, or tags)
		if (searchTerm) {
			const regex = new RegExp(searchTerm, "i"); // Case-insensitive
			const categories = await Category.find({ name: regex }).select("_id");
			const tags = await Tag.find({ name: regex }).select("_id");

			filter.$or = [
				{ name: regex },
				{ category: { $in: categories.map((c) => c._id) } },
				{ tags: { $in: tags.map((t) => t._id) } },
			];
		}

		// Sorting and pagination
		const sortOptions = { [sortBy]: sortOrder === "asc" ? 1 : -1 };
		const skip = (page - 1) * limit;

		console.log("filter:", filter);
		console.log("sortOptions:", sortOptions);


		// Fetch activities with filters, sorting, and pagination
		// TODO: Add pagination back after adding page navigation to the frontend
		const activities = await Activity.find(filter).sort(sortOptions);
		//.skip(skip)
		//.limit(+limit);

		if (activities.length === 0) {
			return res.status(204).send(); // 204 No Content for no results
		}

		// Respond with activities
		res.status(200).json(activities);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "Error occurred while fetching activities.",
			error: error.message,
		});
	}
};


module.exports = {
  setActivity,
  getActivity,
  updateActivity,
  deleteActivity,
  getMyActivities,
  getActivities,
};
