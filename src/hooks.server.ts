import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event);
	event.locals.sb = supabaseClient;
	event.locals.session = session;

	let theme: string | null = null;
	const newTheme = event.url.searchParams.get('theme');
	console.log('theme', newTheme);
	const cookieTheme = event.cookies.get('colortheme');

	if (newTheme) {
		theme = newTheme;
	} else if (cookieTheme) {
		theme = cookieTheme;
	}

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme=""', `data-theme="${theme}"`)
		});
	}
	return resolve(event);
};

export const handleError: HandleServerError = ({ error, event }) => {
	console.error(event.url, error);
};
