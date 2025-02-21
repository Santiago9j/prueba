import { TestBed } from '@angular/core/testing';
import { EventUseCasesService } from './event.use-cases.service';
import { Event } from '../models/event.model';

describe('EventUseCasesService', () => {
  let service: EventUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventUseCasesService);

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return key === 'events' ? JSON.stringify(mockEvents) : null;
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  const mockEvents: Event[] = [
    { id: 1, eventName: 'Evento 1', eventDate: '2025-02-02', eventLocation: 'Ubicación 1', assignedUser : 1 },
    { id: 2, eventName: 'Evento 2', eventDate: '2025-02-03', eventLocation: 'Ubicación 2', assignedUser : 2 }
  ];

  it('Debe obtener todos los eventos', () => {
    const events = service.getEvents();
    expect(events.length).toBe(2);
    expect(events).toEqual(mockEvents);
  });

  it('Debe obtener un evento por ID', () => {
    const event = service.getEventById(1);
    expect(event).toBeDefined();
    expect(event?.id).toBe(1);
    expect(event?.eventName).toBe('Evento 1');
  });

  it('Debe crear un nuevo evento', () => {
    const newEvent: Event = { id: 0, eventName: 'Evento 0', eventDate: '2025-04-04', eventLocation: 'Ubicación 2', assignedUser : 2 };

    service.createEvent(newEvent);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Debe actualizar un evento', () => {
    const updatedEvent: Event = { id: 1, eventName: 'Evento 1 Modificado', eventDate: '2025-06-06', eventLocation: 'Ubicación 1', assignedUser : 2  };

    service.updateEvent(1, updatedEvent);

    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Debe eliminar un evento', () => {
    service.deleteEvent(1);

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
