import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LineChart } from '../charts-page/line-chart/line-chart';
import { BarChart } from '../charts-page/bar-chart/bar-chart';
import { PieChart } from '../charts-page/pie-chart/pie-chart';
import { HorizontalBarChart } from '../charts-page/horizontal-bar-chart/horizontal-bar-chart';
import { WhiteCard } from '../../shared/components/white-card/white-card';
import { Chart } from '../../shared/components/chart/chart';
import { ChartsServices } from '../charts-page/services/charts-services';

@Component({
  selector: 'app-dashboard',
  imports: [LineChart, BarChart, PieChart, HorizontalBarChart, WhiteCard, Chart],
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
  users = ['rwfw', 'faChartGantt', 'rfrt.rwfrf'];

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
