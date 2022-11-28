import { UserService } from './_services/user.service';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { AuthGuard } from './_auth/auth.guard';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InscriptionComponent } from './inscription/inscription.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilComponent } from './profil/profil.component';
import { ContactComponent } from './contact/contact.component';
import { NotificationComponent } from './notification/notification.component';
import { DemandeComponent } from './demande/demande.component';
import { ListeDemandeComponent } from './liste-demande/liste-demande.component';
import { ListeTypeDemandeComponent } from './liste-type-demande/liste-type-demande.component';
import { InsertionTiersComponent } from './demande/insertion-tiers/insertion-tiers.component';
import { DemandeLoginComponent } from './demande/demande-login/demande-login.component';
import { InsertionRibComponent } from './demande/insertion-rib/insertion-rib.component';
import { DetailDemandeComponent } from './detail-demande/detail-demande.component';
import { ResultatRechercheComponent } from './resultat-recherche/resultat-recherche.component';
import { ExportBmandComponent } from './demande/export-bmand/export-bmand.component';
import { ExportTiersSiigmpComponent } from './demande/export-tiers-siigmp/export-tiers-siigmp.component';
import { ExportBopComponent } from './demande/export-bop/export-bop.component';
import { MandatComponent } from './demande/mandat/mandat.component';
import { ImportMarcheComponent } from './demande/import-marche/import-marche.component';
import { ImportBudgetEpnCtdComponent } from './demande/import-budget-epn-ctd/import-budget-epn-ctd.component';
import { DemandeSpecifiqueComponent } from './demande/demande-specifique/demande-specifique.component';
import { ProfilNoModifComponent } from './profil-no-modif/profil-no-modif.component';
import { StatistiqueComponent } from './statistique/statistique.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    InscriptionComponent,
    SidebarComponent,
    FooterComponent,
    ForgetPasswordComponent,
    ProfilComponent,
    ContactComponent,
    NotificationComponent,
    DemandeComponent,
    ListeDemandeComponent,
    ListeTypeDemandeComponent,
    InsertionTiersComponent,
    DemandeLoginComponent,
    InsertionRibComponent,
    DetailDemandeComponent,
    ResultatRechercheComponent,
    ExportBmandComponent,
    ExportTiersSiigmpComponent,
    ExportBopComponent,
    MandatComponent,
    ImportMarcheComponent,
    ImportBudgetEpnCtdComponent,
    DemandeSpecifiqueComponent,
    ProfilNoModifComponent,
    StatistiqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,


  ],
  providers: [
    AuthGuard ,
    {
      provide :HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
