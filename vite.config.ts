import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const defaultConfig: UserConfig = {
		plugins: [react(), tsConfigPaths()],
		build: {
			rollupOptions: {
				output: {
					entryFileNames: `bundle.js`,
					chunkFileNames: `bundle.js`,
					assetFileNames: `[name].[ext]`,
				},
			},
		},
	};

	if (mode !== 'production') {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		defaultConfig.build!.minify = false;
	}

	return defaultConfig;
});
