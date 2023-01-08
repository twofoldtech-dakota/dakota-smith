<script lang="ts">
	import { supabaseClient } from '$lib/supabase';

	let loading = false;
	let email = '';
	let password = '';
	let showLogin = true;
	const handleLogin = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
			if (error) throw error;
		} catch (error) {
			alert(error);
		} finally {
			loading = false;
		}
	};
	const handleRegister = async () => {
		try {
			loading = true;
			const { error } = await supabaseClient.auth.signUp({ email, password });
			if (error) throw error;
		} catch (error) {
			alert(error);
		} finally {
			loading = false;
		}
	};

	const handleAuthFormView = async () => {
		showLogin = !showLogin;
	};
</script>

<div class="w-full text-center py-4 mb-8">
	<a href="/" class="text-4xl text-primary-100"> Logo </a>
</div>

<div class="border border-white rounded-xl p-6 w-full max-w-sm">
	{#if showLogin}
		<h1 class="text-4xl pb-4">Login</h1>
		<form on:submit|preventDefault={handleLogin} class="flex flex-col">
			<input
				type="text"
				name="email"
				placeholder="Email"
				class="input input-bordered input-primary w-full mb-2"
				bind:value={email}
			/>
			<input
				type="text"
				name="password"
				placeholder="Password"
				class="input input-bordered input-primary w-full"
				bind:value={password}
			/>
			<button type="submit" class="btn btn-primary my-4" disabled={loading}>Login</button>
		</form>
		<p>Don't have an account?</p>
		<button class="link" on:click={handleAuthFormView} disabled={loading}>Register</button>
	{:else}
		<h1 class="text-4xl pb-4">Register</h1>
		<form on:submit|preventDefault={handleRegister} class="flex flex-col">
			<input
				type="text"
				name="email"
				placeholder="Email"
				class="input input-bordered input-secondary w-full mb-2"
				bind:value={email}
			/>
			<input
				type="text"
				name="password"
				placeholder="Password"
				class="input input-bordered input-secondary w-full"
				bind:value={password}
			/>
			<button type="submit" class="btn btn-secondary my-4" disabled={loading}>Register</button>
		</form>
		<p>Already have an account?</p>
		<button class="link" on:click={handleAuthFormView} disabled={loading}>Login</button>
	{/if}
</div>
