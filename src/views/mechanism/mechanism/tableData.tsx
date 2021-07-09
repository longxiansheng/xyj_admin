import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '机构名称',
      dataIndex: 'mechanismName'
    },
    {
      title: '机构代码',
      dataIndex: 'mechanismCode'
    },
    {
      title: '机构地址',
      dataIndex: 'mechanismAddress'
    },
    {
      title: '机构负责人',
      dataIndex: 'mechanismPersonInCharge'
    },
    {
      title: '机构联系电话',
      dataIndex: 'mechanismContactNumber'
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'mechanismNameFilter',
        component: 'Input',
        label: '机构名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入机构名称'
        }
      },
      {
        field: 'mechanismCodeFilter',
        component: 'Input',
        label: '机构代码',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入机构代码'
        }
      },
      {
        field: 'mechanismAddressFilter',
        component: 'Input',
        label: '机构地址',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入机构地址'
        }
      },
      {
        field: 'mechanismPersonInChargeFilter',
        component: 'Input',
        label: '机构负责人',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入机构负责人'
        }
      },
      {
        field: 'mechanismContactNumberFilter',
        component: 'Input',
        label: '机构联系电话',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入机构联系电话'
        }
      }
    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'mechanismName',
      component: 'Input',
      label: '机构名称'
    },
    {
      field: 'mechanismCode',
      component: 'Input',
      label: '机构代码'
    },
    {
      field: 'mechanismAddress',
      component: 'Input',
      label: '机构地址'
    },
    {
      field: 'mechanismPersonInCharge',
      component: 'Input',
      label: '机构负责人'
    },
    {
      field: 'mechanismContactNumber',
      component: 'Input',
      label: '机构联系电话'
    }
  ]
}
