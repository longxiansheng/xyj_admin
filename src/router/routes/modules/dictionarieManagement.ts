import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dictionarieManagement: AppRouteModule = {
  path: '/dictionary',
  name: 'Dictionary',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    icon: 'ion:grid-outline',
    title: t('routes.dictionaries.dictionaries')
  },
  children: [
    {
      path: 'serviceperidentity',
      name: 'ServicePerIdentity',
      component: () => import('/@/views/dictionary/serviceperidentitydictionary/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dictionaries.serviceperidentity')
      }
    },
    {
      path: 'servicePerType',
      name: 'ServicePerType',
      component: () => import('/@/views/dictionary/servicePerTypedictionary/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dictionaries.servicePerType')
      },
    },
    {
      path: 'serviceSkillDictionary',
      name: 'ServiceSkillDictionary',
      component: () => import('/@/views/dictionary/ServiceSkillDictionary/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dictionaries.serviceSkillDictionary')
      },
    },
    {
      path: 'servicePerLevelDictionary',
      name: 'ServicePerLevelDictionary',
      component: () => import('/@/views/dictionary/servicePerLevelDictionary/index.vue'),
      meta: {
        affix: true,
        title: t('routes.dictionaries.servicePerLevelDictionary')
      }
    }
  ],
};

export default dictionarieManagement;
