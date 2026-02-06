# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.1.1] - 2026-02-06

### Omitido
- Corrección en la lógica de puntuación: ahora compara números robustamente para evitar errores de tipo.
- Mejoras en enunciados y explicaciones de preguntas para mayor claridad pedagógica.

## [1.1.0] - 2026-02-05

### Añadido
- Despliegue automático a GitHub Pages mediante GitHub Actions
- Definiciones pedagógicas integradas en preguntas de figuras retóricas
- Contexto educativo para Metáfora, Símil, Hipérbole, Personificación, Ironía, Sinestesia, Epíteto, Prosopopeya, Calambur y Sinécdoque
- Definiciones para conceptos gramaticales (Diptongo, Hiato, Triptongo)

### Mejorado
- Enunciados de preguntas ahora incluyen la definición técnica para facilitar el aprendizaje
- Mejor flujo pedagógico: el estudiante lee la definición antes de identificar ejemplos

### Infraestructura
- Repositorio público en GitHub con licencia MIT
- Webapp disponible en: https://nestorfernando3.github.io/icfes-trainer-lenguaje/

---

## [1.0.0] - 2026-02-05

### Añadido
- Banco de 100 preguntas tipo ICFES refinadas según el Modelo Basado en Evidencias (EBD)
- Pantalla de configuración con selector de categoría y cantidad de preguntas
- Interfaz premium con modo oscuro y diseño glassmorphism
- Barra de progreso animada con efecto shimmer
- Círculo de puntuación animado en la pantalla de resultados
- Tarjetas de revisión con colores de estado (correcto/incorrecto)
- Tipografía Inter de Google Fonts
- Soporte para 4 categorías de preguntas:
  - Lectura crítica: textos expositivos
  - Lectura crítica: encuesta ambiental
  - Comprensión de especificaciones ICFES
  - Conocimientos lingüísticos y gramaticales

### Características EBD
- Enunciados con verbos de tarea explícitos (Identifique, Determine, Explique)
- Redacción en positivo sin negaciones confusas
- Contextos de lectura correctamente asignados a cada pregunta
- Retroalimentación argumentada para cada respuesta

### Técnico
- Desarrollado con Vite + JavaScript vanilla
- CSS moderno con variables y gradientes
- Responsive design para dispositivos móviles
