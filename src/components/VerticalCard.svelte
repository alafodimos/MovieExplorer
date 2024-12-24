<script>
    import { sharedData } from "$lib/shared";

    let poster_baseURL = "http://image.tmdb.org/t/p/w500";
    let { index } = $props();
    
</script>
                  
<div class="flex flex-col bg-custom-green-300 m-1 movie aspect-[9/16] rounded-2xl shadow-lg">
    
    <img src="{poster_baseURL+$sharedData[index].poster_path}" alt="{$sharedData[index].title}" class="rounded-2xl rounded-b-none aspect-[2/3] shadow-2xl">
    
    <div class="grid grid-rows-[2fr_1fr] gap-1">

        <div class="flex justify-start m-2">

            <p class="font-semibold text-sm">{$sharedData[index].title}</p>
        </div>

        <a href="/movie/{$sharedData[index].id}" class="rounded-2xl">

            <div class="flex justify-center bg-custom-green-200 hover:bg-[#36502f]  mt-1 rounded-2xl rounded-t-none cursor-pointer">

                <p class="m-1 text-xs text-center">More info</p>
            </div>
        </a>
    </div>
</div>