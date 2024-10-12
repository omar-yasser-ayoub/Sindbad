import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { MapPin, Star, ArrowBigRight } from "lucide-react";

import { getItineraryById } from "@/services/ItineraryApiHandler";

function getRandomRating() {
	return (Math.round(Math.random() * 10) / 2).toFixed(1);
}

function getRandomReviews() {
	return Math.floor(Math.random() * 1000) + 1;
}

function handleItineraryValues(itinerary) {
	if (!itinerary.rating) {
		itinerary.rating = getRandomRating();
	}

	if (!itinerary.description) {
		itinerary.description = "Lorem Ipsum...";
	}

	if (
		itinerary.price !== null &&
		typeof itinerary.price === "object" &&
		typeof itinerary.price.min === "number" &&
		typeof itinerary.price.max === "number"
	) {
		itinerary.price = (itinerary.price.min + itinerary.price.max) / 2;
	}

	if (!itinerary.reviews) {
		itinerary.reviews = getRandomReviews();
	}
}

const Itinerary = () => {
	// State to store the current count
	const [adult, setAdult] = useState(0);
	const [child, setChild] = useState(0);
	const { itineraryId } = useParams();
	const [itinerary, setItinerary] = useState(null); // Initialize as null
	const [selectedDate, setSelectedDate] = useState(0);
	const [selectedTime, setSelectedTime] = useState(0);



	const getItinerary = async () => {
		let response = await getItineraryById(itineraryId);
		console.log(response);

		if (response.error) {
			console.error(response.message);
		} else {
			handleItineraryValues(response);
			setItinerary(response);
		}
	};

	useEffect(() => {
		getItinerary();
	}, []);

	// Ensure itinerary is not null or undefined before rendering
	if (!itinerary) {
		return <p>Loading...</p>; // You can return a loading spinner or message here
	}

	// Ensure availableDatesTimes exists before accessing it
	if (!itinerary.availableDatesTimes) return null;

	const fullStars = itinerary.rating;
	const emptyStar = 5 - fullStars;

	const dates = itinerary.availableDatesTimes.map((date) => {
		const d = new Date(date);
		const weekday = d.toLocaleString("en-US", { weekday: "short" });
		const day = d.toLocaleString("en-US", { day: "numeric" });
		const month = d.toLocaleString("en-US", { month: "short" });
		return `${weekday} ${day} ${month}`;
	});

	const times = itinerary.availableDatesTimes.map((date) => {
		const d = new Date(date);
		return d.toLocaleString("en-US", {
			hour: "numeric",
			minute: "numeric",
			hour12: true,
		});
	});

	const handleAdultIncrement = () => setAdult(adult + 1);
	const handleAdultDecrement = () => adult > 0 && setAdult(adult - 1);
	const handleChildIncrement = () => setChild(child + 1);
	const handleChildDecrement = () => child > 0 && setChild(child - 1);

	return (
		<div className="min-h-screen flex justify-center items-center bg-primary-950">
			<div className="w-full max-w-7xl px-8 py-8 bg-primary-900 shadow-lg rounded-md">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10 p-8">
					<div>
						<div className="my-4">
							<h1 className="text-4xl font-bold">{itinerary.name}</h1>
							<p className="text-light text-lg">
								{itinerary.duration} day trip
							</p>

							{/*Star Section */}
							<div className="relative flex gap-4">
								<div className="flex">
									{Array.from({ length: fullStars }, (_, index) => (
										<Star
											key={index}
											className="fill-secondary"
											strokeWidth={0}
										/>
									))}
									{Array.from({ length: emptyStar }, (_, index) => (
										<Star
											key={fullStars + index}
											className="fill-dark"
											strokeWidth={0}
										/>
									))}
								</div>
								<p className="text-light">
									{itinerary.rating}/5 ({itinerary.reviews})
								</p>
							</div>
						</div>

						<p className="text-light">{itinerary.description}</p>

						{/* Supported Languages */}
						<div className="my-6">
							<h2 className="text-xl font-semibold pb-2">
								Supported Languages
							</h2>
							<div className="flex flex-wrap gap-2">
								{itinerary.languages.map((lang) => (
									<div
										key={lang}
										className="px-3 py-1 bg-primary-950 rounded-full border cursor-default"
									>
										{lang}
									</div>
								))}
							</div>
						</div>

						{/* Accessibility Features */}
						<div className="flex flex-wrap gap-4">
							{itinerary.accessibility.map((feature) => (
								<p key={feature} className="flex items-center gap-2">
									<Star className="h-4 w-4" />
									{feature}
								</p>
							))}
						</div>
					</div>

					<div className="grid grid-cols-2 col-span-2 gap-1">
						<div className="bg-light h-full rounded-lg"></div>
						<div className="">
							<div className="bg-light h-1/2 rounded-lg mb-px"></div>
							<div className="bg-light h-1/2 rounded-lg"></div>
						</div>
					</div>
				</div>

				<div className=" border-y mt-8 mx-4"></div>

				{/*Itinerary + Availbility*/}
				<div className="grid grid-cols-9 grid-rows gap-8 mt-8 p-8">
					<div className="col-span-3">
						<h2 className="text-2xl font-semibold mb-4">Timeline</h2>
						<ul>
							<li>
								<div className="flex items-start space-x-2">
									<div className="mt-1">
										<MapPin size={40} className="border-2 rounded-full p-1" />
									</div>
									<div>
										<p>Starting at,</p>
										<p>{itinerary.pickUpLocation}</p>
									</div>
								</div>
							</li>
							<li>
								<div className="relative border border-light rounded-full w-1 h-1 bg-light left-5 mb-3"></div>
							</li>
							{itinerary.timeline.map((stop, index) => (
								<div key={index}>
									<li>
										<div className="flex items-start space-x-2">
											<div className="flex-shrink-0 bg-light text-dark font-semibold w-10 h-10 flex items-center justify-center rounded-full">
												{index + 1}
											</div>
											<div>
												<p>{stop}</p>
											</div>
										</div>
									</li>
									<li>
										<div className="relative border border-light rounded-full w-1 h-1 bg-light left-5 mb-3"></div>
									</li>
								</div>
							))}
							<li>
								<div className="flex items-start space-x-2">
									<div className="mt-1">
										<MapPin size={40} className="border-2 rounded-full p-1" />
									</div>
									<div>
										<p>Finishing at,</p>
										<p>{itinerary.dropOffLocation}</p>
									</div>
								</div>
							</li>
						</ul>
					</div>

					<div className="col-span-3">
						<h2 className="text-2xl font-semibold mb-4">Activities</h2>
						<ul>
							{itinerary.activities.map((activity, index) => (
								<div key={index}>
									<li>
										<div className="flex items-start space-x-2 py-2">
											<div className="flex-shrink-0 bg-light text-dark font-semibold w-10 h-10 flex items-center justify-center rounded-full">
												{index + 1}
											</div>
											<div>
												<p>{activity.name}</p>
												<Link
													to={`/app/activity/${activity._id}`}
													className="text-secondary"
												>
													See details
												</Link>
											</div>
										</div>
									</li>
								</div>
							))}
						</ul>
					</div>

					<div className="col-span-3 p-4">
						<h2 className="text-2xl font-semibold mb-4">Search Availability</h2>
						<div className="grid grid-cols-4 gap-2">
							{dates.map((date, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedDate(idx)}
									className={`border py-2 px-6 min-h-20 max-w-24 rounded-lg bg-primary-700 text-center ${selectedDate === idx
											? "border-light border-2"
											: "border-transparent"
										}`}
								>
									<span className="text-sm text-light">
										{date.split(" ")[0]}
									</span>
									<br /> {/* Weekday */}
									<span className="text-lg font-bold text-secondary">
										{date.split(" ")[1]}
									</span>
									<br /> {/* Day */}
									<span className="text-sm text-light ">
										{date.split(" ")[2]}
									</span>{" "}
									{/* Month */}
								</button>
							))}
							<div className=" relative top-1/3">
								<Button className="relative w-12 h-12 rounded-full bg-secondary -top-2 -left-4">
									<ArrowBigRight className=" fill-primary-700 text-primary-700 w-10 h-10" />
								</Button>
							</div>
						</div>

						<div className="flex flex-wrap gap-2 my-4">
							{times.map((time, idx) => (
								<button
									key={idx}
									onClick={() => setSelectedTime(idx)}
									className={`border py-2 px-4 rounded-2xl bg-primary-700 ${selectedTime === idx
											? "border-light border-2 "
											: "border-transparent"
										}`}
								>
									{time}
								</button>
							))}
						</div>

						<div className="relative p-6 bg-primary-700 border rounded-md">
							{/* Top cutout */}
							<div className="absolute inset-x-0 top-36  -left-5 -right-5 flex justify-between">
								<div className="w-10 h-10 bg-primary-900 border-r-2 border-light rounded-full"></div>
								<div className="w-10 h-10 bg-primary-900 border-l-2 border-light rounded-full"></div>
							</div>

							<div className="space-y-4 my-5">
								<div className="flex items-center justify-around">
									<div className="flex space-x-2">
										<p className="text-xl">Adult</p>
										<p className=" text-light">(16+)</p>
									</div>
									<div className="flex items-center justify-center gap-4 ">
										{/* Decrement Button */}
										<Button
											onClick={handleAdultDecrement}
											variant="ghost"
											className=" w-10 h-10 items-center justify-center text-2xl"
										>
											-
										</Button>

										{/* Count Display */}
										<div className=" bg-primary-900 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
											{adult}
										</div>

										{/* Increment Button */}
										<Button
											onClick={handleAdultIncrement}
											variant="ghost"
											className=" w-10 h-10 items-center justify-center text-2xl"
										>
											+
										</Button>
									</div>
								</div>
								<div className="flex items-center justify-around">
									<div className="flex space-x-2">
										<p className="text-xl">Child</p>
										<p className=" text-light">(5-15)</p>
									</div>
									<div className="flex items-center justify-center gap-4">
										{/* Decrement Button */}
										<Button
											onClick={handleChildDecrement}
											variant="ghost"
											className=" w-10 h-10 items-center justify-center text-2xl"
										>
											-
										</Button>

										{/* Count Display */}
										<div className=" bg-primary-900 rounded-lg w-10 h-10 flex items-center justify-center text-xl">
											{child}
										</div>

										{/* Increment Button */}
										<Button
											onClick={handleChildIncrement}
											variant="ghost"
											className=" w-10 h-10 items-center justify-center text-2xl"
										>
											+
										</Button>
									</div>
								</div>
							</div>

							{/* Total Cost Section */}
							<div className="border-t border-dashed mt-4 pt-4">
								<p>
									Total:
									<span className="font-semibold text-xl mx-4">
										{adult * itinerary.price + child * itinerary.price}
									</span>
									LE
								</p>
								<p className="text-sm text-secondary">
									Includes taxes and charges
								</p>
							</div>

							{/* Book Now Button */}
							<Button className=" text-center w-full py-3 mt-4 ">
								<p>Book Now</p>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Itinerary;
