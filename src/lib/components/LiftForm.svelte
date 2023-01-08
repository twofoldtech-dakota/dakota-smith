<script lang="ts">
	export let day;
	let name = '';
	let sets = [];
</script>

<form method="POST" class="text-right">
	<input
		name="name"
		type="text"
		class="input input-bordered w-full max-w-xs"
		placeholder="Barbell Chest Press"
		bind:value={name}
	/>

	<button type="submit" class="btn hover:text-accent items-center hover:underline">
		<iconify-icon icon="lucide:check" width="12" />
	</button>
</form>
