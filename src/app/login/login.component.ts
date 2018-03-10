import {AuthService} from './../services/auth.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;

  ngOnInit(): void {
    this.authService.logout();
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
  }

  signIn(credentials) {
    this.authService.login(credentials)
      .subscribe(result => {
        if (result) {
          const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          this.router.navigate([returnUrl || '/']);
        } else {
          this.invalidLogin = true;
        }
      });
  }
}
