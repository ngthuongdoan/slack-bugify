import { SupportedProduct } from '@/types/gitlab';

export const JIRA_DASHBOARD = 'https://hhgdev.atlassian.net/jira/dashboards/10122';

export const WEBHOOK_DEV =
  'https://chat.googleapis.com/v1/spaces/AAAAUTKGleo/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=Qg3mPwLKSIh9tFkE-yzWFUywsstLqA7TGKhn3cdsKhc%3D';

// https://gitlab.hellohealthgroup.com/api/v4/users?per_page=100
export const GITLAB_USERNAME = [
  'sudesh',
  'an.pham',
  'quan.nguyen',
  'nhat.bui',
  'nam.phan',
  'petr.jumar',
  'osama',
  'hoanganh.nguyen',
  'thai.nguyen',
  'quy.duong',
  'vu.le',
  'nhan.nguyen',
  'tu.vo',
  'phuong.le',
  'luc.tran',
  'thuong.doanngoc',
  'nguyen.nguyen',
  'quyen.le',
  'tung.vu',
  'huy.tranhoang',
  'anh.huynh',
];
export const MAPPED_GITLAB_WITH_CHAT: Record<string, string> = {
  'thuong.doanngoc': '<users/111394960770002739899>',
  'tung.vu': '<users/109196398756093781275>',
  'phuong.le': '<users/113958131882153040259>',
  'tu.vo': '<users/106835696436895216834>',
  'nhan.nguyen': '<users/116845433979205913639>',
  'luc.tran': '<users/100321842932914600238>',
};

export const JIRA_DOMAIN = 'https://hhgdev.atlassian.net/browse';

export const PRODUCT_ALLOW_LIST: Array<SupportedProduct> = ['discover', 'together', 'marrybaby', 'components', 'care'];

export const MAPPED_WEBHOOK: Partial<Record<SupportedProduct, string>> = {
  discover:
    'https://chat.googleapis.com/v1/spaces/AAAApBiLGu8/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=g_X9HOweTm4dstlwEqzU8ZDjl45k0yX1sBnnck1F9Rs%3D',
  together:
    'https://chat.googleapis.com/v1/spaces/AAAAgTDiVHk/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=68Q0VQ-rDkoFT8Lc_IbOzDyqDJNflOOx1kcMv0DPPBE%3D',
  marrybaby:
    'https://chat.googleapis.com/v1/spaces/AAAAZtXvtfQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=QBRca2sIbdl3_t46dsGAQ4tiRAOLbz58GpQibX0c7Ko%3D',
  components:
    'https://chat.googleapis.com/v1/spaces/AAAAbpqlXjw/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=0HiHbzY1xabnlN4vooLj5rQXji2b0ZYjKEfkw-2GOvo%3D',
  care: 'https://chat.googleapis.com/v1/spaces/AAAAT65hukQ/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=SZ5xtXpazqI7Rgcl5gp-H_rF9svHPhXDDfv4M3bTn1Q%3D',
};

export const DEPLOYMENT_WEBHOOK =
  'https://chat.googleapis.com/v1/spaces/AAAAsihEtJI/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=UoKUKHw2BNmm2e6rlcH4rNcA2GXTaL3juljUKYfHros%3D';

export const START_BUILD_NAME: Record<string, Array<string>> = {
  PRODUCTION: ['deploy-BACSI-production-hotfix', 'deploy-k8s-prod-hotfix', 'deploy-BACSI-prod-hotfix'],
  STAGING: ['deploy-BACSI-production', 'deploy-k8s-prod', 'deploy-BACSI-prod', 'deploy-hellosites-prod'],
};
export const END_BUILD_NAME: Record<string, Array<string>> = {
  PRODUCTION: ['release-tag-hotfix'],
  STAGING: ['release-tag', 'release-tag-feature'],
};

export const HUYEN_SPACE_ID = '<users/107074842078370270944>';
export const HA_SPACE_ID = '<users/108093528943893108464>';

export const TESTER_BY_PROJECT: Partial<Record<SupportedProduct, string>> = {
  discover: HUYEN_SPACE_ID,
  care: HA_SPACE_ID,
  marrybaby: HUYEN_SPACE_ID,
  together: HUYEN_SPACE_ID,
};
