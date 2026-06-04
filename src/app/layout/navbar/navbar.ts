import { Component, inject, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCalendar,
  faBell,
  faMoon,
  faSun,
  faSearch,
  faBars,
  faLongArrowAltRight,
  faChartBar,
  faFeatherPointed,
  faAngleDown,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import { faEarlybirds } from '@fortawesome/free-brands-svg-icons';
import { LayoutServices } from '../../core/services/layout-services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  Calendar = faCalendar;
  Bell = faBell;
  Moon = faMoon;
  Sun = faSun;
  search = faSearch;
  bars = faBars;
  arrowLight = faLongArrowAltRight;
  ChartBar = faChartBar;
  kiwiBird = faEarlybirds;
  FeatherPointed = faFeatherPointed;
  AngleDown = faAngleDown;
  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;

  layoutServixes = inject(LayoutServices);
  isOpenSidebar: boolean = this.layoutServixes.openSidebar();
  isToggleOpened = false;

  openSidebar() {
    this.layoutServixes.toggleSidebar();
  }

  openToggle() {
    this.isToggleOpened = !this.isToggleOpened;
  }

  ngOnInit(): void {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'dark') {
      this.isDark.set(true);
      document.documentElement.classList.add('dark');
    }
  }
  isDark = signal<boolean>(false);
  toggleDarkMode() {
    this.isDark.set(!this.isDark());

    let x = document.documentElement.classList.toggle('dark', this.isDark());

    localStorage.setItem('darkMode', this.isDark() ? 'dark' : 'light');
  }
}
