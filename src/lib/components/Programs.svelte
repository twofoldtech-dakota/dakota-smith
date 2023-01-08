<script lang="ts">
	import ProgramDetails from '$lib/components/ProgramDetails.svelte';
	import { programs } from '../../stores/programStore';
</script>

{#each $programs as program}
	<div class="p-3 border">
		<div class="flex justify-between items-center pb-5">
			{#if program.active}
				<h3 class="text-2xl bg-dark-300 pl-2 pr-3 py-1 rounded-lg">
					<i class="mi mi-favorite text-yellow-400" />
					{program.name}
				</h3>
			{:else}
				<h3 class="text-2xl">{program.name}</h3>
			{/if}

			<div class="pt-1">
				<a href="/training/{program.id}" class="text-3xl">
					<i class="mi mi-edit-alt text-3xl text-blue-400" />
				</a>
			</div>
		</div>
		<div class="flex flex-col">
			<ProgramDetails {program} />
		</div>
	</div>
{/each}
