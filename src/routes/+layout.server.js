import { error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export async function load() {

    try {
        // Fetch Now Playing page 1 and 2
        const response1 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);
        const response2 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2", options);

        if (!response1.ok || !response2.ok) {
            console.error(`Failed to fetch movies: ${response1.status} ${response1.statusText}${response2.status} ${response2.statusText}`);
            throw error(response1.status, response2.status, 'Failed to load movies.');
        }

        let data = await response1.json();
        data = data.results;

        let newData = await response2.json();
        newData = newData.results;

        // Combine data ensuring no duplicates
        data = Array.from(
            new Map(
                [...data, ...newData].map(item => [item.id, item])
            ).values()
        );

        return {
            movies: data
        };
    } catch (err) {
        console.error('Error in load function:', err);
        throw error(500, 'Failed to fetch movies.');
    }
}


