import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const packageManagement: AppRouteModule = {
  path: '/package',
  name: 'Package',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.package.package'),
  },
  children: [
    {
      path: 'packageList',
      name: 'packageList',
      component: () => import('/@/views/package/packageList/index.vue'),
      meta: {
        affix: true,
        title: t('routes.package.packageList'),
      },
    }
  ],
};

export default packageManagement;
