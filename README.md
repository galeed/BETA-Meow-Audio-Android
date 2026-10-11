# BETA-Meow-Audio-Android

=========================================================
MEOW AUDIO APP v2.9
Reproductor de audio local PWA con skins
=========================================================

CONTENIDO DEL PROYECTO
-----------------------
📁 tu-carpeta/
├── index.html               ← App principal (HTML + CSS + JS)
├── sw.js                    ← Service Worker
├── manifest.json            ← Manifiesto PWA
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── icon-192.png
├── icon-192-maskable.png
├── icon-512.png
├── icon-512-maskable.png
└── README.txt               ← Este archivo


SKINS DISPONIBLES (v2.9)
-------------------------
1. Classic
   - Diseño original con glassmorphism
   - Acento rojo (#ff4757) + cyan (#00ffcc)
   - Blur, bordes redondeados, fuentes del sistema
   - Visualizador de audio configurable
   - Portada del álbum cuadrada

2. Consola TUI
   - Estética terminal CRT con scanlines y vignette
   - 6 temas de color:
     * Phosphor Green (#00ff66)
     * Amber CRT (#ffb000)
     * Cyber Cyan (#00f0ff)
     * Dracula Synth (#bd93f9)
     * Monochrome (#eeeeee)
     * Cappuccino (#e69a58)
   - Tipografía monospace (JetBrains Mono / Share Tech Mono)
   - Menú desplegable en el header para cambiar de tema
   - Visualizador desactivado (estética terminal pura)

3. @distro_01
   - Inspirado en fastfetch / neofetch
   - 13 distros de Linux con colores característicos:
     * Arch Linux (#1793d1)
     * Ubuntu (#e95420)
     * Debian (#d70a53)
     * Fedora (#51a2da)
     * Linux Mint (#87cf3e)
     * openSUSE (#73ba25)
     * Alpine Linux (#0d597f)
     * Gentoo (#54487a)
     * Manjaro (#35bfa7)
     * Kali Linux (#557c94)
     * Void Linux (#478061)
     * NixOS (#5277c3)
     * Pop!_OS (#48b9c7)
   - ASCII art de cada distro como marca de agua de fondo
   - Menú desplegable en el header para cambiar de distro
   - Fondo base #0d1117 (GitHub dark) + acento por distro


CÓMO ELEGIR UN SKIN
--------------------
1. Abre la app
2. Toca el ícono ⚙️ (Ajustes) en la barra inferior
3. Busca "🎨 Skin de la App"
4. Selecciona: Classic / Consola TUI / @distro_01
5. El cambio se aplica al instante y se guarda automáticamente


CÓMO CAMBIAR DE TEMA O DISTRO
------------------------------
- En skin TUI: toca el header "🎵 MEOW AUDIO APP" → menú con 6 temas
- En skin @distro_01: toca el header "🎵 MEOW AUDIO APP" → menú con 13 distros
- En skin Classic: no hay menú (header no es clicable)


FUNCIONALIDADES PRINCIPALES
----------------------------
- Reproducción de audio local (MP3, WAV, OGG, FLAC, M4A, AAC)
- Lectura de metadatos ID3 (título, artista, álbum, portada)
- Lectura de specs Hi-Res (FLAC 24bit/48kHz+)
- Ecualizador de 10 bandas con 13 presets
- Dolby Spatial Audio (simulado)
- Visualizador de espectro (barras, osciloscopio, híbrido)
- Medidor LUFS / Peak
- Fila de reproducción con búsqueda y ordenamiento
- Persistencia en IndexedDB
- Media Session API (controles en pantalla de bloqueo)
- Reproducción en segundo plano (con keepAlive)
- Pantalla completa y rotación manual
- Exportación de lista (M3U8, JSON, TXT)
- Aviso de privacidad (todo local)


ATAJOS DE TECLADO
------------------
Espacio     Play / Pausa
N           Siguiente pista
P           Pista anterior
M           Mute / Unmute
↑           Subir volumen
↓           Bajar volumen
Esc         Cerrar menú desplegable


INSTALACIÓN COMO PWA
---------------------
Requisitos: HTTPS o localhost

1. Sube todos los archivos a tu hosting
2. Abre la URL en Chrome / Safari / Edge
3. Menú → "Añadir a pantalla de inicio" o "Instalar app"
4. La app se abrirá como standalone

Nota: en iOS, la reproducción en segundo plano solo funciona si la app
está instalada como PWA (Añadir a pantalla de inicio).


PRUEBA LOCAL
-------------
Opción 1: Python
    python3 -m http.server 8080
    Abre: http://localhost:8080

Opción 2: Node
    npx serve .
    Abre: http://localhost:3000

Opción 3: HTTPS temporal (para probar en móvil)
    ngrok http 8080
    Usa la URL https://... que genera


SOLUCIÓN DE PROBLEMAS
----------------------
❌ La app no se actualiza después de subir cambios
   → Sube el número de versión en sw.js (v2.9 → v2.10)
   → Borra datos del sitio en el navegador
   → Reinstala la PWA

❌ La música se pausa al bloquear pantalla
   → Debe estar instalada como PWA (no desde Safari)
   → Verifica que "keepAlive" esté activo (visible en consola)
   → Es limitación de iOS cuando se usa Web Audio API

❌ El menú del header no aparece
   → Solo aparece en skins TUI y @distro_01
   → En Classic el header no es clicable

❌ Los logos de distros se ven deformados
   → Verifica que la fuente JetBrains Mono esté cargada
   → Reduce el font-size en .distro-bg-ascii si es necesario


PRÓXIMAS VERSIONES
-------------------
v2.10 → @distro_02 con las otras 13 distros
        (elementary, CachyOS, EndeavourOS, CentOS Stream,
         Slackware, Parrot, Raspberry Pi OS, Proxmox,
         TrueNAS, Android, macOS, Windows 11, GNU Hurd)

v2.11 → Más temas para TUI
        + Crossfade real entre pistas


CRÉDITOS
---------
- Inspirado en fastfetch: https://github.com/fastfetch-cli/fastfetch
- Inspirado en astro-distro: https://astro-distro.pages.dev
- Inspirado en astro-tui-portfolio: https://astro-tui-portfolio.netlify.app
- Fuentes: JetBrains Mono, Share Tech Mono


LICENCIA
---------
Uso personal. Modifica y adapta libremente.


=========================================================
¡Miau! 🐱
=========================================================