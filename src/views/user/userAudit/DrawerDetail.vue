<template>
  <BasicDrawer v-bind="$attrs" @register="register" width="50%" contentBackground  title="详情" showFooter>
    <a-descriptions size="small" :column="1" :bordered="true">
      <a-descriptions-item v-if="datas?.name" label="姓名">{{datas?.name}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.idCard" label="身份证">{{datas?.idCard}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.telephone" label="电话号码">{{datas?.telephone}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.userStatus" label="状态">
        <Tag color="gray" v-if="datas?.userStatus==0">
          未完善
        </Tag>
        <Tag color="orange" v-if="datas?.userStatus==1">
          待审核
        </Tag>
        <Tag color="green" v-if="datas?.userStatus==2">
          审核成功
        </Tag>
        <Tag color="red" v-if="datas?.userStatus==3">
          审核不通过
        </Tag>
      </a-descriptions-item>
      <a-descriptions-item v-if="datas?.servicePerTypeDictionary" label="人员类型">{{datas?.servicePerTypeDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.servicePerLevelDictionary" label="人员等级">{{datas?.servicePerLevelDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.serviceTypeDictionary" label="服务类型">{{datas?.serviceTypeDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.sexDictionary" label="性别">{{datas?.sexDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.personalPortrait" label="个人头像">
        <Upload list-type="picture-card" :file-list="datas?.personalPortrait" @preview="handlePreview" :showUploadList="showUploadList">
        </Upload>
      </a-descriptions-item>
      <a-descriptions-item v-if="datas?.isAtHome" label="是否居家">{{datas?.isAtHome}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.educationDictionary" label="学历">{{datas?.educationDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.ageStageDictionary" label="年龄阶段">{{datas?.ageStageDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.nativePlace" label="籍贯">{{datas?.nativePlace}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.serviceSkillDictionary" label="服务技能">{{datas?.serviceSkillDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.servicePackagInfo" label="服务套餐">{{datas?.servicePackagInfo}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.qualificationPhoto" label="资格照片">
        <Upload list-type="picture-card" :file-list="datas?.qualificationPhoto" @preview="handlePreview" :showUploadList="showUploadList">
        </Upload>
      </a-descriptions-item>
      <a-descriptions-item v-if="datas?.servicePerIdentityDictionary" label="服务身份">{{datas?.servicePerIdentityDictionary}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.mechanism" label="所属机构">{{datas?.mechanism}}</a-descriptions-item>
      <a-descriptions-item v-if="datas?.proofOfWages" label="工作证明">
        <Upload list-type="picture-card" :file-list="datas?.proofOfWages" @preview="handlePreview" :showUploadList="showUploadList">
        </Upload>
      </a-descriptions-item>
      <a-descriptions-item label="是否展示" v-if="datas?.isShow">{{datas?.isShow}}</a-descriptions-item>
      <a-descriptions-item label="服务价格" v-if="datas?.servicePrice">{{datas?.servicePrice}}</a-descriptions-item>
      <a-descriptions-item label="审批建议" v-if="datas?.approvalProposal">{{datas?.approvalProposal}}</a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-button type="primary" @click="Approval(1)" v-if="isShowFooter">通过</a-button>
      <a-button type="danger" @click="Approval(2)" v-if="isShowFooter">不通过</a-button>
      <a-button v-if="!isShowFooter" @click="closeDrawer">取消</a-button>
    </template>
    <Modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img :src="previewImage" />
    </Modal>
    <ApprovalComments @register="approvalComments" @success="success"></ApprovalComments>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { Descriptions, Upload, Modal, Tag } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';

  import { UserAudit } from '/@/api/user/userAudit/model/userAuditModel';
  import ApprovalComments from './ApprovalComments.vue';

  const showUploadList = {
    showRemoveIcon: false
  }

  export default defineComponent({
    components: {
      BasicDrawer,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
      Upload,
      Modal,
      Tag,
      ApprovalComments
    },
    setup(_, { emit }) {
      const previewImage = ref('');
      const previewVisible = ref(false);
      const datas = ref<UserAudit>();
      const isShowFooter = ref(true);

      const [approvalComments, { openModal }] = useModal();

      const [register, {closeDrawer}] = useDrawerInner((data) => {
        isShowFooter.value = data.data.userStatus==1
        datas.value = data.data;
      });

      function handlePreview(file:any) {
        previewImage.value = file.url || file.preview;
        previewVisible.value = true;
      }

      function handleCancel(){
        previewVisible.value = false;
      }

      function Approval(value){
        openModal(true, {
          Id: datas.value?.id,
          ApprovalStatus: value
        });
      }

      function success(){
        closeDrawer(),
        emit('success');
      }

      return { register, handlePreview, handleCancel, previewImage, previewVisible, showUploadList, datas, approvalComments, Approval, isShowFooter, closeDrawer, success };
    },
  });
</script>
