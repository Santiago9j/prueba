import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventUseCasesService {
  private storageKey = 'events';

  constructor() {}

  getEvents(): Event[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getEventById(id: number): Event | undefined {
    return this.getEvents().find(event => event.id === id);
  }

  createEvent(event: Event): void {
    const events = this.getEvents();
    event.id = new Date().getTime();
    events.push(event);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }

  updateEvent(id: number, updatedEvent: Event): void {
    let events = this.getEvents();
    events = events.map(event => (event.id === id ? updatedEvent : event));
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }

  deleteEvent(id: number): void {
    const events = this.getEvents().filter(event => event.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(events));
  }
}
