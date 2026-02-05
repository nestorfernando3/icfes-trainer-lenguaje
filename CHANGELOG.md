# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

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
