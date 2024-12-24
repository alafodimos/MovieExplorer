<script>
    import { page } from "$app/stores";
    import { movieDetails } from "$lib/shared";
    import SideBar from "../../../components/SideBar.svelte";
    import SkeletonSideBar from "../../../components/SkeletonSideBar.svelte";
    import SkeletonDetails from "../../../components/SkeletonDetails.svelte";
    import Details from "../../../components/Details.svelte";
    
    const pageURL = $page.url.href;
    const parts = pageURL.split('/');
    const id = parts[parts.length - 1];
    let movie = {};

    async function fetchDetails() {
        const response = await fetch('./[movieId]', { method: 'GET', headers: { 'id': id } })
        movie = await response.json();
        $movieDetails = movie;
    }
    
</script>

<!-- Home button  -->
<div class="flex place-content-end pt-5 pr-12">
    <a href="/" class="rounded-2xl bg-custom-green-200 hover:bg-[#36502f]">
            
        <button class="m-1 pl-3 pr-3 font-semibold">Home</button>

    </a>
</div>
<!-- Movie Details  -->
<div class="lg:flex lg:flex-row-reverse h-screen relative">
    
{#await fetchDetails()}

    <SkeletonSideBar />

    <SkeletonDetails />

{:then movieDetails} 

    <SideBar />

    <Details />
    
{/await}
</div>

<svelte:head>
    <title>{movie.title} - The Movie Explorer</title>
    <meta name="description" content="{movie.title}: {movie.overview}">
    <meta property="og:site_name" content="The Movie Explorer">
    <meta property="og:description" content="{movie.title}">
    <meta property="og:title" content="{movie.title}">
    <meta property="og:type" content="video.movie">
    <meta property="og:image" content="http://image.tmdb.org/t/p/w1280{movie.backdrop_path}">
    <meta property="og:url" content="https://movie-explorer-lypdkyd3c-alafodimos-projects.vercel.app/movie/{movie.id}">

</svelte:head>

