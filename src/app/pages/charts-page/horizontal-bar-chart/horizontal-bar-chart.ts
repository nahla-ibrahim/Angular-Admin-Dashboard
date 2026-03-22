import { Component, inject } from '@angular/core';
import { Chart } from '../../../shared/components/chart/chart';
import { ChartsServices } from '../services/charts-services';

@Component({
  selector: 'app-horizontal-bar-chart',
  imports: [Chart],
  templateUrl: './horizontal-bar-chart.html',
  styleUrl: './horizontal-bar-chart.css',
})
export class HorizontalBarChart {
  services = inject(ChartsServices);
  horizontalBarChart = this.services.getHorizontalBarChart();
  horizontalData = this.horizontalBarChart.data;
  horizontalOptions = this.horizontalBarChart.options;
}
