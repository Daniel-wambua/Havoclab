/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				accent: '#00AEEF',
				dark: {
					bg: '#0a0a0f',
					card: '#151520',
					border: '#1f1f2e'
				}
			},
			backdropBlur: {
				xs: '2px'
			}
		}
	},
	plugins: []
};
