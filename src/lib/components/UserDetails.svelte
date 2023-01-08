<script lang="ts">
	import type { Session } from 'inspector';
	import ActiveProgram from './ActiveProgram.svelte';
	export let email: string | unknown;
</script>

<div class="text-3xl">Account Details</div>
<p>Email: {email}</p>
<div class="my-4">
	Active program:
	<ActiveProgram />
</div>
