import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private readonly api = `${environment.apiBaseUrl}/tasks`;
  tasks = signal<Task[]>([]);
  loading = signal(false);

  constructor(private http: HttpClient) {}

  loadTasks() {
    this.loading.set(true);
    this.http.get<Task[]>(this.api).subscribe({
      next: (data) => this.tasks.set(data),
      error: (err) => console.error('Load error', err),
      complete: () => this.loading.set(false)
    });
  }

  create(task: Task) {
    this.http.post<Task>(this.api, task).subscribe({
      next: (created) => {
        this.tasks.update((list) => [...list, created]);
      },
      error: (err) => console.error('Create error', err)
    });
  }

  update(task: Task) {
  const { _id, ...cleanTask } = task as any;
  console.log('🔁 Updating task:', task.id, cleanTask);
  this.http.put<Task>(`${this.api}/${task.id}`, cleanTask).subscribe({
    next: (updated) => {
      if (!updated || !updated.id) {
        console.error('❌ Update failed: invalid response', updated);
        return;
      }

      this.tasks.update((list) =>
        list.map((t) => (t.id === task.id ? updated : t))
      );
    },
    error: (err) => console.error('Update error', err)
  });
}

  delete(id: number) {
    this.http.delete(`${this.api}/${id}`).subscribe({
      next: () => {
        this.tasks.update((list) => list.filter((t) => t.id !== id));
      },
      error: (err) => console.error('Delete error', err)
    });
  }

  getById(id: number): Task | undefined {
    return this.tasks().find((t) => t.id === id);
  }
}
