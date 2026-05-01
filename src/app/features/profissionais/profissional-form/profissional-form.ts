import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfissionalService } from '../../../core/services/profissional';
import { Profissional } from '../../../shared/models/profissional';

@Component({
  selector: 'app-profissional-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profissional-form.html',
})
export class ProfissionalForm {
  profissional: Profissional = {
    nome: '',
    especialidade: '',
  };

  salvando = false;
  erro = '';

  constructor(
    private profissionalService: ProfissionalService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  salvar(): void {
    this.erro = '';

    if (!this.profissional.nome || !this.profissional.especialidade) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    this.salvando = true;

    this.profissionalService.cadastrar(this.profissional).subscribe({
      next: () => {
        this.salvando = false;
        this.router.navigate(['/profissionais']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar profissional:', erro);
        this.erro = 'Erro ao cadastrar profissional.';
        this.salvando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
