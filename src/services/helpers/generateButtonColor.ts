import { FullProduct } from '@/types/gitlab';

export const generateButtonColor = (template: FullProduct) => {
  switch (template) {
    case 'discover': {
      return {
        red: 45 / 255,
        green: 135 / 255,
        blue: 243 / 255,
      };
    }
    case 'marrybaby': {
      return {
        red: 232 / 255,
        green: 83 / 255,
        blue: 136 / 255,
      };
    }
    case 'together': {
      return {
        red: 45 / 255,
        green: 135 / 255,
        blue: 243 / 255,
      };
    }
    case 'components': {
      return {
        red: 234 / 255,
        green: 84 / 255,
        blue: 85 / 255,
      };
    }
    default:
      return {
        red: 45 / 255,
        green: 135 / 255,
        blue: 243 / 255,
      };
  }
};
