<script lang="ts">
	import { page } from '$app/stores';
	import type { NavItem } from '$lib/types';
	import { action_destroyer } from 'svelte/internal';

	const navItems: Array<NavItem> = [
		{ text: 'User', url: '/settings' },
		{ text: 'Programs', url: '/settings/programs' },
		{ text: 'Nutrition', url: '/settings/nutrition' }
	];
	$: currentRoute = $page.url.pathname;
</script>

<h1 class="w-full">Settings</h1>
<div class="flex w-full mb-max:flex-col">
	<div class="sm:border-r-2 mb-max:w-full border-base-content mb-max:block mb-max:border-b-2">
		<div class="flex sm:flex-col mb-max:text-center">
			{#each navItems as navItem}
				<a
					class="no-underline flex items-center justify-center link flex-1 p-4 hover:text-accent {currentRoute ==
					navItem.url
						? 'text-accent bg-base-300 font-bold mb-max:border-b-2 mb-max:rounded-t-2xl sm:rounded-l-2xl sm:border-r border-accent'
						: 'hover:underline'}"
					href={navItem.url}
				>
					{navItem.text}
				</a>
			{/each}
		</div>
	</div>
	<div class="mb-max:px-3 sm:px-7 pb-7 w-full mb-max:bg-base-200 mb-max:pt-5 mb-max:rounded-b-xl">
		<slot />
	</div>
</div>
