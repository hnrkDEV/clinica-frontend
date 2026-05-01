export type AcaoAuditoria =
  | 'PACIENTE_CADASTRADO'
  | 'PROFISSIONAL_CADASTRADO'
  | 'AGENDAMENTO_CRIADO'
  | 'AGENDAMENTO_CANCELADO';

export interface Auditoria {
  id: number;
  acao: AcaoAuditoria;
  entidade: string;
  entidadeId: number;
  descricao: string;
  dataHora: string;
}
