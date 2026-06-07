import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileServices } from '../../core/services/profile-services';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { user } from '../../core/interface/users';

@Component({
  selector: 'app-profile',
  imports: [FaIconComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  profileService = inject(ProfileServices);
  router = inject(Router);
  ngOnInit() {
    this.getUser();
  }

  user = signal<user | undefined>(undefined);
  loading = signal(true);

  getUser() {
    this.profileService.getCurrentUser().subscribe({
      next: (res) => {
        this.user.set(res as user);
        this.loading.set(false);
        console.log(this.user());
      },

      error: (err) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.logout();
        }
        console.error('Error fetching user data:', err);
      },
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
