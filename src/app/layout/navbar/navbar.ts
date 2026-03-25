import { Component, inject } from '@angular/core';
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
import { Dashboard } from '../../pages/dashboard/dashboard';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, Dashboard],
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
    console.log(this.isToggleOpened);
  }
}
