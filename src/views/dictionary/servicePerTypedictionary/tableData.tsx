import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '人员类型名称',
      dataIndex: 'typeName'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'typeNameFilter',
        component: 'Input',
        label: '人员类型名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入人员类型名称'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'typeName',
      component: 'Input',
      label: '人员类型名称'
    }
  ]
}
