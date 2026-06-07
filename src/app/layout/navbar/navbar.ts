import { Component, inject, signal } from '@angular/core';
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
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { faEarlybirds } from '@fortawesome/free-brands-svg-icons';
import { LayoutServices } from '../../core/services/layout-services';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);
  layoutServixes = inject(LayoutServices);

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
  User = faUser;
  logoutIcon = faRightFromBracket;
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

  //////////notifications
  notifications = [
    {
      title: 'New User Registered',
      message: 'Ahmed created a new account',
      time: '2 min ago',
      read: false,
    },
    {
      title: 'Order Completed',
      message: 'Order #1024 has been completed',
      time: '10 min ago',
      read: false,
    },
    {
      title: 'Server Updated',
      message: 'System update completed successfully',
      time: '1 hour ago',
      read: true,
    },
  ];
  showNotifications = signal<boolean>(false);
  toggleNotifications() {
    this.showNotifications.set(!this.showNotifications());
    if (this.showNotifications()) {
      this.showProfileMenu.set(false);
    }
  }
  notfRead(item: { read: boolean }) {
    item.read = !item.read;
  }
  markAllAsRead() {
    if (this.unreadCount > 0) {
      this.notifications.forEach((item) => (item.read = true));
    } else {
      this.notifications.forEach((item) => (item.read = false));
    }
  }
  get unreadCount() {
    return this.notifications.filter((item) => !item.read).length;
  }

  //////////profile menu
  showProfileMenu = signal<boolean>(false);
  toggleProfileMenu() {
    this.showProfileMenu.set(!this.showProfileMenu());
    if (this.showProfileMenu()) {
      this.showNotifications.set(false);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
