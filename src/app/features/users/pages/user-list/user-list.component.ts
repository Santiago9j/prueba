import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserUseCasesService } from '../../service/user.use-cases.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private userService: UserUseCasesService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los usuarios';
        this.loading = false;
        console.error(error);
      }
    });
  }
}
