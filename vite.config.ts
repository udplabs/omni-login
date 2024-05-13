import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';

import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	let defaultConfig: UserConfig = {
		plugins: [react(), tsConfigPaths()],
		build: {
			rollupOptions: {
				output: {
					entryFileNames: `bundle.js`,
					chunkFileNames: `bundle.js`,
					assetFileNames: (assetInfo) => {
						const fontRegex = /\.(woff2?|eot|ttf|otf)(\?.*)?$/;

						if (assetInfo?.name && fontRegex.test(assetInfo.name)) {
							return `fonts/${assetInfo.name}`;
						}
						return `[name].[ext]`;
					},
				},
			},
		},
	};

	if (mode !== 'production') {
		defaultConfig = {
			...defaultConfig,
			build: {
				...defaultConfig?.build,
				minify: false,
			},
			server: {
				...defaultConfig?.server,
				port: 3000,
			},
		};
	}

	return defaultConfig;
});
