import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Auditoria } from '../../shared/models/auditoria';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  private readonly apiUrl = `${environment.apiUrl}/auditorias`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Auditoria[]> {
    return this.http.get<Auditoria[]>(this.apiUrl);
  }
}
