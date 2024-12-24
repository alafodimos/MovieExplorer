<script>
    import { sharedData } from "$lib/shared";
    let backdrop_baseURL = "http://image.tmdb.org/t/p/w780";
    let { index } = $props();
</script>

<div class="flex flex-col bg-custom-green-300 m-1 $sharedData[index] aspect-[4/3] rounded-2xl">
        <div>
            <img src="{Object.is($sharedData[index].backdrop_path, null) ? backdrop_baseURL+$sharedData[index].poster_path : backdrop_baseURL+$sharedData[index].backdrop_path }" alt="" class="rounded-2xl rounded-b-none shadow-2xl {Object.is($sharedData[index].backdrop_path, null) ? "aspect-[16/9]" : ""}">
        </div>
        <div class="grid grid-rows-[2fr_1fr] gap-1">
            <div class="flex justify-start m-2">
                <p class="font-semibold text-sm">{$sharedData[index].title}</p>
            </div>
            <a href="/movie/{$sharedData[index].id}" class="rounded-2xl">
                <div class="flex justify-center bg-custom-green-200 hover:bg-[#36502f] mt-1 rounded-2xl rounded-t-none cursor-pointer">
                    <p class="m-1 text-xs text-center">More info</p>
                </div>
            </a>
        </div>
</div>