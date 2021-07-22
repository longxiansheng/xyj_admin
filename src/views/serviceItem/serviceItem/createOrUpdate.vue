<template>
  <BasicModal v-bind="$attrs"  @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="createOrUpdateForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { getSchemas } from './tableData';

  import { CreateOrUpdateServiceItem } from '/@/api/serviceItem/serviceItem';

  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const isAddChildren = ref(false);
      const rowId = ref('');
      const [
        createOrUpdateForm,
        {
          setFieldsValue,
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
        isUpdate.value = !!data?.isUpdate;
        isAddChildren.value = !!data?.isAddChildren;
        if (unref(isUpdate)) {
          rowId.value = data.record.item.id;
          setFieldsValue({
            ...data.record.item,
          });
        }
        else{
          rowId.value = '';
        }

        if(unref(isAddChildren)) {
          rowId.value = '';
          setFieldsValue({
            serviceItemName: null,
            parentItemId: data.record.item.id,
            serviceItemContent:'',
            fromPerson:1,
            status:1
          });
        }
        updateSchema([
          {
            field: 'parentItemId',
            show: !unref(isUpdate) && !unref(isAddChildren),
          }
        ]);

      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增服务项目' : '编辑服务项目'));

      async function handleSubmit() {
        try{
           const values = await validate();
           setModalProps({ confirmLoading: true });
           let data;
           if(rowId.value == ""){
             data = { ...values }
           }
           else{
             data = { ...values, id: rowId.value }
           }
           CreateOrUpdateServiceItem(data).then(() =>{
             closeModal();
             emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
           })

        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, createOrUpdateForm, getTitle, handleSubmit };
    }
  })
</script>
