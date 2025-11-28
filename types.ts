
export enum Role {
  ARCHITECTURE = 'Arquitectura y Flujo',
  SOSTENEDOR = 'Portal Sostenedor',
  MINEDUC = 'Monitor Nacional (MINEDUC)',
  SIE = 'Fiscalización (SIE)',
}

export interface SubventionBreakdown {
  general: number;
  sep: number;
  pie: number;
  faep: number;
  others: number;
}

export interface ExpenseItem {
  id: string;
  category: 'Remuneraciones' | 'Bienes y Servicios' | 'Infraestructura';
  source: 'DT (LRE)' | 'SII (DTE)' | 'Manual';
  amount: number;
  description: string;
  justification?: string; // AI generated justification
  status: 'Validated' | 'Pending' | 'Rejected';
}

export interface SchoolData {
  id: string;
  name: string;
  rbd: string;
  region: string;
  dependence: 'Municipal' | 'SLEP' | 'Particular Subvencionado';
  status: 'Abierto' | 'Enviado' | 'Observado' | 'Aprobado';
  progress: number;
  totalGrant: number; // Subvención recibida (Total Universe)
  subventions: SubventionBreakdown; // Detailed Universe
  totalDeclared: number; // Rendido
  projectedDeclared?: number; // AI Prediction
  riskScore: number; // 0-100
  lastUpdate: string;
  expenses: ExpenseItem[];
}

export interface AiChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AiExecutiveReport {
  generatedAt: string;
  summary: string;
  alerts: string[];
  recommendation: string;
}

export interface FilterState {
  region: string;
  rutSostenedor: string;
  dependence: string;
}
