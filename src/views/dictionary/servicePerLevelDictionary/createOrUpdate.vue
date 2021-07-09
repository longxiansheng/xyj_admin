<template>
  <BasicModal v-bind="$attrs"  @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="createOrUpdateForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { CreateOrUpdateServicePerLevelDictionary } from '/@/api/dictionary/servicePerLevelDictionary/servicePerLevelDictionary';
  import { getServicePerTypeList } from '/@/api/dictionary/servicePerTypedictionary/servicePerTypedictionary';
  import { ServicePerTypedictionary } from '/@/api/dictionary/servicePerTypedictionary/model/servicePerTypedictionaryModel';

  import { getSchemas } from './tableData';

  export interface Option {
    label: string,
    value: string,
    key: string
  }

  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup(_, { emit }) {
      const isUpdate = ref(true);
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

        if (unref(isUpdate)) {
          rowId.value = data.record.id;
          setFieldsValue({
            ...data.record,
          });
        }
        else{
          rowId.value = '';
        }

        const treeData = ref<Array<Option>>([]);

        (((await getServicePerTypeList()).items) as unknown as Array<ServicePerTypedictionary>).forEach(item =>{
          var data:Option={ label:item.typeName, value:item.id, key:item.id};
          treeData.value.push(data)
        })

        updateSchema([
          {
            field: 'typeId',
            componentProps: { options:treeData.value },
          },
        ]);
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增人员等级' : '编辑人员等级'));

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
           CreateOrUpdateServicePerLevelDictionary(data).then(() =>{
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
