import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const orderManagement: AppRouteModule = {
  path: '/order',
  name: 'Order',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.order.order'),
  },
  children: [
    {
      path: 'orderlist',
      name: 'orderlist',
      component: () => import('/@/views/orders/orderslist.vue'),
      meta: {
        affix: true,
        title: t('routes.order.orderlist'),
      },
    },
    // {
    //   path: 'orderdetail',
    //   name: 'orderdetail',

    //   component: () => import('/@/views/orders/orderdetail.vue'),
    //   meta: {
    //     affix: true,
    //     hideMenu:true,
    //     carryParam:true,
    //     title: t('routes.order.orderdetail'),
    //   },
    // },

  ],
};

export default orderManagement;
