import { error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
//import { page } from '$app/stores';

const options = {
method: 'GET',
headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
}
};




export async function GET({ request }) {

    const page = request.headers.get('page');
    console.log('Page:',page);

    console.log('Fetching more movies');
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options);

        if (!response.ok) {
            console.error(`Failed to fetch more movies: ${response.status} ${response.statusText}`);
            throw error(response.status, 'Failed to fetch more movies.');
        }

        let data = await response.json();
        data = data.results;

        console.log("More movies fetched")
        return json(data) ;
    } catch (err) {
        console.error('Error fetching more movies:', err);
        throw error(500, 'Failed to fetch more movies.');
    }
};

