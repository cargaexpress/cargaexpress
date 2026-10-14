// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'architecture/overview',
        'architecture/data-model',
        'architecture/api-reference',
        'architecture/local-development',
      ],
    },
    {
      type: 'category',
      label: 'Decision records',
      collapsed: false,
      items: [
        'decisions/index',
        'decisions/0001-backend-stack',
        'decisions/0002-docker-compose-and-migrations',
        'decisions/0003-canonical-statuses-and-state-mapping',
        'decisions/0004-state-mapping-cache',
        'decisions/0005-admin-api-authentication',
        'decisions/0006-independent-webhook-simulator',
        'decisions/0007-documentation-site',
        'decisions/0008-commit-convention',
      ],
    },
    {
      type: 'category',
      label: 'Project status',
      items: ['project/status', 'project/user-stories'],
    },
    {
      type: 'category',
      label: 'Webhook simulator (HU-17)',
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
      label: 'This documentation site',
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
