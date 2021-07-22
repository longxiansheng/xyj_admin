<template>
    <BasicModal v-bind="$attrs"  @register="registerModal" title="订单详情" @close="handleClsoe" @ok="handleClsoe">
        <Description
          size="middle"
          title="用户信息"
          :bordered="true"
          :column="6"
          :data="userData"
          :schema="userSchema"
        />
        <a-divider />
        <Description
          size="middle"
          title="订单信息"
          :bordered="true"
          :column="4"
          :data="clientorderData"
          :schema="orderSchema"
        />
        <a-divider />
        <Description
          size="middle"
          title="服务信息"
          :bordered="true"
          :column="4"
          :data="serviceData"
          :schema="serviceSchema"
        />
        <a-divider />
        <Description
          size="middle"
          title="人员条件"
          v-if="userOrderConditions != null"
          :bordered="true"
          :column="8"
          :data="userOrderConditions"
          :schema="conditionSchema"
        />
        <a-divider v-if="userOrderConditions != null" />
        <Description
          size="middle"
          title="被护理人信息"
          :bordered="true"
          :column="4"
          :data="clientUserNursingPerson"
          :schema="nursingSchema"
        />
        <a-divider />

      <ScrollContainer class="scroll1">
        <div>

        <BasicTable @register="registerTable1" class="mt-4" v-if="show1" >
          <template #schedulingTime="{ record }">
            {{ record.schedulingTime.substr(0,19).replace('T',' ')}}
          </template>
          <template #isRecived="{ record }">
            {{ record.isRecived?"已接单":"未接单"}}
          </template>
          <template #isRejected="{ record }">
            {{ record.isRejected?"已拒接":"无"}}
          </template>
          <template #isReplaced="{ record }">
            {{ record.isReplaced?"已更换":"无"}}
          </template>
          <template #serviceStartTime="{ record }">
            {{ record.serviceStartTime.substr(0,19).replace('T',' ')}}
          </template>
          <template #serviceEndTime="{ record }">
            {{ record.serviceEndTime.substr(0,19).replace('T',' ')}}
          </template>
        </BasicTable>

        <BasicTable @register="registerTable" v-else>
          <template #sexDictionary="{ record }">
            <div v-if="userOrderConditions != null && userOrderConditions.gender != null && userOrderConditions.gender != record.sexDictionary" style="color:#EFBD47" >{{ record.sexDictionary}}</div>
            <div v-else style="color:#55D187" >{{ record.sexDictionary}}</div>
          </template>

          <template #ageStageDictionary="{ record }">
            <div v-if="userOrderConditions != null && userOrderConditions.ageStageStr != null && userOrderConditions.ageStageStr != record.ageStageDictionary" style="color:#EFBD47" >{{ record.ageStageDictionary}}</div>
            <div v-else style="color:#55D187" >{{ record.ageStageDictionary}}</div>
          </template>

          <template #servicePerTypeDictionary="{ record }">
            <div v-if="userOrderConditions != null && userOrderConditions.types!= null && userOrderConditions.types.indexOf(record.servicePerTypeDictionary) != -1"
            style="color:#EFBD47" >{{ record.ageStageDictionary}}</div>
            <div v-else style="color:#55D187" >{{ record.servicePerTypeDictionary}}</div>
          </template>

          <template #userStatus="{ record }">
            {{ (record.userStatus == 2)?"通过":"未通过" }}
          </template>
          <template #action="{ record }">
            <TableAction
              :actions="[
                {
                  label: '指派',
                  disabled:(schedulingStatus!=0 || record.disable == false),
                  popConfirm: {
                    title: '是否将此订单指派该服务人员',
                    confirm: handleScheduling.bind(null, record)
                  }
                }
             ]"
            />
          </template>
        </BasicTable>
        </div>
      </ScrollContainer>



    </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref} from 'vue';
  import { Description  } from '/@/components/Description/index';
   import { BasicTable, useTable ,TableAction } from '/@/components/Table';
  import { PageWrapper } from '/@/components/Page';
  import { ScrollContainer } from '/@/components/Container/index';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Divider } from 'ant-design-vue';

  import {GetOrderDetailInfoById ,GetAllNursingPerson,SetSchedulingStatus } from '/@/api/order/order';
  import { CreateNusingOrder, GetSchedulingInfo ,GetNoCompletedNursing} from '/@/api/order/nursiongOrder';

  import { userSchema, orderSchema, serviceSchema ,conditionSchema,nursingSchema,getNursingColumns,
  getNursingOrderColumns } from './details';

  import { clientUserDto,UserOrderDto,ClientOrderDto,UserOrderConditionDto,ServiceDataDto,UserNursingPersonDto,SetSchedulingStatusDto,NursingDto} from '/@/api/order/model/orderModel'

  import { CreateNusingOrderDto,GetNursiongOrderPagedParams,GetNoCompletedNursingParams } from '/@/api/order/model/nursiongOrderModel'

  export default defineComponent({
    components: { BasicModal,Description, PageWrapper,[Divider.name]: Divider,BasicTable,TableAction , ScrollContainer },
    setup(_, { emit }){
      const rowId = ref('');
      const show1 =  ref(false);
      const schedulingStatus = ref<number>();
      const serviceData =ref<ServiceDataDto>();
      const userrderData =ref<UserOrderDto>();
      const userData =ref<clientUserDto>();
      const clientorderData =ref<ClientOrderDto>();
      const userOrderConditions =ref<UserOrderConditionDto>();
      const clientUserNursingPerson = ref<UserNursingPersonDto>();
      const personList = ref<Array<NursingDto>>();


      var param1 = ref<GetNursiongOrderPagedParams>();
      var param2 = ref<GetNoCompletedNursingParams>();
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
         setModalProps({ confirmLoading: false,width:1200,draggable:false,maskClosable:false});
         rowId.value = data.record.userOrders.id;
         console.log(rowId.value);
         param1.value = {
                page:1,
                pageSize:5,
                orderIdFilter:rowId.value,
                sorting:''
              }
         GetOrderDetailInfoById({id:rowId.value})
         .then(re=>{
            serviceData.value=re.serviceData;
            userData.value = re.clientUser;
            userrderData.value =re.userOrders
            clientorderData.value = re.clientOrders;
            schedulingStatus.value = re.clientOrders.schedulingStatus;
            userOrderConditions.value = re.userOrderConditions;
            clientUserNursingPerson.value = re.clientUserNursingPerson;
            if(re.clientOrders.schedulingStatus == 1 || re.clientOrders.productCategory==2){
              show1.value = true;
              registerTable1
            }else{
              param2.value={
                startTime:serviceData.value.serviceStartTime,
                endTime:serviceData.value.serviceEndTime,
              }

              show1.value = false;
            }
         })
       })

      const [registerTable] = useTable({
        title: '服务人员列表',
        api:GetAllNursingPerson,
        columns: getNursingColumns(),
        dataSource:personList,
        afterFetch:afterFetch,
        pagination: true,
        bordered:true,
        immediate:true,
        showIndexColumn: false,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },

      })

      const [registerTable1] = useTable({
        title: '调度信息',
        api:GetSchedulingInfo,
        searchInfo:param1,
        columns: getNursingOrderColumns(),
        bordered:true,
        immediate:true,
        showIndexColumn: false,
        canResize:true,
      })

      function afterFetch(data){
        GetNoCompletedNursing(param2.value).then(re=>{
          data.forEach(e=>{

            if(re.indexOf(e.id) != -1){
               e.disable = false;
            }
          })
          console.log(data);
        })
      }

      function handleClsoe(){
        show1.value=false;
        closeModal();
      }

      function getNowDate(){
        let n = Date.now();
        let d = new Date(n);
        var str=d.getFullYear() + "-";
        if(d.getMonth() + 1<10){
          str += "0" + (d.getMonth() + 1) +"-"
        }else{
          str += (d.getMonth() + 1) +"-"
        }
        if(d.getDate()<10){
          str += "0" + d.getDate() +"T"
        }else{
          str += d.getDate() + "T"
        }
        if(d.getHours()<10){
          str += "0" + d.getHours() +":"
        }else{
          str += d.getHours() + ":"
        }
        if(d.getMinutes()<10){
          str += "0" + d.getMinutes() +":"
        }else{
          str += d.getMinutes() + ":"
        }
        if(d.getSeconds()<10){
          str += "0" + d.getSeconds()
        }else{
          str += d.getSeconds()
        }

        return str;
      }

      function handleScheduling(record: Recordable){
        var data = ref<CreateNusingOrderDto>();
        data.value = {
            orderId:rowId.value,
            nursingId:record.nursingStaffUserExendAll.nursingStaffUserId,
            schedulingTime:getNowDate(),
            isRecived:false,
            isRejected:false,
            serviceStartTime:serviceData.value.serviceStartTime,
            serviceEndTime:serviceData.value.serviceEndTime,
            isReplaced:false,
            isCompleted:false
        }
        console.log(data.value);
        CreateNusingOrder(data.value).then(() =>{
            var sc = ref<SetSchedulingStatusDto>();
            sc.value = {
              id:clientorderData.value.id,
              schedulingStatus:1
            };

            SetSchedulingStatus(sc.value).then(()=>{
              console.log(1);
            })
            clientorderData.value.schedulingStatus=1;
            show1.value=true;
            registerTable1;
            emit('success', { values: { id: rowId.value } })
           })
      }

      return {
        registerModal,
        handleClsoe,handleScheduling,registerTable,registerTable1,
        show1,
        userSchema,
        orderSchema,
        userrderData,
        userData,
        serviceData,
        userOrderConditions,
        clientorderData,
        serviceSchema,conditionSchema,nursingSchema,clientUserNursingPerson,schedulingStatus
      }
    }

  })


</script>

<style scope>
  .scroll1{
    height:auto !important;
  }
</style>
