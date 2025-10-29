import { createContext } from 'react';
import type { PromptContextType } from '../types';

// Crear el contexto
export const PromptContext = createContext<PromptContextType | undefined>(undefined);