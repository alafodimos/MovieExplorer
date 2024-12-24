<script>
  import SkeletonCard from "../components/SkeletonCard.svelte";
  import VerticalCard from "../components/VerticalCard.svelte";
  import HorizontalCard from "../components/HorizontalCard.svelte";
  import Header from "../components/Header.svelte";
  import BackToTop from "../components/BackToTop.svelte";
  import { onMount } from "svelte";
  import { pageCounter, sharedData } from "$lib/shared";

  let {data} = $props();
  let newMovies = $state();
  let baseURL = "http://image.tmdb.org/t/p/w780";
  let width = $state(0);
  let columns = $state(0);
  
  // Initialize the stored data if empty
  if (Object.is($sharedData, null)) {
      $sharedData = data.movies;
  };

  // Set the minimum column width in px
  const columnWidth = 200;
  // Calculate the number of columns based on container width
  async function getColumns() {
    width = await window.innerWidth; //Get the window width        
    columns = Math.floor(width / columnWidth);
  }

  onMount(() => {
  // Add event listener to update the number of columns on resize
  window.addEventListener('resize', getColumns);
  // Remove the event listener when the component is destroyed
  return () => {
      window.removeEventListener('resize', getColumns);
  };
  });

  // Fetch more movies
  async function moreMovies() {

      const response = await fetch('/', { method: 'GET', headers: { 'page': $pageCounter }})
      newMovies = await response.json();
      
      // Combine data ensuring no duplicates
      $sharedData = await Array.from(
              new Map(
                  [...$sharedData, ...newMovies].map(item => [item.id, item])
              ).values()
          );
      $pageCounter++;
  }
</script>

<Header />

<!-- First two rows -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] movie-grid">   
  {#each $sharedData as movie, i}
    {#await getColumns()}

    <SkeletonCard /> 

    {:then columnNumber} 
      {#if i < 2*columns}
            
      <VerticalCard index={i}/>

      {/if}  
    {/await}
  {/each}
</div>

<!-- Rest of the rows -->
<div class="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] movie-grid">
  {#each $sharedData as movie, i}
    {#await getColumns() then columnNumber}
      {#if i >= 2*columns}

      <HorizontalCard index={i} />
              
      {/if}
    {/await}
  {/each}
</div>

<!-- Show more button  -->
<div class="flex flex-auto justify-center place-items-center h-[4vh] bg-gradient-to-t from-custom-green-300 to-custom-green-400 p-10">
  <button class="rounded-3xl bg-custom-green-200 hover:bg-[#36502f] pl-3 pr-3" onclick={moreMovies}>Show More</button>
</div>

<BackToTop />

<svelte:head>
    <title>The Movie Explorer</title>
    <meta name="Movie Explorer" content="Movies Playing Now in theaters">
    <meta name="keywords" content="Now Playing, Movies, Photos, Trailers, Synopsis">
</svelte:head>
