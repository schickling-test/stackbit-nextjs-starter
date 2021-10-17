const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const themeStyle = require('./content/data/theme-style.json');

module.exports = {
    presets: [require('@stackbit/components/styles/default/tailwind.default.config.js')],
    mode: 'jit',
    purge: {
        enabled: true,
        content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@stackbit/components/{base,layouts,components}/**/*.{js,ts,jsx,tsx}', './content/**' /* for ThemeStyle object */],
        safelist: ['colors-a', 'colors-b', 'colors-c', 'colors-d', 'colors-e', 'colors-f', 'colors-g', 'colors-h', 'colors-i']
    },
    darkMode: false,
    theme: {
        extend: {
            colors: {
                body: themeStyle.body,
                headlines: themeStyle.headlines,
                primary: themeStyle.primary,
                secondary: themeStyle.secondary,
                neutral: themeStyle.neutral,
                complementary: themeStyle.complementary,
                'complementary-alt': themeStyle.complementaryAlt,
                info: themeStyle.info,
                success: themeStyle.success,
                warning: themeStyle.warning
            },
            fontFamily: {
                body:  themeStyle.fontBody,
                headlines: themeStyle.fontHeadlines
            },
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
            addBase({
                '.sb-component-button-primary': { borderRadius: themeStyle.buttonPrimary.radius + 'px', textTransform: themeStyle.buttonPrimary.case },
                '.sb-component-button-secondary': { borderRadius: themeStyle.buttonSecondary.radius + 'px', textTransform: themeStyle.buttonSecondary.case }
            })
        })
    ]
};

