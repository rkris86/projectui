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
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { DateValidatorDirective } from './addtask/date-validator.directive';
import { StartValidatorDirective } from './addtask/start-validator.directive';



@NgModule({
  declarations: [
    AppComponent,
    AdduserComponent,
    AddprojectComponent,
    AddtaskComponent,
    ViewtaskComponent,
    DateValidatorDirective,
    StartValidatorDirective
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
