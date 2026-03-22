import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class ChartsServices {
  getLineChart() {
    return {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Users Growth',
            data: [10, 25, 18, 30, 22, 40],
            fill: true,
            tension: 0.5,
            backgroundColor: 'rgba(192, 192, 192, 0.4)',
            borderColor: '#008080',
            pointRadius: 3,
            pointBorderColor: '#008080',
            pointHoverRadius: 5,
          },
          {
            label: 'Orders Growth',
            data: [2, 15, 7, 14, 20, 22],
            fill: true,
            tension: 0.5,
            backgroundColor: 'rgba(0, 128, 128, .7)',
            borderColor: 'black',
            pointRadius: 3,
            pointBorderColor: 'black',
            pointHoverRadius: 5,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    };
  }
  getBarChart() {
    return {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Users Growth',
            data: [10, 25, 18, 30, 22, 40],
            backgroundColor: 'rgba(0, 128, 128, 1)',
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(0, 128, 128, .5)',
          },
          {
            label: 'Orderss Growth',
            data: [2, 15, 10, 22, 17, 26],
            backgroundColor: 'rgba(0, 0, 0, 1)',
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(0, 0, 0, .5)',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    };
  }
  getHorizontalBarChart() {
    return {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Product 1',
            data: [10, 8, 5, 10, 7, 9],
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return;

              const gradient = ctx.createLinearGradient(0, 0, chartArea.right, 0);

              gradient.addColorStop(0, '#c0c0c0');
              gradient.addColorStop(1, '#008080');

              return gradient;
            },
            hoverBackgroundColor: '#008080',
            borderRadius: 6,
            categoryPercentage: 0.5,
          },
          {
            label: 'Product 2',
            data: [15, 12, 10, 5, 9, 4],
            backgroundColor: (context: any) => {
              const chart = context.chart;
              const { ctx, chartArea } = chart;

              if (!chartArea) return;

              const gradient = ctx.createLinearGradient(0, 0, chartArea.right, 0);

              gradient.addColorStop(0, '#008080');
              gradient.addColorStop(1, 'oklch(27.8% 0.033 256.848)');

              return gradient;
            },

            borderRadius: 6,
            hoverBackgroundColor: 'black',
          },
        ],
      },
      options: {
        indexAxis: 'y' as const,
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }
  getPieChart() {
    return {
      data: {
        labels: ['Electronics', 'Clothing', 'Groceries', 'Beauty'],
        datasets: [
          {
            data: [120, 90, 60, 40],
            backgroundColor: ['black', '#008080', '#c0c0c0', 'oklch(27.8% 0.033 256.848)'],
            borderWidth: 0,
            hoverOffset: 9,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  }
}
