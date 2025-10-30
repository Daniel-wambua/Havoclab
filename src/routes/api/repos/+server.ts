import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GITHUB_USERNAME, GITHUB_API_URL } from '$lib/constants';
import { env } from '$env/dynamic/private';
import projectImages from '$lib/project-images.json';

// Helper to get GitHub token from multiple sources
function getGitHubToken(): string | undefined {
	// Try multiple sources (Vite loads .env into process.env)
	return env.GITHUB_TOKEN || process.env.GITHUB_TOKEN || import.meta.env.GITHUB_TOKEN;
}

// Helper to get GitHub headers with optional token
function getGitHubHeaders() {
	const headers: Record<string, string> = {
		'Accept': 'application/vnd.github.v3+json',
		'User-Agent': 'HavocLab-Showcase'
	};
	
	const token = getGitHubToken();
	
	if (token) {
		// GitHub Personal Access Tokens use 'token' prefix, not 'Bearer'
		// Fine-grained tokens use 'Bearer', classic tokens use 'token'
		// Try to auto-detect based on token format
		const authPrefix = token.startsWith('github_pat_') ? 'Bearer' : 'token';
		headers['Authorization'] = `${authPrefix} ${token}`;
		console.log('Using auth prefix:', authPrefix);
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
		const token = getGitHubToken();
		
		// Debug: Log token status (without exposing the actual token)
		console.log('===== DEBUG: GitHub Token Status =====');
		console.log('Token from env.GITHUB_TOKEN:', !!env.GITHUB_TOKEN);
		console.log('Token from process.env:', !!process.env.GITHUB_TOKEN);
		console.log('Token from import.meta.env:', !!(import.meta.env.GITHUB_TOKEN as string));
		console.log('Final token present:', !!token);
		console.log('Token length:', token?.length || 0);
		console.log('Token prefix:', token?.substring(0, 4) || 'none');
		console.log('======================================');
		
		// Use authenticated endpoint to fetch both public and private repos
		// Falls back to public-only if no token is provided
		const endpoint = token
			? `${GITHUB_API_URL}/user/repos?per_page=100&sort=updated&affiliation=owner` 
			: `${GITHUB_API_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
		
		console.log('Using endpoint:', endpoint.split('?')[0]); // Log endpoint without query params
		
		const response = await fetch(endpoint, {
			headers: getGitHubHeaders()
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('GitHub API Error:', response.status, errorText);
			throw new Error(`GitHub API responded with status: ${response.status}`);
		}

		const repos = await response.json();

		// Debug: Log repo counts
		console.log('Total repos fetched:', repos.length);
		console.log('Private repos:', repos.filter((r: any) => r.private).length);
		console.log('Public repos:', repos.filter((r: any) => !r.private).length);

	// Filter out forks and archived repos
	const filteredRepos = repos.filter((repo: any) => !repo.fork && !repo.archived);
	
	console.log('After filtering (no forks/archived):', filteredRepos.length);

	// Fetch images for each repo (prioritize manual images)
	const reposWithImages = await Promise.all(
		filteredRepos.slice(0, 20).map(async (repo: any) => {
			// Check if manual image is configured first
			const manualImage = projectImages[repo.name as keyof typeof projectImages];
			
			// If manual image exists, use it; otherwise fetch from README
			const image = manualImage || await getReadmeImage(repo.name);
			
			return {
				...repo,
				image: image || null
			};
		})
	);

	// Add remaining repos without fetching images
	const remainingRepos = filteredRepos.slice(20).map((repo: any) => ({
		...repo,
		image: projectImages[repo.name as keyof typeof projectImages] || null
	}));		return json([...reposWithImages, ...remainingRepos]);
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return json({ error: 'Failed to fetch repositories' }, { status: 500 });
	}
};
