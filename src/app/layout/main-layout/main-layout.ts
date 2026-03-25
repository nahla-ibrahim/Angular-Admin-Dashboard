import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Sidebar } from '../sidebar/sidebar';
import { LayoutServices } from '../../core/services/layout-services';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Navbar, Sidebar, NgClass],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  layoutServices = inject(LayoutServices);

  isOpenSidebar: boolean = this.layoutServices.openSidebar();
}
