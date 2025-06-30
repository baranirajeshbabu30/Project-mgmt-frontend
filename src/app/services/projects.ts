import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from './project.model';


@Injectable({
  providedIn: 'root'
})
export class Projects {

  private jsonUrl = 'assets/data/mockData.json'; 
  constructor(private http: HttpClient) { }

    getProjects(): Observable<Project[]> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map((data: any[]): Project[] =>
        data.map((item: any, index: number): Project => ({
          id: index + 1,
          title: item.title,
          description: item.description,
          status: item.status,
          updatedAt: item.updatedAt
        }))
      )
    );
  }
}
