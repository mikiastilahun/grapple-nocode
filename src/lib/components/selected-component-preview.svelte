<script lang="ts">
	import { browser } from '$app/environment';
	import type { remoteInfo } from '$lib/store/remote';
	// @ts-ignore
	import { __federation_method_setRemote, __federation_method_getRemote } from '__federation__';

	export let selectedComponentName: string = '';

	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	// get the context remote and subscribe to it
	let remote = getContext<Writable<remoteInfo>>('remote');

	const loadComponent = function () {
		return async () => {
			const element = document.getElementById('Components');
			if (element) {
				element.innerHTML = '';
			}
			// @ts-ignore
			__federation_method_setRemote('Components', {
				url: $remote.remoteEntryUrl,
				format: 'var',
				from: 'webpack'
			});

			// @ts-ignore
			const loadedComponent = await __federation_method_getRemote(
				$remote.remoteName,
				`./${selectedComponentName}`
			);
			const Component = loadedComponent.default;

			new Component({
				target: document.getElementById('Components'),
				props: {
					schema: {
						'field-properties': {
							'hidden-fields': ['gruppentyp', 'gruppenname']
						}
					},
					enableFilter: false
				}
			});
		};
	};

	onMount(() => {
		if (!selectedComponentName) {
			selectedComponentName = $remote.components[0];
		}
	});

	$: {
		if (browser) {
			loadComponent()();
			selectedComponentName;
		}
	}
</script>

<div id="Components" />
