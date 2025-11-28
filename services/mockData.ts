
import { SchoolData } from '../types';

export const initialSchools: SchoolData[] = [
  {
    id: '1',
    name: 'Colegio Santa María',
    rbd: '12345-6',
    region: 'Metropolitana',
    dependence: 'Particular Subvencionado',
    status: 'Abierto',
    progress: 40,
    totalGrant: 15000000,
    subventions: {
      general: 8000000,
      sep: 4000000,
      pie: 2000000,
      faep: 500000,
      others: 500000
    },
    totalDeclared: 6200000,
    riskScore: 85,
    lastUpdate: '2025-11-14',
    expenses: [
      { id: 'e1', category: 'Remuneraciones', source: 'DT (LRE)', amount: 4500000, description: 'Sueldos Docentes Octubre', status: 'Validated' },
      { id: 'e2', category: 'Bienes y Servicios', source: 'SII (DTE)', amount: 1200000, description: 'Factura #3042 - Librería Nacional', status: 'Validated' },
      { id: 'e3', category: 'Infraestructura', source: 'Manual', amount: 500000, description: 'Reparación Techo Sala 3', status: 'Pending' },
    ]
  },
  {
    id: '2',
    name: 'Liceo Bicentenario Valparaíso',
    rbd: '9876-K',
    region: 'Valparaíso',
    dependence: 'Municipal',
    status: 'Enviado',
    progress: 100,
    totalGrant: 22000000,
    subventions: {
      general: 12000000,
      sep: 6000000,
      pie: 3000000,
      faep: 1000000,
      others: 0
    },
    totalDeclared: 21500000,
    riskScore: 12,
    lastUpdate: '2025-11-12',
    expenses: []
  },
  {
    id: '3',
    name: 'Escuela Rural Los Pinos',
    rbd: '3321-2',
    region: 'Los Lagos',
    dependence: 'Municipal',
    status: 'Abierto',
    progress: 75,
    totalGrant: 5000000,
    subventions: {
      general: 3000000,
      sep: 1500000,
      pie: 500000,
      faep: 0,
      others: 0
    },
    totalDeclared: 3500000,
    riskScore: 45,
    lastUpdate: '2025-11-10',
    expenses: []
  },
  {
    id: '4',
    name: 'Colegio Tecnológico del Norte',
    rbd: '5543-1',
    region: 'Antofagasta',
    dependence: 'SLEP',
    status: 'Observado',
    progress: 100,
    totalGrant: 18000000,
    subventions: {
      general: 10000000,
      sep: 5000000,
      pie: 2000000,
      faep: 1000000,
      others: 0
    },
    totalDeclared: 19000000,
    riskScore: 92,
    lastUpdate: '2025-11-05',
    expenses: []
  },
  {
    id: '5',
    name: 'Instituto del Sur',
    rbd: '8821-9',
    region: 'Biobío',
    dependence: 'Particular Subvencionado',
    status: 'Enviado',
    progress: 100,
    totalGrant: 12000000,
    subventions: {
      general: 7000000,
      sep: 3000000,
      pie: 1500000,
      faep: 0,
      others: 500000
    },
    totalDeclared: 11800000,
    riskScore: 5,
    lastUpdate: '2025-11-13',
    expenses: []
  }
];
