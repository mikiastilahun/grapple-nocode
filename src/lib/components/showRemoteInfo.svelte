<script>
	// load the context "remote" and show the details
	import { getContext } from 'svelte';
	const remote = getContext('remote');
</script>

This is the information about the federated remote component.
{JSON.stringify($remote, null, 2)}
