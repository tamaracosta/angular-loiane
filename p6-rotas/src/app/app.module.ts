import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CursosComponent } from './cursos/cursos.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//import { routing } from './app.routing';
import { AppRoutingModule } from './app.routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    //routing,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
