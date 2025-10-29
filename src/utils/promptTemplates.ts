import type { PromptConfig } from '../types';

/**
 * Plantillas inteligentes para diferentes tipos de objetivos
 */
export const promptTemplates = {
  // Plantillas por tema/categoría
  programacion: {
    structure: (objective: string, config: PromptConfig) => {
      const enhancedObjective = enhanceObjectiveForProgramming(objective, config);
      return `Actúa como un experto desarrollador de software con amplia experiencia en múltiples lenguajes y frameworks.

TAREA DE DESARROLLO:
${enhancedObjective}

REQUISITOS TÉCNICOS:
- Proporciona código limpio, bien documentado y siguiendo las mejores prácticas
- Incluye explicaciones paso a paso cuando sea necesario
- Considera aspectos de rendimiento, seguridad y mantenibilidad
- Estructura la respuesta de manera ${config.format === 'lista' ? 'organizada en puntos' : config.format === 'párrafo' ? 'narrativa y fluida' : 'estructurada y detallada'}

ESPECIFICACIONES DE ENTREGA:
- Tono de comunicación: ${getToneDescription(config.tone)}
- Nivel de complejidad: ${getDetailDescription(config.detailLevel)}
- Idioma de respuesta: ${config.language}

${config.additionalInstructions ? `CONSIDERACIONES ESPECIALES:\n${config.additionalInstructions}\n` : ''}

RESULTADO ESPERADO:
Genera una solución completa que demuestre expertise técnico y sea ${config.tone === 'creativo' ? 'innovadora y original' : config.tone === 'casual' ? 'accesible y práctica' : 'profesional y robusta'}.`;
    }
  },

  'diseño': {
    structure: (objective: string, config: PromptConfig) => {
      const enhancedObjective = enhanceObjectiveForDesign(objective, config);
      return `Actúa como un diseñador creativo y estratega visual con experiencia en UX/UI, branding y comunicación visual.

BRIEF CREATIVO:
${enhancedObjective}

METODOLOGÍA DE DISEÑO:
- Aplicar principios fundamentales de diseño y psicología visual
- Considerar la experiencia del usuario y journey mapping
- Proporcionar soluciones ${config.tone === 'creativo' ? 'innovadoras y experimentales' : config.tone === 'profesional' ? 'elegantes y funcionales' : 'intuitivas y accesibles'}
- Justificar decisiones creativas con base conceptual sólida

ESPECIFICACIONES DE ENTREGA:
- Enfoque comunicacional: ${getToneDescription(config.tone)}
- Nivel de desarrollo: ${getDetailDescription(config.detailLevel)}
- Formato de presentación: ${config.format === 'lista' ? 'Puntos estructurados y organizados' : config.format === 'párrafo' ? 'Narrativa fluida y descriptiva' : 'Estructura detallada con secciones'}
- Idioma de respuesta: ${config.language}

${config.additionalInstructions ? `CONSIDERACIONES ESPECIALES DEL PROYECTO:\n${config.additionalInstructions}\n` : ''}

RESULTADO ESPERADO:
Desarrolla una propuesta creativa integral que combine estética, funcionalidad y estrategia, siendo ${config.detailLevel >= 3 ? 'exhaustiva en análisis y alternativas' : 'clara y directa en su enfoque'}.`;
    }
  },

  'redaccion': {
    structure: (objective: string, config: PromptConfig) => `
Actúa como un redactor profesional y estratega de contenidos con experiencia en comunicación efectiva.

OBJETIVO DE COMUNICACIÓN:
${objective}

ESTRATEGIA EDITORIAL:
- Crea contenido persuasivo, claro y engaging
- Considera la audiencia objetivo y el contexto de uso
- Aplica técnicas de copywriting y storytelling cuando sea apropiado

ESPECIFICACIONES:
- Tono: ${config.tone}
- Formato de respuesta: ${config.format}
- Nivel de detalle: ${getDetailDescription(config.detailLevel)}
- Idioma: ${config.language}

${config.additionalInstructions ? `DIRECTRICES ADICIONALES:\n${config.additionalInstructions}\n` : ''}

Produce un contenido que conecte efectivamente con la audiencia y logre el objetivo planteado.`,
  },

  'investigacion': {
    structure: (objective: string, config: PromptConfig) => `
Actúa como un investigador académico y analista con metodología rigurosa y pensamiento crítico.

PREGUNTA DE INVESTIGACIÓN:
${objective}

METODOLOGÍA:
- Proporciona análisis basado en evidencia y fuentes confiables
- Presenta múltiples perspectivas cuando sea relevante
- Estructura la información de manera lógica y sistemática

ESPECIFICACIONES:
- Tono: ${config.tone}
- Formato de respuesta: ${config.format}
- Nivel de detalle: ${getDetailDescription(config.detailLevel)}
- Idioma: ${config.language}

${config.additionalInstructions ? `PARÁMETROS ADICIONALES:\n${config.additionalInstructions}\n` : ''}

Desarrolla una respuesta fundamentada que aporte valor académico y práctico al tema planteado.`,
  },

  'marketing': {
    structure: (objective: string, config: PromptConfig) => `
Actúa como un estratega de marketing digital y especialista en growth con experiencia en conversión.

DESAFÍO COMERCIAL:
${objective}

ENFOQUE ESTRATÉGICO:
- Considera el customer journey y puntos de conversión
- Aplica principios de psicología del consumidor
- Proporciona estrategias medibles y escalables

ESPECIFICACIONES:
- Tono: ${config.tone}
- Formato de respuesta: ${config.format}
- Nivel de detalle: ${getDetailDescription(config.detailLevel)}
- Idioma: ${config.language}

${config.additionalInstructions ? `CONSIDERACIONES DEL MERCADO:\n${config.additionalInstructions}\n` : ''}

Elabora una estrategia comercial que sea práctica, innovadora y orientada a resultados.`,
  },

  'educacion': {
    structure: (objective: string, config: PromptConfig) => `
Actúa como un educador experto y diseñador instruccional con enfoque en aprendizaje efectivo.

OBJETIVO EDUCATIVO:
${objective}

METODOLOGÍA PEDAGÓGICA:
- Estructura el contenido de manera progresiva y comprensible
- Incluye ejemplos prácticos y aplicaciones reales
- Considera diferentes estilos de aprendizaje

ESPECIFICACIONES:
- Tono: ${config.tone}
- Formato de respuesta: ${config.format}
- Nivel de detalle: ${getDetailDescription(config.detailLevel)}
- Idioma: ${config.language}

${config.additionalInstructions ? `CONTEXTO EDUCATIVO:\n${config.additionalInstructions}\n` : ''}

Crea contenido educativo que facilite el aprendizaje y la retención del conocimiento.`,
  },

  // Plantilla genérica para objetivos sin categoría específica
  generic: {
    structure: (objective: string, config: PromptConfig) => {
      const enhancedObjective = enhanceObjectiveGeneric(objective, config);
      return `Actúa como un experto profesional en el área relevante al siguiente objetivo.

OBJETIVO Y CONTEXTO:
${enhancedObjective}

METODOLOGÍA PROFESIONAL:
- Proporciona información precisa, actualizada y bien fundamentada
- Aplica las mejores prácticas y estándares del campo relevante
- Incluye perspectivas prácticas y recomendaciones aplicables
- Estructura la respuesta de manera ${config.format === 'lista' ? 'organizada en puntos claros' : config.format === 'párrafo' ? 'narrativa y coherente' : 'estructurada y detallada'}

ESPECIFICACIONES DE ENTREGA:
- Estilo comunicacional: ${getToneDescription(config.tone)}
- Profundidad del análisis: ${getDetailDescription(config.detailLevel)}
- Formato de presentación: ${config.format}
- Idioma de respuesta: ${config.language}

${config.additionalInstructions ? `CONSIDERACIONES ESPECÍFICAS:\n${config.additionalInstructions}\n` : ''}

RESULTADO ESPERADO:
Desarrolla una respuesta ${config.tone === 'académico' ? 'rigurosa y bien documentada' : config.tone === 'creativo' ? 'innovadora y original' : 'profesional y práctica'} que aborde comprehensivamente el objetivo planteado.`;
    }
  }
};

/**
 * Convierte el nivel de detalle numérico a descripción textual
 */
function getDetailDescription(level: number): string {
  const descriptions = {
    1: 'Breve y conciso (respuesta directa al punto)',
    2: 'Moderado (explicación clara con puntos principales)',
    3: 'Detallado (análisis profundo con ejemplos y contexto)',
    4: 'Extenso (cobertura exhaustiva con múltiples perspectivas y casos de uso)'
  };
  return descriptions[level as keyof typeof descriptions] || descriptions[2];
}

/**
 * Detecta automáticamente la categoría basada en palabras clave del objetivo
 */
export function detectCategory(objective: string): string {
  const objectiveLower = objective.toLowerCase();
  
  // Palabras clave por categoría
  const keywords = {
    programacion: ['código', 'programar', 'desarrollo', 'software', 'app', 'web', 'api', 'función', 'algoritmo', 'base de datos', 'frontend', 'backend', 'javascript', 'python', 'react', 'framework'],
    diseño: ['diseño', 'ui', 'ux', 'interfaz', 'visual', 'logo', 'branding', 'color', 'tipografía', 'layout', 'mockup', 'prototipo', 'estética', 'imagen'],
    redaccion: ['escribir', 'redactar', 'contenido', 'artículo', 'blog', 'copy', 'texto', 'comunicación', 'mensaje', 'narrativa', 'historia', 'guión'],
    investigacion: ['investigar', 'analizar', 'estudio', 'datos', 'análisis', 'estadística', 'investigación', 'evidencia', 'fuentes', 'metodología', 'hipótesis'],
    marketing: ['marketing', 'ventas', 'campaña', 'publicidad', 'conversion', 'lead', 'customer', 'mercado', 'brand', 'promoción', 'estrategia comercial'],
    educacion: ['enseñar', 'explicar', 'tutorial', 'curso', 'lección', 'aprender', 'educativo', 'didáctico', 'instrucción', 'formación', 'conocimiento']
  };

  // Buscar coincidencias
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => objectiveLower.includes(word))) {
      return category;
    }
  }

  return 'generic';
}

/**
 * Mapeo de temas del dropdown a claves de plantillas
 */
const themeMapping: { [key: string]: keyof typeof promptTemplates } = {
  'Programación y desarrollo': 'programacion',
  'Diseño y creatividad': 'diseño',
  'Redacción y comunicación': 'redaccion',
  'Investigación y análisis': 'investigacion',
  'Marketing y ventas': 'marketing',
  'Educación y formación': 'educacion'
};

/**
 * Genera un prompt inteligente basado en la configuración
 */
export function generateSmartPrompt(config: PromptConfig): string {
  // Si no hay objetivo, generar prompt de demostración
  if (!config.objective || config.objective.trim().length === 0) {
    return generatePreviewPrompt(config);
  }

  // Detectar categoría: primero por tema seleccionado, luego por detección automática
  let category: keyof typeof promptTemplates = 'generic';
  
  if (config.theme && themeMapping[config.theme]) {
    category = themeMapping[config.theme];
  } else if (config.objective) {
    category = detectCategory(config.objective) as keyof typeof promptTemplates;
  }

  // Generar prompt usando la nueva función integradora
  return generateIntegratedPrompt(config, category);
}

/**
 * Genera un prompt de vista previa cuando no hay objetivo específico
 */
function generatePreviewPrompt(config: PromptConfig): string {
  const toneDescription = getToneDescription(config.tone);
  const formatInstructions = getFormatInstructions(config.format);
  const detailDescription = getDetailDescription(config.detailLevel);

  // Crear contexto del tema y rol
  let themeContext = '';
  if (config.theme) {
    themeContext = `\nÁREA DE ESPECIALIZACIÓN: ${config.theme}`;
    if (config.role) {
      themeContext += `\nROL PROFESIONAL: ${config.role}
Actúa como ${config.role} especializado en ${config.theme.toLowerCase()} con amplia experiencia práctica.`;
    } else {
      themeContext += `\nExperto profesional especializado en ${config.theme.toLowerCase()} con amplia experiencia práctica.`;
    }
  }

  return `PROMPT ARQUITECTO - CONFIGURACIÓN ACTIVA

═══════════════════════════════════════════════════════════════
ESTADO: Esperando objetivo específico...
═══════════════════════════════════════════════════════════════
${themeContext}

CONFIGURACIÓN ACTUAL:

TONO CONFIGURADO: ${config.tone.toUpperCase()}
   → ${toneDescription}

FORMATO ESTABLECIDO: ${config.format.toUpperCase()}
   → ${formatInstructions}

NIVEL DE DETALLE: ${detailDescription}

IDIOMA: ${config.language.toUpperCase()}

${config.additionalInstructions ? `
INSTRUCCIONES ESPECÍFICAS:
${config.additionalInstructions}
` : ''}

Por favor responde de manera directa y estructurada.`;
}

/**
 * Funciones para enriquecer objetivos según la categoría
 */

/**
 * Enriquece objetivos de programación con contexto técnico
 */
function enhanceObjectiveForProgramming(objective: string, config: PromptConfig): string {
  const baseObjective = objective.trim();
  
  // Detectar si ya es un objetivo bien estructurado o si necesita expansión
  const isBasicObjective = baseObjective.length < 100 && !baseObjective.includes('\n');
  
  if (!isBasicObjective) {
    return baseObjective; // Ya está bien estructurado
  }
  
  // Expandir objetivo básico según el nivel de detalle
  let enhanced = baseObjective;
  
  if (config.detailLevel >= 2) {
    enhanced += `\n\nReferencias técnicas a considerar:
- Mejores prácticas de desarrollo y patrones de diseño apropiados
- Optimización de rendimiento y escalabilidad
- Seguridad y validación de datos`;
  }
  
  if (config.detailLevel >= 3) {
    enhanced += `
- Manejo de errores y casos edge
- Testing y documentación del código
- Consideraciones de mantenibilidad a largo plazo`;
  }
  
  if (config.detailLevel === 4) {
    enhanced += `
- Arquitectura robusta y principios SOLID
- Integración con sistemas existentes
- Métricas de calidad y monitoreo`;
  }
  
  return enhanced;
}

/**
 * Enriquece objetivos de diseño con contexto creativo
 */
function enhanceObjectiveForDesign(objective: string, config: PromptConfig): string {
  const baseObjective = objective.trim();
  const isBasicObjective = baseObjective.length < 100 && !baseObjective.includes('\n');
  
  if (!isBasicObjective) return baseObjective;
  
  let enhanced = baseObjective;
  
  if (config.detailLevel >= 2) {
    enhanced += `\n\nConsideraciones de diseño:
- Principios de usabilidad y experiencia del usuario
- Coherencia visual y identidad de marca
- Accesibilidad y responsive design`;
  }
  
  if (config.detailLevel >= 3) {
    enhanced += `
- Psicología del color y tipografía efectiva
- Investigación de usuarios y testing de usabilidad
- Tendencias actuales y diferenciación competitiva`;
  }
  
  if (config.detailLevel === 4) {
    enhanced += `
- Estrategia de diseño a largo plazo
- Sistemas de diseño escalables
- ROI del diseño y métricas de conversión`;
  }
  
  return enhanced;
}

/**
 * Función genérica para enriquecer objetivos según categoría
 */
function enhanceObjectiveGeneric(objective: string, config: PromptConfig): string {
  const baseObjective = objective.trim();
  const isBasicObjective = baseObjective.length < 100 && !baseObjective.includes('\n');
  
  if (!isBasicObjective) return baseObjective;
  
  let enhanced = baseObjective;
  
  // Agregar contexto según el nivel de detalle
  if (config.detailLevel >= 2) {
    enhanced += `\n\nContexto y consideraciones importantes:
- Enfoque profesional y metodología apropiada
- Factores relevantes del área de especialización`;
  }
  
  if (config.detailLevel >= 3) {
    enhanced += `
- Mejores prácticas de la industria
- Análisis de alternativas y justificación de decisiones`;
  }
  
  if (config.detailLevel === 4) {
    enhanced += `
- Perspectiva estratégica a largo plazo
- Consideraciones de implementación y seguimiento`;
  }
  
  return enhanced;
}

/**
 * Descripciones más ricas para el tono
 */
function getToneDescription(tone: string): string {
  const descriptions = {
    'profesional': 'Formal, técnico y autorizado - usando terminología especializada y estructura clara',
    'casual': 'Conversacional, accesible y amigable - evitando jerga excesiva y siendo directo',
    'creativo': 'Innovador, inspirador y original - pensando fuera de la caja con enfoques únicos',
    'académico': 'Riguroso, metodológico y bien fundamentado - con referencias y análisis profundo',
    'técnico': 'Preciso, específico y detallado - con terminología exacta y especificaciones claras',
    'amigable': 'Cálido, comprensivo y accesible - priorizando la claridad y el entendimiento',
    'formal': 'Estructurado, respetuoso y elegante - manteniendo protocolo y seriedad apropiada',
    'persuasivo': 'Convincente, estratégico y orientado a resultados - enfocado en motivar acción',
    'educativo': 'Didáctico, progresivo y comprensible - diseñado para facilitar el aprendizaje',
    'inspirador': 'Motivacional, visionario y energizante - despertando entusiasmo y creatividad',
    'analítico': 'Lógico, sistemático y basado en datos - privilegiando evidencia y razonamiento'
  };
  return descriptions[tone as keyof typeof descriptions] || descriptions['profesional'];
}

/**
 * Adapta el contenido según el formato seleccionado
 */
function getFormatInstructions(format: string): string {
  const instructions = {
    'párrafo': 'Estructura la respuesta en párrafos fluidos y coherentes, con transiciones naturales entre ideas',
    'lista con viñetas': 'Organiza la información en puntos claros y concisos usando viñetas (•)',
    'lista numerada': 'Presenta el contenido en pasos ordenados y secuenciales usando números (1., 2., 3.)',
    'diálogo': 'Estructura como conversación o intercambio de preguntas y respuestas',
    'código': 'Incluye bloques de código bien comentados y ejemplos prácticos de implementación',
    'tabla': 'Organiza la información en formato tabular con columnas y filas claramente definidas',
    'esquema': 'Presenta una estructura jerárquica con títulos, subtítulos y elementos anidados',
    'informe': 'Estructura como documento formal con resumen ejecutivo, desarrollo y conclusiones',
    'guión': 'Organiza como secuencia de acciones o instrucciones paso a paso',
    'email': 'Formato de correo electrónico con asunto, saludo, cuerpo y cierre apropiados'
  };
  return instructions[format as keyof typeof instructions] || instructions['párrafo'];
}

/**
 * Optimizaciones específicas por motor de IA
/**
 * Función principal que integra TODAS las configuraciones
 */
function generateIntegratedPrompt(config: PromptConfig, category: keyof typeof promptTemplates): string {
  
  // Enriquecer objetivo según categoría
  let enhancedObjective = config.objective.trim();
  if (category === 'programacion') {
    enhancedObjective = enhanceObjectiveForProgramming(config.objective, config);
  } else if (category === 'diseño') {
    enhancedObjective = enhanceObjectiveForDesign(config.objective, config);
  } else {
    enhancedObjective = enhanceObjectiveGeneric(config.objective, config);
  }

  // Construir prompt integrado
  const toneDescription = getToneDescription(config.tone);
  const formatInstructions = getFormatInstructions(config.format);
  const detailDescription = getDetailDescription(config.detailLevel);

  // Crear contexto del tema y rol si existen
  let themeContext = '';
  if (config.theme) {
    themeContext = `\nCONTEXTO TEMÁTICO: ${config.theme}`;
    if (config.role) {
      themeContext += `\nROL PROFESIONAL: ${config.role}

Actúa como ${config.role} especializado en ${config.theme.toLowerCase()} con amplia experiencia práctica. Adapta tu enfoque a las mejores prácticas, terminología y estándares de este campo desde la perspectiva de este rol profesional.`;
    } else {
      themeContext += `\nEsta tarea se enmarca específicamente en el área de ${config.theme.toLowerCase()}. Adapta tu enfoque a las mejores prácticas, terminología y estándares de este campo.`;
    }
  }

  // Plantilla base más robusta
  return `PROMPT ARQUITECTO - CONFIGURACIÓN PROFESIONAL

═══════════════════════════════════════════════════════════════
OBJETIVO PRINCIPAL:
${enhancedObjective}
═══════════════════════════════════════════════════════════════
${themeContext}

CONFIGURACIÓN DE RESPUESTA:

ESTILO DE COMUNICACIÓN: ${config.tone.toUpperCase()}
   → ${toneDescription}

FORMATO DE PRESENTACIÓN: ${config.format.toUpperCase()}
   → ${formatInstructions}

NIVEL DE PROFUNDIDAD: ${detailDescription}

IDIOMA DE RESPUESTA: ${config.language.toUpperCase()}

${config.additionalInstructions ? `
INSTRUCCIONES ESPECÍFICAS:
${config.additionalInstructions}
` : ''}

═══════════════════════════════════════════════════════════════
INSTRUCCIONES DE EJECUCIÓN:

1. INTEGRA todas las configuraciones especificadas arriba
2. RESPETA el tono ${config.tone} en cada párrafo o elemento
3. ESTRUCTURA usando el formato ${config.format} consistentemente
4. AJUSTA la profundidad al nivel ${config.detailLevel}/4 solicitado

RESULTADO ESPERADO:
Una respuesta que demuestre la perfecta integración de todas las configuraciones, siendo ${config.tone} en el tono, ${config.format} en la estructura, y ${config.detailLevel === 4 ? 'exhaustivamente detallada' : config.detailLevel === 3 ? 'profundamente analizada' : config.detailLevel === 2 ? 'claramente explicada' : 'concisamente presentada'} en el desarrollo.

Por favor responde de manera directa y estructurada.`;
}

/**
 * Optimiza un texto en lenguaje natural para mejorar la cohesión, coherencia y comprensión de IA
 * 
 * PROCESO DE OPTIMIZACIÓN EN 6 PASOS:
 * 1. Normalización y limpieza inicial
 * 2. Mejora de estructura y coherencia (verbos/sustantivos específicos)
 * 3. Optimización contextual (programación, diseño, redacción, etc.)
 * 4. Eliminación de redundancias y mejora de cohesión
 * 5. Optimizaciones específicas para comprensión de IA
 * 6. Formateo final y puntuación
 * 
 * @param text - Texto a optimizar
 * @param context - Contexto opcional para la optimización (programacion, diseño, redaccion, etc.)
 * @returns Texto optimizado con mejor estructura, claridad y especificidad para IA
 */
export function optimizeObjectiveText(text: string, context?: string): string {
  if (!text.trim()) return text;

  // Paso 1: Normalización y limpieza inicial
  let optimized = normalizeAndClean(text);
  
  // Paso 2: Mejora de estructura y coherencia
  optimized = improveStructureAndCoherence(optimized);
  
  // Paso 3: Optimización específica por contexto
  optimized = optimizeByContext(optimized, context);
  
  // Paso 4: Eliminación de redundancias y mejora de cohesión
  optimized = improveCoherenceAndRemoveRedundancy(optimized);
  
  // Paso 5: Mejoras específicas para comprensión de IA
  optimized = optimizeForAIComprehension(optimized);
  
  // Paso 6: Formateo final
  optimized = finalFormatting(optimized);

  return optimized;
}

/**
 * Normaliza y limpia el texto inicial
 */
function normalizeAndClean(text: string): string {
  let normalized = text;

  // Normalizar espacios
  normalized = normalized.replace(/\s+/g, ' ').trim();

  // Eliminar muletillas iniciales comunes en lenguaje coloquial
  const fillerPhrases = [
    /^(lo que quiero es que|lo que necesito es que|quiero que|necesito que|me gustaría que)\s+/i,
    /^(por favor|porfavor),?\s+/i,
    /^(hola|buenas|hola buenas),?\s+/i
  ];

  fillerPhrases.forEach(pattern => {
    normalized = normalized.replace(pattern, '');
  });

  // Eliminar redundancias iniciales como "me hagas una función que pueda"
  normalized = normalized.replace(/\b(me hagas|me crees|me desarrolles|me programes)\s+(una?\s+)/i, '$2');
  normalized = normalized.replace(/\b(que pueda|que sea capaz de|que permita)\s+/i, 'para ');

  return normalized;
}

/**
 * Mejora la estructura y coherencia del texto
 */
function improveStructureAndCoherence(text: string): string {
  let improved = text;

  // Identificar y mejorar el verbo principal al inicio
  const mainVerbPatterns = [
    { pattern: /^(una?\s+)?función\s+(que\s+)?/i, replacement: 'Función para ' },
    { pattern: /^(un\s+)?sistema\s+(que\s+)?/i, replacement: 'Sistema para ' },
    { pattern: /^(un\s+)?programa\s+(que\s+)?/i, replacement: 'Programa para ' },
    { pattern: /^(un\s+)?script\s+(que\s+)?/i, replacement: 'Script para ' },
    { pattern: /^(una?\s+)?aplicación\s+(que\s+)?/i, replacement: 'Aplicación para ' }
  ];

  mainVerbPatterns.forEach(({ pattern, replacement }) => {
    improved = improved.replace(pattern, replacement);
  });

  // Mejorar verbos específicos de acción
  const actionVerbs = {
    'exportar': 'exportar datos a',
    'importar': 'importar datos desde',
    'guardar': 'guardar información en',
    'cargar': 'cargar datos de',
    'mostrar': 'visualizar',
    'enseñar': 'presentar',
    'hacer': 'generar',
    'crear': 'crear',
    'poner': 'insertar',
    'sacar': 'extraer'
  };

  // Mejorar verbos vagos solo cuando no hay contexto técnico
  if (!/\b(función|método|clase|API|sistema)\b/i.test(improved)) {
    Object.entries(actionVerbs).forEach(([vague, specific]) => {
      const regex = new RegExp(`\\b${vague}\\b`, 'i');
      improved = improved.replace(regex, specific);
    });
  }

  // Mejorar sustantivos vagos
  const nounImprovements = {
    'cosa': 'elemento',
    'cosas': 'elementos',
    'algo': 'componente',
    'todo': 'toda la información',
    'parte': 'sección',
    'aspecto': 'característica'
  };

  Object.entries(nounImprovements).forEach(([vague, specific]) => {
    const regex = new RegExp(`\\b${vague}\\b`, 'gi');
    improved = improved.replace(regex, specific);
  });

  return improved;
}

/**
 * Optimiza según el contexto específico
 */
function optimizeByContext(text: string, context?: string): string {
  if (!context) return text;
  
  let optimized = text;
  const contextLower = context.toLowerCase();

  // Programación: Enfoque en especificidad técnica
  if (contextLower.includes('programacion') || contextLower.includes('desarrollo')) {
    // Mejorar descripciones de funciones
    optimized = optimized.replace(/^Función para\s+/i, 'Desarrollar función que ');
    optimized = optimized.replace(/^(una?\s+)?función\s+(para\s+)?/i, 'Crear función que ');
    
    // Mejorar acciones técnicas específicas
    optimized = optimized.replace(/\bexportar datos a\s+excel/i, 'exportar datos a formato Excel (.xlsx)');
    optimized = optimized.replace(/\bexportar\s+(a\s+)?excel/i, 'exportar a archivo Excel');
    optimized = optimized.replace(/\bponer\s+en\s+excel/i, 'volcar en hoja de cálculo Excel');
    
    // Agregar especificidad de formato si menciona Excel
    if (/\bexcel\b/i.test(optimized) && !/\b(archivo|formato|documento|hoja)\b/i.test(optimized)) {
      optimized = optimized.replace(/excel/i, 'archivo Excel');
    }
  }

  // Diseño: Enfoque en aspectos visuales y UX
  if (contextLower.includes('diseño') || contextLower.includes('visual') || contextLower.includes('ui')) {
    optimized = optimized.replace(/^Función para\s+/i, 'Diseñar interfaz para ');
    optimized = optimized.replace(/\b(mejorar|optimizar)\s+/gi, 'rediseñar para mejorar ');
  }

  // Redacción: Enfoque en comunicación efectiva
  if (contextLower.includes('redaccion') || contextLower.includes('contenido') || contextLower.includes('marketing')) {
    optimized = optimized.replace(/^Función para\s+/i, 'Redactar contenido que ');
    optimized = optimized.replace(/\b(escribir|redactar)\s+/gi, 'crear contenido para ');
  }

  return optimized;
}

/**
 * Mejora la coherencia y elimina redundancias
 */
function improveCoherenceAndRemoveRedundancy(text: string): string {
  let improved = text;

  // Eliminar redundancias complejas
  const redundancyPatterns = [
    /\b(muy muy|realmente muy|bastante muy|súper muy)\b/gi,
    /\b(que que|de de|en en|por por|con con)\b/gi,
    /\b(también también|además además|asimismo asimismo)\b/gi,
    /\b(crear y hacer|hacer y crear|desarrollar y crear)\b/gi,
    /\b(bueno y bueno|malo y malo|grande y grande)\b/gi
  ];

  redundancyPatterns.forEach(pattern => {
    improved = improved.replace(pattern, (match) => {
      const words = match.split(/\s+/);
      return words[0];
    });
  });

  // Mejorar conectores para mayor cohesión
  const connectorImprovements = {
    'y además': ', además',
    'pero sin embargo': ', sin embargo',
    'porque ya que': 'ya que',
    'para que para': 'para que',
    'aunque pero': 'aunque',
    'cuando mientras': 'mientras'
  };

  Object.entries(connectorImprovements).forEach(([redundant, improved_connector]) => {
    const regex = new RegExp(redundant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    improved = improved.replace(regex, improved_connector);
  });

  // Eliminar muletillas y palabras de relleno
  const fillerWords = [
    /\b(este|esta|esto|eso|esa|ese)\s+(tipo\s+de|clase\s+de|especie\s+de)\b/gi,
    /\b(como\s+que|tipo\s+de|clase\s+de|especie\s+de)\b/gi,
    /\b(o\s+sea|es\s+decir|digamos|pues)\b/gi
  ];

  fillerWords.forEach(pattern => {
    improved = improved.replace(pattern, '');
  });

  return improved;
}

/**
 * Optimizaciones específicas para comprensión de IA
 */
function optimizeForAIComprehension(text: string): string {
  let optimized = text;

  // Mejorar especificidad solo cuando sea necesario
  const specificityImprovements = {
    'mejorar el': 'optimizar el',
    'cambiar el': 'modificar el',
    'actualizar el': 'actualizar el',
    'revisar el': 'revisar el'
  };

  Object.entries(specificityImprovements).forEach(([vague, specific]) => {
    const regex = new RegExp(`\\b${vague}\\b`, 'gi');
    optimized = optimized.replace(regex, specific);
  });

  // Mejorar claridad en las acciones solo si son muy vagas
  if (/^(hacer|poner|dar|tener)\s/i.test(optimized)) {
    optimized = optimized.replace(/^hacer\s+/i, 'Desarrollar ');
    optimized = optimized.replace(/^poner\s+/i, 'Implementar ');
    optimized = optimized.replace(/^dar\s+/i, 'Proporcionar ');
  }

  // Eliminar frases redundantes que se hayan podido generar
  optimized = optimized.replace(/\bque que\b/gi, 'que');
  optimized = optimized.replace(/\bpara para\b/gi, 'para');
  optimized = optimized.replace(/\ben en\b/gi, 'en');

  return optimized;
}

/**
 * Formateo final del texto optimizado
 */
function finalFormatting(text: string): string {
  let formatted = text;

  // Capitalizar primera letra
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);

  // Limpiar espacios múltiples
  formatted = formatted.replace(/\s+/g, ' ').trim();

  // Asegurar puntuación final apropiada
  if (!/[.!?]$/.test(formatted)) {
    formatted += '.';
  }

  // Mejorar puntuación interna
  formatted = formatted.replace(/,\s*,/g, ',');
  formatted = formatted.replace(/\.\s*\./g, '.');
  formatted = formatted.replace(/\s+([,.!?])/g, '$1');

  // Espaciado correcto después de puntuación
  formatted = formatted.replace(/([.!?])\s*([A-Za-z])/g, '$1 $2');
  formatted = formatted.replace(/,\s*([a-z])/g, ', $1');

  return formatted;
}