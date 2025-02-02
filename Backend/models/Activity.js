const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a the name of the activity"],
        },
        description: {
            type: String,
            required: [true, "Please add a description of the activity"],
        },
        cardImage: {
            public_id: {
                type: String,
                required: this.cardImage !== undefined,
            },
            url: {
                type: String,
                required: this.cardImage !== undefined,
            },
        },
        dateTime: {
            type: Date,
            required: [true, "Please add the date of the activity"],
        },
        location: {
            address: { type: String, required: true },
            coordinates: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true },
            },
        },
        price: {
            type: mongoose.Schema.Types.Mixed,
            required: [true, "Please add the price of the activity"],
            validate: {
                validator: function (value) {
                    // Check if it's either a fixed price (number) or a price range (object)
                    return (
                        (typeof value === "number" && value >= 0) || // Fixed price must be non-negative
                        (typeof value === "object" &&
                            value !== null &&
                            typeof value.min === "number" &&
                            typeof value.max === "number" &&
                            value.min >= 0 && // Ensure min is non-negative
                            value.max >= value.min) // Ensure max is greater than or equal to min
                    );
                },
                message:
                    "Price must be either a non-negative number (fixed price) or a valid price range (object with min and max).",
            },
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Please add the category of the activity"],
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],
        discounts: {
            type: Number,
            validate: {
                validator: function (value) {
                    return value >= 0 && value <= 100;
                },
                message: "Discount must be between 0 and 100.",
            },
        },
        isBookingOpen: {
            type: Boolean,
            default: true,
        },
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Advertiser",
        },
        headCount: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Map,
            of: Number,
            default: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        userRatings: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "User",
            default: [],
        },
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true
                },
                comment: {
                    type: String, required: true
                },
            },
        ],
        isInappropriate: {
            type: Boolean,
            default: false,
        },
        priceId: {
			type: String,
			required: [true, "Please add the Stripe price ID"],
		},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);