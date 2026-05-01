import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PacienteService } from '../../../core/services/paciente';
import { Paciente } from '../../../shared/models/paciente';

@Component({
  selector: 'app-paciente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './paciente-form.html',
})
export class PacienteForm {
  paciente: Paciente = {
    nome: '',
    email: '',
    telefone: '',
  };

  salvando = false;
  erro = '';

  constructor(private pacienteService: PacienteService, private router: Router) {}

  salvar(): void {
    this.erro = '';

    if (!this.paciente.nome || !this.paciente.email || !this.paciente.telefone) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.salvando = true;

    this.pacienteService.cadastrar(this.paciente).subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/pacientes']);
      },
      error: () => {
        this.erro = 'Erro ao cadastrar paciente.';
        this.salvando = false;
      },
    });
  }
}
