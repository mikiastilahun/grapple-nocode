<script lang="ts">
	export let components: string[] = [];
	export let selectedComponentName: string = '';
</script>

<div class="h-full overflow-scroll p-4 flex gap-4 flex-col">
	{#each components as component}
		<div
			class="flex flex-col gap-4 border-2 bg-zinc-400 w-96 p-4 rounded hover:bg-zinc-700 cursor-pointer"
			on:click={() => (selectedComponentName = component)}
			on:keyup={() => {}}
			role="button"
			tabindex="0"
		>
			{component}
		</div>
	{/each}
</div>
