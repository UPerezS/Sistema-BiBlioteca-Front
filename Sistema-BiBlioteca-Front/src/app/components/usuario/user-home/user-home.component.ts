import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageDecoratorManagerService } from 'src/app/services/message-decorator-manager.service';
import { EmojiDecoratorService } from 'src/app/services/emoji-decorator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {

  baseMessage: string = 'Hola Usuario, Bienvenido a la biblioteca';
  decoratedMessage: string;
  decorationCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageDecoratorManager: MessageDecoratorManagerService,
    private emojiDecorator: EmojiDecoratorService
  ) {}

  ngOnInit() {
    this.messageDecoratorManager.addDecorator(this.emojiDecorator);
    this.decorateMessage();
  }

  decorateMessage() {
    this.decorationCount++;
    this.decoratedMessage = this.messageDecoratorManager.decorate(this.baseMessage);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
}
