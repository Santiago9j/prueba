import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;

    component.user = {
      id: 1,
      name: 'Juan Pérez',
      username: 'jperez',
      email: 'juan@example.com',
      address: { street: 'Calle 123', city: 'Bogotá', suite: 'Apt 456', zipcode: '110111', geo: { lat: '4.60971', lng: '-74.08175' } },
      phone: '123456789',
      website: 'juanperez.com',
      company: { name: 'Tech Corp', catchPhrase: 'Innovando el futuro', bs: 'tech solutions' }
    };

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe mostrar el nombre del usuario', () => {
    const nameElement: HTMLElement = fixture.nativeElement.querySelector('h4');
    expect(nameElement.textContent).toContain('Juan Pérez');
  });
});
