import { StatistiqueComponent } from './statistique/statistique.component';
import { ProfilNoModifComponent } from './profil-no-modif/profil-no-modif.component';
import { ConnectionGuard } from './_auth/connection.guard';
import { ImportBudgetEpnCtdComponent } from './demande/import-budget-epn-ctd/import-budget-epn-ctd.component';
import { ImportMarcheComponent } from './demande/import-marche/import-marche.component';
import { MandatComponent } from './demande/mandat/mandat.component';
import { ExportBopComponent } from './demande/export-bop/export-bop.component';
import { ExportTiersSiigmpComponent } from './demande/export-tiers-siigmp/export-tiers-siigmp.component';
import { ExportBmandComponent } from './demande/export-bmand/export-bmand.component';
import { DemandeSpecifiqueComponent } from './demande/demande-specifique/demande-specifique.component';
import { ResultatRechercheComponent } from './resultat-recherche/resultat-recherche.component';
import { DetailDemandeComponent } from './detail-demande/detail-demande.component';
import { DemandeLoginComponent } from './demande/demande-login/demande-login.component';
import { InsertionRibComponent } from './demande/insertion-rib/insertion-rib.component';
import { InsertionTiersComponent } from './demande/insertion-tiers/insertion-tiers.component';
import { ListeTypeDemandeComponent } from './liste-type-demande/liste-type-demande.component';
import { ListeDemandeComponent } from './liste-demande/liste-demande.component';
import { DemandeComponent } from './demande/demande.component';
import { NotificationComponent } from './notification/notification.component';
import { ContactComponent } from './contact/contact.component';
import { ProfilGuardGuard } from './_auth/profil-guard.guard';
import { ProfilComponent } from './profil/profil.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthGuard } from './_auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path:'' , component:HomeComponent },
  {path:'home' , component:HomeComponent },
  {path:'admin' , component:AdminComponent , canActivate:[AuthGuard] , data:{roles:['Admin']} },
  {path:'user' , component:UserComponent , canActivate:[AuthGuard] , data:{roles:['User']}},
  {path:'login' , component:LoginComponent , canActivate:[ConnectionGuard] },
  {path:'forbidden' , component:ForbiddenComponent },
  {path:'inscription' , component:InscriptionComponent , canActivate:[ConnectionGuard]},
  {path:'forgetPass' , component:ForgetPasswordComponent , canActivate:[ConnectionGuard] },
  {path:'contact' , component:ContactComponent },
  {path:'setting' , component:ProfilComponent , canActivate:[ProfilGuardGuard] },
  {path:'statistique' , component:StatistiqueComponent , canActivate:[ProfilGuardGuard] },
  {path:'profil' , component:ProfilNoModifComponent , canActivate:[ProfilGuardGuard] },
  {path:'notification' , component:NotificationComponent , canActivate:[ProfilGuardGuard] },
  {path:'detailDemande/:idDemande' , component:DetailDemandeComponent , canActivate:[ProfilGuardGuard] },
  {path:'rechercheTypeDemande/:motClef' , component:ResultatRechercheComponent , canActivate:[ProfilGuardGuard] },
  {path:'demande' , component:DemandeComponent , canActivate:[ProfilGuardGuard] , children: [
    {
        path: 'insertionTiers',
        component: InsertionTiersComponent,
    },
    {
      path: 'insertionRIB',
      component: InsertionRibComponent,
    },
    {
      path: 'demandeLogin',
      component: DemandeLoginComponent,
    },
    {
      path: '',
      component: DemandeSpecifiqueComponent,
    },
    {
      path: 'demandeSpecifique',
      component: DemandeSpecifiqueComponent,
    },
    {
      path: 'exportBmand',
      component: ExportBmandComponent,
    },
    {
      path: 'exportTiersSiigmp',
      component: ExportTiersSiigmpComponent,
    },
    {
      path: 'exportBop',
      component: ExportBopComponent,
    },
    {
      path: 'mandat',
      component: MandatComponent,
    },
    {
      path: 'importMarche',
      component: ImportMarcheComponent,
    },
    {
      path: 'importBudgetEpnCtd',
      component: ImportBudgetEpnCtdComponent,
    },
] },
  {path:'typeDemande' , component:ListeTypeDemandeComponent , canActivate:[ProfilGuardGuard] },
  {path:'listeDemande' , component:ListeDemandeComponent , canActivate:[ProfilGuardGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

    ngOnInit(): void {

    }


}
