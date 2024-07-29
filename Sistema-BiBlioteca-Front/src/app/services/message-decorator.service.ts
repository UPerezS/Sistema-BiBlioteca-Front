import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageDecoratorService {

  private decorations: string[] = ['✨', '🌟', '🔥', '💥'];

  decorate(message: string, index: number): string {
    const decoration = this.decorations[index % this.decorations.length];
    return `${decoration} ${message} ${decoration}`;
  }
  
}
