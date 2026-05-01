import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Paciente } from '../../shared/models/paciente';
@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private readonly apiUrl = `${environment.apiUrl}/pacientes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl);
  }

  cadastrar(paciente: Paciente): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente);
  }
}
