import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';

// Imports for loading & configuring the in-memory web api
import { LinkData } from './links/link-data';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LinkModule } from './links/link.module';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    InMemoryWebApiModule.forRoot(LinkData, { delay: 1000 }),
    RouterModule.forRoot([
    { path: 'welcome', component: WelcomeComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
    ]),
    LinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
