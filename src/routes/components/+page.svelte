<script lang="ts">
	import ComponentList from '$lib/components/component-list.svelte';
	import SelectedComponentPreview from '$lib/components/selected-component-preview.svelte';
	import type { remoteInfo } from '$lib/store/remote';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	// get the context remote and subscribe to it
	let remote = getContext<Writable<remoteInfo>>('remote');
	let selectedComponentName: string = '';

	let components: string[] = [];
	onMount(() => {
		console.log({ remote: $remote });
		components = $remote.components;
	});
</script>

<!-- a div on the left side which is scrollable and another that is not scrollable on the right -->
<div class="flex items-center h-screen">
	<div class="h-[calc(100vh-200px)] w-full flex justify-center items-center">
		<ComponentList bind:components bind:selectedComponentName />
		<div class="flex-1">
			<SelectedComponentPreview bind:selectedComponentName />
		</div>
	</div>
</div>
