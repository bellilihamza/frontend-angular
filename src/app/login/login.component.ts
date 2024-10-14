import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  erreur: number= 0;

  user = new User();


  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

    err:number = 0;
    onLogged()   {
      this.authService.login(this.user).subscribe({
        next: (data) => {
          this.err = 1; 
          let jwToken = data.headers.get('Authorization')!;
          console.log(jwToken)
          this.authService.saveToken(jwToken);
           this.router.navigate(['/']); 
        },
        error: (err: any) => {
        }
        });
}
}