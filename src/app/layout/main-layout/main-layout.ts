import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.html',
})
export class MainLayout {
  sidebarAberta = false;

  toggleSidebar(): void {
    this.sidebarAberta = !this.sidebarAberta;
  }

  fecharSidebar(): void {
    this.sidebarAberta = false;
  }
}
