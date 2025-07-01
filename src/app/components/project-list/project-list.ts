import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Project } from '../../services/project/project.model';
import { Projects } from '../../services/project/projects';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth';
import { Notification } from '../../services/notification/notification';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
  providers: [Projects]
})
export class ProjectList implements OnInit {
  projects$!: Observable<Project[]>;

  constructor(
    private projectService: Projects,
    private router: Router,
    public authService: Auth,
    private snackBar: MatSnackBar,
    private notificationService: Notification
  ) {}

  ngOnInit(): void {
  this.loadProjects();

     if (this.authService.isViewer()) {
    this.notificationService.onProjectEvent().subscribe(event => {
      console.log('📥 projectEvent received:', event);
      const message = this.formatMessage(event);
      this.snackBar.open(message, 'Close', { duration: 4000 });
      this.loadProjects(); // Optional: auto-refresh project list
    });
  }
}

  loadProjects(): void {
    this.projects$ = this.projectService.getAllProjects();
  }

  onEdit(project: Project): void {
    this.router.navigate([`/dashboard/project-form/${project._id}`]);
  }

  onDelete(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
          this.snackBar.open('Project deleted successfully', 'Close', {
            duration: 3000
          });
          // The real-time socket event will refresh the list
        },
        error: () => {
          this.snackBar.open('Failed to delete project.', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
  formatMessage(event: any): string {
  const { type, data } = event;
  const title = data?.title || 'Unnamed Project';

  switch (type) {
    case 'created': return `✅ Project "${title}" was created`;
    case 'updated': return `🔄 Project "${title}" was updated`;
    case 'deleted': return `🗑️ Project "${title}" was deleted`;
    default: return `ℹ️ Project "${title}" changed`;
  }
}
}
