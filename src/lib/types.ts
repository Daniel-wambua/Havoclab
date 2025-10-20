export interface Repository {
	id: number;
	name: string;
	description: string | null;
	html_url: string;
	homepage: string | null;
	language: string | null;
	stargazers_count: number;
	topics: string[];
	featured?: boolean;
	icon?: string;
}

export interface FeaturedProject {
	name: string;
	description: string;
	language: string;
	html_url: string;
	homepage?: string;
	image?: string;
	icon?: string;
}
