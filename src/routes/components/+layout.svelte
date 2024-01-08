<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import remote from '$lib/store/remote';
	import { setContext } from 'svelte';

	if (!$remote && browser) {
		// try loading from localstorage
		const remoteEntryString = localStorage.getItem('remoteEntry');
		if (remoteEntryString) {
			let remoteEntry = JSON.parse(remoteEntryString);

			remote.set({
				components: remoteEntry.modules.map((module: any) => module.name),
				remoteEntryUrl: remoteEntry.metadata.remote,
				remoteName: remoteEntry.id
			});
			setContext('remote', remote);
		} else {
			goto('/');
		}
	}
</script>

<slot />
