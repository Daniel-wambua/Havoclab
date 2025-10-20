import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_USERNAME, GITHUB_API_URL } from '$lib/constants';

// Function to extract first image from README
async function getReadmeImage(repoName: string): Promise<string | null> {
	try {
		const readmeResponse = await fetch(
			`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
			{
				headers: {
					'Accept': 'application/vnd.github.v3+json',
					'User-Agent': 'HavocLab-Showcase'
				}
			}
		);

		if (!readmeResponse.ok) return null;

		const readmeData = await readmeResponse.json();
		const content = atob(readmeData.content);

		// Extract first image from markdown (various formats)
		const imagePatterns = [
			/!\[.*?\]\((https?:\/\/[^\)]+)\)/,  // ![alt](url)
			/<img[^>]+src=["'](https?:\/\/[^"']+)["']/,  // <img src="url">
			/\[!\[.*?\]\(.*?\)\]\((https?:\/\/[^\)]+)\)/  // [![alt](badge)](url)
		];

		for (const pattern of imagePatterns) {
			const match = content.match(pattern);
			if (match && match[1]) {
				// Skip badges and shields.io images
				if (match[1].includes('shields.io') || match[1].includes('badge')) continue;
				return match[1];
			}
		}

		return null;
	} catch (error) {
		return null;
	}
}

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

		// Fetch README images for each repo (limit to first 20 to avoid rate limits)
		const reposWithImages = await Promise.all(
			filteredRepos.slice(0, 20).map(async (repo: any) => {
				const image = await getReadmeImage(repo.name);
				return {
					...repo,
					image: image || repo.owner?.avatar_url || null
				};
			})
		);

		// Add remaining repos without fetching images
		const remainingRepos = filteredRepos.slice(20).map((repo: any) => ({
			...repo,
			image: repo.owner?.avatar_url || null
		}));

		return json([...reposWithImages, ...remainingRepos]);
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return json({ error: 'Failed to fetch repositories' }, { status: 500 });
	}
};
