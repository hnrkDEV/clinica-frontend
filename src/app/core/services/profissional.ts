import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Profissional } from '../../shared/models/profissional';

@Injectable({
  providedIn: 'root',
})
export class ProfissionalService {
  private readonly apiUrl = `${environment.apiUrl}/profissionais`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Profissional[]> {
    return this.http.get<Profissional[]>(this.apiUrl);
  }

  cadastrar(profissional: Profissional): Observable<Profissional> {
    return this.http.post<Profissional>(this.apiUrl, profissional);
  }
}
