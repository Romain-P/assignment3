import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {ArticleDialogComponent} from './components/article-dialog/article-dialog.component';
import {ArticleService} from './services/article.service';
import {Article} from '../server/article';
import {DialogData} from './components/article-dialog/dialog-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assignment03';
  articles: Article[];
  reduced: Article[];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [1, 2, 5, 10, 25, 100];
  pageEvent: PageEvent;

  constructor(public dialog: MatDialog, public articleService: ArticleService) {}

  ngOnInit(): void {
    this.pageEvent = {pageIndex: 0, previousPageIndex: undefined, length: this.length, pageSize: 10};
    this.articleService.loadAll().then(x => this.initArticles(x));
  }

  initArticles(articles: Article[]): void {
    this.articles = articles.reverse();
    this.length = articles.length;
    this.reduceArticles();
  }

  onSelectedPage(event?: PageEvent) {
    if (event === undefined) return;
    this.pageEvent = event;
    this.reduceArticles();
  }

  reduceArticles() {
    const startIndex = this.pageEvent.pageSize * this.pageEvent.pageIndex;
    this.reduced = this.articles.filter((_, i) => i >= startIndex && i < startIndex + this.pageEvent.pageSize);
  }

  openDialog(currentArticle: Article, create?: boolean): void {
    const doCreate = create || false;
    this.dialog.open(ArticleDialogComponent, {
      width: '500px',
      data: {create: doCreate, article: currentArticle} as DialogData
    }).afterClosed().toPromise().then(x => this.ngOnInit());
  }
}
