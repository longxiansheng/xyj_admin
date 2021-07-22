import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('routes.order.order'),
    path: '/order',
    children: [
      {
        path: 'orderlist',
        name: t('routes.order.orderlist'),
      }
    ],
  },
};
export default menu;
