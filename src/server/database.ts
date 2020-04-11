import {Article} from './article';

const fs = require('fs');
const databasePath = __dirname + '/database/articles';

export class Database {
  private articles: Map<number, Article>;
  private idGenerator: number;
  private readonly saveOnDisk: boolean;

  constructor(saveOnDisk?: boolean) {
    this.articles = new Map<number, Article>();
    this.idGenerator = 1;
    this.saveOnDisk = saveOnDisk || false;
    this.loadFromDisk();
  }

  public save(article: Article): Article {
    if (this.articles.has(article.id)) {
      const found = this.articles.get(article.id);
      found.content = article.content;
      found.title = article.title;
    } else {
      article.id = this.idGenerator++;
      this.articles.set(article.id, article);
    }
    this.saveToDisk();
    return article;
  }

  public delete(id: number) {
    this.articles.delete(+id);
  }

  public load(id: number): Article {
    return this.articles.get(id);
  }

  public loadAll(): Article[] {
    return Array.from(this.articles.values());
  }

  private saveToDisk() {
    if (!this.saveOnDisk) return;

    const articles: Article[] = Array.from(this.articles.values());
    fs.writeFileSync(databasePath, JSON.stringify(articles), { flag: 'w+' });
  }

  private loadFromDisk() {
    if (!this.saveOnDisk || !fs.existsSync(databasePath)) return;

    const articles = JSON.parse(fs.readFileSync(databasePath).toString('utf8')) as Article[];
    articles.forEach(x => this.articles.set(x.id, x));
  }
}
