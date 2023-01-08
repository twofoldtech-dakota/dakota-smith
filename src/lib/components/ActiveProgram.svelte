<script lang="ts">
	import { programs } from '$lib/stores';
	import type { Program } from '$lib/types';
</script>

{#if $programs}
	{#each $programs as program}
		{#if program.active}
			<div class=" bg-dark-300 pl-2 pr-3 py-1 rounded-lg">
				<i class="mi mi-favorite text-yellow-400" />
				{program.name}
			</div>
		{/if}
	{/each}
{:else}
	<span class="absolute pl-3 pt-0.5">
		<i class="mi mi-ban text-red-400 pt-1">none</i>
	</span>
{/if}
