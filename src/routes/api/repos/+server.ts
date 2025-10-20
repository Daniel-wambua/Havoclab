import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_USERNAME, GITHUB_API_URL } from '$lib/constants';
import { env } from '$env/dynamic/private';

// Helper to get GitHub headers with optional token
function getGitHubHeaders() {
	const headers: Record<string, string> = {
		'Accept': 'application/vnd.github.v3+json',
		'User-Agent': 'HavocLab-Showcase'
	};
	
	if (env.GITHUB_TOKEN) {
		headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
	}
	
	return headers;
}

// Function to extract first image from README
async function getReadmeImage(repoName: string): Promise<string | null> {
	try {
		const readmeResponse = await fetch(
			`${GITHUB_API_URL}/repos/${GITHUB_USERNAME}/${repoName}/readme`,
			{
				headers: getGitHubHeaders()
			}
		);

		if (!readmeResponse.ok) return null;

		const readmeData = await readmeResponse.json();
		const content = atob(readmeData.content);

		// Extract all images from markdown (various formats)
		const allImages: string[] = [];
		
		// Pattern 1: ![alt](url)
		const markdownImages = content.matchAll(/!\[.*?\]\((https?:\/\/[^\)]+)\)/g);
		for (const match of markdownImages) {
			allImages.push(match[1]);
		}
		
		// Pattern 2: <img src="url">
		const htmlImages = content.matchAll(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/g);
		for (const match of htmlImages) {
			allImages.push(match[1]);
		}

	// Filter out unwanted images (badges, buttons, small icons)
	const goodImages = allImages.filter(url => {
		const lowerUrl = url.toLowerCase();
		
		// Skip obvious non-content images
		const skipPatterns = [
			'shields.io',
			'badge',
			'vercel.com/button',
			'netlify.com/img',
			'.svg',  // Skip SVG icons/badges
			'avatar',
			'githubusercontent.com/' + GITHUB_USERNAME.toLowerCase(),
			'github.com/identicons',
			'cdn.shopify.com',
			'havoc_logo'
		];
		
		// Skip if matches any skip pattern
		return !skipPatterns.some(pattern => lowerUrl.includes(pattern));
	});

	// Prioritize images with certain keywords (screenshots, demo, preview, project images)
	const priorityImages = goodImages.filter(url => {
		const lowerUrl = url.toLowerCase();
		return lowerUrl.includes('screenshot') ||
			   lowerUrl.includes('demo') ||
			   lowerUrl.includes('preview') ||
			   lowerUrl.includes('example') ||
			   lowerUrl.includes('image.png') ||
			   lowerUrl.includes('image.jpg') ||
			   lowerUrl.includes('image.jpeg') ||
			   lowerUrl.includes('screenshot.png') ||
			   lowerUrl.includes('demo.png') ||
			   lowerUrl.includes('preview.png') ||
			   lowerUrl.includes('app.png') ||
			   lowerUrl.includes('project.png') ||
			   lowerUrl.includes('showcase') ||
			   lowerUrl.includes('thumbnail') ||
			   lowerUrl.includes('cover') ||
			   lowerUrl.match(/\.(png|jpg|jpeg|webp|gif)$/);
	});		// Return priority image or first good image
		return priorityImages[0] || goodImages[0] || null;
	} catch (error) {
		return null;
	}
}

export const GET: RequestHandler = async () => {
	try {
		const response = await fetch(`${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
			headers: getGitHubHeaders()
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('GitHub API Error:', response.status, errorText);
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
					image: image || null
				};
			})
		);

		// Add remaining repos without fetching images
		const remainingRepos = filteredRepos.slice(20).map((repo: any) => ({
			...repo,
			image: null
		}));

		return json([...reposWithImages, ...remainingRepos]);
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return json({ error: 'Failed to fetch repositories' }, { status: 500 });
	}
};
