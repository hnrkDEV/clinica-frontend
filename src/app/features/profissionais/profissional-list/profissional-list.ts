import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfissionalService } from '../../../core/services/profissional';
import { Profissional } from '../../../shared/models/profissional';

@Component({
  selector: 'app-profissional-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profissional-list.html',
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
export class ProfissionalList implements OnInit {
  profissionais: Profissional[] = [];
  carregando = true;
  erro = '';

  constructor(private profissionalService: ProfissionalService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.carregarProfissionais();
  }

  carregarProfissionais(): void {
    this.carregando = true;
    this.erro = '';

    this.profissionalService.listar().subscribe({
      next: (dados) => {
        this.profissionais = dados;
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (erro) => {
        console.error('Erro ao carregar profissionais:', erro);
        this.erro = 'Erro ao carregar profissionais.';
        this.carregando = false;
        this.cdr.detectChanges();
      },
    });
  }
}
