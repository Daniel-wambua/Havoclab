export interface Repository {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	language: string | null;
	stargazers_count?: number;
	forks_count?: number;
	updated_at?: string;
	topics: string[];
	featured?: boolean;
	icon?: string;
	image?: string | null;
}

export interface FeaturedProject {
	name: string;
	description: string;
	language: string;
	html_url: string;
	homepage?: string;
	image?: string;
	icon?: string;
	stargazers_count?: number;
	forks_count?: number;
	updated_at?: string;
}
