import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MotoManagement';

  constructor(
    public authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Injection du PLATFORM_ID
  ) {}

  ngOnInit() {
    // Vérifie si on est dans un environnement de navigateur
    if (isPlatformBrowser(this.platformId)) {
      // Charge le token uniquement si dans le navigateur
      this.authService.loadToken();

      // Vérifier si le token est présent et non expiré, sinon redirection vers login
      if (!this.authService.getToken() || this.authService.isTokenExpired()) {
        this.router.navigate(['/login']);
      }
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redirection après déconnexion
  }
  checkLoginStatus(): boolean {
    return this.authService.isLoggedIn();
  }
}
