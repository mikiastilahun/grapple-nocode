<script lang="ts">
	import type { remoteInfo } from '$lib/store/remote';
	import { getContext, tick } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ComponentList from './component-list.svelte';
	import { __federation_method_setRemote, __federation_method_getRemote } from '__federation__';

	let showComponentList: boolean = false;
	let sections: any = [];
	let remote = getContext<Writable<remoteInfo>>('remote');

	let search: string;

	const loadComponent = function (section: { componentName: string; component: any }) {
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
				`./${section.componentName}`
			);
			const Component = loadedComponent.default;

			new Component({
				target: section.component,
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

	let handleSelectedComponentName = async function (event: any) {
		console.log(event.detail);
		let section = {
			componentName: event.detail,
			component: undefined
		};
		sections = [...sections, section];

		tick();

		await loadComponent(section)();

		showComponentList = false;
	};

	let removeSection = function (section: any) {
		console.log({
			section
		});
		sections = sections.filter((s: any) => s.componentName !== section.componentName);

		tick();

		// remove the component from the dom
		section.component.remove();
	};
</script>

{#if sections.length === 0}
	<div
		class="flex items-center justify-center w-1/2 cursor-pointer hover:bg-slate-200"
		on:click={() => (showComponentList = true)}
		on:keydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div class="flex flex-col">
			<svg
				class="w-24 h-24 mx-auto text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
			<h2 class="text-2xl font-bold text-center text-gray-400">No sections yet</h2>
			<p class="text-center text-gray-500">Click here to add a new section</p>
		</div>
	</div>
{:else}
	<div class="grid gap-4 w-full mt-4 max-w-5xl">
		{#each sections as section}
			<!-- an edit icon and a remove icon on top right side -->
			<div class="flex justify-end gap-4">
				<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Edit
				</button>
				<button
					class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
					on:click={() => removeSection(section)}
				>
					Remove
				</button>
			</div>

			<div class="bg-white shadow-md rounded-md p-4 w-full" bind:this={section.component} />
		{/each}
	</div>
	<div
		class="flex items-center justify-center w-1/2 cursor-pointer hover:bg-slate-200"
		on:click={() => (showComponentList = true)}
		on:keydown={() => {}}
		role="button"
		tabindex="0"
	>
		<div class="flex flex-col">
			<svg
				class="w-24 h-24 mx-auto text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				/>
			</svg>
			<h2 class="text-2xl font-bold text-center text-gray-400">Add more sections</h2>
			<p class="text-center text-gray-500">Click here to add a new section</p>
		</div>
	</div>
{/if}

{#if showComponentList}
	<!-- show as popup with the ability to cancel -->
	<div
		class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
	>
		<div class="bg-white shadow-md rounded-md flex flex-col p-4 gap-4">
			<div class="flex justify-between">
				<div>
					<h2 class="text-xl font-bold">Add a new section</h2>
					<p class="text-gray-500">Select a component from the list below</p>
				</div>

				<button
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					on:click={() => (showComponentList = false)}
				>
					Cancel
				</button>
			</div>

			<input type="text" placeholder="Search..." class="py-2 px-3" bind:value={search} />

			<div class="h-[calc(100vh-500px)] overflow-scroll">
				<ComponentList on:selectedComponentName={handleSelectedComponentName} bind:search />
			</div>
		</div>
	</div>
{/if}

<!-- <ComponentList on:selectedComponentName={handleSelectedComponentName} /> -->
