import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, ChatMessage, Clinic, PriceItem, ServiceItem, Specialty } from './api.service';

@Component({
  selector: 'hv-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly api = inject(ApiService);
  clinic = signal<Clinic | null>(null);
  services = signal<ServiceItem[]>([]);
  specialties = signal<Specialty[]>([]);
  prices = signal<PriceItem[]>([]);
  apiUnavailable = signal(false);
  contactBusy = signal(false);
  contactFeedback = signal('');
  contactError = signal(false);
  chatOpen = signal(false);
  chatBusy = signal(false);
  chatInput = '';
  chatMessages = signal<ChatMessage[]>([]);
  mobileMenuOpen = signal(false);

  ngOnInit(): void {
    this.api.getClinic().subscribe({ next: (data) => this.clinic.set(data), error: () => this.apiUnavailable.set(true) });
    this.api.getServices().subscribe({ next: (data) => this.services.set(data), error: () => this.apiUnavailable.set(true) });
    this.api.getSpecialties().subscribe({ next: (data) => this.specialties.set(data), error: () => this.apiUnavailable.set(true) });
    this.api.getPrices().subscribe({ next: (data) => this.prices.set(data), error: () => this.apiUnavailable.set(true) });
  }

  onContactSubmit(form: { name: string; email: string; phone: string; subject: string; message: string }): void {
    this.contactBusy.set(true);
    this.contactFeedback.set('');
    this.api.sendContact(form).subscribe({
      next: (result) => { this.contactFeedback.set(result.message); this.contactError.set(false); this.contactBusy.set(false); },
      error: (error) => {
        this.contactFeedback.set(error.error?.message || 'No pudimos enviar tu mensaje. Intenta nuevamente.');
        this.contactError.set(true);
        this.contactBusy.set(false);
      }
    });
  }

  sendChat(): void {
    const content = this.chatInput.trim();
    if (!content || this.chatBusy()) return;
    const nextMessages = [...this.chatMessages(), { role: 'user' as const, content }];
    this.chatMessages.set(nextMessages);
    this.chatInput = '';
    this.chatBusy.set(true);
    this.api.chat(nextMessages).subscribe({
      next: ({ reply }) => { this.chatMessages.update((messages) => [...messages, { role: 'assistant', content: reply }]); this.chatBusy.set(false); },
      error: (error) => {
        const content = error.error?.message || 'No pude conectar con el asistente. Revisa tu conexión e inténtalo otra vez.';
        this.chatMessages.update((messages) => [...messages, { role: 'assistant', content }]);
        this.chatBusy.set(false);
      }
    });
  }

  formatPrice(item: PriceItem): string {
    return new Intl.NumberFormat('es-BO', { style: 'currency', currency: item.currency }).format(Number(item.amount));
  }

  closeMenu(): void { this.mobileMenuOpen.set(false); }
  onVideoError(video: HTMLVideoElement): void { video.classList.add('video-failed'); }
}
