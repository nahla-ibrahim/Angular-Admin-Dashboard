import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  imports: [],
  templateUrl: './alert-modal.html',
  styleUrl: './alert-modal.css',
})
export class AlertModal {
  title = input<string>();
}
