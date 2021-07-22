<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :isDetail="true" showFooter>
    <a-card title="基本信息" :bordered="true">
      <BasicForm @register="registerForm">
        <template #serviceLength="{ model, field }">
          <a-input-group compact>
            <a-input-number style="width:70%" v-model:value="model[field]" precision="0" />
            <a-select v-model:value="model['unit']" style="width:30%">
              <a-select-option value=1>天</a-select-option>
              <a-select-option value=2>月（26天）</a-select-option>
              <a-select-option value=3>年</a-select-option>
            </a-select>
          </a-input-group>
        </template>
        <template #thumbnail>
          <Upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :headers="headers"
            action="/api/fileManagement/fileUpload/UploadImg?name=缩略图&areaname=backend"
            accept=".jpg,.jpeg,.gif,.png,.webp"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="Thumbnail" :src="Thumbnail.url" alt="缩略图" />
            <div v-else>
              <Icon :icon="Thumbnailloading ? 'ion:loading' : 'ion:plus'"/>
              <div class="ant-upload-text">
                上传
              </div>
            </div>
          </Upload>
        </template>
        <template #ProductDisplay>
          <Upload
            name="file"
            action="/api/fileManagement/fileUpload/UploadImg?name=套餐展示图&areaname=backend"
            list-type="picture-card"
            :file-list="FileList"
            :headers="headers"
            accept=".jpg,.jpeg,.gif,.png,.webp"
            @preview="handlePreview"
            :before-upload="beforeUpload"
            @change="ProducthandleChange"
          >
            <div>
              <Icon icon="ion:plus"/>
              <div class="ant-upload-text">
                上传
              </div>
            </div>
          </Upload>
        </template>
      </BasicForm>
    </a-card>

      <template #footer>
        <a-button type="primary" @click="submitAll">提交</a-button>
    </template>
    <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img :src="previewImage" />
    </Modal>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, h, ref } from 'vue';

  import { BasicForm, FormSchema, useForm } from '/@/components/Form';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Card, Upload, Modal, Input, InputNumber, Select } from 'ant-design-vue';
  import { Tinymce } from '/@/components/Tinymce/index';
  import { Icon } from '/@/components/Icon';
  import { MoreOutlined } from '@ant-design/icons-vue';

  import { GetAll } from '/@/api/dictionary/serviceTypeDictionary/serviceTypeDictionary';
  import { GetServiceHospitalInfoList } from '/@/api/serviceHospitalInfo/serviceHospitalInfo';
  import { getServicePerTypeList } from '/@/api/dictionary/servicePerTypedictionary/servicePerTypedictionary';
  import { GetServiceItemList } from '/@/api/serviceItem/serviceItem';
  import { getToken } from '/@/utils/auth';
  import { CreateOrUpdate } from '/@/api/package/packageList/packageList';
  import { PackageList } from '/@/api/package/packageList/model/packageListModel'

  const schemas: FormSchema[] = [
    {
      field: 'packageName',
      component: 'Input',
      label: '套餐名称',
      rules: [{ required: true }],
    },
    {
      field: 'packageIntroduction',
      component: 'InputTextArea',
      label: '套餐简介',
      rules: [{ required: true }],
    },
    {
      field: 'packageTypeId',
      component: 'TreeSelect',
      label: '套餐类型',
      componentProps: {
        treeCheckable: true,
        treeDefaultExpandAll: true,
        replaceFields: {
          title: 'serviceTypeName',
          key: 'id',
          value: 'id',
        },
        getPopupContainer: () => document.body
      },
      required: true
    },
    {
      field: 'packageAddressType',
      component: 'Select',
      label: '服务地点类型',
      required: true,
      componentProps: {
        options: [
          {
            label: '医院',
            value: 1,
            key: 1,
          },
          {
            label: '区域',
            value: 2,
            key: 2,
          }
        ]
      }
    },
    {
      field: 'serviceHospitalInfo',
      component: 'ApiSelect',
      label: '服务医院',
      ifShow: ({ values }) => {
        return values.packageAddressType == 1;
      },
      required: true,
      componentProps: {
        mode: 'multiple',
        api: GetServiceHospitalInfoList,
        resultField: 'items',
        labelField: 'hospitalName',
        valueField: 'id'
      }
    },
    {
      field: 'serviceArea',
      component: 'ApiSelect',
      label: '服务区域',
      ifShow: ({ values }) => {
        return values.packageAddressType == 2;
      },
      required: true
      // componentProps: {
      //   mode: 'multiple',
      //   api: GetServiceHospitalInfoList,
      //   resultField: 'items',
      //   labelField: 'hospitalName',
      //   valueField: 'id'
      // }
    },
    {
      field: 'personType',
      component: 'ApiSelect',
      label: '人员类型',
      required: true,
      componentProps: {
        mode: 'multiple',
        api: getServicePerTypeList,
        resultField: 'items',
        labelField: 'typeName',
        valueField: 'id'
      }
    },
    {
      field: 'serviceScope',
      component: 'Input',
      label: '适用人群',
      rules: [{ required: true }],
    },
    {
      field: 'serviceItem',
      component: 'TreeSelect',
      label: '服务项目',
      componentProps: {
        treeCheckable: true,
        treeDefaultExpandAll: true,
        replaceFields: {
          title: 'serviceItemName',
          key: 'id',
          value: 'id',
        },
        getPopupContainer: () => document.body
      },
      required: true
    },
    {
      field: 'price',
      component: 'InputNumber',
      label: '套餐价格',
      rules: [{ required: true }],
      componentProps:{
        precision: 2
      }
    },
    {
      field: 'serviceLength',
      component: 'InputGroup',
      label: '服务时长',
      required: true,
      slot: 'serviceLength',
    },
    {
      field: 'unit',
      component: 'Input',
      label: '',
      defaultValue: '1',
      show: false,
    },
    {
      field: 'thumbnail',
      component: 'Upload',
      label: '缩略图',
      slot: "thumbnail",
    },
    {
      field: 'productDisplay',
      component: 'Upload',
      label: '商品展示图',
      slot: "ProductDisplay"
    },
    {
      field: 'details',
      component: 'Input',
      label: '套餐详情',
      defaultValue: '',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
    {
      field: 'userNotice',
      component: 'Input',
      label: '用户须知',
      defaultValue: '',
      rules: [{ required: true }],
      render: ({ model, field }) => {
        return h(Tinymce, {
          value: model[field],
          onChange: (value: string) => {
            model[field] = value;
          },
        });
      },
    },
    {
      field: 'recommendation',
      component: 'Rate',
      label: '推荐指数',
      required: true,
      componentProps: {
        allowHalf: true
      }
    },
    {
      field: 'status',
      component: 'Select',
      label: '状态',
      required: true,
      componentProps: {
        options: [
          {
            label: '上架',
            value: true,
            key: true
          },
          {
            label: '下架',
            value: false,
            key: false,
          }
        ]
      }
    }
  ];

  export default defineComponent({
    components: { BasicDrawer, BasicForm, [Card.name]: Card, Upload, Icon, MoreOutlined, Modal, [Input.name]: Input, [InputNumber.name]: InputNumber, [Input.Group.name]: Input.Group, [Select.name]: Select, ASelectOption: Select.Option, },

    setup() {
      const token = getToken();

      const headers = {
        Authorization : 'Bearer '+ token
      }

      const Thumbnail = ref();
      const Thumbnailloading = ref(false);
      const FileList = ref();
      const previewVisible = ref(false);
      const previewImage = ref('');

      const [registerForm, { resetFields, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: schemas,
        showActionButtonGroup: false,
        baseColProps: { lg: 24, md: 24 },
      });

      const [registerDrawer]  = useDrawerInner(async () => {
        resetFields();

        const treeData = await (await GetAll()).items;
        const serviceItemData = await (await GetServiceItemList()).items;

        updateSchema([
          {
            field: 'packageTypeId',
            componentProps: { treeData }
          },
          {
            field: 'serviceItem',
            componentProps: { treeData: serviceItemData }
          }
        ]);
      });

      async function submitAll(){
        const values = await validate();

        const FileLists = Array<string>();
        FileList.value.forEach(item => {
          FileLists.push(item.response.id)
        });
        let data:PackageList={
          packageName:values.packageName,
          packageIntroduction:values.packageIntroduction,
          packageTypeId:values.packageTypeId[0],
          packageAddressType:values.packageAddressType,
          serviceScope:values.serviceScope,
          price:values.price,
          serviceLength:Number(values.serviceLength),
          unit:Number(values.unit),
          details:values.details,
          userNotice:values.userNotice,
          recommendation:values.recommendation,
          status:values.status,
          serviceHospitalInfo:values.serviceHospitalInfo,
          serviceArea:values.serviceArea,
          personType:values.personType,
          thumbnail:Thumbnail.value.id,
          fileLists:FileLists,
        }
        CreateOrUpdate(data).then(res => {
          console.log(res)
        })
      }

      function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
        if (!isJpgOrPng) {
          // $message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          // $message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      }

      function handleChange(info: Recordable){
        const file = info.file;
        const status = file?.status;

        const response = file?.response;

        if (status === 'uploading') {
          Thumbnailloading.value = true;
        }

        if (status === 'done') {
          Thumbnail.value = response;
          Thumbnailloading.value = false;
        }
      }

      function ProducthandleChange({ fileList }){
        FileList.value = fileList;
      }

      function handlePreview(file:any) {
        previewImage.value = file?.response?.url || file.preview;
        previewVisible.value = true;
      }

      function handleCancel(){
        previewVisible.value = false;
      }

      return { registerDrawer, registerForm, submitAll, beforeUpload, handleChange, ProducthandleChange, headers, Thumbnail, Thumbnailloading, FileList, previewVisible, previewImage, handlePreview, handleCancel };
    }
  });
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
