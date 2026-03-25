import { Component, input, output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-modal',
  imports: [FaIconComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  title = input<string>();
  close = output<void>();

  mark = faXmark;
}
