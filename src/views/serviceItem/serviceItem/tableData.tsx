import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '服务项目名称',
      dataIndex: 'item.serviceItemName'
    },
    {
      title: '服务项目内容',
      dataIndex: 'item.serviceItemContent'
    },
    {
      title: '来源',
      dataIndex: 'item.fromPerson',
      slots:{ customRender:'fromPerson' }
    },
    {
      title: '审核状态',
      dataIndex: 'item.status',
      slots:{ customRender:'status' }
    }
  ];
}

export function getchildrenColumnName() {
  return [
    {
      title: '服务项目名称',
      dataIndex: 'item.serviceItemName'
    },
    {
      title: '服务项目内容',
      dataIndex: 'item.serviceItemContent'
    },
    {
      title: '来源',
      dataIndex: 'item.fromPerson',
      slots:{ customRender:'fromPerson' }
    },
    {
      title: '审核状态',
      dataIndex: 'item.status',
      slots:{ customRender:'status' }

    }
  ]
}


export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'serviceItemNameFilter',
        component: 'Input',
        label: '服务项目名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入服务项目名称'
        }
      },
      {
        field: 'serviceItemContentFilter',
        component: 'Input',
        label: '服务项目内容',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入服务项目内容'
        }
      }

    ]
  }
}

export function getSchemas(): FormSchema[] {
  return [
    {
      field: 'serviceItemName',
      component: 'Input',
      label: '服务项目名称',
      required: true,
    },
    {
      field: 'parentItemId',
      label: '父级服务项目',
      component: 'Input',
      slot:"parentItemId",
      show: false
    },
    {
      label: '服务项目内容',
      field: 'serviceItemContent',
      component: 'InputTextArea',
      componentProps: {
        placeholder: '请输入你的阶段性工作目标',
        rows: 4,
      },
    },
    {
      label: '来源',
      field: 'fromPerson',
      component:"Select",
      componentProps: {
        options: [
          {
            label: '后台管理人员',
            value: 1,
            key: 1,
          },
          {
            label: '服务人员',
            value: 2,
            key: 2,
          },
        ]
      }
    },
    {
      label: '审核状态',
      field: 'status',
      component:"Select",
      componentProps: {
        options: [
          {
            label: '通过',
            value: 1,
            key: 1,
          },
          {
            label: '不通过',
            value: 0,
            key: 0,
          },
        ]
      },

    }
  ]
}
