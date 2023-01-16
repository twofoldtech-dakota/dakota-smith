import { goto } from '$app/navigation';
import { supabaseClient } from '$lib/supabase';
import type { Day, Program } from '$lib/types';
import { writable } from 'svelte/store';

export const isOverlayOpen = writable(false);

interface IProgram {
	name: string;
	completed: boolean;
	start: Date;
	id: number;
	active: boolean;
	days: Array<Day>;
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
	duration: number;
	template: string;
}
export const programs = writable<ArrayLike<IProgram> | []>([]);

export const loadPrograms = async () => {
	const user_id = (await supabaseClient.auth.getUser()).data.user?.id;
	const { data, error } = await supabaseClient.from('Programs').select('*').match({ user_id });

	if (error) {
		return console.error(error);
	}
	programs.set(data);
};
loadPrograms();

export const createDaysForProgram = async (
	name: string,
	active: boolean,
	label: string,
	categories: string,
	program_id: number
) => {
	const { data, error } = await supabaseClient
		.from('Days')
		.upsert({
			name,
			active,
			label,
			categories,
			program_id
		})
		.select('*');

	if (error) {
		return console.error(error);
	}
};

export const createProgram = async (
	name: string,
	active: boolean,
	week: Array<Day>,
	duration: number,
	template: string,
	user_id: string | unknown
) => {
	const { data, error } = await supabaseClient
		.from('Programs')
		.upsert({
			name,
			active,
			monday: week[0].active,
			tuesday: week[1].active,
			wednesday: week[2].active,
			thursday: week[3].active,
			friday: week[4].active,
			saturday: week[5].active,
			sunday: week[6].active,
			duration,
			template,
			user_id
		})
		.select('*');

	if (error) {
		return console.error(error);
	}
	programs.update((cur) => [...cur, data[0]]);
	goto('/settings/programs');
};

export const deleteProgram = async (id: number | unknown) => {
	const { error } = await supabaseClient.from('Programs').delete().match({ id });

	if (error) {
		return console.error(error);
	}

	programs.update((programs) => programs.filter((cur) => cur.id !== id));
	goto('/settings/programs');
};

export const updateProgram = async (program: Program) => {
	const { data, error } = await supabaseClient
		.from('Programs')
		.update({
			name: program.name,
			completed: program.completed,
			active: program.active,
			monday: program.monday,
			tuesday: program.tuesday,
			wednesday: program.wednesday,
			thursday: program.thursday,
			friday: program.friday,
			saturday: program.saturday,
			sunday: program.sunday
		})
		.match({ id: program.id });

	if (error) {
		return console.error('here', error);
	}

	programs.update((programs) => {
		let index = -1;
		for (let i = 0; i < programs.length; i++) {
			if (programs[i].id === program.id) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			programs[index].name = program.name;
			programs[index].completed = program.completed;
			programs[index].active = program.active;
			programs[index].monday = program.monday;
			programs[index].tuesday = program.tuesday;
			programs[index].wednesday = program.wednesday;
			programs[index].thursday = program.thursday;
			programs[index].friday = program.friday;
			programs[index].saturday = program.saturday;
			programs[index].sunday = program.sunday;
		}
		return programs;
	});

	goto('/settings/programs');
};
