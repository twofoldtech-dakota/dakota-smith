<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { supabaseClient } from '$lib/supabase';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { PageData } from './$types';
	import Auth from '$lib/components/Auth.svelte';
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import type { NavItem } from '$lib/types';

	const navItems: Array<NavItem> = [
		{ text: 'Home', url: '/' },
		{ text: 'Blog', url: '/blog' },
		{ text: 'Code', url: '/code' }
	];
	$: currentRoute = '/' + $page.url.pathname.split('/')[1];

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			console.log('Auth state change detected');
			invalidateAll();
		});
		return () => {
			subscription.unsubscribe();
		};
	});

	const submitLogout: SubmitFunction = async ({ cancel }) => {
		const { error } = await supabaseClient.auth.signOut();
		if (error) {
			console.log(error);
		}
		cancel();
	};

	export let data: PageData;
	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');
		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
		}
	};
	const themes = [
		'light',
		'dark',
		'cupcake',
		'bumblebee',
		'emerald',
		'corporate',
		'synthwave',
		'retro',
		'cyberpunk',
		'valentine',
		'halloween',
		'garden',
		'forest',
		'aqua',
		'lofi',
		'pastel',
		'fantasy',
		'wireframe',
		'black',
		'luxury',
		'dracula',
		'cmyk',
		'autumn',
		'business',
		'acid',
		'lemonade',
		'night',
		'coffee',
		'winter'
	];
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" />
	 -->
	<script src="https://code.iconify.design/iconify-icon/1.0.2/iconify-icon.min.js"></script>
</svelte:head>

<div class="grid w-full h-screen justify-items-center content-start max-w-2xl mx-auto">
	<!-- {#if data.session} -->
	<header class="w-full">
		<nav
			class="flex items-center justify-between w-full relative max-w-2xl border-base-100 mx-auto pt-8 pb-8 sm:pb-16 bg-opacity-60"
		>
			<div class="flex items-center justify-between ml-[-0.60rem]">
				{#each navItems as navItem}
					<a
						class="px-3 py-2 rounded-lg flex items-center justify-center hover:ring-2 ring-base-300 hover:bg-base-200 transition-all {currentRoute ==
						navItem.url
							? 'underline font-bold'
							: ''}"
						href={navItem.url}
					>
						{navItem.text}
					</a>
				{/each}
			</div>
			<ul class="menu menu-horizontal px-1 z-50">
				<li>
					<div
						class="px-3 py-2 hover:text-accent rounded-lg flex items-center hover:bg-base-100 justify-center transition-all"
					>
						<iconify-icon icon="lucide:paint-bucket" width="24" />
					</div>
					<ul class="p-2 bg-base-100 w-[150px] max-h-96 overflow-y-scroll">
						<form method="POST" use:enhance={submitUpdateTheme}>
							{#each themes as theme}
								<li>
									<button formaction="/?/setTheme&theme={theme}&redirectTo={$page.url.pathname}"
										>{theme}</button
									>
								</li>
							{/each}
						</form>
					</ul>
				</li>
			</ul>
		</nav>

		<!-- <form method="POST" use:enhance={submitLogout} class="text-right">
					<button type="submit" class="btn hover:text-accent items-center hover:underline">
						<iconify-icon icon="lucide:log-out" width="24" />
						<span class="pl-1">logout</span>
					</button>
				</form> -->
	</header>

	<section class="prose w-full">
		<slot />
	</section>
	<!-- {:else}
		<Auth />
	{/if} -->
</div>

<style>
	.prose {
		max-width: 100% !important;
	}
</style>
