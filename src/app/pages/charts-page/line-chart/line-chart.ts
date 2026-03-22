import { Component, inject } from '@angular/core';
import { Chart } from '../../../shared/components/chart/chart';
import { ChartsServices } from '../services/charts-services';

@Component({
  selector: 'app-line-chart',
  imports: [Chart],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.css',
})
export class LineChart {
  services = inject(ChartsServices);
  lineChart = this.services.getLineChart();
  lineData = this.lineChart.data;
  lineOptions = this.lineChart.options;
}
