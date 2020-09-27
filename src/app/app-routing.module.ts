import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: "singin", component: FormComponent },
  { path: "todo", component: TodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
