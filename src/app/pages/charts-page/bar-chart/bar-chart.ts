import { Component, inject } from '@angular/core';
import { Chart } from '../../../shared/components/chart/chart';
import { ChartsServices } from '../services/charts-services';

@Component({
  selector: 'app-bar-chart',
  imports: [Chart],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.css',
})
export class BarChart {
  services = inject(ChartsServices);
  barChart = this.services.getBarChart();
  barData = this.barChart.data;
  barOptions = this.barChart.options;
}
