<script>
    import { movieDetails } from "$lib/shared";
</script>

<div class="flex flex-col w-full lg:w-2/3 p-12 gap-2">
    <!-- Name and genres  -->
    <div class="">
        <p class=" text-3xl font-semibold">{$movieDetails.title}</p>
        {#each $movieDetails.genres as genre }
        <p class="inline-block bg-custom-green-300 rounded pl-1 pr-1 mr-1 text-xs">{genre.name}</p>
        {/each}
    </div>        
    <!-- Video / backdrop -->
    {#if !Object.is($movieDetails.video, null)}
    <iframe 
        src= {$movieDetails.video} 
        title= {$movieDetails.title}
        
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen class="w-full aspect-video rounded-xl">
    </iframe>
    {:else if !Object.is($movieDetails.backdrop_path, null)}
    <img src="http://image.tmdb.org/t/p/w1280{$movieDetails.backdrop_path}" alt="{$movieDetails.title} Backdrop" class="w-full aspect-video rounded-xl">
    {:else}
    <div class="w-full aspect-video rounded-xl bg-custom-green-300 flex flex-col items-center justify-center">
        <p>No video availiable</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm-4.34 7.964a.75.75 0 0 1-1.061-1.06 5.236 5.236 0 0 1 3.73-1.538 5.236 5.236 0 0 1 3.695 1.538.75.75 0 1 1-1.061 1.06 3.736 3.736 0 0 0-2.639-1.098 3.736 3.736 0 0 0-2.664 1.098Z" clip-rule="evenodd" />
        </svg>    
    </div>
    {/if}
    <div class="grid grid-cols-2">
        <div>
            <p class="text-lg font-semibold">{$movieDetails.tagline}</p>
            <p class="text-sm">{$movieDetails.overview}</p>
        </div>
        <div class=" place-items-end">
            <p class="font-bold text-xs">Release Date</p>
            <p class="text-sm">{$movieDetails.release_date}</p>
            {#if $movieDetails.runtime != 0}
            <p class="font-bold text-xs">Duration</p>
            <p class="text-sm">{$movieDetails.runtime} min</p>
            {/if}
        </div>
    </div>  
</div>