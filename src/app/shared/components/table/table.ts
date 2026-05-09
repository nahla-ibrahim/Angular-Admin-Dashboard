import { Component, input, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { headers } from '../../../core/interface/headers-types';

@Component({
  selector: 'app-table',
  imports: [FaIconComponent, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  headers = input<headers[]>([]);

  currentColumn: string = '';
  curentDir: 'asc' | 'desc' = 'asc';

  sort = output<{ col: string; dir: 'asc' | 'desc' }>();
  asc = faArrowDown;
  desc = faArrowUp;

  sortAction(col: string) {
    if (col === this.currentColumn) {
      this.curentDir = this.curentDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentColumn = col;
      this.curentDir = 'asc';
    }
    this.sort.emit({ col: this.currentColumn, dir: this.curentDir });
  }
}
