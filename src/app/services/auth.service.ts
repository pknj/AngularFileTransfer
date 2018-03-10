import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {AuthConfigConsts, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  private authUrl = 'http://localhost:8091/auth';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http,
              private jwtHelper: JwtHelper) {
  }

  login(credentials): Observable<boolean> {
    return this.http.post(this.authUrl,
      JSON.stringify(credentials),
      {headers: this.headers})
      .map((response: Response) => {
        const result = response.json();
        if (result && result.token) {
          localStorage.setItem(AuthConfigConsts.DEFAULT_TOKEN_NAME, result.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
  }

  public isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUser() {
    const token = localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME);
    if (!token) {
      return false;
    }
    return this.jwtHelper.decodeToken(token);
  }


}

