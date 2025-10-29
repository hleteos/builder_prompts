import { useContext } from 'react';
import type { PromptContextType } from '../types';
import { PromptContext } from '../context/PromptContext';

// Hook personalizado para usar el contexto
export const usePrompt = (): PromptContextType => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error('usePrompt debe ser usado dentro de un PromptProvider');
  }
  return context;
};