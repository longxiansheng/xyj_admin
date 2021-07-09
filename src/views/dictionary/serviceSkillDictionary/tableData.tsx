import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '人员技能名称',
      dataIndex: 'name'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'nameFilter',
        component: 'Input',
        label: '人员技能名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入人员技能名称'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'name',
      component: 'Input',
      label: '人员技能名称'
    }
  ]
}
