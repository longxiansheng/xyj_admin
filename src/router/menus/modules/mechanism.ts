import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('routes.mechanism.mechanism'),
    path: '/mechanism',
    children: [
      {
        path: 'mechanism',
        name: t('routes.mechanism.mechanism'),
      }
    ],
  },
};
export default menu;
