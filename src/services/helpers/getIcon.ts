import { FullProduct } from '@/types/gitlab';

export const getIcon = (template: FullProduct) => {
  switch (template) {
    case 'care':
      return 'https://i.imgur.com/ckRbzch.png';
    case 'discover':
      return 'https://i.imgur.com/lXCtGT9.png';
    case 'marrybaby':
      return 'https://i.imgur.com/79OU3bL.png';
    case 'together':
      return 'https://i.imgur.com/aZhZEld.png';
    default:
      return 'https://images.unsplash.com/photo-1586458873452-7bdd7401eabd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2083&q=80';
  }
};
