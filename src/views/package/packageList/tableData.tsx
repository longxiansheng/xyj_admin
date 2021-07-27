import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'package.id',
      ifShow: false
    },
    {
      title: '套餐名称',
      dataIndex: 'package.packageName'
    },
    {
      title: '套餐简介',
      dataIndex: 'package.packageIntroduction'
    },
    {
      title: '适用人群',
      dataIndex: 'package.serviceScope'
    },
    {
      title: '价格',
      dataIndex: 'package.price'
    },
    {
      title: '服务时长',
      dataIndex: 'package.serviceLength',
      slots:{ customRender:'serviceLength' }
    },
    {
      title: '推荐指数',
      dataIndex: 'package.recommendation',
    },
    {
      title: '状态',
      dataIndex: 'package.status',
      slots:{ customRender:'status' }
    }
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'packageNameFilter',
        component: 'Input',
        label: '套餐名称',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入套餐名称'
        }
      },
      {
        field: 'packageIntroductionFilter',
        component: 'Input',
        label: '套餐简介',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入套餐简介'
        }
      },
      {
        field: 'serviceScopeFilter',
        component: 'Input',
        label: '适用人群',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入适用人群'
        }
      },
      {
        field: 'priceFilter',
        component: 'InputNumber',
        label: '价格',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入价格'
        }
      },
      {
        field: 'serviceLengthFilter',
        component: 'InputNumber',
        label: '服务时长',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入服务时长'
        }
      },
      {
        field: 'unitFilter',
        component: 'Select',
        label: '单位',
        componentProps: {
          options: [{
            label: '天',
            value: 1,
          },{
            label: '月（26天）',
            value: 2,
          },{
            label: '年',
            value: 3,
          }],
        },
        colProps: {
          span: 8,
        },
      },
      {
        field: 'recommendationFilter',
        component: 'InputNumber',
        label: '推荐指数',
        colProps: {
          span: 8,
        },
        componentProps: {
          placeholder: '请输入推荐指数'
        }
      },
      {
        field: 'statusFilter',
        component: 'Select',
        label: '状态',
        componentProps: {
          options: [{
            label: '上架',
            value: true,
          },{
            label: '下架',
            value: false,
          }],
        },
        colProps: {
          span: 8,
        },
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
