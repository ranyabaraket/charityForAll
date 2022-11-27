import { AccueilComponent } from './components/accueil/accueil.component';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { ProfileAssocComponent } from './components/profile-assoc/profile-assoc.component';
import { DonneursComponent } from './components/donneurs/donneurs.component';
import { LoginDonneurComponent } from './components/login-donneur/login-donneur.component';

import { ProfileDonneurComponent } from './components/profile-donneur/profile-donneur.component';

import { CategoriesComponent } from './components/categories/categories.component';
import { AssociationsComponent } from './components/associations/associations.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileAdminComponent } from './admin/profile-admin/profile-admin.component';
  
import { TestComponent } from './components/test/test.component';
import { InquiryComponent } from './admin/inquiry/inquiry.component';

const routes: Routes = [
  {path : "EspaceAdmin/login",component:LoginAdminComponent},
  {path : "EspaceDonneur/login",component:LoginDonneurComponent},
  {path : "EspaceAdmin/profile",component:ProfileAdminComponent},
  {path : "EspaceAdmin/associations",component:AssociationsComponent},
  {path : "EspaceAdmin/categories",component:CategoriesComponent},
  {path : "EspaceAdmin/actualites",component:ActualitesComponent},
  {path : "EspaceAdmin/donneurs",component:DonneursComponent},
  {path : "EspaceAssoc/profile",component:ProfileAssocComponent},
{path:"Register",component:RegisterComponent},
  {path : "EspaceDonneur/profile",component:ProfileDonneurComponent},

  {path : "Test",component:TestComponent},
  {path : "EspaceAdmin/Inquiry",component:InquiryComponent},

  {path : "",component:AccueilComponent},






];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
