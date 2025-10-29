// Tipos para la configuración del prompt
export interface PromptConfig {
  theme: string;
  role: string;
  objective: string;
  tone: string;
  format: string;
  detailLevel: number;
  language: string;
  additionalInstructions: string;
  aiEngine: string;
}

// Opciones disponibles para cada campo
export interface PromptOptions {
  themes: string[];
  tones: string[];
  formats: string[];
  languages: string[];
}

// Estado del contexto
export interface PromptContextState {
  config: PromptConfig;
  generatedPrompt: string;
  editedPrompt: string;
  isEditing: boolean;
  isLoading: boolean;
  error: string | null;
  originalObjective: string;
  isObjectiveOptimized: boolean;
}

// Acciones del contexto
export interface PromptContextActions {
  updateConfig: (field: keyof PromptConfig, value: string | number) => void;
  resetConfig: () => void;
  generatePrompt: () => void;
  updateEditedPrompt: (newPrompt: string) => void;
  resetToGenerated: () => void;
  getCurrentPrompt: () => string;
  improveWithAI: () => Promise<void>;
  optimizeObjective: () => void;
  revertObjectiveOptimization: () => void;
}

// Tipo completo del contexto
export type PromptContextType = PromptContextState & PromptContextActions;

// Props de componentes
export interface PromptInputProps {
  label: string;
  field: keyof PromptConfig;
  type: 'text' | 'select' | 'textarea' | 'range';
  options?: string[];
  placeholder?: string;
}

// Respuesta de la API
export interface AIResponse {
  improvedPrompt: string;
  suggestions?: string[];
}