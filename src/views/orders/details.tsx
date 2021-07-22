import { DescItem } from '/@/components/Description/index';
import { h } from 'vue';
import { BasicColumn } from '/@/components/Table/src/types/table';



export const userSchema: DescItem[] = [
  {
    field: 'name',
    label: '客户姓名',
  },
  {
    field: 'phone',
    label: '联系电话',
  },
  {
    field: 'gender',
    label: '性别',
    render: (curVal, data) => {
      if(data.gender == 1){
        return `${'男'}`;
      }else{
        return `${'女'}`;
      }
    },
  },
  {
    field: 'nickName',
    label: '昵称',
  },
  {
    field: 'authenticationStatus',
    label: '实名认证状态',
    render: (curVal, data) => {
      if(data.authenticationStatus){
        return `${'已实名'}`;
      }else{
        return `${'未实名'}`;
      }
    },
  },
];


export const orderSchema:DescItem[] = [
  {
    field: 'orderNumbers',
    label: '订单号码',
    span:2
  },
  {
    field: 'productCategory',
    label: '商品类型',
    render: (curVal, data) => {
      if(data.productCategory == 1){
        return `${'服务套餐'}`;
      }else{
        return `${'服务人员'}`;
      }
    },
  },
  {
    field: 'total',
    label: '订单金额',
    render: (curVal, data) => {
      return data.total / 100;
    }
  },
  {
    field: 'description',
    label: '商品描述',
    span:2,
  },
  {
    field:'paymentsStatus',
    label:'支付状态',
    render: (curVal, data) => {
      if(!data.paymentsStatus){
        return `${'未支付'}`;
      }else{
        return `${'已支付'}`;
      }
    },
  },
  {
    field: 'needScheduling',
    label: '需要调度',
    render: (curVal, data) => {
      if(!data.needScheduling){
        return `${'否'}`;
      }else{
        return `${'是'}`;
      }
    },
  },
  {
    field: 'schedulingStatus',
    label: '调度状态',
    render: (curVal, data) => {
      if(data.productCategory == 1 && !data.schedulingStatus){
        return `${'待调度'}`;
      }else if(data.productCategory == 1 && data.schedulingStatus == 1){
        return `${'已调度'}`;
      }else{
        return `${'无'}`;
      }
    },
  },
  {
    field: 'serviceStatus',
    label: '服务状态',
    render: (curVal, data) => {
      if(data.serviceStatus== null ||data.serviceStatus==0 ){
        return `${'未开始'}`;
      }else if(data.serviceStatus==1){
        return `${'服务中'}`;
      }else if(data.serviceStatus==2){
        return `${'已完成'}`;
      }else if(data.serviceStatus==3){
        return `${'已暂停'}`;
      }
    },
  },
  {
    field:'ordersStatus',
    label:'订单状态',
    render: (curVal, data) => {
      if(!data.ordersStatus){
        return `${'无效'}`;
      }else{
        return `${'有效'}`;
      }
    },
  },
  {
    field:'orderCreationTime',
    label:'创建时间',
    span:2,
    render: (curVal, data) => {
      if(data.orderCreationTime){
        return `${data.orderCreationTime.substring(0,19).replace('T',' ')}`;
      }else{
        return `${''}`;
      }
    },
  },
  {
    field:'orderCancelTime',
    label:'取消时间',
    span:2,
    render: (curVal, data) => {
      if(data.orderCancelTime){
        return `${data.orderCancelTime.substring(0,19).replace('T',' ')}`;
      }else{
        return `${''}`;
      }
    },
  },
  {
    field:'invalidReason',
    label:'取消原因',
    render: (curVal, data) => {
      if(!data.invalidReason){
        return `${''}`;
      }else if(data.invalidReason == 1){
        return `${'超时'}`;
      }else if(data.invalidReason == 2){
        return `${'用户取消订单'}`;
      }
    },
  }
]

export const serviceSchema:DescItem[] = [
  {
    field: 'serviceStartTime',
    label: '服务开始时间',
    span:2,
    render: (curVal, data) => {
      if(data.serviceStartTime){
        return `${data.serviceStartTime.substring(0,19).replace('T',' ')}`;
      }else{
        return `${''}`;
      }
    },
  },
  {
    field: 'serviceEndTime',
    label: '服务结束时间',
    span:2,
    render: (curVal, data) => {
      if(data.serviceEndTime){
        return `${data.serviceEndTime.substring(0,19).replace('T',' ')}`;
      }else{
        return `${''}`;
      }
    },
  },
  {
    field: 'serviceDays',
    label: '服务天数'
  },
  {
    field: 'provinceName',
    label: '省'
  },
  {
    field: 'cityName',
    label: '市'
  },
  {
    field: 'countyName',
    label: '县'
  },
  {
    field: 'serviceHospitalName',
    label: '服务医院',
    // show:(...data)=>data.serviceDays>0
  },
  {
    field: 'Section',
    label: '科室',
    // show:(...data)=>data.serviceDays>0
  },
  {
    field: 'BedNumber',
    label: '床位',
    // show:(...data)=>data.serviceDays>0
  },
  {
    field: 'serviceAddress',
    label: '服务地址'
  },
  {
    field: 'emergencyContactName',
    label: '紧急联系人'
  },
  {
    field: 'emergencyContactPhone',
    label: '紧急联系人电话'
  },
]

export const conditionSchema:DescItem[] = [
  {
    field:'types',
    label:'服务人员类型'
  },
  {
    field:'ageStageStr',
    label:'服务人员年龄段'
  },
  {
    field:'gender',
    label:'服务人员性别',
    render:(curVal, data) => {
      if(data.gender == 1){
        return `${'男'}`;
      }else {
        return `${'女'}`;
      }
    },
  },
]

export const nursingSchema:DescItem[] = [
  {
    field:'name',
    label:'姓名'
  },
  {
    field:'gender',
    label:'性别'
  },
  {
    field:'birthday',
    label:'出生日期',
    render: (curVal, data) => {
      if(data.birthday){
        return `${data.birthday.substring(0,19).replace('T',' ')}`;
      }else{
        return `${''}`;
      }
    },
  },
  {
    field:'national',
    label:'民族'
  },
  {
    field:'treatmentStatus',
    label:'治疗情况',
    span:4
  },
  {
    field:'takingMedication',
    label:'服用药物',
    span:4
  },
  {
    field:'allergyHistory',
    label:'过敏史',
    span:4
  },
  {
    field:'familyHistory',
    label:'家族史',span:4
  },
  {
    field:'pastHistory',
    label:'既往史',span:4
  },
  {
    field:'contraindicated',
    label:'禁忌',span:4
  },
  {
    field:'cautions',
    label:'注意事项',span:4
  }
]

export const schedulingSchema:DescItem[]  =[

]


export function getNursingColumns(): BasicColumn[] {
  return [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '电话号码',
      dataIndex: 'telephone'
    },
    {
      title: '学历',
      dataIndex: 'educationDictionary'
    },
    {
      title: '性别',
      dataIndex: 'sexDictionary',
      slots: { customRender:'sexDictionary' }
    },
    {
      title:'年龄段',
      dataIndex:'ageStageDictionary',
      slots: { customRender:'ageStageDictionary' }
    },
    {
      title: '人员类型',
      dataIndex: 'servicePerTypeDictionary',
      slots: { customRender:'servicePerTypeDictionary' }
    },
    {
      title: '是否居家',
      dataIndex: 'isAtHome'
    },
    {
      title: '服务机构',
      dataIndex: 'mechanism'
    },
    {
      title: '认证类型',
      dataIndex: 'servicePerIdentityDictionary'
    },
    {
      title: '人员等级',
      dataIndex: 'servicePerLevelDictionary'
    },
    {
      title: '服务价格',
      dataIndex: 'servicePrice',
      slots: { customRender:'orderCreationTime' }
    },
    {
      title: '服务类型',
      dataIndex: 'serviceTypeDictionary'
    },
    {
      title:'人员技能',
      dataIndex:'serviceSkillDictionary'
    },
    {
      title:'审核状态',
      dataIndex:'userStatus',
      slots: { customRender:'userStatus' }
    }
  ];
}


export function getNursingOrderColumns():BasicColumn[]{
  return [
    {
      dataIndex:'schedulingTime',
      title:'调度时间',
      slots: { customRender:'schedulingTime' }
    },
    {
      dataIndex:'isRecived',
      title:'接单状态',
      slots: { customRender:'isRecived' }
    },
    {
      dataIndex:'isRejected',
      title:'拒接状态',
      slots: { customRender:'isRejected' }
    },
    {
      dataIndex:'rejectedReason',
      title:'拒接原因',
    },
    {
      dataIndex:'isReplaced',
      title:'更换状态',
      slots: { customRender:'isReplaced' }
    },
    {
      dataIndex:'replacedReason',
      title:'更换原因',
    },
    {
      dataIndex:'serviceStartTime',
      title:'服务开始时间',
      slots: { customRender:'serviceStartTime' }
    },
    {
      dataIndex:'serviceEndTime',
      title:'服务结束时间',
      slots: { customRender:'serviceEndTime' }
    },
  ]
}
