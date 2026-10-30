# 🐱 MEOW AUDIO APP v3.0

**Un reproductor de audio local PWA con sistema de Skins, construido 100% con HTML, CSS y JavaScript puro.**

Meow Audio App es una aplicación web progresiva (PWA) diseñada para reproducir tu música local con una calidad de interfaz excepcional. No requiere frameworks, no requiere backend, y todos tus datos se quedan en tu dispositivo.

> 🚧 **Estado del proyecto:** Beta (v3.0) - En desarrollo activo.

## 📸 Captura de Pantalla

*(Sube una imagen de tu app a la carpeta del repositorio, por ejemplo `screenshot.png`, y ponla aquí)*
![Vista previa del Skin TUI](screenshot.png)

## ✨ Características Principales

*   🎵 **Reproducción Local:** Soporte para MP3, WAV, OGG, FLAC, M4A y AAC.
*   🏷️ **Metadatos:** Lectura de ID3 (título, artista, álbum, portada) y specs Hi-Res (FLAC 24bit).
*   🎛️ **Audio Pro:** Ecualizador de 10 bandas con 13 presets, Dolby Spatial Audio (simulado) y visualizador de espectro.
*   🎨 **Sistema de Skins (v3.0):** 
    *   *Classic:* Glassmorphism moderno.
    *   *Consola TUI:* Estética CRT retro con 6 temas de color (Phosphor Green, Amber, Cyber Cyan, etc.).
    *   *@distro_01:* Inspirado en *fastfetch*, con 13 temas basados en distros de Linux.
*   📱 **PWA & Segundo Plano:** Instálala en tu móvil, soporte para pantalla de bloqueo (Media Session API) y reproducción en segundo plano.
*   💾 **Privacidad Total:** Persistencia en IndexedDB. Todo es local, nada viaja a la nube.

## 🛠️ Tecnologías Utilizadas

*   **HTML5 & CSS3** (Estilos puros, variables CSS para los temas).
*   **JavaScript (Vanilla)** (Lógica del reproductor, Web Audio API, IndexedDB).
*   **Service Worker** (Para el funcionamiento offline de la PWA).

## 🚀 Cómo probarlo (Local)

Al ser una PWA, necesita servirse a través de un servidor local (no puedes abrir el `index.html` directamente haciendo doble clic).

**Opción 1: Usando Python**
```bash
# En la raíz del proyecto
python3 -m http.server 8080
# Abre http://localhost:8080 en tu navegador
