import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

import { getServicePerTypeList } from '/@/api/dictionary/servicePerTypedictionary/servicePerTypedictionary';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '服务类型名称',
      dataIndex: 'serviceTypeName'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'ServiceTypeNameFilter',
        component: 'Input',
        label: '服务类型名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入服务类型名称'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'typeId',
      label: '人员类型',
      component: 'ApiSelect',
      componentProps: {
        api: getServicePerTypeList,
        resultField: 'items',
        labelField: 'typeName',
        valueField: 'id'
      }
    },
    {
      field: 'parent',
      label: '人员类型',
      component: 'ApiSelect',
      componentProps: {
        api: getServicePerTypeList,
        resultField: 'items',
        labelField: 'typeName',
        valueField: 'id'
      },
      show: false
    },
    {
      field: 'serviceTypeName',
      component: 'Input',
      label: '服务类型名称'
    }
  ]
}
