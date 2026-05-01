import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuditoriaService } from '../../../core/services/auditoria';
import { Auditoria } from '../../../shared/models/auditoria';

@Component({
  selector: 'app-auditoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auditoria-list.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          'tr, article',
          [
            style({ opacity: 0, transform: 'translateY(12px)' }),
            stagger(65, [
              animate('320ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AuditoriaList implements OnInit {
  auditorias: Auditoria[] = [];
  carregando = true;
  erro = '';

  constructor(private auditoriaService: AuditoriaService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarAuditorias();
  }

  carregarAuditorias(): void {
    this.carregando = true;
    this.erro = '';

    this.auditoriaService.listar().subscribe({
      next: (dados) => {
        this.auditorias = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar auditorias:', erro);
        this.erro = 'Erro ao carregar auditorias.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
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

  totalCadastros(): number {
    return this.auditorias.filter((item) => item.acao.includes('CADASTRADO')).length;
  }

  totalAgendamentos(): number {
    return this.auditorias.filter((item) => item.acao.includes('AGENDAMENTO')).length;
  }

  totalCancelamentos(): number {
    return this.auditorias.filter((item) => item.acao === 'AGENDAMENTO_CANCELADO').length;
  }
}
