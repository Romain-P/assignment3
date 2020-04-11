import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from './dialog-data';
import {Article} from '../../../server/article';
import {ArticleService} from '../../services/article.service';

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent {
  public edit: boolean;
  public create: boolean;
  public article: Article;

  constructor(
    private service: ArticleService,
    public dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
    this.edit = data.create;
    this.create = data.create;
    this.article = this.cloneArticle();
  }

  onEdit() {
    this.edit = true;
  }

  onSave() {
    this.data.article.title = this.article.title;
    this.data.article.content = this.article.content;
    this.edit = false;
    this.service.update(this.data.article).then(onSuccess => console.log('toaster')/* toaster */);
  }

  onCancel() {
    this.article = this.cloneArticle();
    this.edit = false;
  }

  onDelete() {
    this.service.delete(this.data.article.id).then(onSuccess => this.dialogRef.close());
  }

  onCreate() {
    this.data.article = this.article;
    this.create = false;
    this.edit = false;
    this.service.create(this.article).then(created => {
      this.data.article.id = created.id;
      //TODO: toaster
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cloneArticle(): Article {
    return JSON.parse(JSON.stringify(this.data.article || {id: -1, title: '', content: ''})) as Article;
  }
}
