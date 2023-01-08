<script lang="ts">
	import ProgramDetails from '$lib/components/ProgramDetails.svelte';
	import { programs } from '$lib/stores';
</script>

<div class="flex justify-between items-center pb-4 border-b border-base-content mb-7">
	<a href="/training/new" class="btn btn-outline btn-accent">
		<iconify-icon icon="lucide:plus-square" width="24" /><span class="pl-1"
			>create a new program</span
		>
	</a>
</div>
<div class="flex gap-8 flex-col flex-wrap sm:flex-row">
	{#each $programs as program}
		<div
			class="w-full card shadow-xl border {program.active
				? 'bg-base-300 border-primary'
				: 'bg-base-100 border-base-content'}"
		>
			<div class="card-body justify-between">
				<div
					class="card-title border-b pb-4 justify-between {program.active
						? 'border-primary'
						: 'border-base-content'}"
				>
					<div>
						{program.name}
					</div>
					{#if program.active}
						<div
							class="tooltip flex flex-col text-secondary justify-center items-center"
							data-tip="Active program"
						>
							<iconify-icon icon="lucide:star" width="24" />
							<span class="text-xs pt-1">active</span>
						</div>
					{:else}
						<div
							class="tooltip flex flex-col justify-center items-center"
							data-tip="Program is not active"
						>
							<iconify-icon icon="lucide:star-off" width="24" />
							<span class="text-xs pt-1">not active</span>
						</div>
					{/if}
				</div>
				<ProgramDetails {program} />
				<div class="card-actions justify-end">
					<a
						href="/training/{program.id}"
						class="btn {program.active ? 'btn-primary' : 'btn-outline hover:btn-primary'}"
					>
						<iconify-icon icon="lucide:edit" width="24" />
						<span class="pl-1">edit</span>
					</a>
				</div>
			</div>
		</div>
	{/each}
</div>
