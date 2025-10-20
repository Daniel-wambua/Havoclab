import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_USERNAME, GITHUB_API_URL } from '$lib/constants';

export const GET: RequestHandler = async () => {
	try {
		const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
			headers: {
				'Accept': 'application/vnd.github.v3+json',
				'User-Agent': 'HavocLab-Showcase'
			}
		});

		if (!response.ok) {
			throw new Error(`GitHub API responded with status: ${response.status}`);
		}

		const repos = await response.json();

		// Filter out forks and archived repos
		const filteredRepos = repos.filter((repo: any) => !repo.fork && !repo.archived);

		return json(filteredRepos);
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return json({ error: 'Failed to fetch repositories' }, { status: 500 });
	}
};
