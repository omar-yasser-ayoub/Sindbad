export const itinerary = {
    fields: [
        { name: 'name', type: 'text', label: 'Itinerary Name' },
        { name: 'activities', type: 'array', label: 'Activities' },
        { name: 'locations', type: 'array', label: 'Locations' },
        { name: 'timeline', type: 'array', label: 'Timeline' },
        { name: 'duration', type: 'number', label: 'Duration' },
        { name: 'languages', type: 'array', label: 'Supported Languages' },
        { name: 'price', type: 'number', label: 'Price' },
        { name: 'availableDatesTimes', type: 'array', label: 'Available Dates and Times' },
        { name: 'accessibility', type: 'array', label: 'Accessibility Options' },
        { name: 'pickUpLocation', type: 'text', label: 'Pick-up Location' },
        { name: 'dropOffLocation', type: 'text', label: 'Drop-off Location' }
    ],
    defaultValues: {
        name: '',
        activities: [],
        locations: [],
        timeline: [],
        duration: 0,
        languages: [],
        price: 0,
        availableDatesTimes: [],
        accessibility: [],
        pickUpLocation: '',
        dropOffLocation: ''
    }
};