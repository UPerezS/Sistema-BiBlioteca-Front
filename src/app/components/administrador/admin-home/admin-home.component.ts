import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageDecoratorService } from 'src/app/services/message-decorator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {

  baseMessage: string = 'Panel de Control Administrativo';
  decoratedMessage: string;
  decorationIndex: number = 0;
  adminName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageDecoratorService: MessageDecoratorService
  ) { }

  ngOnInit() {
    this.adminName = this.authService.getUsername();
    this.decoratedMessage = this.messageDecoratorService.decorate(this.baseMessage, this.decorationIndex);
  }

  decorateMessage() {
    this.decorationIndex++;
    this.decoratedMessage = this.messageDecoratorService.decorate(this.baseMessage, this.decorationIndex);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }

}
