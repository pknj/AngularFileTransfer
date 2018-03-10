import {OrderService} from './services/order.service';
import {AuthService} from './services/auth.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {AdminComponent} from './admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {NoAccessComponent} from './no-access/no-access.component';
import {AuthGuard} from './services/auth-guard.service';
import {AdminAuthGuard} from './services/admin-auth-guard.service';
import {AuthConfigConsts, AuthHttp, JwtHelper, provideAuth} from 'angular2-jwt';
import {HttpClientModule} from '@angular/common/http';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {AlertModule} from 'ngx-bootstrap';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    NoAccessComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'no-access', component: NoAccessComponent}
    ]),
    AlertModule.forRoot(),
    FileUploadModule,
  ],
  providers: [
    OrderService,

    AuthService,
    AuthGuard,
    AdminAuthGuard,
    AuthHttp,
    provideAuth({
      headerName: AuthConfigConsts.DEFAULT_HEADER_NAME,
      headerPrefix: AuthConfigConsts.HEADER_PREFIX_BEARER,
      tokenName: AuthConfigConsts.DEFAULT_TOKEN_NAME,
      tokenGetter: (() => localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME)),
      globalHeaders: [{'Content-Type': 'application/json'}],
      noJwtError: true
    }),
    JwtHelper,

    // For creating a mock back-end. You don't need these in a real app.
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
