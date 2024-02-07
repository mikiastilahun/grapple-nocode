<script lang="ts">
	import type { remoteInfo } from '$lib/store/remote';
	import { getContext, tick } from 'svelte';
	import type { Writable } from 'svelte/store';
	import ComponentList from './component-list.svelte';
	import { __federation_method_setRemote, __federation_method_getRemote } from '__federation__';

	let sections: any = [
		// {
		// 	componentName: 'Gruppe/count',
		// 	component: {
		// 		__svelte_meta: {
		// 			loc: { file: 'src/lib/components/page-builder.svelte', line: 181, column: 9, char: 5019 }
		// 		}
		// 	}
		// }
	];
	let remote = getContext<Writable<remoteInfo>>('remote');

	let showComponentList = false;

	const loadComponent = function (section: { componentName: string; component: any; props: any }) {
		return async () => {
			const element = document.createElement('div');
			document.getElementById('Components').appendChild(element);

			// @ts-ignore
			__federation_method_setRemote($remote.remoteName, {
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
			console.log({ Component });

			new Component({
				target: element
			});
		};
	};

	let loadSections = async () => {
		sections.forEach(async (section: any) => {
			console.log({ section });
			await loadComponent(section)();
		});
	};
</script>

{#if showComponentList}
	<div class="flex justify-center">
		<div class="flex justify-center max-w-screen-lg">
			<div id="Components" />
		</div>
	</div>
{:else}
	<div class="h-screen w-full flex justify-center items-center">
		<div class="flex flex-col gap-4 border-2 bg-zinc-400 w-96 p-4 rounded">
			<label for="props" class="text-gray-500"> JSON </label>
			<textarea
				class="border-2 border-gray-300 rounded-md p-2"
				on:input={(e) => {
					try {
						// @ts-ignore
						sections = JSON.parse(e.target.value);
					} catch (e) {
						console.log('not valid json');
					}
				}}
			/>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				on:click={async () => {
					showComponentList = true;
					await tick();
					await loadSections();
				}}
			>
				Submit
			</button>
		</div>
	</div>
{/if}

<!-- 
{#if showComponentList}
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
{/if} -->

<!-- <ComponentList on:selectedComponentName={handleSelectedComponentName} /> -->

<!-- a three col fullpage section with the middle col having 60% width -->

<!-- <div class="flex justify-end p-4">
	<button
		class="px-4 py-3 bg-sky-200 hover:bg-sky-400 hover:text-white rounded"
		on:click={() => {
			// stringify the sections and copy it to the clip board
			const copyText = JSON.stringify(sections);
			console.log({ copyText });
			navigator.clipboard.writeText(copyText);
			alert('Copied to clipboard');
		}}
	>
		Export current configuration
	</button>
</div> -->
<!-- <div class="flex flex-col w-screen">
	<div class="flex-1 flex max-h-[calc(100vh-100px)]">
		<div class="w-1/4 bg-gray-100 overflow-y-scroll">
			<ComponentList on:selectedComponentName={handleSelectedComponentName} bind:search />
		</div>
		<div class="w-3/4 bg-gray-200 overflow-y-scroll max-h-[calc(100vh-100px)]">
			<div class="flex">
				<div class="flex-1">
					{#if sections.length === 0}
						<div
							class="flex items-center justify-center w-full h-full cursor-pointer hover:bg-slate-200"
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
								<div class="group hover:cursor-pointer flex flex-col gap-2">
									<div class="justify-end gap-4 flex">
										<button
											class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded hidden group-hover:flex"
											on:click={() => {
												selectedSection = section;
												showEdit = true;
											}}
										>
											Edit
										</button>
										<button
											class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded hidden group-hover:flex"
											on:click={() => removeSection(section)}
										>
											Remove
										</button>
									</div>

									<div
										class="bg-white shadow-md rounded-md p-4 w-full group-hover:border-2 group-hover:border-blue-500 max-h-[calc(100vh-100px)]"
										bind:this={section.component}
									/>
								</div>
							{/each}
						</div>
						<div
							class="flex items-center justify-center cursor-pointer hover:bg-slate-200"
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
				</div>

				{#if showEdit}
					<div class="w-1/4 transition-all ease-in-out">

						<div class="flex justify-end">
							<button
								class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
								on:click={() => (showEdit = false)}
							>
								Close
							</button>
						</div>

						<div class="flex flex-col gap-4">
							<label for="name" class="text-gray-500"> Name </label>
							<input
								type="text"
								id="name"
								class="border-2 border-gray-300 rounded-md p-2"
								value={selectedSection.componentName}
							/>

							<label for="props" class="text-gray-500"> Props </label>
							<textarea
								class="border-2 border-gray-300 rounded-md p-2"
								value={selectedSection.props ? JSON.stringify(selectedSection.props, null, 2) : ''}
								on:input={(e) => {
									try {
										selectedSection.props = JSON.parse(e.target.value);
									} catch (e) {
										console.log('not valid json');
									}
								}}
							/>

							<div class="flex justify-evenly">
								<button
									class=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded"
									on:click={async () => {
										console.log({ selectedSection });
										await tick();

										await loadComponent(selectedSection)();
									}}
								>
									Save
								</button>

								<button
									class=" bg-red-500 hover:bg-red-700 text-white font-bold px-4 rounded"
									on:click={() => {
										showEdit = false;
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div> -->
