import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
	plugins: [
		federation({
			name: 'host-app',
			remotes: {
				// "ReferenceError: __rf_placeholder__shareScope is not defined"
				dummy: 'dummy.js'
			}
		}),
		sveltekit()
	]
});
