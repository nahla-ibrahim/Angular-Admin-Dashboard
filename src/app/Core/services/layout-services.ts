import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutServices {
  openSidebar = signal(false);

  toggleSidebar() {
    this.openSidebar.set(!this.openSidebar());
  }
}
