import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const mechanismManagement: AppRouteModule = {
  path: '/mechanism',
  name: 'Mechanism',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.mechanism.mechanism'),
  },
  children: [
    {
      path: 'mechanism',
      name: 'mechanism',
      component: () => import('/@/views/mechanism/mechanism/index.vue'),
      meta: {
        affix: true,
        title: t('routes.mechanism.mechanism'),
      },
    }
  ],
};

export default mechanismManagement;
