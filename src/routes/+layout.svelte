<script lang="ts">
	import '../app.css';
	import remote from '$lib/store/remote';
	import { setContext } from 'svelte';

	setContext('remote', remote);
</script>

<slot />
