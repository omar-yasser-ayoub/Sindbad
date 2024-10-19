const mongoose = require("mongoose");

// Define the schema for the TourismGovernor model
const TourismGovernorSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			validate: {
				validator: function (v) {
					return !/\s/.test(v); // Check if there are no spaces
				},
				message: (props) =>
					`${props.value} contains spaces, which are not allowed!`,
			},
		},
		email: {
			type: String,
			required: true,
			validate: {
				validator: (v) => /^\S+@\S+\.\S+$/.test(v),
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
		passwordHash: {
			type: String,
			required: true,
		},
		profileImageUri: {
			type: String,
		},
		bannerImageUri: {
			type: String,
		},
	},
	{ timestamps: true }
);

// Create the TourismGovernor model
const TourismGovernor = mongoose.model(
	"TourismGovernor",
	TourismGovernorSchema
);

module.exports = TourismGovernor;
