const Tourist = require("../models/Tourist");
const TourGuide = require("../models/TourGuide");
const Advertiser = require("../models/Advertiser");
const Seller = require("../models/Seller");

const UserController = {
	signUp: async (req, res) => {
		try {
			const { email, username, passwordHash, role, ...touristData } =
				req.body; // Extract role and user data

			let user;
			if (!role) {
				throw new Error("Role is required");
			}

			// Check for unique email and username
			const isUnique = await UserController.isUniqueEmailAndUsername(
				email,
				username
			);
			if (!isUnique) {
				throw new Error("Email or username already exists");
			}

			switch (role.toLowerCase()) {
				case "tourist":
					const { mobileNumber, nationality, DOB, job } = touristData;

					if (
						!email ||
						!mobileNumber ||
						!nationality ||
						!DOB ||
						!job
					) {
						throw new Error("Tourist data is required");
					}

					user = await UserController.createTourist(
						email,
						username,
						passwordHash,
						mobileNumber,
						nationality,
						DOB,
						job
					);
					break;
				case "tourguide":
					user = await UserController.createTourGuide(
						email,
						username,
						passwordHash
					);
					break;
				case "advertiser":
					user = await UserController.createAdvertiser(
						email,
						username,
						passwordHash
					);
					break;
				case "seller":
					user = await UserController.createSeller(
						email,
						username,
						passwordHash
					);
					break;
				default:
					throw new Error("Invalid role");
			}

			return res
				.status(201)
				.json({ message: "User created successfully", user });
		} catch (error) {
			return res
				.status(400)
				.json({ message: "Sign up failed", error: error.message });
		}
	},

	isUniqueEmailAndUsername: async (email, username) => {
		// Check in Tourist model
		const touristExists =
			(await Tourist.findOne({ email })) ||
			(await Tourist.findOne({ username }));
		if (touristExists) return false;

		// Check in TourGuide model
		const tourGuideExists =
			(await TourGuide.findOne({ email })) ||
			(await TourGuide.findOne({ username }));
		if (tourGuideExists) return false;

		// Check in Advertiser model
		const advertiserExists =
			(await Advertiser.findOne({ email })) ||
			(await Advertiser.findOne({ username }));
		if (advertiserExists) return false;

		// Check in Seller model
		const sellerExists =
			(await Seller.findOne({ email })) ||
			(await Seller.findOne({ username }));
		if (sellerExists) return false;

		// If no duplicates were found, return true
		return true;
	},

	createTourist: async (
		email,
		username,
		passwordHash,
		mobileNumber,
		nationality,
		DOB,
		job
	) => {
		// Initialize variables with default values
		const wallet = 0;
		const bookmarks = [];
		const loyaltyPoints = 0;
		const level = 1;
		const xpPoints = 0;
		const isReceiveNotifications = false;
		const wishlist = [];
		const cart = [];
		const addresses = [];

		// Create a new tourist instance
		const tourist = new Tourist({
			email,
			username,
			passwordHash,
			mobileNumber,
			nationality,
			DOB,
			job,
			wallet,
			bookmarks,
			loyaltyPoints,
			level,
			xpPoints,
			isReceiveNotifications,
			wishlist,
			cart,
			addresses,
		});

		// Save tourist to the database
		await tourist.save();
		return tourist;
	},

	createTourGuide: async (email, username, passwordHash) => {
		const isAccepted = false;

		const tourGuide = new TourGuide({
			email,
			username,
			passwordHash,
			isAccepted,
		});

		await tourGuide.save();
		return tourGuide;
	},

	createAdvertiser: async (email, username, passwordHash) => {
		const isAccepted = false;
		const createdActivities = [];
		const createdIterinaries = [];
		const createdHistoricalPlaces = [];

		const advertiser = new Advertiser({
			email,
			username,
			passwordHash,
			isAccepted,
			createdActivities,
			createdIterinaries,
			createdHistoricalPlaces,
		});

		await advertiser.save();
		return advertiser;
	},

	createSeller: async (email, username, passwordHash) => {
		const isAccepted = false;
		const products = [];

		const seller = new Seller({
			email,
			username,
			passwordHash,
			isAccepted,
			products,
		});

		await seller.save();
		return seller;
	},
};

module.exports = UserController;
