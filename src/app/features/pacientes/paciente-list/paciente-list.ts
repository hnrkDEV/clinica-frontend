import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PacienteService } from '../../../core/services/paciente';
import { Paciente } from '../../../shared/models/paciente';

@Component({
  selector: 'app-paciente-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './paciente-list.html',
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
export class PacienteList implements OnInit {
  pacientes: Paciente[] = [];
  carregando = true;
  erro = '';

  constructor(private pacienteService: PacienteService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarPacientes();
  }

  carregarPacientes(): void {
    this.carregando = true;
    this.erro = '';

    this.pacienteService.listar().subscribe({
      next: (dados) => {
        this.pacientes = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar pacientes:', erro);
        this.erro = 'Erro ao carregar pacientes.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
