<script lang="ts">
	import { updateProgram, deleteProgram } from '$lib/stores';
	import type { Day, Program } from '$lib/types';
	import Overlay from '$lib/components/Overlay.svelte';
	import { isOverlayOpen } from '$lib/stores';

	export let data;
	let program: Program = data.program;
	let loading = false;
	let onChangeTemplateName: string;
	let onChangeDuration: number;

	const handleSubmit = async () => {
		try {
			loading = true;
			updateProgram(program);
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	};

	const handleDelete = async () => {
		try {
			deleteProgram(program.id);
		} catch (err) {
			console.error(err);
		} finally {
			isOverlayOpen.set(false);
		}
	};

	const updateCompletedStatus = async (program: Program) => {
		if (program.completed == null) program.completed = false;
		else if (program.completed == false) program.completed = true;
		else program.completed = false;
	};

	const updateActiveStatus = async (program: Program) => {
		if (program.active == null) program.active = false;
		else if (program.active == false) program.active = true;
		else program.active = false;
	};

	const updateDayStatus = async (program: Program, dayName: string) => {
		switch (dayName) {
			case 'monday':
				if (program.monday == null) program.monday = false;
				else if (program.monday == false) program.monday = true;
				else program.monday = false;
				break;
			case 'tuesday':
				if (program.tuesday == null) program.tuesday = false;
				else if (program.tuesday == false) program.tuesday = true;
				else program.tuesday = false;
				break;
			case 'wednesday':
				if (program.wednesday == null) program.wednesday = false;
				else if (program.wednesday == false) program.wednesday = true;
				else program.wednesday = false;
				break;
			case 'thursday':
				if (program.thursday == null) program.thursday = false;
				else if (program.thursday == false) program.thursday = true;
				else program.thursday = false;
				break;
			case 'friday':
				if (program.friday == null) program.friday = false;
				else if (program.friday == false) program.friday = true;
				else program.friday = false;
				break;
			case 'saturday':
				if (program.saturday == null) program.saturday = false;
				else if (program.saturday == false) program.saturday = true;
				else program.saturday = false;
				break;
			case 'sunday':
				if (program.sunday == null) program.sunday = false;
				else if (program.sunday == false) program.sunday = true;
				else program.sunday = false;
				break;
		}
	};

	const onTemplateSelectChange = (program: Program) => {
		program.template = onChangeTemplateName;
	};

	const onDurationSelectChange = (program: Program) => {
		program.duration = onChangeDuration;
	};
</script>

{#if $isOverlayOpen}
	<Overlay title="Delete this program forever?">
		<form method="POST" on:submit|preventDefault={handleDelete} class="flex flex-col">
			<div class="mb-8">
				Are you sure you want to delete this program forever? You will not be able to retieve this
				program in the future.
			</div>
			<button type="submit" class="btn btn-error"> Yes, delete forever. </button>
		</form>
	</Overlay>
{/if}
<div class="block w-full max-w-md m-auto">
	<div class="flex flex-col">
		<a
			href="/settings/programs"
			class="link text-sm flex items-center gap-2 hover:text-accent w-40 text-accent"
		>
			<iconify-icon icon="lucide:arrow-left-circle" width="24" />
			<span>back to Settings</span>
		</a>
		<h1 class="my-8">Edit program</h1>
		<form method="POST" on:submit|preventDefault={handleSubmit} class="flex flex-col">
			<div class="form-control">
				<label class="label justify-start">
					<span class="label-text w-[160px]">Program Name:</span>
					<input
						name="name"
						type="text"
						class="input input-bordered w-full max-w-xs"
						placeholder="Program Name..."
						bind:value={program.name}
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="label justify-start">
					<span class="label-text w-[160px]">Template:</span>
					<select
						bind:value={program.template}
						class="select select-bordered w-full max-w-xs"
						on:change|preventDefault={() => onTemplateSelectChange(program)}
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
					<span class="label-text w-[160px]">Duration:</span>
					<select
						bind:value={program.duration}
						class="select select-bordered w-full max-w-xs"
						on:change|preventDefault={() => onDurationSelectChange(program)}
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

			<div class="form-control">
				<label class="label cursor-pointer px-0">
					<div
						class="tooltip tooltip-right w-[160px] text-left"
						data-tip="Pick the days you would like to train each week by selected them"
					>
						<span class="label-text">Training Days </span>
						<iconify-icon class="text-accent" icon="lucide:info" width="16" />
					</div>
					<div class="flex flex-wrap flex-1 justify-start">
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Monday</span>
							<input
								name="monday"
								type="checkbox"
								checked={program.monday}
								on:change={() => updateDayStatus(program, 'monday')}
								class="checkbox"
							/>
						</label>
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Tuesday</span>
							<input
								name="tuesday"
								type="checkbox"
								checked={program.tuesday}
								on:change={() => updateDayStatus(program, 'tuesday')}
								class="checkbox"
							/>
						</label>
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Wednesday</span>
							<input
								name="wednesday"
								type="checkbox"
								checked={program.wednesday}
								on:change={() => updateDayStatus(program, 'wednesday')}
								class="checkbox"
							/>
						</label>
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Thursday</span>
							<input
								name="thursday"
								type="checkbox"
								checked={program.thursday}
								on:change={() => updateDayStatus(program, 'thursday')}
								class="checkbox"
							/>
						</label>
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Friday</span>
							<input
								name="friday"
								type="checkbox"
								checked={program.friday}
								on:change={() => updateDayStatus(program, 'friday')}
								class="checkbox"
							/>
						</label>
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Saturday</span>
							<input
								name="saturday"
								type="checkbox"
								checked={program.saturday}
								on:change={() => updateDayStatus(program, 'saturday')}
								class="checkbox"
							/>
						</label>
						<label class="w-28 label cursor-pointer">
							<span class="label-text">Sunday</span>
							<input
								name="sunday"
								type="checkbox"
								checked={program.sunday}
								on:change={() => updateDayStatus(program, 'sunday')}
								class="checkbox"
							/>
						</label>
					</div>
				</label>
			</div>
			<div class="form-control">
				<label class="flex justify-start flex-1 label cursor-pointer">
					<span class="label-text w-[160px]">Completed?</span>
					<input
						name="completed"
						type="checkbox"
						checked={program.completed}
						on:change={() => updateCompletedStatus(program)}
						class="checkbox"
					/>
				</label>
			</div>
			<div class="form-control">
				<label class="flex justify-start flex-1 label cursor-pointer">
					<span class="label-text w-[160px]">Active?</span>
					<input
						name="active"
						type="checkbox"
						checked={program.active}
						on:change={() => updateActiveStatus(program)}
						class="checkbox"
					/>
				</label>
			</div>

			<div class="flex justify-between items-center border-t border-base-content pt-7 mt-7">
				<div
					class="tooltip tooltip-right"
					data-tip={program.active
						? 'Not allowed to delete active programs'
						: 'Delete this program forever?'}
				>
					<button
						on:click|preventDefault={() => isOverlayOpen.set(true)}
						class="btn btn-outline {program.active ? 'btn-disabled' : ''}"
						><iconify-icon icon="lucide:trash-2" width="24" /></button
					>
				</div>
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
