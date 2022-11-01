
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FlashMessagesModule } from 'flash-messages-angular';

import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
import { HomeComponent } from './components/home/home.component';
import { AssociationsComponent } from './components/associations/associations.component';
import { CategoriesComponent } from './components/categories/categories.component';


import { SimpleNotificationsModule } from 'angular2-notifications';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatDividerModule} from '@angular/material/divider';
import { RegisterComponent } from './components/register/register.component';
import { LoginDonneurComponent } from './components/login-donneur/login-donneur.component';
import { DonneurProfileComponent } from './components/donneur-profile/donneur-profile.component';
import { DonneursComponent } from './components/donneurs/donneurs.component';
import { ProfileAssocComponent } from './components/profile-assoc/profile-assoc.component';
import { ActualitesComponent } from './components/actualites/actualites.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginAdminComponent,
    SidebarComponent,
      ProfileAdminComponent,
      HomeComponent,
      AssociationsComponent,
      CategoriesComponent,
      RegisterComponent,
      LoginDonneurComponent,
      DonneurProfileComponent,
      DonneursComponent,
      ProfileAssocComponent,
      ActualitesComponent,







  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,

    FlashMessagesModule.forRoot(),
     NgbModule,
     BrowserAnimationsModule,
     MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
     SimpleNotificationsModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
