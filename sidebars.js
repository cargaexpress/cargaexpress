// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Project',
      collapsed: false,
      items: [
        'project/problem-and-goals',
        'project/user-stories',
        'project/team-and-process',
        'project/costs',
        'project/pitch',
        'project/status',
        'project/sources',
      ],
    },
    {
      type: 'category',
      label: 'Sprint 1 · Design',
      items: [
        'sprint-1/index',
        'sprint-1/business-rules',
        'sprint-1/canonical-states',
        'sprint-1/architecture-v1',
        'sprint-1/data-flow',
        'sprint-1/data-model',
        'sprint-1/sla-and-delay',
        'sprint-1/seed-data',
        'sprint-1/backend-foundations',
      ],
    },
    {
      type: 'category',
      label: 'Sprint 2 · Build',
      items: [
        'sprint-2/index',
        'sprint-2/week-1',
        'sprint-2/week-2',
      ],
    },
    {
      type: 'category',
      label: 'Decision records (ADR)',
      items: [
        'decisions/index',
        'decisions/0001-backend-stack',
        'decisions/0002-docker-compose-and-migrations',
        'decisions/0003-canonical-statuses-and-state-mapping',
        'decisions/0004-state-mapping-cache',
        'decisions/0005-admin-api-authentication',
        'decisions/0006-independent-webhook-simulator',
        'decisions/0007-immutable-raw-events',
        'decisions/0008-three-ingestion-modalities',
        'decisions/0009-data-lake-and-star-schema',
        'decisions/0010-utc-and-business-calendars',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/aws-architecture',
        'architecture/overview',
        'architecture/data-model',
        'architecture/local-development',
      ],
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
  ],
};

module.exports = sidebars;
