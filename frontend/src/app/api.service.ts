import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem { id: number; name: string; description: string; icon: string; featured: boolean; }
export interface Specialty { id: number; name: string; description: string; icon: string; }
export interface GalleryPhoto { id: number; imageUrl: string; alt: string; }
export interface Clinic {
  name: string; tagline: string; story: string; address: string; phone: string; email: string; hours: string;
  heroVideoUrl: string; heroVideoCredit: string; heroVideoSource: string; heroImageUrl: string;
  instagramUrl: string | null; whatsappUrl: string | null; gallery: GalleryPhoto[];
}
export interface PriceItem { id: number; name: string; description: string | null; amount: number; currency: string; note: string | null; }
export interface ChatMessage { role: 'user' | 'assistant'; content: string; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api';

  getServices(): Observable<ServiceItem[]> { return this.http.get<ServiceItem[]>(`${this.baseUrl}/services`); }
  getSpecialties(): Observable<Specialty[]> { return this.http.get<Specialty[]>(`${this.baseUrl}/specialties`); }
  getClinic(): Observable<Clinic> { return this.http.get<Clinic>(`${this.baseUrl}/clinic`); }
  getPrices(): Observable<PriceItem[]> { return this.http.get<PriceItem[]>(`${this.baseUrl}/prices`); }
  sendContact(payload: { name: string; email: string; phone: string; subject: string; message: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/contact`, payload);
  }
  chat(messages: ChatMessage[]): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(`${this.baseUrl}/chat`, { messages });
  }
}
