import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signIn() {
    return this.authService
      .signInWithGoogle()
      .pipe(tap(() => this.router.navigate(['/'])))
      .subscribe();
  }
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}
}
