import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { reactScopedCssPlugin } from 'rollup-plugin-react-scoped-css';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		strictPort: true,
		port: 5173,
		watch: {
			usePolling: true,
		},
	},
	plugins: [react(), reactScopedCssPlugin()],
});
