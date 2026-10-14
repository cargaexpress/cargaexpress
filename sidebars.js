// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Webhook simulator (HU-17)',
      collapsed: false,
      items: [
        'simulator/overview',
        'simulator/carriers-and-formats',
        'simulator/statuses',
        'simulator/configuration',
        'simulator/duplicates-and-disorder',
        'simulator/running-with-docker',
        'simulator/publishing-to-s3',
        'simulator/hu-17-compliance',
      ],
    },
    {
      type: 'category',
      label: 'Deploying this site',
      items: ['deployment/github-pages', 'deployment/deploying-to-s3'],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: ['contributing/commit-convention'],
    },
  ],
};

module.exports = sidebars;
