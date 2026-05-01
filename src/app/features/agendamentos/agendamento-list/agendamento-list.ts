import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgendamentoService } from '../../../core/services/agendamento';
import { Agendamento } from '../../../shared/models/agendamento';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agendamento-list.html',
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
export class AgendamentoList implements OnInit {
  agendamentos: Agendamento[] = [];
  carregando = true;
  erro = '';
  statusFiltro = '';

  constructor(private agendamentoService: AgendamentoService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.carregando = true;
    this.erro = '';

    this.agendamentoService.listar(this.statusFiltro).subscribe({
      next: (dados) => {
        this.agendamentos = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar agendamentos:', erro);
        this.erro = 'Erro ao carregar agendamentos.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }

  cancelarAgendamento(id: number): void {
    const motivo = prompt('Informe o motivo do cancelamento:');

    if (!motivo) {
      return;
    }

    this.agendamentoService.cancelar(id, motivo).subscribe({
      next: () => {
        this.carregarAgendamentos();
      },
      error: (erro) => {
        console.error('Erro ao cancelar agendamento:', erro);
        alert('Erro ao cancelar agendamento.');
      },
    });
  }

  formatarData(dataHora: string): string {
    return new Date(dataHora).toLocaleString('pt-BR');
  }

  totalAgendados(): number {
    return this.agendamentos.filter((item) => item.status === 'AGENDADO').length;
  }

  totalCancelados(): number {
    return this.agendamentos.filter((item) => item.status === 'CANCELADO').length;
  }
}
