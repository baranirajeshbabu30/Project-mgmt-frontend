import { Component } from '@angular/core';
import { Project } from '../../services/project.model';
import { Projects } from '../../services/projects';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-project-list',
  imports: [MatCardModule,CommonModule, HttpClientModule, MatButtonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
  providers: [Projects] 
})
export class ProjectList {
projects: Project[] = [];
constructor(private projectService: Projects) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
      console.log('Projects loaded:', this.projects);
    });
  }
}
