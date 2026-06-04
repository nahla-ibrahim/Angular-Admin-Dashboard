import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { WhiteCard } from '../../shared/components/white-card/white-card';
import { Chart } from '../../shared/components/chart/chart';
import { ChartsServices } from '../charts-page/services/charts-services';
import { NgClass } from '@angular/common';
import {
  faUser,
  faToolbox,
  faCartArrowDown,
  faSackDollar,
} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Table } from '../../shared/components/table/table';

@Component({
  selector: 'app-dashboard',
  imports: [WhiteCard, Chart, NgClass, FaIconComponent, Table],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  router = inject(Router);
  chartService = inject(ChartsServices);
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  users = [
    {
      firstName: 'John',
      age: 30,
      email: 'john@example.com',
      phone: '123-456-7890',
      role: 'Admin',
    },
    {
      firstName: 'Jane',
      age: 25,
      email: 'jane@example.com',
      phone: '098-765-4321',
      role: 'User',
    },
    {
      firstName: 'Bob',
      age: 35,
      email: 'bob@example.com',
      phone: '555-555-5555',
      role: 'Moderator',
    },
    {
      firstName: 'Alice',
      age: 28,
      email: 'alice@example.com',
      phone: '111-111-1111',
      role: 'User',
    },
    {
      firstName: 'Charlie',
      age: 32,
      email: 'charlie@example.com',
      phone: '999-999-9999',
      role: 'User',
    },
    {
      firstName: 'David',
      age: 40,
      email: 'david@example.com',
      phone: '444-444-4444',
      role: 'Admin',
    },
  ];

  cards = [
    {
      title: 'Total Users',
      value: '1,250',
      change: '+12%',
      trend: 'up',
      icon: faUser,
      iconBg: 'bg-purple-200 text-black',
    },
    {
      title: 'Products',
      value: '320',
      change: '+5%',
      trend: 'up',
      icon: faToolbox,
      iconBg: 'bg-green-200 text-black',
    },
    {
      title: 'Orders',
      value: '890',
      change: '-3%',
      trend: 'down',
      icon: faCartArrowDown,
      iconBg: 'bg-rose-200 text-black',
    },
    {
      title: 'Revenue',
      value: '$12,500',
      change: '+8%',
      trend: 'up',
      icon: faSackDollar,
      iconBg: 'bg-amber-200 text-black',
    },
  ];

  // linechart
  lineChart = this.chartService.getLineChart();
  lineData = this.lineChart.data;
  lineOptions = this.lineChart.options;
  // barchart
  barChart = this.chartService.getBarChart();
  barData = this.barChart.data;
  barOptions = this.barChart.options;
  // horizontalchart
  horizontalChart = this.chartService.getHorizontalBarChart();
  horizontalData = this.horizontalChart.data;
  horizontalOptions = this.horizontalChart.options;
  // piechart
  pieChart = this.chartService.getPieChart();
  pieData = this.pieChart.data;
  pieOptions = this.pieChart.options;
}
