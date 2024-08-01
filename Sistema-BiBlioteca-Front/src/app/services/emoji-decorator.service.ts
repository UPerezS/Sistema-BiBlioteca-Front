import { Injectable } from '@angular/core';
import { MessageDecorator } from '../models/MessageDecorator';

@Injectable({
  providedIn: 'root'
})
export class EmojiDecoratorService implements MessageDecorator {

  private decorations: string[] = ['✨', '🌟', '🔥', '💥'];

  decorate(message: string): string {
    const decoration = this.decorations[Math.floor(Math.random() * this.decorations.length)];
    return `${decoration} ${message} ${decoration}`;
  }
}