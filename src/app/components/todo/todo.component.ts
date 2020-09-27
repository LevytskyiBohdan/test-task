import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { catchError, map, publishReplay, refCount, tap } from "rxjs/operators";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  tasks$: Observable<any> | null;
  loadError: boolean;
  isEditing: boolean = false;
  isEditingId: number;

  form: FormGroup = this.formBuilder.group({
    title: [null],    
  });

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
    ) { }

  ngOnInit(): void {
    this.tasks$ = this.todoService.getTasks().pipe(
      map((res) => (res ? res.sort(this.sortById) : null)),
      catchError(() => of(null)),
      tap((res) => {
          if (!res) {
              this.loadError = true;
          }
      }),
      publishReplay(1),
      refCount()
  );
  }
  
  sortById(a, b) {
    if (a.id > b.id)
      return -1;
    if (a.id < b.id)
      return 1;
    return 0;
  };

  onComplit(id) {
    console.log(id)
    this.todoService.editTask(id, { completed: true }).subscribe(res => console.log(res))
  }

  onEdit(id: number): void {
    this.todoService.getTask(id).subscribe(res => {
      this.isEditing = true;
      this.isEditingId = res.id;
      this.form.setValue({
        title: res.title
      })
    })
  }

  onDelete(id: number): void {
    this.todoService.deleteTask(id).subscribe(res => {
      
    })
  }

  onSave() {
    // Editing
    if (this.isEditing) {
      const body = this.form.value;
      const id = this.isEditingId;
      this.todoService.editTask(id, body).subscribe(res => {
        this.form.reset();
        this.isEditing = false
      })
    } 
    // Creating
    else {
      const body = {
        userId: 1,
        completed: false,
        ...this.form.value
      }
      this.todoService.createTask(body).subscribe(res => {
        this.form.reset();
      })
    }
  }
}
