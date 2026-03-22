import { Component, inject } from '@angular/core';
import { Chart } from '../../../shared/components/chart/chart';
import { ChartsServices } from '../services/charts-services';

@Component({
  selector: 'app-pie-chart',
  imports: [Chart],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})
export class PieChart {
  services = inject(ChartsServices);
  pieChart = this.services.getPieChart();
  pieData = this.pieChart.data;
  pieOptions = this.pieChart.options;
}
