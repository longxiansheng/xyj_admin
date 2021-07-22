import { BasicColumn } from '/@/components/Table/src/types/table';
import { FormProps } from '/@/components/Form/index';


const basicOptions: LabelValueOptions = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '待支付',
    value: 1,
  },
  {
    label: '待调度',
    value: 2,
  },
  {
    label: '待服务',
    value: 3,
  },
  {
    label: '服务中',
    value: 4,
  },
  {
    label: '待评价',
    value: 5,
  },
  {
    label: '已取消',
    value: 6,
  }
];

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '客户姓名',
      dataIndex: 'clientUser.name'
    },
    {
      title: '订单号码',
      dataIndex: 'clientOrders.orderNumbers'
    },
    {
      title: '商品类型',
      dataIndex: 'clientOrders.productCategory',
      slots: { customRender:'productCategory' }
    },
    {
      title: '商品描述',
      dataIndex: 'clientOrders.description'
    },
    {
      title: '支付状态',
      dataIndex: 'clientOrders.paymentsStatus',
      slots: { customRender:'paymentsStatus' }
    },
    {
      title: '需要调度',
      dataIndex: 'clientOrders.needScheduling',
      slots: { customRender:'needScheduling' }
    },
    {
      title: '调度状态',
      dataIndex: 'clientOrders.schedulingStatus',
      slots: { customRender:'schedulingStatus' }
    },
    {
      title: '服务状态',
      dataIndex: 'clientOrders.serviceStatus',
      slots: { customRender:'serviceStatus' }
    },
    {
      title: '订单状态',
      dataIndex: 'clientOrders.ordersStatus',
      slots: { customRender:'ordersStatus' }
    },
    {
      title: '创建时间',
      dataIndex: 'clientOrders.orderCreationTime',
      slots: { customRender:'orderCreationTime' }
    },
    {
      title: '取消时间',
      dataIndex: 'clientOrders.orderCancelTime',
      slots: { customRender:'orderCancelTime' }
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'orderType',
        component: 'Select',
        label: '订单状态',
        componentProps: {
          options: basicOptions,
        },
        colProps: {
          span: 8,
        },
      }
    ]
  }
}
