import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../core/services/auth';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { map, Observable } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, CommonModule, MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  authService = inject(Auth);
  logout() {
    this.authService.logout();
  }
  ngOnInit(): void {
  
  }
 
}
