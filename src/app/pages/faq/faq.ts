import { Component, signal } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-faq',
  imports: [FaIconComponent],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  chevron = faChevronDown;

  faqs = signal([
    {
      question: 'How can I add a new user?',
      answer: 'You can add a new user from the users page using the add user button.',
      isOpen: false,
    },
    {
      question: 'Does the dashboard support dark mode?',
      answer: 'Yes, the dashboard fully supports dark mode.',
      isOpen: false,
    },
    {
      question: 'Can I edit user information?',
      answer: 'Yes, you can edit user data directly from the users table.',
      isOpen: false,
    },
    {
      question: 'Is the dashboard responsive?',
      answer: 'Yes, the dashboard is fully responsive for all screen sizes.',
      isOpen: false,
    },
  ]);

  toggleFAQ(index: number) {
    this.faqs.update((items) =>
      items.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item)),
    );
  }
}
