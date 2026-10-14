// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Simulador de webhooks (HU-17)',
      collapsed: false,
      items: [
        'simulador/vision-general',
        'simulador/transportadoras-y-formatos',
        'simulador/estados',
        'simulador/configuracion',
        'simulador/duplicados-y-desorden',
        'simulador/ejecucion-con-docker',
        'simulador/publicar-en-s3',
        'simulador/cumplimiento-hu-17',
      ],
    },
    {
      type: 'category',
      label: 'Despliegue de este sitio',
      items: ['despliegue/desplegar-este-sitio'],
    },
    {
      type: 'category',
      label: 'Contribuir',
      items: ['contribuir/convencion-de-commits'],
    },
  ],
};

module.exports = sidebars;
