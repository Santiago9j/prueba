import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventCreateComponent } from './event-create.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventUseCasesService } from '../../service/event.use-cases.service';
import { Router } from '@angular/router';
import { UserUseCasesService } from 'src/app/features/users/service/user.use-cases.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { User } from 'src/app/features/users/models/user.model';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;
  let eventServiceSpy: jasmine.SpyObj<EventUseCasesService>;
  let userServiceSpy: jasmine.SpyObj<UserUseCasesService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    eventServiceSpy = jasmine.createSpyObj('EventUseCasesService', ['createEvent']);
    userServiceSpy = jasmine.createSpyObj('UserUseCasesService', ['getUsers']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [EventCreateComponent],
      providers: [
        FormBuilder,
        { provide: EventUseCasesService, useValue: eventServiceSpy },
        { provide: UserUseCasesService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario correctamente', () => {
    expect(component.eventForm).toBeDefined();
    expect(component.eventForm.controls['eventName']).toBeDefined();
    expect(component.eventForm.controls['eventDate']).toBeDefined();
    expect(component.eventForm.controls['eventLocation']).toBeDefined();
    expect(component.eventForm.controls['assignedUser']).toBeDefined();
  });

  it('Debe obtener la lista de usuarios al inicializar', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Juan Pérez',
        username: 'jperez',
        email: 'juan.perez@example.com',
        address: { street: 'Calle 1', suite: 'Apto 1', city: 'Bogotá', zipcode: '110111', geo: { lat: '4.7110', lng: '-74.0721' } },
        phone: '1234567890',
        website: 'juanperez.com',
        company: { name: 'Empresa 1', catchPhrase: 'Frase 1', bs: 'BS 1' }
      },
      {
        id: 2,
        name: 'Ana Gómez',
        username: 'agomez',
        email: 'ana.gomez@example.com',
        address: { street: 'Calle 2', suite: 'Apto 2', city: 'Bogotá', zipcode: '110112', geo: { lat: '4.7111', lng: '-74.0722' } },
        phone: '0987654321',
        website: 'anagomez.com',
        company: { name: 'Empresa 2', catchPhrase: 'Frase 2', bs: 'BS 2' }
      }
    ];
    
    userServiceSpy.getUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.users.length).toBe(2);
    expect(component.users).toEqual(mockUsers);
  });

  it('Debe llamar a createEvent y navegar al enviar el formulario', () => {
    component.eventForm.setValue({
      eventName: 'Conferencia Angular',
      eventDate: '2024-06-01',
      eventLocation: 'Bogotá',
      assignedUser: 1
    });

    component.onSubmit();

    expect(eventServiceSpy.createEvent).toHaveBeenCalledWith(component.eventForm.value);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/events/list']);
  });

  it('Debe mostrar una alerta si el formulario es inválido', () => {
    spyOn(window, 'alert');

    component.eventForm.setValue({
      eventName: '',
      eventDate: '',
      eventLocation: '',
      assignedUser: ''
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('Todos los campos son requeridos');
  });
});
