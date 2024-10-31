const mongoose = require("mongoose");

// Define the schema for the TourGuide model
const TourGuideSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			validate: {
				validator: (v) => /^\S+@\S+\.\S+$/.test(v),
				message: (props) => `${props.value} is not a valid email!`,
			},
		},
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
		mobileNumber: {
			type: String,
			validate: {
				validator: function (v) {
					if (v === null || v === undefined) return true; // Allow null or undefined values
					return /^\+?[1-9]\d{1,14}$/.test(v); // Validate only if mobile number is provided
				},
				message: (props) => `${props.value} is not a valid mobile number!`,
			},
		},
		yearsOfExperience: {
			type: Number,
		},
		previousWork: [
			{
				jobTitle: {
					type: String,
				},
				companyName: {
					type: String,
				},
				duration: {
					type: String,
				},
				description: {
					type: String,
					default: "",
				},
			},
		],

		isAccepted: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

// Create the TourGuide model
const TourGuide = mongoose.model("TourGuide", TourGuideSchema);

module.exports = TourGuide;
