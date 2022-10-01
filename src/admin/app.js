// path: ./yourProjectName/src/admin/app.js

import Logo from './extensions/trnr-logo.jpg';
// import favicon from './extensions/favicon.ico';

export default {
    config: {
        // Replace the Strapi logo in auth (login) views
        auth: {
            logo: Logo,
        },
        // Replace the favicon
        // head: {
        //   favicon: favicon,
        // },
        // Add a new locale, other than 'en'
        locales: [],
        // Replace the Strapi logo in the main navigation
        menu: {
            logo: Logo,
        },
        // Override or extend the theme
        // theme: {
        //     colors: {
        //         primary100: '#bbb',
        //         primary200: '#ccc',
        //         primary500: '#ddd',
        //         primary600: '#eee',
        //         primary700: '#fff',
        //         danger700: '#b72b1a'

        //     },
        // },
        // Extend the translations
        translations: {
            en: {
                "app.components.LeftMenu.navbrand.title": "TRNR Dashboard",
                "app.components.LeftMenu.navbrand.workplace": "App",
            },
        },
        // Disable video tutorials
        tutorials: false,
        // Disable notifications about new Strapi releases
        notifications: { release: false },
    },

    bootstrap() { },


};
