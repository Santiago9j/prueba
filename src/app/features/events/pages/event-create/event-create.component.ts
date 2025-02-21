import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/features/users/models/user.model';
import { EventUseCasesService } from '../../service/event.use-cases.service';
import { Router } from '@angular/router';
import { UserUseCasesService } from 'src/app/features/users/service/user.use-cases.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  users : User[] = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventUseCasesService,
    private router: Router,
    private userService: UserUseCasesService
  ) {
    this.eventForm = this.fb.group({
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      eventLocation: ['', Validators.required],
      assignedUser: ['', Validators.required]
    });
  }

  

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    } ); 
}


  onSubmit(): void {
    if (this.eventForm.valid) {
      this.eventService.createEvent(this.eventForm.value);
      this.router.navigate(['/events/list']);
    }
  }

}
