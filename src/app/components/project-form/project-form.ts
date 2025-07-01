import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Projects } from '../../services/project/projects';
import { Project } from '../../services/project/project.model';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './project-form.html',
  styleUrl: './project-form.scss',
  providers: [Projects]
})
export class ProjectForm implements OnInit {
  form!: FormGroup;
  projectId: string | null = null;
  statusOptions: string[] = ['Active', 'Inprogress', 'Completed'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private projectService: Projects
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['Active', Validators.required]
    });

    this.projectId = this.route.snapshot.paramMap.get('id');
    if (this.projectId) {
      this.loadProject(this.projectId);
    }
  }

  loadProject(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (project: Project) => {
        this.form.patchValue({
          title: project.title,
          description: project.description,
          status: project.status
        });
      },
      error: (err) => {
        console.error('Error loading project:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.projectId) {
        this.projectService.updateProject(this.projectId, this.form.value).subscribe({
          next: () => {
            console.log('Project updated successfully');
            this.router.navigate(['/dashboard/projects']);
          },
          error: (err) => {
            console.error('Error updating project:', err);
          }
        });
      } else {
        this.projectService.createProject(this.form.value).subscribe({
          next: () => {
            console.log('Project created successfully');
            this.router.navigate(['/dashboard/projects']);
          },
          error: (err) => {
            console.error('Error creating project:', err);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard/projects']);
  }
}
