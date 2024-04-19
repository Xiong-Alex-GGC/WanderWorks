export class OverlappingItemError extends Error { //used to prevent overlapping Plan-A activities and possibly accommodations?
    constructor(message) {
        super(message);
        this.name = 'OverlappingItemError';
        this.statusCode = 400; // HTTP status code for bad request
    }
}