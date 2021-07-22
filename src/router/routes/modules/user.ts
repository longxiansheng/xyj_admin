import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const userManagement: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.user.user'),
  },
  children: [
    {
      path: 'userAudit',
      name: 'UserAudit',
      component: () => import('/@/views/user/userAudit/index.vue'),
      meta: {
        affix: true,
        title: t('routes.user.userAudit'),
      },
    }
  ],
};

export default userManagement;
