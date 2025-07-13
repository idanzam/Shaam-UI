import { ChangeDetectorRef, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TaskService } from '../../services/taskser.service';
import { Task } from '../../models/task.model';

interface Status {
    name: string;
    code: string;
}

interface Priority {
    name: string;
    code: string;
}

@Component({
  selector: 'app-task-page',
  standalone: false,
  templateUrl: './task-page.html',
  styleUrl: './task-page.css',

})
export class TaskPage implements OnInit {
    
  searchValue: string | undefined;
  private cd = inject(ChangeDetectorRef);
  visible: boolean = false;
  tasks = computed(() => this.taskService.tasks());
  date: Date | undefined;
  textHeader: string | undefined;
  textDescription :  string | undefined;
  status: Status[] | undefined;
  selectedStatus: Status | undefined;
  priority : Priority [] | undefined;
  selcetedPriority: Priority | undefined;

constructor(private taskService: TaskService) {
   
    effect(() => {
      const _ = this.tasks();
      this.cd.detectChanges(); 
      console.log('tasks updated!');
    });
  }
  ngOnInit() {
    
    this.taskService.loadTasks();
    const _ = this.tasks();
    this.cd.detectChanges(); 
    this.statusInput();
    this.priorityInput();

  }

  onDelete(taskId: number) {
    this.taskService.delete(taskId);
  }

  onSave(updatedTask: Task) {
    this.taskService.update(updatedTask);
  }

  // onAdd(newTask: Task) {
  //   this.taskService.create(newTask);
  // }

  clear(table: Table | undefined) {
      if (table?.clear) {
          table.clear(); 
        }        
      this.searchValue = ''
  }
  showDialog() {
        this.visible = true;
  }

  statusInput(){
    this.status = [
            { name: 'ממתינה', code: 'NY' },
            { name: 'בתהליך', code: 'RM' },
            { name: 'הושלם', code: 'LDN' },
    ];
  }
  priorityInput(){
    this.priority = [
            { name: 'נמוכה', code: 'NY' },
            { name: 'בינונית', code: 'RM' },
            { name: 'גבוהה', code: 'LDN' },
    ];
  }

  onAdd() {

    if (this.isInvalid('textHeader') || this.isInvalid('textDescription') || this.isInvalid('date') || this.isInvalid('selcetedPriority') || this.isInvalid('selectedStatus')) {
      return;
    }
    const stripHtml = (html: string): string =>
      html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();

    const newTask: Task = {
      id: 0,
      title: stripHtml(this.textHeader || ''),
      description: stripHtml(this.textDescription || ''),
      dueDate: this.date!.toISOString(),
      priority: this.selcetedPriority?.name!,
      status: this.selectedStatus?.name!,
    };

    this.taskService.create(newTask);
    this.visible = false;
    this.resetForm(); // 🧹 ניקוי כל השדות


  }

  resetForm() {
  this.textHeader = '';
  this.textDescription = '';
  this.date = undefined;
  this.selcetedPriority = undefined;
  this.selectedStatus = undefined;
}

  isInvalid(controlName: string): boolean {
  switch (controlName) {
    case 'textHeader':
      return !this.textHeader;
    case 'textDescription':
      return !this.textDescription;
    case 'date':
      return !this.date;
    case 'selcetedPriority':
      return !this.selcetedPriority;
    case 'selectedStatus':
      return !this.selectedStatus;
    default:
      return false;
  }
}

}
 
