import { BasicFetchResult, BasicPageParams, FileInfo } from '/@/api/model/baseModel';

export interface UserAudit {
  id: string;
  name: string;
  idCard: string;
  telephone: string;
  ageStageDictionary: string;
  educationDictionary: string;
  isAtHome: string;
  mechanism: string;
  nativePlace: string;
  servicePerIdentityDictionary: string;
  servicePerLevelDictionary: string;
  servicePerTypeDictionary: string;
  servicePrice: number;
  serviceTypeDictionary: string;
  sexDictionary: string;
  personalPortrait: Array<FileInfo>;
  serviceSkillDictionary: string;
  servicePackagInfo: string;
  qualificationPhoto: Array<FileInfo>;
  proofOfWages: Array<FileInfo>;
  userStatus: number;
  isShow: string;
  approvalProposal: string;
}

export type GetUserAuditByPagedModel = BasicFetchResult<UserAudit>;

export interface GetPagedParams extends BasicPageParams {

}

export interface Approval {
  id: string;
  approvalStatus: number;
  servicePrice: number;
  approvalProposal: string;
}
