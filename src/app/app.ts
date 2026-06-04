import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('dashboard');
  ngOnInit(): void {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }
}
