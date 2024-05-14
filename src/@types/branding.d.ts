declare global {
	namespace UL {
		interface Branding {
			colors: {
				primaryButton: string;
				primaryButtonLabel: string;
				secondaryButton: string;
				secondaryButtonBorder: string;
				secondaryButtonLabel: string;
				baseFocusColor?: string;
				baseHoverColor?: string;
				linksFocusedComponents: string;
				header: string;
				bodyText: string;
				widgetBackground: string;
				widgetBorder: string;
				inputLabelsPlaceholders: string;
				inputFilledText: string;
				inputBorder: string;
				inputBackground: string;
				icons: string;
				error: string;
				success: string;
			};
			fonts: {
				fontUrl: string;
				referenceTextSize: number;
				title: FontStyle;
				subtitle: FontStyle;
				bodyText: FontStyle;
				buttonsText: FontStyle;
				inputLabels: FontStyle;
				links: FontStyle;
				linksStyle: 'normal' | 'underlined';
			};
			borders: {
				buttonBorderWeight: number;
				buttonsStyle: EdgeStyle;
				buttonBorderRadius: number;
				inputBorderWeight: number;
				inputsStyle: EdgeStyle;
				inputBorderRadius: number;
				widgetCornerRadius: number;
				widgetBorderWeight: number;
				showWidgetShadow: boolean;
			};
			widget: {
				logoPosition: ElementPlacement;
				logoUrl: string;
				logoHeight: number;
				headerTextAlignment: ElementPlacement;
				socialButtonsLayout: 'top' | 'bottom';
			};
			pageBackground: {
				pageLayout: ElementPlacement;
				backgroundColor: string;
				backgroundImageUrl: string;
			};
		}
	}
}

export {};
