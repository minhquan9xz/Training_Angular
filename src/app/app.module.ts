import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { fakeBackendProvider } from './core/services/fake-backend';
import { AccountService } from './core/services/account.service';
import { HttpClientModule } from '@angular/common/http';
import { MyDatatableComponent } from './core/components/my-datatable/my-datatable.component';
import { FormAddComponent } from './core/components/form-add/form-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  declarations: [AppComponent, MyDatatableComponent, FormAddComponent],
  bootstrap: [AppComponent],
  providers: [
    // provider used to create fake backend,
    AccountService,
    fakeBackendProvider,
  ],
})
export class AppModule {}
