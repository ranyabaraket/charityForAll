import { DonnattionListComponent } from './components/donnattion-list/donnattion-list.component';
import { GestionDonsComponent } from './components/gestion-dons/gestion-dons.component';
import { DonationComponent } from './components/donation/donation.component';
import { ListBesoinsComponent } from './components/list-besoins/list-besoins.component';
import { GestionDemandesComponent } from './components/gestion-demandes/gestion-demandes.component';
import { BesoinsComponent } from './components/besoins/besoins.component';
import { DonneurProfileComponent } from './components/donneur-profile/donneur-profile.component';
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

import { PublierComponent } from './components/publier/publier.component';
import { PublierTestComponent } from './components/publier-test/publier-test.component';


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
  {path : "EspaceAssoc/demandes/besoins",component:BesoinsComponent},
{path:"Register",component:RegisterComponent},

  {path : "EspaceDonneur/profile",component:DonneurProfileComponent},
  {path : "EspaceDonneur/donate",component:DonationComponent},
  {path : "EspaceAssoc/publier",component:PublierComponent},
  {path : "EspaceAdmin/demandes",component:GestionDemandesComponent},
  {path : "EspaceAdmin/dons",component:GestionDonsComponent},
  {path : "EspaceAdmin/dons/listeBesoins",component:DonnattionListComponent},
  {path : "EspaceAdmin/demandes/besoins",component:ListBesoinsComponent},

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
