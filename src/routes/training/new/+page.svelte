<script lang="ts">
	import ProgramDay from '$lib/components/ProgramDay.svelte';
	import type { Day } from '$lib/types';
	import { createProgram } from '$lib/stores';
	import type { PageData } from './$types';
	export let data: PageData;

	let loading = false;
	let name = '';
	let active = false;
	let template = {
		name: ''
	};
	let duration = {
		monthCount: 0
	};
	let onChangeTemplateName: string;
	let onChangeDuration: number;

	const handleSubmit = async () => {
		try {
			loading = true;
			let week: Array<Day> = [];
			week.push(monday);
			week.push(tuesday);
			week.push(wednesday);
			week.push(thursday);
			week.push(friday);
			week.push(saturday);
			week.push(sunday);

			createProgram(
				name,
				active,
				week,
				onChangeDuration,
				onChangeTemplateName,
				data?.session?.user.id
			);
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	};

	const updateActiveStatus = async () => {
		if (active == null) active = false;
		else if (active == false) active = true;
		else active = false;
	};
	const onTemplateSelectChange = () => {
		onChangeTemplateName = template.name;
	};
	const onDurationSelectChange = () => {
		onChangeDuration = duration.monthCount;
	};

	let monday: Day = {
		active: false,
		lifts: [],
		name: 'monday',
		categories: [],
		label: ''
	};
	let tuesday: Day = {
		active: false,
		lifts: [],
		name: 'tuesday',
		categories: [],
		label: ''
	};
	let wednesday: Day = {
		active: false,
		lifts: [],
		name: 'wednesday',
		categories: [],
		label: ''
	};
	let thursday: Day = {
		active: false,
		lifts: [],
		name: 'thursday',
		categories: [],
		label: ''
	};
	let friday: Day = {
		active: false,
		lifts: [],
		name: 'friday',
		categories: [],
		label: ''
	};
	let saturday: Day = {
		active: false,
		lifts: [],
		name: 'saturday',
		categories: [],
		label: ''
	};
	let sunday: Day = {
		active: false,
		lifts: [],
		name: 'sunday',
		categories: [],
		label: ''
	};

	let week: Array<Day> = [monday, tuesday, wednesday, thursday, friday, saturday, sunday];
</script>

<div class="block w-full m-auto">
	<div class="flex flex-col">
		<a
			href="/settings/programs"
			class="link text-sm flex items-center gap-2 hover:text-accent w-40 text-accent"
		>
			<iconify-icon icon="lucide:arrow-left-circle" width="24" />
			<span>back to Settings</span>
		</a>
		<h1 class="my-8">Create a new program</h1>
		<form method="POST" on:submit|preventDefault={handleSubmit} class="flex flex-col">
			<div class="form-control">
				<label class="label justify-start">
					<span class="label-text w-[160px] font-bold">Program Name:</span>

					<input
						name="name"
						type="text"
						class="input input-bordered w-full max-w-xs"
						placeholder="Name"
						bind:value={name}
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="label justify-start">
					<span class="label-text w-[160px] font-bold">Template:</span>
					<select
						bind:value={template.name}
						class="select select-bordered w-full max-w-xs"
						on:change|preventDefault={onTemplateSelectChange}
					>
						<option disabled selected>Select a template</option>
						<option value={'Legs/Push/Pull'}>Legs/Push/Pull</option>
						<option value={'Powerbuilding'}>Powerbuilding</option>
						<option value={'Bro Split'}>Bro Split</option>
						<option value={'Upper/Lower'}>Upper/Lower</option>
						<option value={'PHAT'}>PHAT</option>
					</select>
				</label>
			</div>
			<div class="form-control">
				<label class="label justify-start">
					<span class="label-text w-[160px] font-bold">Duration:</span>
					<select
						bind:value={duration.monthCount}
						class="select select-bordered w-full max-w-xs"
						on:change|preventDefault={onDurationSelectChange}
					>
						<option disabled selected>How many months will you run this program?</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
						<option value={6}>6</option>
					</select>
				</label>
			</div>
			<div class="form-control border-2 rounded-xl p-3 my-2">
				<div
					class="tooltip tooltip-right w-[160px] text-left border-b"
					data-tip="Pick the days you would like to train each week"
				>
					<span class="label-text font-extrabold">Training Days </span>
					<iconify-icon class="text-accent" icon="lucide:info" width="16" />
				</div>
				<div class="flex flex-wrap justify-start w-full">
					{#each week as day}
						<ProgramDay {day} />
					{/each}
				</div>
			</div>
			<div class="form-control">
				<label class="flex justify-start flex-1 label cursor-pointer items-center">
					<span class="label-text w-[160px] font-bold">Active?</span>
					<div class="flex items-center w-full max-w-xs">
						<input
							name="active"
							type="checkbox"
							checked={active}
							on:change={() => updateActiveStatus()}
							class="checkbox"
						/>
					</div>
				</label>
			</div>

			<div class="flex justify-between items-center border-t border-base-content pt-7 mt-7">
				<div />
				<div>
					<button type="submit" class="btn {loading == true ? 'loading' : 'btn-primary'}">
						{#if loading}Loading...
						{:else}
							<iconify-icon icon="lucide:check" width="24" />
							<span class="pl-1">save</span>
						{/if}
					</button>

					<a href="/settings/programs" class="btn btn-outline">
						<iconify-icon icon="lucide:x" width="24" />
						<span class="pl-1">cancel</span>
					</a>
				</div>
			</div>
		</form>
	</div>
</div>
