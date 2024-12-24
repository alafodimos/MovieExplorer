import { error } from '@sveltejs/kit';
import { API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
};

export async function GET({ request }) {
    const id = request.headers.get('id');
    console.log('Fetching movie details');

    try {
        // Fetch movie details
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
        if (!response.ok) {
            console.error(`Failed to fetch movie details: ${response.status} ${response.statusText}`);
            throw error(response.status, 'Failed to fetch movie details.');
        }
        let movieDetails = await response.json();

        // Fetch videos
        const videoResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options);
        if (!videoResponse.ok) {
            console.error(`Failed to fetch movie videos: ${videoResponse.status} ${videoResponse.statusText}`);
            throw error(videoResponse.status, 'Failed to fetch movie videos.');
        }
        let videoData = await videoResponse.json();
        videoData = videoData.results;
        console.log(videoData.length);

        // Process video data
        let video = null;
        for (let i = 1; i < videoData.length; i++){
            if (videoData[i].site === "YouTube") {
                video =  `https://www.youtube.com/embed/${videoData[i].key}`;
            } else if (videoData[i].site === "Vimeo") {
                video = `https://vimeo.com/${video[i].key}`;
            }
        }


        console.log(movieDetails);
        console.log(video);
        movieDetails.video = video;


        console.log("Movie details and videos fetched");

        // Combine data into a single response
        return json(movieDetails);
    } catch (err) {
        console.error('Error fetching movie details or videos:', err);
        throw error(500, 'Failed to fetch movie details or videos.');
    }
}


// for (let i = 0; i < data2.length; i++) {
//     if (data2[i].site = "YouTube") {
//         video = "https://www.youtube.com/watch?v=" + data2[i].key;
//     } else if (data2[i].site = "Vimeo") {
//         video = "https://vimeo.com/282875052" + data2[i].key;
//     }
// }