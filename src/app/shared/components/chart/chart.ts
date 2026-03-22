import { Component, HostListener, input, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective],
  templateUrl: './chart.html',
  styleUrl: './chart.css',
})
export class Chart {
  type = input.required<ChartType>();
  options = input.required<ChartOptions>();
  data = input.required<ChartData>();
}
