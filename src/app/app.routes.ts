import { Routes } from '@angular/router';
import { AgendamentoForm } from './features/agendamentos/agendamento-form/agendamento-form';
import { AgendamentoList } from './features/agendamentos/agendamento-list/agendamento-list';
import { AuditoriaList } from './features/auditoria/auditoria-list/auditoria-list';
import { PacienteForm } from './features/pacientes/paciente-form/paciente-form';
import { PacienteList } from './features/pacientes/paciente-list/paciente-list';
import { ProfissionalForm } from './features/profissionais/profissional-form/profissional-form';
import { ProfissionalList } from './features/profissionais/profissional-list/profissional-list';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'pacientes',
        pathMatch: 'full',
      },
      {
        path: 'pacientes',
        component: PacienteList,
      },
      {
        path: 'pacientes/novo',
        component: PacienteForm,
      },
      {
        path: 'profissionais',
        component: ProfissionalList,
      },
      {
        path: 'profissionais/novo',
        component: ProfissionalForm,
      },
      {
        path: 'agendamentos',
        component: AgendamentoList,
      },
      {
        path: 'agendamentos/novo',
        component: AgendamentoForm,
      },
      {
        path: 'auditoria',
        component: AuditoriaList,
      },
    ],
  },
];
