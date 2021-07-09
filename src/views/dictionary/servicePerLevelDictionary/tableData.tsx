import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';
// import { getServicePerTypeList } from '/@/api/dictionary/servicePerTypedictionary/servicePerTypedictionary';
// import { ServicePerTypedictionary } from '/@/api/dictionary/servicePerTypedictionary/model/servicePerTypedictionaryModel';
export interface Option {
  label: string,
  value: string,
  key: string
}

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '人员等级名称',
      dataIndex: 'levelName'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      // {
      //   field: 'TypeIdFilter',
      //   label: '人员类型',
      //   component: 'ApiSelect',
      //   componentProps: {
      //     api: getServicePerTypeList,
      //     resultField: 'items',
      //     labelField: 'typeName',
      //     valueField: 'id'
      //   },
      //   colProps: { span: 8 }
      // },
      {
        field: 'levelNameFilter',
        component: 'Input',
        label: '人员等级名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入人员等级名称'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'typeId',
      component: 'Select',
      label: '人员类型'
    },
    {
      field: 'levelName',
      component: 'Input',
      label: '人员等级名称'
    }
  ]
}
