import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLibrosComponent } from './componentes/administrador/lista-libros/lista-libros.component';

const routes: Routes = [
  {
    path: 'lista_libros',
    component: ListaLibrosComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
