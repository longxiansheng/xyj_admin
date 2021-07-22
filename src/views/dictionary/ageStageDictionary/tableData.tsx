import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '年龄阶段名称',
      dataIndex: 'ageStageStr'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'ageStageStrFilter',
        component: 'Input',
        label: '年龄阶段名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入年龄阶段名称'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'ageStageStr',
      component: 'Input',
      label: '年龄阶段'
    }
  ]
}
