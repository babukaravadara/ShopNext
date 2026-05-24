import { Component, ChangeDetectorRef } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NotificationService } from '../../../shared/notification.service';
import { UserService } from '../../../core/services/user';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class UserList {

  constructor(private userService: UserService, private cd: ChangeDetectorRef, private notification: NotificationService) {
  }

  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  users = [];
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
        this.cd.detectChanges();

      }
    });
  }
  deleteUser(user: any) {
    this.userService.deleteUser(user.id).subscribe({
      next: (res) => {
        this.notification.success(res.message);
        this.loadUsers();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
