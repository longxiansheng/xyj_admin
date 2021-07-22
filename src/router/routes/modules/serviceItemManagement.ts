import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const serviceItemManagement: AppRouteModule = {
  path: '/serviceItem',
  name: 'ServiceItem',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.serviceItem.serviceItem'),
  },
  children: [
    {
      path: 'serviceItem',
      name: 'serviceItem',
      component: () => import('/@/views/serviceItem/serviceItem/index.vue'),
      meta: {
        affix: true,
        title: t('routes.serviceItem.serviceItem'),
      },
    }
  ],
};

export default serviceItemManagement;
