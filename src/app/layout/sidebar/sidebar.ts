import { Component, inject } from '@angular/core';
import {
  faArrowRight,
  faArrowLeft,
  faHome,
  faUser,
  faCartShopping,
  faIndustry,
  faChartLine,
  faCalendar,
  faPieChart,
  faUsers,
  faQuestionCircle,
  faChartSimple,
  faSquarePollHorizontal,
} from '@fortawesome/free-solid-svg-icons';
import { faEarlybirds } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LayoutServices } from '../../core-2/services/layout-services';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [FontAwesomeModule, RouterLink, RouterLinkActive, NgClass, NgStyle],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  arrowRight = faArrowRight;
  arrowLeft = faArrowLeft;
  Home = faHome;
  Users = faUsers;
  CartShopping = faCartShopping;
  Industry = faIndustry;
  Calendar = faCalendar;
  PieChart = faPieChart;
  ChartLine = faChartLine;
  QuestionCircle = faQuestionCircle;
  user = faUser;
  ChartBar = faChartSimple;
  horizontalChart = faSquarePollHorizontal;

  KiwiBird = faEarlybirds;
  layoutServices = inject(LayoutServices);
  isOpenSidebar = this.layoutServices.openSidebar;
}
