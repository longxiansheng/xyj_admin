import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('routes.package.package'),
    path: '/package',
    children: [
      {
        path: 'packageList',
        name: t('routes.package.packageList'),
      }
    ],
  },
};
export default menu;
