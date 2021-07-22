import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps, FormSchema } from '/@/components/Form/index';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '身份证',
      dataIndex: 'idCard'
    },
    {
      title: '电话号码',
      dataIndex: 'telephone'
    },
    {
      title: '状态',
      dataIndex: 'userStatus',
      slots: { customRender: 'userStatus' },
    },
    {
      title: '人员类型',
      dataIndex: 'servicePerTypeDictionary'
    },
    {
      title: '性别',
      dataIndex: 'sexDictionary'
    },
    {
      title: '是否居家',
      dataIndex: 'isAtHome'
    },
    {
      title: '学历',
      dataIndex: 'educationDictionary'
    },
    {
      title: '年龄阶段',
      dataIndex: 'ageStageDictionary'
    },
    {
      title: '籍贯',
      dataIndex: 'nativePlace'
    },
    {
      title: '服务身份',
      dataIndex: 'servicePerIdentityDictionary'
    },
    {
      title: '服务技能',
      dataIndex: 'serviceSkillDictionary'
    },
    {
      title: '服务套餐',
      dataIndex: 'servicePackagInfo'
    },
    {
      title: '是否展示',
      dataIndex: 'isShow'
    },
    {
      title: '服务价格',
      dataIndex: 'servicePrice'
    },
    {
      title: '审批建议',
      dataIndex: 'approvalProposal'
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
      field: 'approvalProposal',
      component: 'InputTextArea',
      label: '建议'
    },
    {
      field: 'servicePrice',
      component: 'InputNumber',
      label: '服务价格'
    }
  ]
}
