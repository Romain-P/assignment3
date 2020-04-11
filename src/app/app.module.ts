import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { ArticleDialogComponent } from './components/article-dialog/article-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ArticleService} from './services/article.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ArticleDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
