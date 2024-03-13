import { createClient } from 'pexels';
import pexelsToken from '../tokens/pexelsToken';

const Pexels = createClient(pexelsToken);

//will be used to query multiple images, allowing the user to select and update their current img
export const fetchPhotosByLocation = async (location) => {
    try {
        const query = `${location} landscape scenic`;    
        const photoPage = await Pexels.photos.search({ query, per_page: 10 });
        if (photoPage.photos && photoPage.photos.length > 0) {
            const photoList = photoPage.photos;
            return photoList;

        } else {
            throw new Error('No photos found for the given location.');
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

//used to default a new Acitvity to the 1st img queried
export const fetchDefaultPhotoByLocation = async (location) => {
    try {
        const query = `${location} landscape scenic`;    
        const photoPage = await Pexels.photos.search({ query, per_page: 1 });
        if (photoPage.photos && photoPage.photos.length > 0) {
            const imageUrl = photoPage.photos[0].src.original;
            return imageUrl;
        } else {
            throw new Error('No photos found for the given location.');
        }
    } catch (error) {
        console.error('Error fetching photos:', error);
        throw error;
    }
};

