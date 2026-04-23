import { Component, input, output, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';
import { headers } from '../../../core/interface/users';

@Component({
  selector: 'app-table',
  imports: [FaIconComponent, NgClass],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class Table {
  headers = input<headers[]>([]);
  arrow = input<string>('');
  sortKey = input<string>('');
  sortDirection = input<'asc' | 'desc'>('asc');
  sort = output<string>();
  asc = faArrowDown;
  desc = faArrowUp;
}
