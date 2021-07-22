<template>
  <BasicModal v-bind="$attrs"  @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="createOrUpdateForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { Approval } from '/@/api/user/userAudit/userAudit';

  import { getSchemas } from './tableData';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup(_, { emit }) {
      const ApprovalStatus = ref(0);
      const Id = ref('');
      const [
        createOrUpdateForm,
        {
          resetFields,
          validate,
          updateSchema
        }
      ] = useForm({
        labelWidth: 120,
        schemas: getSchemas(),
        showActionButtonGroup: false,
        actionColOptions: {
          span: 24,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        ApprovalStatus.value = data?.ApprovalStatus;
        Id.value = data?.Id;
        updateSchema([
          {
            field: 'servicePrice',
            show: ApprovalStatus.value ==1
          }
        ]);
      });

      const getTitle = '审批';

      async function handleSubmit() {
        try{
           const values = await validate();
           setModalProps({ confirmLoading: true });
           let data ={
              id: Id.value,
              approvalStatus: ApprovalStatus.value,
              ...values
           }
           Approval(data).then(() =>{
             closeModal();
             emit('success');
           })

        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, createOrUpdateForm, getTitle, handleSubmit };
    }
  })
</script>
