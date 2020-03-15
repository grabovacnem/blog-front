import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddEditComponent } from './components/blog/add-edit/add-edit.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {HttpRequestService} from "./core/services/http-request.service";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {CommunicationService} from "./core/services/communication.service";

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    AddEditComponent,
    HeaderComponent,
    SidebarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
  providers: [HttpRequestService, CommunicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
