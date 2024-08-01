import { Injectable } from '@angular/core';
import { MessageDecorator } from '../models/MessageDecorator'; 

@Injectable({
  providedIn: 'root'
})
export class MessageDecoratorManagerService {

  private decorators: MessageDecorator[] = [];

  addDecorator(decorator: MessageDecorator): void {
    this.decorators.push(decorator);
  }

  decorate(message: string): string {
    return this.decorators.reduce((acc, decorator) => decorator.decorate(acc), message);
  }
}