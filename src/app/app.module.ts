import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdduserComponent } from './adduser/adduser.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddprojectComponent } from './addproject/addproject.component';
import { ModalModule} from 'ngx-bootstrap';
import { TypeaheadModule} from 'ngx-bootstrap';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddtaskComponent } from './addtask/addtask.component';


@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    AddprojectComponent,
    AddtaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [ModalModule, TypeaheadModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
