import RobotoWoff from "#assets/fonts/roboto-v29-latin-regular.woff";
import RobotoWoff2 from "#assets/fonts/roboto-v29-latin-regular.woff2";
import RobotoMonoWoff from "#assets/fonts/roboto-mono-v21-latin-regular.woff";
import RobotoMonoWoff2 from "#assets/fonts/roboto-mono-v21-latin-regular.woff2";

const fontFamily = [
	"Roboto",
	"BlinkMacSystemFont",
	"-apple-system",
	"Segoe UI",
	"Oxygen",
	"Ubuntu",
	"Cantarell",
	"Fira Sans",
	"Droid Sans",
	"Helvetica Neue",
	"Helvetica",
	"Montserrat",
	"Arial",
	"sans-serif",
	'"Apple Color Emoji"',
	'"Segoe UI Emoji"',
	'"Segoe UI Symbol"'
].join(",");

const astroUXDSTheme = {
	primary: {
		lighten4: "#CBDEE9",
		lighten3: "#98BDD3",
		lighten2: "#649CBD",
		lighten1: "#2F7AA7",
		base: "#005A8f",
		darken1: "#004872",
		darken2: "#003655",
		darken3: "#002439",
		darken4: "#00121C"
	},
	secondary: {
		lighten4: "#DAEEFF",
		lighten3: "#B7DCFF",
		lighten2: "#92CBFF",
		lighten1: "#6EBAFF",
		base: "#4DACFF",
		darken1: "#3A87CF",
		darken2: "#2B659B",
		darken3: "#1D4367",
		darken4: "#0E2234"
	},
	tertiary: {
		lighten4: "#D4D8DD", // 100
		lighten3: "#A9B2BC", // 200
		lighten2: "#7E8C9B", // 300
		lighten1: "#52667A", // 400
		base: "#274059", // 500
		darken1: "#1F3347", // 600
		darken2: "#172635", // 700
		darken3: "#101923", // 800
		darken4: "#080C11" // 900
	},
	quaternary: {
		lighten4: "#F5F6F9",
		lighten3: "#EAEEF4",
		lighten2: "#E1E6EF",
		lighten1: "#D7DEE9",
		base: "#CED6E4",
		darken1: "#A4ABB6",
		darken2: "#7B8089",
		darken3: "#51555B",
		darken4: "#292A2D"
	},
	tag: {
		tag1: {
			lighten4: "#D0F4F",
			lighten3: "#A1E9EB",
			lighten2: "#70DDE0",
			lighten1: "#3ED2D6",
			base: "#00C7CB",
			darken1: "#009FA3",
			darken2: "#00777A",
			darken3: "#035051",
			darken4: "#032828"
		},
		tag2: {
			lighten4: "#E4E2F7",
			lighten3: "#C9C5ED",
			lighten2: "#AEA8E5",
			lighten1: "#938BDB",
			base: "#786DD3",
			darken1: "#6058A8",
			darken2: "#48417F",
			darken3: "#302C54",
			darken4: "#18152B"
		},
		tag3: {
			lighten4: "#EDCEF3",
			lighten3: "#DA9CE7",
			lighten2: "#C76ADA",
			lighten1: "#B534CE",
			base: "#A200C1",
			darken1: "#81009A",
			darken2: "#610074",
			darken3: "#41004D",
			darken4: "#200227"
		},
		tag4: {
			lighten4: "#F8DDD1",
			lighten3: "#F0BAA3",
			lighten2: "#EA9875",
			lighten1: "#E27545",
			base: "#DA5309",
			darken1: "#AF420A",
			darken2: "#833209",
			darken3: "#572108",
			darken4: "#2b1105"
		},
		status: {
			pass: "#015800",
			fail: "#570D01",
			unknown: "#32363A"
		}
	},
	status: {
		critical: {
			400: "#FF5F60",
			500: "#FF3838",
			600: "#FF2A04",
			800: "#B34343",
			900: "#661102"
		},
		serious: {
			500: "#FFB302",
			600: "#FFAF3D",
			900: "#664618"
		},
		caution: {
			400: "#FDED61",
			500: "#FCE83A",
			600: "#FAD800",
			800: "#B1A644",
			900: "#645600"
		},
		normal: {
			400: "#99F666",
			500: "#56F000",
			600: "#00E200",
			800: "#6BAC47",
			900: "#005A00"
		},
		standby: {
			400: "#5CE2FF",
			500: "#64D9FF",
			600: "#2DCCFF",
			800: "#409EB3",
			900: "#285766"
		},
		off: {
			400: "#CED6E4",
			500: "#9EA7AD",
			600: "#8E9AA3",
			900: "#393E41"
		}
	},
	classification: {
		unclassified: "#007A33",
		cui: "#502B85",
		confidential: "0033A0",
		secret: "#C8102E",
		topSecret: "#FF8C00",
		topSecretSCI: "#FCE83A"
	},
	snowflakes: {
		dark: {
			surface: "#1B2D3E",
			selected: "#1C3F5E",
			tableHover: "#374E65",
			listHover: "#142435",
			dialogHeader: "#172533",
			placeholder: "#9FA3A7"
		},
		light: {
			surface: "#FFFFFF",
			selected: "#CEE9FC",
			tableHover: "#A4BCCD",
			listHover: "#E2EDF6",
			dialogHeader: "#F7F8FB",
			placeholder: "#76787D"
		}
	}
};

const getDesignTokens = mode => ({
	astroUXDSTheme,
	components: {
		MuiCssBaseline: {
			styleOverrides: `
                /* roboto-regular - latin */
                @font-face {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 400;
                src: local(''),
                    url(${RobotoWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url(${RobotoWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                }

				/* roboto-mono-regular - latin */
                @font-face {
                font-family: 'Roboto Mono';
                font-style: normal;
                font-weight: 400;
                src: local(''),
                    url(${RobotoMonoWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
                    url(${RobotoMonoWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
                }
      `
		}
	},
	palette: {
		mode,
		...(mode === "dark"
			? {
					// palette values for dark mode
					active: astroUXDSTheme.secondary.darken2,
					background: {
						default: astroUXDSTheme.tertiary.darken3,
						paper: astroUXDSTheme.snowflakes.dark.surface
					},
					dialogHeader: astroUXDSTheme.snowflakes.dark.dialogHeader,
					classification: {
						confidential: astroUXDSTheme.classification.confidential,
						cui: astroUXDSTheme.classification.cui,
						secret: astroUXDSTheme.classification.secret,
						topSecret: astroUXDSTheme.classification.topSecret,
						topSecretSCI: astroUXDSTheme.classification.topSecretSCI,
						unclassified: astroUXDSTheme.classification.unclassified
					},
					gsb: {
						background: astroUXDSTheme.tertiary.darken2,
						primary: astroUXDSTheme.secondary.base,
						text: "#FFF"
					},
					hover: {
						default: astroUXDSTheme.secondary.lighten2,
						list: astroUXDSTheme.snowflakes.dark.listHover,
						table: astroUXDSTheme.snowflakes.dark.tableHover
					},
					primary: {
						main: astroUXDSTheme.secondary.base
					},
					primaryAlt: astroUXDSTheme.secondary.darken1,
					selected: astroUXDSTheme.snowflakes.dark.selected,
					status: {
						caution: {
							banner: astroUXDSTheme.status.caution[400],
							bannerIcon: astroUXDSTheme.status.caution[800],
							border: "rgba(0,0,0,0)",
							fill: astroUXDSTheme.status.caution[500]
						},
						critical: {
							banner: astroUXDSTheme.status.critical[400],
							bannerIcon: astroUXDSTheme.status.critical[800],
							border: "rgba(0,0,0,0)",
							fill: astroUXDSTheme.status.critical[500]
						},
						normal: {
							banner: astroUXDSTheme.status.normal[400],
							bannerIcon: astroUXDSTheme.status.normal[800],
							border: "rgba(0,0,0,0)",
							fill: astroUXDSTheme.status.normal[500]
						},
						off: {
							banner: astroUXDSTheme.status.off[400],
							border: "rgba(0,0,0,0)",
							fill: astroUXDSTheme.status.off[500]
						},
						serious: {
							border: "rgba(0,0,0,0)",
							fill: astroUXDSTheme.status.serious[500]
						},
						standby: {
							banner: astroUXDSTheme.status.standby[400],
							bannerIcon: astroUXDSTheme.status.standby[800],
							border: "rgba(0,0,0,0)",
							fill: astroUXDSTheme.status.standby[600]
						}
					},
					surface: astroUXDSTheme.snowflakes.dark.surface,
					text: {
						banner: {
							light: "#FFF",
							dark: "#000"
						},
						inverse: astroUXDSTheme.tertiary.darken4,
						link: {
							hover: astroUXDSTheme.secondary.lighten2,
							ready: astroUXDSTheme.secondary.base
						},
						placeholder: astroUXDSTheme.snowflakes.dark.placeholder,
						primary: "#FFFFFF",
						secondary: astroUXDSTheme.tertiary.lighten4,
						selected: {
							hover: astroUXDSTheme.secondary.base,
							ready: astroUXDSTheme.secondary.base
						},
						tab: {
							hover: astroUXDSTheme.secondary.lighten2,
							selected: "#FFF",
							unselected: astroUXDSTheme.secondary.base
						}
					}
			  }
			: {
					// palette values for light mode
					active: astroUXDSTheme.primary.lighten2,
					background: {
						default: astroUXDSTheme.quaternary.lighten3,
						paper: "#FFFFFF"
					},
					dialogHeader: astroUXDSTheme.snowflakes.light.dialogHeader,
					classification: {
						confidential: astroUXDSTheme.classification.confidential,
						cui: astroUXDSTheme.classification.cui,
						secret: astroUXDSTheme.classification.secret,
						topSecret: astroUXDSTheme.classification.topSecret,
						topSecretSCI: astroUXDSTheme.classification.topSecretSCI,
						unclassified: astroUXDSTheme.classification.unclassified
					},
					gsb: {
						background: astroUXDSTheme.tertiary.darken2,
						primary: astroUXDSTheme.secondary.base,
						text: "#FFF"
					},
					hover: {
						default: astroUXDSTheme.primary.darken1,
						list: astroUXDSTheme.snowflakes.light.listHover,
						table: astroUXDSTheme.snowflakes.light.tableHover
					},
					primary: {
						main: astroUXDSTheme.primary.base
					},
					primaryAlt: astroUXDSTheme.primary.lighten1,
					selected: astroUXDSTheme.snowflakes.light.selected,
					status: {
						caution: {
							banner: astroUXDSTheme.status.caution[400],
							bannerIcon: astroUXDSTheme.status.caution[800],
							border: astroUXDSTheme.status.caution[900],
							fill: astroUXDSTheme.status.caution[600]
						},
						critical: {
							banner: astroUXDSTheme.status.critical[400],
							bannerIcon: astroUXDSTheme.status.critical[800],
							border: astroUXDSTheme.status.critical[900],
							fill: astroUXDSTheme.status.critical[600]
						},
						normal: {
							banner: astroUXDSTheme.status.normal[400],
							bannerIcon: astroUXDSTheme.status.normal[800],
							border: astroUXDSTheme.status.normal[900],
							fill: astroUXDSTheme.status.normal[600]
						},
						off: {
							banner: astroUXDSTheme.status.off[400],
							border: astroUXDSTheme.status.off[900],
							fill: astroUXDSTheme.status.off[600]
						},
						serious: {
							border: astroUXDSTheme.status.serious[900],
							fill: astroUXDSTheme.status.serious[600]
						},
						standby: {
							banner: astroUXDSTheme.status.standby[400],
							bannerIcon: astroUXDSTheme.status.standby[800],
							border: astroUXDSTheme.status.standby[900],
							fill: astroUXDSTheme.status.standby[500]
						}
					},
					surface: "#FFFFFF",
					text: {
						banner: {
							light: "#FFF",
							dark: "#000"
						},
						inverse: "#FFFFFF",
						link: {
							hover: astroUXDSTheme.primary.darken1,
							ready: astroUXDSTheme.primary.base
						},
						placeholder: astroUXDSTheme.snowflakes.light.placeholder,
						primary: astroUXDSTheme.quaternary.darken4,
						secondary: astroUXDSTheme.tertiary.darken3,
						selected: {
							hover: astroUXDSTheme.primary.base,
							ready: astroUXDSTheme.primary.base
						},
						tab: {
							hover: astroUXDSTheme.primary.darken1,
							selected: astroUXDSTheme.quaternary.darken4,
							unselected: astroUXDSTheme.primary.base
						}
					}
			  })
	},
	typography: {
		fontFamily,
		button: {
			fontFamily
		},
		body1: {
			fontFamily,
			fontSize: "1rem",
			fontWeight: 400,
			letterSpacing: 0.5
		},
		body2: {
			fontFamily,
			fontSize: "0.875rem",
			fontWeight: 400,
			letterSpacing: 0.5
		},
		body3: {
			fontFamily,
			fontSize: "1rem",
			fontWeight: 400,
			letterSpacing: 0
		},
		caption: {
			fontFamily
		},
		h1: {
			fontFamily,
			fontSize: "0.75rem",
			fontWeight: 400,
			letterSpacing: 0.25
		},
		h2: {
			fontFamily,
			fontSize: "1.5rem",
			fontWeight: 400,
			letterSpacing: 0
		},
		h3: {
			fontFamily,
			fontSize: "1.25rem",
			fontWeight: 500,
			letterSpacing: 0.15
		},
		h4: {
			fontFamily,
			fontSize: "1.25rem",
			fontWeight: 300,
			letterSpacing: 0.15
		},
		h5: {
			fontFamily,
			fontSize: "0.88rem",
			fontWeight: 400,
			letterSpacing: 0
		},
		h6: {
			fontFamily,
			fontSize: "0.88rem",
			fontWeight: 300,
			letterSpacing: 0
		},
		mono: {
			fontFamily: "'Roboto Mono', monospace"
		},

		overline: {
			fontFamily
		},
		subtitle1: {
			fontFamily
		},
		subtitle2: {
			fontFamily
		}
	}
});

export default getDesignTokens;
