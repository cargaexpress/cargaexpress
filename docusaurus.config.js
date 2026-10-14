// @ts-check
// The public address of the site comes from environment variables at deploy time
// (see docs/deployment/deploying-to-s3.md). The defaults are meant for local development.
const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
const baseUrl = process.env.BASE_URL || '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CargaExpress Docs',
  tagline: 'Technical documentation for the control tower and its tools',
  favicon: 'img/favicon.svg',

  url: siteUrl,
  baseUrl,
  trailingSlash: true,

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'CargaExpress Docs',
        logo: { alt: 'CargaExpress', src: 'img/logo.svg' },
        items: [
          { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Documentation' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `CargaExpress Control Tower project documentation. The example data is simulated.`,
      },
      prism: {
        additionalLanguages: ['bash', 'powershell', 'yaml', 'json', 'docker'],
      },
      colorMode: { respectPrefersColorScheme: true },
    }),
};

module.exports = config;
