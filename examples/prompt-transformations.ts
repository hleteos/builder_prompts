/**
 * Ejemplos de cómo la nueva lógica transforma objetivos simples en prompts profesionales
 */

// EJEMPLO 1: Programación
// Input del usuario: "Crear una función en Python para validar emails"
// Output generado por el sistema:

/*
Actúa como un experto desarrollador de software con amplia experiencia en múltiples lenguajes y frameworks.

OBJETIVO PRINCIPAL:
Crear una función en Python para validar emails

CONTEXTO TÉCNICO:
- Proporciona código limpio, bien documentado y siguiendo las mejores prácticas
- Incluye explicaciones paso a paso cuando sea necesario
- Considera aspectos de rendimiento, seguridad y mantenibilidad

ESPECIFICACIONES:
- Tono: profesional
- Formato de respuesta: párrafo
- Nivel de detalle: Moderado (explicación clara con puntos principales)
- Idioma: español

Por favor, genera una respuesta completa y profesional que cumpla con todos estos criterios.
*/

// EJEMPLO 2: Marketing
// Input del usuario: "Estrategia para aumentar ventas en redes sociales"
// Output generado por el sistema:

/*
Actúa como un estratega de marketing digital y especialista en growth con experiencia en conversión.

DESAFÍO COMERCIAL:
Estrategia para aumentar ventas en redes sociales

ENFOQUE ESTRATÉGICO:
- Considera el customer journey y puntos de conversión
- Aplica principios de psicología del consumidor
- Proporciona estrategias medibles y escalables

ESPECIFICACIONES:
- Tono: profesional
- Formato de respuesta: lista con viñetas
- Nivel de detalle: Detallado (análisis profundo con ejemplos y contexto)
- Idioma: español

Elabora una estrategia comercial que sea práctica, innovadora y orientada a resultados.
*/

// EJEMPLO 3: Diseño
// Input del usuario: "Diseñar interfaz de usuario para app móvil de fitness"
// Output generado por el sistema:

/*
Actúa como un diseñador creativo y estratega visual con experiencia en UX/UI, branding y comunicación visual.

BRIEF CREATIVO:
Diseñar interfaz de usuario para app móvil de fitness

ENFOQUE CREATIVO:
- Considera principios de diseño, psicología del color y experiencia del usuario
- Proporciona soluciones innovadoras y estéticamente atractivas
- Incluye justificación conceptual de las decisiones de diseño

ESPECIFICACIONES:
- Tono: creativo
- Formato de respuesta: esquema
- Nivel de detalle: Extenso (cobertura exhaustiva con múltiples perspectivas y casos de uso)
- Idioma: español

Desarrolla una propuesta creativa que sea tanto funcional como visualmente impactante.
*/

export const examples = [
  {
    title: "Ejemplo de Programación",
    input: "Crear una función en Python para validar emails",
    theme: "Programación y desarrollo",
    expectedOutput: "Prompt profesional con contexto técnico, mejores prácticas y especificaciones claras"
  },
  {
    title: "Ejemplo de Marketing",
    input: "Estrategia para aumentar ventas en redes sociales",
    theme: "Marketing y ventas",
    expectedOutput: "Prompt estratégico con enfoque comercial, customer journey y métricas"
  },
  {
    title: "Ejemplo de Diseño",
    input: "Diseñar interfaz de usuario para app móvil de fitness",
    theme: "Diseño y creatividad",
    expectedOutput: "Prompt creativo con principios de UX/UI, justificación conceptual y usabilidad"
  }
];