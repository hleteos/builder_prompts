import React, { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { PromptConfig, PromptContextType } from '../types';
import { generateSmartPrompt, optimizeObjectiveText } from '../utils/promptTemplates';

// Configuración inicial del prompt
const initialConfig: PromptConfig = {
  theme: '',
  role: '',
  objective: '',
  tone: 'profesional',
  format: 'párrafo',
  detailLevel: 2,
  language: 'español',
  additionalInstructions: '',
  aiEngine: 'groq'
};

// Crear el contexto
export const PromptContext = createContext<PromptContextType | undefined>(undefined);

// Provider del contexto
interface PromptProviderProps {
  children: ReactNode;
}

export const PromptProvider: React.FC<PromptProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<PromptConfig>(initialConfig);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [editedPrompt, setEditedPrompt] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalObjective, setOriginalObjective] = useState<string>('');
  const [isObjectiveOptimized, setIsObjectiveOptimized] = useState<boolean>(false);

  // Función para actualizar la configuración
  const updateConfig = useCallback((field: keyof PromptConfig, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));

    // Si se cambia el objetivo manualmente, resetear el estado de optimización
    if (field === 'objective') {
      setIsObjectiveOptimized(false);
      setOriginalObjective('');
    }

    // Al cambiar cualquier configuración, salir del modo edición para
    // que la vista previa se actualice automáticamente con la nueva generación.
    setIsEditing(false);
    setError(null); // Limpiar errores al hacer cambios
  }, []);

  // Función para resetear la configuración
  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
    setGeneratedPrompt('');
    setError(null);
    setOriginalObjective('');
    setIsObjectiveOptimized(false);
    setIsEditing(false);
  }, []);

  // Función para generar el prompt basado en la configuración
  const generatePrompt = useCallback(() => {
    try {
      // Usar la nueva lógica inteligente de generación (ahora maneja casos sin objetivo)
      const smartPrompt = generateSmartPrompt(config);

      setGeneratedPrompt(smartPrompt);
      
      // Si no está en modo edición, actualizar también el prompt editado
      if (!isEditing) {
        setEditedPrompt(smartPrompt);
      }
      
      setError(null); // Limpiar errores si la generación es exitosa
    } catch (err) {
      setError('Error al generar el prompt. Por favor, verifica la configuración.');
      console.error('Error generating prompt:', err);
    }
  }, [config, isEditing]);

  // Función para actualizar el prompt editado manualmente
  const updateEditedPrompt = useCallback((newPrompt: string) => {
    setEditedPrompt(newPrompt);
    setIsEditing(true);
  }, []);

  // Función para resetear a la versión generada automáticamente
  const resetToGenerated = useCallback(() => {
    setEditedPrompt(generatedPrompt);
    setIsEditing(false);
  }, [generatedPrompt]);

  // Función para obtener el prompt actual (editado o generado)
  const getCurrentPrompt = useCallback(() => {
    return isEditing ? editedPrompt : generatedPrompt;
  }, [isEditing, editedPrompt, generatedPrompt]);

  // Función para mejorar el prompt con IA (implementación futura)
  const improveWithAI = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implementar integración con API de Groq
      // Simulación temporal
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mejorar el prompt actual con sugerencias simuladas
      const improvedPrompt = generatedPrompt + '\n\n[✨ Versión mejorada con IA pendiente de implementación]';
      setGeneratedPrompt(improvedPrompt);
      
    } catch (err) {
      setError('Error al conectar con la IA. Intenta nuevamente.');
      console.error('Error improving prompt with AI:', err);
    } finally {
      setIsLoading(false);
    }
  }, [generatedPrompt]);

  // Función para optimizar el objetivo específico
  const optimizeObjective = useCallback(() => {
    if (!config.objective.trim()) return;

    // Guardar el original si es la primera vez que se optimiza
    if (!isObjectiveOptimized) {
      setOriginalObjective(config.objective);
    }

    // Optimizar el texto
    const optimizedText = optimizeObjectiveText(config.objective, config.theme);
    
    // Actualizar la configuración con el texto optimizado
    setConfig(prev => ({
      ...prev,
      objective: optimizedText
    }));

    setIsObjectiveOptimized(true);
    setIsEditing(false); // Salir del modo edición para actualizar la vista previa
  }, [config.objective, config.theme, isObjectiveOptimized]);

  // Función para revertir la optimización del objetivo
  const revertObjectiveOptimization = useCallback(() => {
    if (isObjectiveOptimized && originalObjective) {
      setConfig(prev => ({
        ...prev,
        objective: originalObjective
      }));
      setIsObjectiveOptimized(false);
      setIsEditing(false); // Salir del modo edición para actualizar la vista previa
    }
  }, [isObjectiveOptimized, originalObjective]);

  // Generar prompt automáticamente cuando cambie cualquier configuración
  React.useEffect(() => {
    generatePrompt();
  }, [generatePrompt]);

  const contextValue: PromptContextType = {
    config,
    generatedPrompt,
    editedPrompt,
    isEditing,
    isLoading,
    error,
    originalObjective,
    isObjectiveOptimized,
    updateConfig,
    resetConfig,
    generatePrompt,
    updateEditedPrompt,
    resetToGenerated,
    getCurrentPrompt,
    improveWithAI,
    optimizeObjective,
    revertObjectiveOptimization
  };

  return (
    <PromptContext.Provider value={contextValue}>
      {children}
    </PromptContext.Provider>
  );
};