import { Component, OnInit } from '@angular/core';
import { EventUseCasesService } from '../../service/event.use-cases.service';
import { Router } from '@angular/router';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventUseCasesService, private router: Router) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  private getAllEvents(): void {
    this.events = this.eventService.getEvents();
  }


  goToCreate(): void {
    this.router.navigate(['/events/create']);
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id);
    this.getAllEvents();
  }
}
