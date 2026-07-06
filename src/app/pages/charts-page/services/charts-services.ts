import { Injectable } from '@angular/core';

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
            label: 'Orders Growth',
            data: [2, 15, 7, 14, 20, 22],
            fill: true,
            tension: 0.5,
            backgroundColor: 'oklch(82.7% 0.119 306.383 / 0.8)',
            borderColor: 'oklch(82.7% 0.119 306.383)',
            pointRadius: 3,
            pointBorderColor: 'oklch(82.7% 0.119 306.383)',
            pointHoverRadius: 5,
          },
          {
            label: 'Users Growth',
            data: [10, 25, 18, 30, 22, 40],
            fill: true,
            tension: 0.5,
            backgroundColor: 'rgba(38, 83, 136)',
            borderColor: 'rgba(67, 136, 219, 1)',
            pointRadius: 3,
            pointBorderColor: 'rgba(67, 136, 219, 1)',
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
            backgroundColor: 'rgba(38, 83, 136)',
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(38, 83, 136 , .6)',
          },
          {
            label: 'Orders Growth',
            data: [2, 15, 10, 22, 17, 26],
            backgroundColor: 'rgba(218, 178, 255, 0.8)',
            borderRadius: 4,
            hoverBackgroundColor: 'rgba(218, 178, 255, 0.5)',
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

              gradient.addColorStop(0, 'rgba(38, 83, 136 , 1)');
              gradient.addColorStop(1, 'rgba(67, 136, 219, 1)');

              return gradient;
            },
            hoverBackgroundColor: 'rgba(38, 83, 136)',
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

              gradient.addColorStop(0, 'oklch(82.7% 0.119 306.383 / 0.4)');
              gradient.addColorStop(1, 'oklch(82.7% 0.119 306.383)');

              return gradient;
            },

            borderRadius: 6,
            hoverBackgroundColor: 'oklch(82.7% 0.119 306.383 / 0.4)',
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
            backgroundColor: [
              'oklch(27.8% 0.033 256.848)',
              'rgba(38, 83, 136)',
              'oklch(82.7% 0.119 306.383/0.8)',
              'rgba(67, 136, 219, 1)',
            ],
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
