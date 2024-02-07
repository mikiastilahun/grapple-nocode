<script lang="ts">
	import fuzzysort from 'fuzzysort';

	import type { remoteInfo } from '$lib/store/remote';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	// import and configure event dispatching
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let search: string = '';

	let remote = getContext<Writable<remoteInfo>>('remote');

	let components: string[] = [];
	onMount(() => {
		console.log({ remote: $remote });
		components = $remote.components;
	});

	$: {
		if (search) {
			components = fuzzysort.go(search, components).map((component) => component.target);
		} else {
			components = $remote ? $remote.components : [];
		}
	}
</script>

<div class="h-full overflow-scroll p-4 flex gap-4 flex-col">
	{#each components as component}
		<div
			class="flex flex-col gap-4 border-2 bg-zinc-400 w-96 p-4 rounded hover:bg-zinc-700 cursor-pointer"
			on:click={() => dispatch('selectedComponentName', component)}
			on:keyup={() => {}}
			role="button"
			tabindex="0"
		>
			{component}
		</div>
	{/each}
</div>
