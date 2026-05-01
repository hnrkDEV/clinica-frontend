import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AgendamentoService } from '../../../core/services/agendamento';
import { PacienteService } from '../../../core/services/paciente';
import { ProfissionalService } from '../../../core/services/profissional';

import { AgendamentoRequest, TipoAtendimento } from '../../../shared/models/agendamento';
import { Paciente } from '../../../shared/models/paciente';
import { Profissional } from '../../../shared/models/profissional';

@Component({
  selector: 'app-agendamento-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agendamento-form.html',
})
export class AgendamentoForm implements OnInit {
  pacientes: Paciente[] = [];
  profissionais: Profissional[] = [];

  tipos: TipoAtendimento[] = ['CONSULTA', 'RETORNO', 'EXAME'];

  agendamento: AgendamentoRequest = {
    pacienteId: 0,
    profissionalId: 0,
    dataHora: '',
    tipoAtendimento: 'CONSULTA',
  };

  carregandoDados = true;
  salvando = false;
  erro = '';

  constructor(
    private agendamentoService: AgendamentoService,
    private pacienteService: PacienteService,
    private profissionalService: ProfissionalService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    this.carregandoDados = true;

    this.pacienteService.listar().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
        this.carregarProfissionais();
      },
      error: (erro) => {
        console.error('Erro ao carregar pacientes:', erro);
        this.erro = 'Erro ao carregar pacientes.';
        this.carregandoDados = false;
        this.cdr.detectChanges();
      },
    });
  }

  carregarProfissionais(): void {
    this.profissionalService.listar().subscribe({
      next: (profissionais) => {
        this.profissionais = profissionais;
        this.carregandoDados = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar profissionais:', erro);
        this.erro = 'Erro ao carregar profissionais.';
        this.carregandoDados = false;
        this.cdr.detectChanges();
      },
    });
  }

  salvar(): void {
    this.erro = '';

    if (
      !this.agendamento.pacienteId ||
      !this.agendamento.profissionalId ||
      !this.agendamento.dataHora ||
      !this.agendamento.tipoAtendimento
    ) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.salvando = true;

    const payload: AgendamentoRequest = {
      ...this.agendamento,
      dataHora: new Date(this.agendamento.dataHora).toISOString(),
    };

    this.agendamentoService.cadastrar(payload).subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/agendamentos']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar agendamento:', erro);
        this.erro = 'Erro ao cadastrar agendamento.';
        this.salvando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
