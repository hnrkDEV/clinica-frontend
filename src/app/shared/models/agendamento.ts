export type TipoAtendimento = 'CONSULTA' | 'RETORNO' | 'EXAME';
export type StatusAgendamento = 'AGENDADO' | 'CANCELADO';

export interface Agendamento {
  id: number;
  paciente: string;
  profissional: string;
  dataHora: string;
  tipoAtendimento: TipoAtendimento;
  status: StatusAgendamento;
}

export interface AgendamentoRequest {
  pacienteId: number;
  profissionalId: number;
  dataHora: string;
  tipoAtendimento: TipoAtendimento;
}

export interface CancelamentoRequest {
  motivo: string;
}
