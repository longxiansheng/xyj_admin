import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '人员身份名称',
      dataIndex: 'identityName'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'identityNameFilter',
        component: 'Input',
        label: '身份名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入身份名称'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'identityName',
      component: 'Input',
      label: '人员身份名称'
    }
  ]
}
