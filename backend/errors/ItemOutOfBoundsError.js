export class ItemOutOfBoundsError extends Error { //used when an activity or accommodation is outside the bounds of its itinerary
    constructor(message) {
        super(message);
        this.name = 'ItemOutOfBoundsError';
        this.statusCode = 400; // HTTP status code for bad request
    }
}