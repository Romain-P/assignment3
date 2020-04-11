import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../../server/article';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private endpoint = environment.apiUrl + '/article';

  constructor(private http: HttpClient) {}

  public create(article: Article): Promise<Article> {
    return this.http.post<Article>(this.endpoint, article).toPromise<Article>();
  }

  public update(article: Article): Promise<void> {
    return this.http.put<void>(this.endpoint, article).toPromise<void>();
  }

  public load(id: number): Promise<Article> {
    return this.http.get<Article>(`${this.endpoint}/${id}`).toPromise<Article>();
  }

  public loadAll(): Promise<Article[]> {
    return this.http.get<Article[]>(this.endpoint + 's').toPromise<Article[]>();
  }

  public delete(id: number): Promise<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).toPromise<void>();
  }
}
