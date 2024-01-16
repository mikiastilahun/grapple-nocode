<script lang="ts">
	import { goto } from '$app/navigation';
	import type { remoteInfo } from '$lib/store/remote';

	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	const remote = getContext<Writable<remoteInfo>>('remote');

	let remoteEntryUrl: string = 'http://localhost:3000/dashboard.json';

	const onSubmit = async () => {
		if (!remoteEntryUrl) return;

		const response = await fetch(remoteEntryUrl);
		const remoteEntry = await response.json();

		// set the remoteEntry in localStorage
		localStorage.setItem('remoteEntry', JSON.stringify(remoteEntry));

		remote.set({
			components: remoteEntry.modules.map((module: any) => module.name),
			remoteEntryUrl: remoteEntryUrl.replace('dashboard.json', 'remoteEntry.js'),
			remoteName: remoteEntry.id
		});

		// redirect to /components
		goto('/components');
		// const script = document.createElement('script');
		// script.type = 'module';
		// script.text = remoteEntry;
		// document.head.appendChild(script);

		// const container = document.createElement('div');
		// container.id = remoteName;
		// document.body.appendChild(container);

		// const Component = (window as any)[remoteName];
		// new Component({ target: container });
	};
</script>

<!-- a div centered in the middle horizontally and vertically -->
<div class="h-screen w-full flex justify-center items-center">
	<div class="flex flex-col gap-4 border-2 bg-zinc-400 w-96 p-4 rounded">
		<!-- two inputs and a button styled with tailwind-->
		<input
			type="text"
			placeholder="RemoteEntry.js URL"
			bind:value={remoteEntryUrl}
			class="py-2 px-4 rounded"
		/>
		<button
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
			on:click={onSubmit}
		>
			Submit
		</button>

		<!-- <ShowRemoteInfo /> -->
	</div>
</div>
