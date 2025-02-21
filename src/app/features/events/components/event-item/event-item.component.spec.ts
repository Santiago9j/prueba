import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventItemComponent } from './event-item.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserUseCasesService } from 'src/app/features/users/service/user.use-cases.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from 'src/app/features/users/models/user.model';

describe('EventItemComponent', () => {
  let component: EventItemComponent;
  let fixture: ComponentFixture<EventItemComponent>;
  let debugElement: DebugElement;
  let userServiceSpy: jasmine.SpyObj<UserUseCasesService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserUseCasesService', ['getFullNamesUser']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [EventItemComponent],
      providers: [{ provide: UserUseCasesService, useValue: userServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;


    component.event = { eventName: 'Evento de prueba', eventDate: '2024-05-10', eventLocation: 'Bogotá',  id: 1, assignedUser: 1 };

    const mockUser: User =  {id: 1, name: 'Juan', username: 'Pérez', email: 'email@gmail', phone: '1234567890', website: 'www.juanperez.com', address: {street: 'Calle 123', suite: 'Apto 123', city: 'Bogotá', zipcode: '110111', geo: {lat: '123', lng: '123'}}, company: {name: 'Mi empresa', catchPhrase: 'Catch phrase', bs: 'BS'}};
    userServiceSpy.getFullNamesUser.and.returnValue(of(mockUser));

    fixture.detectChanges(); 
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar el nombre del evento', () => {
    const titleElement = debugElement.query(By.css('.event-item__title')).nativeElement;
    expect(titleElement.textContent).toContain('Evento de prueba');
  });

  it('Debe mostrar la fecha del evento', () => {
    const dateElement = debugElement.query(By.css('.event-item__details')).nativeElement;
    expect(dateElement.textContent).toContain('📅 Fecha: 2024-05-10');
  });

  it('Debe llamar a deleteEvent() al hacer clic en el botón eliminar', () => {
    spyOn(component, 'deleteEvent');

    const button = debugElement.query(By.css('.event-item__button--delete')).nativeElement;
    button.click();

    expect(component.deleteEvent).toHaveBeenCalled();
  });
});
