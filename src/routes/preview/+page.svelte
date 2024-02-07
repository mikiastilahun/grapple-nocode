<script lang="ts">
	import ComponentList from '$lib/components/component-list.svelte';
	import Nav from '$lib/components/nav.svelte';
	import PageBuilder from '$lib/components/page-builder.svelte';
	import Preview from '$lib/components/preview.svelte';
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

<div>
	<Nav />
	<Preview />
</div>
