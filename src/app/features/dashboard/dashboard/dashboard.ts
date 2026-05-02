import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AgendamentoService } from '../../../core/services/agendamento';
import { AuditoriaService } from '../../../core/services/auditoria';
import { PacienteService } from '../../../core/services/paciente';
import { ProfissionalService } from '../../../core/services/profissional';

import { Agendamento } from '../../../shared/models/agendamento';
import { Auditoria } from '../../../shared/models/auditoria';
import { Paciente } from '../../../shared/models/paciente';
import { Profissional } from '../../../shared/models/profissional';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          'article, tr',
          [
            style({ opacity: 0, transform: 'translateY(12px)' }),
            stagger(70, [
              animate('320ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class Dashboard implements OnInit {
  pacientes: Paciente[] = [];
  profissionais: Profissional[] = [];
  agendamentos: Agendamento[] = [];
  auditorias: Auditoria[] = [];

  carregando = true;
  erro = '';

  constructor(
    private pacienteService: PacienteService,
    private profissionalService: ProfissionalService,
    private agendamentoService: AgendamentoService,
    private auditoriaService: AuditoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
    this.carregando = true;
    this.erro = '';

    this.pacienteService.listar().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.carregarProfissionais();
      },
      error: () => this.tratarErro(),
    });
  }

  private carregarProfissionais(): void {
    this.profissionalService.listar().subscribe({
      next: (profissionais) => {
        this.profissionais = profissionais;
        this.carregarAgendamentos();
      },
      error: () => this.tratarErro(),
    });
  }

  private carregarAgendamentos(): void {
    this.agendamentoService.listar().subscribe({
      next: (agendamentos) => {
        this.agendamentos = agendamentos;
        this.carregarAuditorias();
      },
      error: () => this.tratarErro(),
    });
  }

  private carregarAuditorias(): void {
    this.auditoriaService.listar().subscribe({
      next: (auditorias) => {
        this.auditorias = auditorias;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: () => this.tratarErro(),
    });
  }

  private tratarErro(): void {
    this.erro = 'Erro ao carregar dados do dashboard.';
    this.carregando = false;
    this.cdr.detectChanges();
  }

  totalAgendados(): number {
    return this.agendamentos.filter((item) => item.status === 'AGENDADO').length;
  }

  totalCancelados(): number {
    return this.agendamentos.filter((item) => item.status === 'CANCELADO').length;
  }

  agendamentosRecentes(): Agendamento[] {
    return [...this.agendamentos]
      .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
      .slice(0, 5);
  }

  auditoriasRecentes(): Auditoria[] {
    return [...this.auditorias]
      .sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())
      .slice(0, 5);
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleString('pt-BR');
  }

  traduzirAcao(acao: string): string {
    switch (acao) {
      case 'PACIENTE_CADASTRADO':
        return 'Paciente cadastrado';
      case 'PROFISSIONAL_CADASTRADO':
        return 'Profissional cadastrado';
      case 'AGENDAMENTO_CRIADO':
        return 'Agendamento criado';
      case 'AGENDAMENTO_CANCELADO':
        return 'Agendamento cancelado';
      default:
        return acao;
    }
  }
}
