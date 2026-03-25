import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutServices {
  openSidebar = signal<boolean>(false);

  toggleSidebar() {
    this.openSidebar.set(!this.openSidebar());
  }
}
