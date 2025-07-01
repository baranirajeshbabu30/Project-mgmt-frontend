// src/app/models/project.model.ts
export interface Project {
  _id?: string;
  title: string;
  description: string;
  status: 'Ongoing' | 'Completed' | 'Pending'; // extend as needed
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
}
