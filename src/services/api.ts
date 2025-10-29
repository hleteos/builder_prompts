import type { AIResponse } from '../types';

/**
 * Configuración para la API de Groq
 * Establece la clave API desde variables de entorno
 */
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

/**
 * Interfaz para configurar el cliente de la API
 */
interface APIClientConfig {
  apiKey?: string;
  baseURL?: string;
  timeout?: number;
}

/**
 * Cliente para interactuar con APIs de IA
 */
class AIAPIClient {
  private apiKey: string;
  private baseURL: string;
  private timeout: number;

  constructor(config: APIClientConfig = {}) {
    this.apiKey = config.apiKey || GROQ_API_KEY || '';
    this.baseURL = config.baseURL || GROQ_API_URL;
    this.timeout = config.timeout || 10000; // 10 segundos
  }

  /**
   * Verifica si la API está configurada correctamente
   */
  isConfigured(): boolean {
    return Boolean(this.apiKey);
  }

  /**
   * Realiza una petición a la API con manejo de errores
   */
  private async makeRequest(body: Record<string, unknown>): Promise<Record<string, unknown>> {
    if (!this.isConfigured()) {
      throw new Error('API key no configurada. Agrega VITE_GROQ_API_KEY a tu archivo .env');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(body),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La petición tardó demasiado tiempo');
        }
        throw error;
      }
      throw new Error('Error desconocido en la petición');
    }
  }

  /**
   * Mejora un prompt usando IA
   */
  async improvePrompt(originalPrompt: string): Promise<AIResponse> {
    const systemPrompt = `
Eres un experto en ingeniería de prompts para IAs. Tu tarea es analizar y mejorar prompts para que sean más efectivos, claros y precisos.

Principios para mejorar prompts:
1. Claridad: Usar lenguaje específico y sin ambigüedades
2. Estructura: Organizar la información de manera lógica
3. Contexto: Proporcionar contexto relevante y suficiente
4. Especificidad: Definir exactamente qué se espera como resultado
5. Formato: Especificar claramente el formato de salida deseado

Analiza el prompt proporcionado y devuelve una versión mejorada que mantenga la intención original pero sea más efectiva.
`;

    const userPrompt = `
Por favor, mejora este prompt:

${originalPrompt}

Devuelve únicamente la versión mejorada del prompt, sin explicaciones adicionales.
`;

    try {
      const requestBody = {
        model: 'llama3-8b-8192', // Modelo de Groq
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        stream: false
      };

      const response = await this.makeRequest(requestBody);
      
      if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
        const choice = response.choices[0] as { message: { content: string } };
        const improvedPrompt = choice?.message?.content?.trim() || '';
        
        return {
          improvedPrompt,
          suggestions: [
            'Estructura mejorada para mayor claridad',
            'Especificaciones más precisas',
            'Contexto optimizado para mejores resultados'
          ]
        };
      }

      throw new Error('Respuesta inválida de la API');
    } catch (error) {
      console.error('Error mejorando prompt:', error);
      throw error;
    }
  }

  /**
   * Genera sugerencias para un prompt basado en el tema
   */
  async generateSuggestions(theme: string, objective: string): Promise<string[]> {
    const systemPrompt = `
Eres un asistente especializado en generar sugerencias para prompts efectivos.
Basándote en el tema y objetivo proporcionados, genera 3-5 sugerencias breves y específicas para mejorar el prompt.
`;

    const userPrompt = `
Tema: ${theme}
Objetivo: ${objective}

Genera sugerencias específicas para mejorar un prompt con este tema y objetivo.
Devuelve solo una lista de sugerencias, una por línea, sin numeración.
`;

    try {
      const requestBody = {
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        max_tokens: 500,
        temperature: 0.8,
        top_p: 1,
        stream: false
      };

      const response = await this.makeRequest(requestBody);
      
      if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
        const choice = response.choices[0] as { message: { content: string } };
        const content = choice?.message?.content?.trim() || '';
        return content.split('\n').filter((line: string) => line.trim().length > 0);
      }

      return [];
    } catch (error) {
      console.error('Error generando sugerencias:', error);
      return [];
    }
  }
}

// Instancia global del cliente
export const aiClient = new AIAPIClient();

/**
 * Funciones de conveniencia para usar en los componentes
 */
export const AIService = {
  /**
   * Verifica si la API está configurada
   */
  isAvailable: () => aiClient.isConfigured(),

  /**
   * Mejora un prompt con IA
   */
  improvePrompt: async (prompt: string): Promise<AIResponse> => {
    return await aiClient.improvePrompt(prompt);
  },

  /**
   * Genera sugerencias para un prompt
   */
  generateSuggestions: async (theme: string, objective: string): Promise<string[]> => {
    return await aiClient.generateSuggestions(theme, objective);
  },

  /**
   * Función de prueba para verificar conectividad
   */
  testConnection: async (): Promise<boolean> => {
    try {
      await aiClient.improvePrompt('Test prompt');
      return true;
    } catch (error) {
      console.warn('API de IA no disponible:', error);
      return false;
    }
  }
};

export default AIService;