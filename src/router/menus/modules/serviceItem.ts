import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('routes.serviceItem.serviceItem'),
    path: '/serviceItem',
    children: [
      {
        path: 'serviceItem',
        name: t('routes.serviceItem.serviceItem'),
      }
    ],
  },
};
export default menu;
