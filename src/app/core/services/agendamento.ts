import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Agendamento,
  AgendamentoRequest,
  CancelamentoRequest,
} from '../../shared/models/agendamento';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private readonly apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) {}

  listar(status?: string): Observable<Agendamento[]> {
    let params = new HttpParams();

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<Agendamento[]>(this.apiUrl, { params });
  }

  cadastrar(agendamento: AgendamentoRequest): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento);
  }

  cancelar(id: number, motivo: string): Observable<Agendamento> {
    const body: CancelamentoRequest = { motivo };
    return this.http.patch<Agendamento>(`${this.apiUrl}/${id}/cancelar`, body);
  }
}
