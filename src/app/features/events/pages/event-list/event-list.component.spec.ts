import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { EventUseCasesService } from '../../service/event.use-cases.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Event } from '../../models/event.model';

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventUseCasesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    eventServiceSpy = jasmine.createSpyObj('EventUseCasesService', ['getEvents', 'deleteEvent']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [EventListComponent],
      providers: [
        { provide: EventUseCasesService, useValue: eventServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar la lista de eventos al inicializar', () => {
    const mockEvents: Event[] = [
      { id: 1, eventName: 'Conferencia Angular', eventDate: '2024-05-10', eventLocation: 'Bogotá', assignedUser: 1 },
      { id: 2, eventName: 'Taller de TypeScript', eventDate: '2024-06-15', eventLocation: 'Medellín', assignedUser: 2 }
    ];
    eventServiceSpy.getEvents.and.returnValue(mockEvents);

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.events.length).toBe(2);
    expect(component.events).toEqual(mockEvents);
  });

  it('Debe navegar a la página de creación de eventos al hacer clic en el botón "Crear Evento"', () => {
    const button = fixture.debugElement.query(By.css('.event-list__button')).nativeElement;
    button.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/events/create']);
  });

  it('Debe eliminar un evento y actualizar la lista', () => {
    const mockEvents: Event[] = [
      { id: 1, eventName: 'Conferencia Angular', eventDate: '2024-05-10', eventLocation: 'Bogotá', assignedUser: 1 },
      { id: 2, eventName: 'Taller de TypeScript', eventDate: '2024-06-15', eventLocation: 'Medellín', assignedUser: 2 }
    ];
    
    eventServiceSpy.getEvents.and.returnValue(mockEvents);
    component.ngOnInit();
    fixture.detectChanges();

    eventServiceSpy.deleteEvent.and.callFake((id: number) => {
      eventServiceSpy.getEvents.and.returnValue(mockEvents.filter(event => event.id !== id));
    });

    component.deleteEvent(1);
    fixture.detectChanges();

    expect(eventServiceSpy.deleteEvent).toHaveBeenCalledWith(1);
    expect(component.events.length).toBe(1); 
    expect(component.events[0].id).toBe(2); 
  });
});
