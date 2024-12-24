import { writable } from 'svelte/store';

export let sharedData = writable(null);
export let pageCounter = writable(3);
export let movieDetails = writable(null);