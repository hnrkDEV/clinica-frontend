import { Injectable } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
  duration: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toasts: Toast[] = [];
  private listeners: ((toasts: Toast[]) => void)[] = [];
  private counter = 0;

  subscribe(listener: (toasts: Toast[]) => void): void {
    this.listeners.push(listener);
    listener(this.toasts);
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000): void {
    const toast: Toast = {
      id: ++this.counter,
      message,
      type,
      duration,
    };

    this.toasts = [...this.toasts, toast];
    this.notify();

    window.setTimeout(() => {
      this.remove(toast.id);
    }, duration);
  }

  remove(id: number): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
    this.notify();
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener([...this.toasts]));
  }
}
