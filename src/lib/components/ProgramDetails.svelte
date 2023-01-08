<script lang="ts">
	import type { Program } from '$lib/types';

	export let program: Program;
</script>

<div class="flex flex-col">
	<div>
		Weekly Split:
		<div class="px-4">
			<div>monday: {program.monday == true ? 'training' : 'rest'}</div>
			<div>tuesday: {program.tuesday == true ? 'training' : 'rest'}</div>
			<div>wednesday: {program.wednesday == true ? 'training' : 'rest'}</div>
			<div>thursday: {program.thursday == true ? 'training' : 'rest'}</div>
			<div>friday: {program.friday == true ? 'training' : 'rest'}</div>
			<div>saturday: {program.saturday == true ? 'training' : 'rest'}</div>
			<div>sunday: {program.sunday == true ? 'training' : 'rest'}</div>
		</div>
	</div>
</div>
