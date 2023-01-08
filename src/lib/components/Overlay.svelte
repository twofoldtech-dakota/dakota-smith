<script lang="ts">
	import { isOverlayOpen } from '$lib/stores';

	export let title: string;
</script>

<input type="checkbox" id="overlay" class="modal-toggle" checked={$isOverlayOpen} />
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal" on:click={() => isOverlayOpen.set(false)}>
	<div class="modal-box" on:click|stopPropagation>
		<div class="flex justify-between items-center border-b pb-2 mb-4">
			<h3 class="font-bold text-lg my-0">{title}</h3>
			<button
				class="top-2 right-3 hover:-translate-y-1 transition-transform"
				on:click={() => isOverlayOpen.set(false)}
			>
				<i class="mi mi-close"><span class="u-sr-only">Close</span></i>
			</button>
		</div>

		<slot />
		<!-- <div class="modal-action">
			<label for="my-modal" class="btn">Yay!</label>
		</div> -->
	</div>
</div>
