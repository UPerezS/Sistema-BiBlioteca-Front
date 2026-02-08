import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear(); // Inicialización en el constructor
  }

  ngOnInit(): void {
    // Aquí podrías realizar alguna lógica adicional en caso de ser necesario
  }
}