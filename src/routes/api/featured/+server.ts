import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import featuredProjects from '$lib/featured.json';

export const GET: RequestHandler = async () => {
	return json(featuredProjects);
};
