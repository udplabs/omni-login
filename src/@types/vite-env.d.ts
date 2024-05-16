/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DEFAULT_SCREEN_PROMPT?: string;
	readonly VITE_DEFAULT_SCREEN?: string;
	/**
	 * This is a comma delimited list of pipe delimited data.
	 *
	 * Each "item" in the comma delimited list is composed of a piped set of data that starts with the clientId followed by the social connections enabled for it.
	 *
	 * For example, if the clientId is Gpd2XzXW1kajkjLysFyS19gAAEyNOwSr and Google and Microsoft are enabled, you would set `Gpd2XzXW1kajkjLysFyS19gAAEyNOwSr|google-oauth2|windowslive`
	 *
	 * You would then set this in the comma delimited string -- one for each client.
	 *
	 * This will be parsed by the application.
	 *
	 * @example `Gpd2XzXW1kajkjLysFyS19gAAEyNOwSr|google-oauth2|windowslive,nLXTcpxZLhOsvPdx4EgsCii5vYfyXYb0|google-oauth2`
	 */
	readonly VITE_SOCIAL_CONNECTIONS?: string;
}
