import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserUseCasesService } from '../../service/user.use-cases.service';
import { of, throwError } from 'rxjs';
import { User } from '../../models/user.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userServiceSpy: jasmine.SpyObj<UserUseCasesService>;

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserUseCasesService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserUseCasesService, useValue: userServiceSpy }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar la lista de usuarios', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: 'Juan Pérez',
        username: 'jperez',
        email: 'juan@example.com',
        address: { street: 'Calle 1', suite: 'Apto 1', city: 'Bogotá', zipcode: '110111', geo: { lat: '4.7110', lng: '-74.0721' } },
        phone: '1234567890',
        website: 'juanperez.com',
        company: { name: 'Empresa 1', catchPhrase: 'Frase 1', bs: 'BS 1' }
      },
      {
        id: 2,
        name: 'Ana Gómez',
        username: 'agomez',
        email: 'ana@example.com',
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
  });

  it('Debe mostrar un mensaje de error si la API falla', () => {
    userServiceSpy.getUsers.and.returnValue(throwError(() => new Error('Error de API')));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.errorMessage).toBe('Error al cargar los usuarios');
  });
});
