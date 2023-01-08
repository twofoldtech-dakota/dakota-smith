<script lang="ts">
	import UserDetails from '$lib/components/UserDetails.svelte';
	import type { PageData } from '../$types';
	export let data: PageData;
</script>

<UserDetails email={data.session?.user.email} />
