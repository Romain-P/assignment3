import {Article} from '../../../server/article';

export interface DialogData {
  create: boolean;
  article: Article | undefined;
}
