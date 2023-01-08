<script lang="ts">
	import type { Day, Lift } from '$lib/types';
	import LiftForm from './LiftForm.svelte';

	export let day: Day;
	let isDayActive = false;
	const updateDayStatus = async (day: Day) => {
		if (day.active == null) day.active = false;
		else if (day.active == false) day.active = true;
		else day.active = false;

		isDayActive = day.active;
	};

	const updateDayCategories = async (category: Category) => {
		if (category.active == null) category.active = false;
		else if (category.active == false) category.active = true;
		else category.active = false;

		console.log('cat', category);
		console.log('Categories', dayCategories);
	};
	type Category = {
		name: string;
		active: boolean;
	};
	let dayCategories: Array<Category> = [
		{ name: 'Back', active: false },
		{ name: 'Biceps', active: false },
		{ name: 'Calves', active: false },
		{ name: 'Chest', active: false },
		{ name: 'Forearms', active: false },
		{ name: 'Legs', active: false },
		{ name: 'Shoulders', active: false },
		{ name: 'Traps', active: false },
		{ name: 'Triceps', active: false },
		{ name: 'Abs', active: false },
		{ name: 'Cardio', active: false },
		{ name: 'Other', active: false }
	];
</script>

<div class="w-full my-3">
	<div class="collapse border border-base-300 rounded-xl">
		<input type="checkbox" checked={isDayActive} on:change={() => updateDayStatus(day)} />
		<div
			class="collapse-title font-medium flex justify-between items-center bg-base-300 py-4 px-6 {isDayActive
				? 'rounded-t-lg'
				: 'rounded-lg'}"
		>
			<div class={isDayActive ? 'underline font-bold' : 'line-through'}>{day.name}</div>
			<iconify-icon icon="lucide:{isDayActive == true ? 'check-square' : 'x-square'}" width="24" />
		</div>
		<div class="collapse-content rounded-b-lg">
			<div class="form-control">
				<label class="label flex-col justify-between items-center flex-wrap gap-2 p-3">
					<span class="label-text text-left w-full"
						>What body parts would you like to train on this day?
					</span>
					<div class="flex justify-start items-center flex-wrap gap-3">
						{#each dayCategories as item}
							<label class="label cursor-pointer">
								<span class="label-text pr-1">{item.name}</span>
								<input
									type="checkbox"
									checked={item.active}
									class="checkbox checkbox-primary{item.active ? 'bg-green-400' : 'bg-red-400'}"
								/>
							</label>
						{/each}
					</div>
				</label>
			</div>
		</div>
	</div>
</div>
