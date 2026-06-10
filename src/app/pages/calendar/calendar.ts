import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal } from '../../shared/components/modal/modal';
import { FormsModule } from '@angular/forms';
import { AlertModal } from '../../shared/components/alert-modal/alert-modal';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, Modal, FormsModule, AlertModal],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  ngOnInit(): void {
    const getEvents = localStorage.getItem('events');
    if (getEvents) {
      this.events.set(JSON.parse(getEvents));
      console.log(getEvents);
    }
    this.calendarOptions = {
      ...this.calendarOptions,
      events: [...this.events()],
    };
  }
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  events = signal<any[]>([
    {
      id: '1',
      title: 'Meeting with Team',
      date: '2026-06-10',
      description: 'Discuss project milestones and deadlines.',
      color: '#e83e8c',
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: '2026-07-15',
      description: 'Final submission deadline for the project.',
      color: '#dc3545',
    },
    {
      id: '3',
      title: 'Client Call',
      date: '2026-06-20',
      description: 'Weekly meeting with the client to discuss progress.',
      color: '#ffc107',
    },
    {
      id: '4',
      title: 'Company Event',
      date: '2026-07-25',
      description: 'Annual company picnic and team building activity.',
      color: '#28a745',
    },
  ]);
  eventColors = [
    '#3b82f6',
    '#8b5cf6',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#28a745',
    '#ffc107',
    '#dc3545',
    '#e83e8c',
  ];
  modalOpen = signal<boolean>(false);
  deleteModalOpen = signal<boolean>(false);
  eventTitle = '';
  eventId = '';
  selectedDate = signal<string>('');

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: [...this.events()],
    eventClick: (info) => {
      const event = this.events().find((e) => e.id === info.event.id);
      this.DeleteEvent(event!.id);
    },
    dateClick: (info) => {
      this.selectedDate.set(info.dateStr);
      this.modalOpen.set(true);
    },
  };

  createEvent() {
    if (!this.eventTitle.trim()) return;
    const randomColor = this.eventColors[Math.floor(Math.random() * this.eventColors.length)];
    const id = Date.now().toString();
    const newEvent = {
      id,
      title: this.eventTitle,
      date: this.selectedDate(),
      color: randomColor,
    };

    this.events.update((prevEvents) => [...prevEvents, newEvent]);
    this.calendarComponent.getApi().addEvent(newEvent);

    this.modalOpen.set(false);
    this.eventTitle = '';
    localStorage.setItem('events', JSON.stringify(this.events()));
  }

  DeleteEvent(eventID: string) {
    this.deleteModalOpen.set(true);
    this.eventId = eventID;
  }

  confirmDelete() {
    const event = this.calendarComponent.getApi().getEventById(this.eventId);
    this.events.update((prevEvents) => prevEvents.filter((e) => e.id !== this.eventId));
    localStorage.setItem('events', JSON.stringify(this.events()));
    if (event) {
      event.remove();
      this.deleteModalOpen.set(false);
    }
  }

  closeModal() {
    this.modalOpen.set(false);
    this.eventTitle = '';
  }
}
