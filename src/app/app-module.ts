import { CUSTOM_ELEMENTS_SCHEMA, NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Footer } from './layout/footer/footer';
import { Navbar } from './layout/navbar/navbar';
import { TaskPage } from './components/task-page/task-page';
import { defineElement } from '@lordicon/element';
import { LayoutService } from './services/layout.service';
import { appConfig } from './app.config';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import lottie from 'lottie-web';
import { CommonModule } from '@angular/common';


// PrimeNg :

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { MultiSelectModule } from 'primeng/multiselect';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { FormsModule } from '@angular/forms';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { EditorModule } from 'primeng/editor';
import { MenuModule } from 'primeng/menu';



@NgModule({
  declarations: [
    App,
    Footer,
    Navbar,
    TaskPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    MenubarModule,
    CardModule,
    DividerModule,
    TableModule,
    CommonModule,
    InputTextModule,
    TagModule,
    SelectModule,
    MultiSelectModule,
    IconFieldModule,
    InputIconModule,    
    DialogModule,
    AvatarModule,
    DatePickerModule,
    FluidModule,
    FormsModule,
    EditorModule,
    CascadeSelectModule,
    MenuModule

    
  ],
  providers: [
    LayoutService,
    appConfig,
    provideZonelessChangeDetection(), 
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { 

   constructor(public layoutService: LayoutService) {
    defineElement(lottie.loadAnimation);
   }
}

