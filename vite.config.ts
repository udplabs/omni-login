import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import replace from '@rollup/plugin-replace';

import type { UserConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE_');

	let defaultConfig: UserConfig = {
		plugins: [
			react(),
			tsConfigPaths(),
			replace({ preventAssignment: true, values: { 'process.env': JSON.stringify(env) } }),
		],
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
