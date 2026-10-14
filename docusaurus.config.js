// @ts-check
// La dirección pública del sitio llega por variables de entorno al desplegar
// (ver docs/despliegue/desplegar-este-sitio.md). Los valores por defecto sirven para desarrollo local.
const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
const baseUrl = process.env.BASE_URL || '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'CargaExpress Docs',
  tagline: 'Documentación técnica de la torre de control y sus herramientas',
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
    defaultLocale: 'es',
    locales: ['es'],
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
          { type: 'docSidebar', sidebarId: 'mainSidebar', position: 'left', label: 'Documentación' },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Documentación del proyecto CargaExpress Control Tower. Los datos de los ejemplos son simulados.`,
      },
      prism: {
        additionalLanguages: ['bash', 'powershell', 'yaml', 'json', 'docker'],
      },
      colorMode: { respectPrefersColorScheme: true },
    }),
};

module.exports = config;
