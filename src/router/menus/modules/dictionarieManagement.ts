import type { MenuModule } from '/@/router/types';
import { t } from '/@/hooks/web/useI18n';

const menu: MenuModule = {
  orderNo: 10,
  menu: {
    name: t('routes.dictionaries.dictionaries'),
    path: '/dictionary',
    children: [
      {
        path: 'serviceperidentity',
        name: t('routes.dictionaries.serviceperidentity'),
      },
      {
        path: 'servicePerType',
        name: t('routes.dictionaries.servicePerType')
      },
      {
        path: 'serviceSkillDictionary',
        name: t('routes.dictionaries.serviceSkillDictionary')
      },
      {
        path: 'servicePerLevelDictionary',
        name: t('routes.dictionaries.servicePerLevelDictionary')
      }
    ],
  },
};
export default menu;
