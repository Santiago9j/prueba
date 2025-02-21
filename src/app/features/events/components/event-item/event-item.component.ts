import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Event } from '../../models/event.model';
import { UserUseCasesService } from 'src/app/features/users/service/user.use-cases.service';

@Component({ selector: 'app-event-item', templateUrl: './event-item.component.html', styleUrls: ['./event-item.component.scss'] })
export class EventItemComponent implements OnInit {
  @Input() event!: Event;
  @Output() eventDeleted = new EventEmitter<number>();

  userFullName = 'Usuario Desconocido';

  constructor(private userService: UserUseCasesService) {}

  ngOnInit(): void {
    this.getUserFullName(this.event.assignedUser);
  }

  getUserFullName(userId: number): void {
    this.userService.getFullNamesUser(userId).subscribe(
      (user) => {
        this.userFullName = user.name + ' ' + user.username;
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
        this.userFullName = 'Desconocido';
      }
    );
  }
  
  deleteEvent(): void {
    this.eventDeleted.emit(this.event.id);
  }
}
