import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('routes.user.user'),
    path: '/user',
    children: [
      {
        path: 'userAudit',
        name: t('routes.user.userAudit'),
      }
    ],
  },
};
export default menu;
