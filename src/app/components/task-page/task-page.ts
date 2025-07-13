import { ChangeDetectorRef, Component, computed, effect, inject, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { TaskService } from '../../services/taskser.service';
import { Task } from '../../models/task.model';
import { ConfirmationService } from 'primeng/api';

interface Status {
    name: string;
}

interface Priority {
    name: string;   
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
  visibleDel: boolean = false;
  visibleEdit: boolean =false;

  tasks = computed(() => this.taskService.tasks());
  date: Date | undefined;
  textHeader: string | undefined;
  textDescription :  string | undefined;
  status: Status[] | undefined;
  selectedStatus: Status | undefined;
  priority : Priority [] | undefined;
  selcetedPriority: Priority | undefined;
  editedTaskId: number | null = null;

constructor(private taskService: TaskService, private confirmationService: ConfirmationService,) {
   
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

  refresh(){
        this.taskService.loadTasks();
  }

  onDelete(taskId: number) {
    this.taskService.delete(taskId);
  }

  onSave(updatedTask: Task) {
    this.taskService.update(updatedTask);
  }

  clear(table: Table | undefined) {
      if (table?.clear) {
          table.clear(); 
        }        
      this.searchValue = ''
  }
  showDialog() {
        this.visible = true;
  }

  showDialogEdit(task: Task) {
    this.editedTaskId = task.id;
    this.textHeader = task.title;
    this.textDescription = task.description;
    this.date = new Date(task.dueDate);
    this.selcetedPriority = this.priority?.find(p => p.name === task.priority);
    this.selectedStatus = this.status?.find(s => s.name === task.status);
    this.visibleEdit = true;
  }

  statusInput(){
    this.status = [
            { name: 'ממתינה' },
            { name: 'בתהליך' },
            { name: 'הושלם' },
    ];
  }
  priorityInput(){
    this.priority = [
            { name: 'נמוכה' },
            { name: 'בינונית' },
            { name: 'גבוהה' },
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
    this.resetForm();
  }

  resetForm() {
    this.textHeader = '';
    this.textDescription = '';
    this.date = undefined;
    this.selcetedPriority = undefined;
    this.selectedStatus = undefined;
  }
  confirm(taskId: number) {
    this.confirmationService.confirm({
      header: 'מחיקת משימה',
      message: 'האם אתה בטוח שברצונך למחוק את המשימה?',
      acceptLabel: 'כן',
      rejectLabel: 'לא',
      accept: () => {
        this.onDelete(taskId);
        this.visibleDel = false;
      },
      reject: () => {
        this.visibleDel = false;
      },
    });
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

  onUpdate() {
    if (!this.editedTaskId) return;

    if (this.isInvalid('textHeader') || this.isInvalid('textDescription') || this.isInvalid('date') || this.isInvalid('selcetedPriority') || this.isInvalid('selectedStatus')) {
      return;
    }

    const stripHtml = (html: string): string =>
      html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();

    const updatedTask: Task = {
      id: this.editedTaskId,
      title: stripHtml(this.textHeader || ''),
      description: stripHtml(this.textDescription || ''),
      dueDate: this.date!.toISOString(),
      priority: this.selcetedPriority?.name!,
      status: this.selectedStatus?.name!,
    };

    this.taskService.update(updatedTask);
    this.visibleEdit = false;
    this.resetForm();
    this.editedTaskId = null;
  }

  onRejectUpdate(){
        this.visibleEdit = false;
  }
}
 
