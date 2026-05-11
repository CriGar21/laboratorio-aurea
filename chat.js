/**
 * ÁUREA — Widget de Chat con IA
 * Incluir en cualquier página con:
 *   <script src="chat.js"></script>
 *
 * Usa la API de Claude (Anthropic) para responder preguntas
 * sobre el laboratorio con conocimiento específico de Áurea.
 */

(function () {
  // =====================================================
  // CONFIGURACIÓN — EDITÁ ESTOS DATOS
  // =====================================================
  const CONFIG = {
    // Tu número de WhatsApp (con código de país, sin +)
    whatsapp: "5491100000000",

    // Nombre del laboratorio
    nombre: "Áurea Laboratorio Bioquímico",

    // Horarios
    horarios: "Lunes a viernes de 7:00 a 12:00 hs · Sábados de 7:00 a 10:00 hs",

    // Dirección
    direccion: "Av. [Tu dirección], Junín, Buenos Aires",

    // Teléfono
    telefono: "(xxx) xxx-xxxx",

    // Obras sociales que aceptan
    obrasSociales:
      "IOMA, OSDE, Swiss Medical, Galeno, PAMI, Medifé, OSECAC, OSPEDYC, SANCOR Salud, ACCORD Salud y más. Consultá si no ves la tuya.",

    // API Key de Anthropic
    // IMPORTANTE: Reemplazá con tu API key real
    // Obtenela en: https://console.anthropic.com/
    apiKey: "TU_API_KEY_AQUI",
  };

  // =====================================================
  // PROMPT DEL SISTEMA — Define cómo se comporta la IA
  // =====================================================
  const SYSTEM_PROMPT = `Sos el asistente virtual de ${CONFIG.nombre}, un laboratorio bioquímico en Junín, Buenos Aires, Argentina.

Tu rol es ayudar a los pacientes con información sobre el laboratorio. Respondé siempre en español argentino, de forma cálida, clara y profesional. Usá "vos" en lugar de "tú".

INFORMACIÓN DEL LABORATORIO:
- Nombre: ${CONFIG.nombre}
- Dirección: ${CONFIG.direccion}
- Teléfono: ${CONFIG.telefono}
- Horarios: ${CONFIG.horarios}
- Sin turno previo para atención presencial
- Extracción a domicilio disponible (requiere solicitud previa)
- Obras sociales: ${CONFIG.obrasSociales}

SOBRE LOS ANÁLISIS:
- Hemograma: no requiere ayuno
- Glucosa, colesterol, triglicéridos: 8-12 horas de ayuno
- TSH y hormonas tiroideas: si tomás levotiroxina, tomala DESPUÉS de la extracción
- Cortisol: extracción entre 7:00 y 9:00 hs
- Urocultivo: primera orina de la mañana, frasco estéril
- Para dudas específicas sobre preparación, derivá a la sección de estudios del sitio

REGLAS IMPORTANTES:
1. NO diagnosticás ni interpretás resultados médicos — siempre derivá al médico tratante
2. Si el paciente pide turno de domicilio, preguntá: nombre, dirección, fecha tentativa y estudios solicitados, luego indicale que vaya a la sección "Extracción a domicilio" del sitio o que te contacte por WhatsApp
3. Si no sabés algo o la pregunta es muy específica, sugerí que contacte por WhatsApp
4. Respondé de forma concisa — máximo 3-4 líneas por respuesta
5. Si el paciente saluda, respondé con calidez presentándote brevemente
6. Nunca inventés información sobre resultados, precios exactos ni información que no tengas

Cuando el paciente quiera ser derivado a WhatsApp, incluí exactamente este texto al final de tu respuesta: [MOSTRAR_WHATSAPP]`;

  // =====================================================
  // HISTORIAL DE CONVERSACIÓN
  // =====================================================
  let historial = [];

  // =====================================================
  // INYECTAR ESTILOS
  // =====================================================
  const estilos = document.createElement("style");
  estilos.textContent = `
    /* ---- BURBUJA FLOTANTE ---- */
    #aurea-chat-btn {
      position: fixed;
      bottom: 5.5rem;
      right: 1.8rem;
      width: 54px;
      height: 54px;
      background: #445925;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(68,89,37,0.35);
      z-index: 9998;
      border: none;
      transition: transform 0.2s, background 0.2s;
      animation: aurea-pulse 3s infinite;
    }

    #aurea-chat-btn:hover {
      transform: scale(1.08);
      background: #354a1c;
    }

    #aurea-chat-btn svg {
      width: 26px;
      height: 26px;
      fill: white;
    }

    @keyframes aurea-pulse {
      0%, 100% { box-shadow: 0 4px 20px rgba(68,89,37,0.35); }
      50%       { box-shadow: 0 4px 28px rgba(68,89,37,0.55); }
    }

    /* Badge de notificación */
    #aurea-chat-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 16px;
      height: 16px;
      background: #BC6849;
      border-radius: 50%;
      border: 2px solid white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 9px;
      font-weight: 700;
      color: white;
      font-family: sans-serif;
    }

    /* ---- VENTANA DEL CHAT ---- */
    #aurea-chat-window {
      position: fixed;
      bottom: 10.5rem;
      right: 1.8rem;
      width: 360px;
      max-height: 520px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      z-index: 9997;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      font-family: 'DM Sans', sans-serif;
    }

    #aurea-chat-window.abierto {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Header del chat */
    #aurea-chat-header {
      background: #445925;
      padding: 1rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-shrink: 0;
    }

    .aurea-avatar {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .aurea-avatar svg {
      width: 26px;
      height: 26px;
    }

    .aurea-header-info { flex: 1; }
    .aurea-header-nombre {
      font-size: 0.88rem;
      font-weight: 600;
      color: white;
      line-height: 1.1;
    }
    .aurea-header-estado {
      font-size: 0.7rem;
      color: rgba(255,255,255,0.65);
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .aurea-dot-verde {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #7dde9a;
    }

    #aurea-chat-cerrar {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.2rem;
      color: rgba(255,255,255,0.7);
      transition: color 0.2s;
    }
    #aurea-chat-cerrar:hover { color: white; }
    #aurea-chat-cerrar svg { width: 18px; height: 18px; stroke: currentColor; fill: none; stroke-width: 2; }

    /* Mensajes */
    #aurea-chat-mensajes {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      background: #f8f6f0;
      min-height: 280px;
    }

    #aurea-chat-mensajes::-webkit-scrollbar { width: 4px; }
    #aurea-chat-mensajes::-webkit-scrollbar-thumb { background: #9BAB8F; border-radius: 10px; }

    /* Burbuja de mensaje */
    .aurea-msg {
      max-width: 85%;
      font-size: 0.84rem;
      line-height: 1.55;
      animation: aurea-fade-in 0.2s ease;
    }

    @keyframes aurea-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .aurea-msg-bot {
      align-self: flex-start;
    }

    .aurea-msg-user {
      align-self: flex-end;
    }

    .aurea-msg-burbuja {
      padding: 0.65rem 0.9rem;
      border-radius: 14px;
      word-break: break-word;
    }

    .aurea-msg-bot .aurea-msg-burbuja {
      background: white;
      color: #2a2a2a;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    }

    .aurea-msg-user .aurea-msg-burbuja {
      background: #445925;
      color: white;
      border-bottom-right-radius: 4px;
    }

    .aurea-msg-hora {
      font-size: 0.65rem;
      color: #aaa;
      margin-top: 0.2rem;
      padding: 0 0.3rem;
    }

    .aurea-msg-bot .aurea-msg-hora { text-align: left; }
    .aurea-msg-user .aurea-msg-hora { text-align: right; }

    /* Typing indicator */
    .aurea-typing {
      align-self: flex-start;
      background: white;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      padding: 0.7rem 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .aurea-typing span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #9BAB8F;
      animation: aurea-typing 1.2s infinite;
    }

    .aurea-typing span:nth-child(2) { animation-delay: 0.2s; }
    .aurea-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes aurea-typing {
      0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
      40%            { transform: scale(1);   opacity: 1; }
    }

    /* Botón WhatsApp dentro del chat */
    .aurea-btn-wa {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: #25D366;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 0.55rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      text-decoration: none;
      margin-top: 0.5rem;
      transition: background 0.2s;
    }

    .aurea-btn-wa:hover { background: #1ebe5d; }
    .aurea-btn-wa svg { width: 14px; height: 14px; fill: white; }

    /* Chips de respuesta rápida */
    .aurea-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.5rem;
    }

    .aurea-chip {
      background: #DEE8D2;
      color: #445925;
      border: none;
      border-radius: 20px;
      padding: 0.35rem 0.8rem;
      font-size: 0.76rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
      font-family: inherit;
    }

    .aurea-chip:hover { background: #c8dab8; }

    /* Input */
    #aurea-chat-input-area {
      padding: 0.75rem 1rem;
      background: white;
      border-top: 1px solid #eee8d8;
      display: flex;
      gap: 0.6rem;
      align-items: flex-end;
      flex-shrink: 0;
    }

    #aurea-chat-input {
      flex: 1;
      border: 1.5px solid #ddd8c8;
      border-radius: 20px;
      padding: 0.6rem 1rem;
      font-family: inherit;
      font-size: 0.86rem;
      color: #2a2a2a;
      background: #f8f6f0;
      outline: none;
      resize: none;
      max-height: 80px;
      overflow-y: auto;
      transition: border-color 0.2s;
      line-height: 1.4;
    }

    #aurea-chat-input:focus { border-color: #445925; background: white; }
    #aurea-chat-input::placeholder { color: #aaa; }

    #aurea-chat-enviar {
      width: 36px;
      height: 36px;
      background: #445925;
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      flex-shrink: 0;
    }

    #aurea-chat-enviar:hover { background: #354a1c; transform: scale(1.05); }
    #aurea-chat-enviar:disabled { background: #ccc; cursor: not-allowed; transform: none; }
    #aurea-chat-enviar svg { width: 16px; height: 16px; stroke: white; fill: none; stroke-width: 2; }

    /* Mobile */
    @media (max-width: 600px) {
      #aurea-chat-window {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        width: 100%;
        height: 100dvh;
        max-height: 100%;
        border-radius: 0;
        display: flex;
        flex-direction: column;
      }

      /* Mensajes ocupan todo el espacio disponible */
      #aurea-chat-mensajes {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }

      /* Input area pegada al fondo, respeta teclado virtual */
      #aurea-chat-input-area {
        padding: 0.85rem 1rem;
        padding-bottom: max(0.85rem, env(safe-area-inset-bottom));
        border-top: 1px solid #eee8d8;
        background: white;
        flex-shrink: 0;
      }

      /* Evitar zoom automático en iOS (necesita 16px mínimo) */
      #aurea-chat-input {
        font-size: 16px;
      }

      /* Botón enviar más grande y fácil de tocar */
      #aurea-chat-enviar {
        width: 44px;
        height: 44px;
        flex-shrink: 0;
      }

      /* Botón de chat (burbuja) en mobile */
      #aurea-chat-btn {
        bottom: 1.4rem;
        right: 1.4rem;
        width: 52px;
        height: 52px;
      }
    }
  `;
  document.head.appendChild(estilos);

  // =====================================================
  // INYECTAR HTML DEL CHAT
  // =====================================================
  const html = `
    <!-- Burbuja -->
    <button id="aurea-chat-btn" onclick="aureaToggleChat()" title="Chateá con nosotros">
      <div id="aurea-chat-badge">1</div>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    </button>

    <!-- Ventana -->
    <div id="aurea-chat-window">

      <!-- Header -->
      <div id="aurea-chat-header">
        <div class="aurea-avatar">
          <svg viewBox="0 0 100 100" fill="none">
            <path d="M 15 78 L 15 42 A 38 38 0 0 1 53 4 L 85 4 L 85 78 Z" stroke="white" stroke-width="5" fill="none" stroke-linejoin="round"/>
            <rect x="53" y="42" width="32" height="36" stroke="white" stroke-width="4.5" fill="none"/>
            <rect x="53" y="61" width="17" height="17" stroke="white" stroke-width="4" fill="none"/>
            <path d="M 53 78 A 36 36 0 0 0 15 42" stroke="white" stroke-width="4.5" fill="none"/>
            <path d="M 53 61 A 19 19 0 0 0 85 42" stroke="rgba(255,255,255,0.7)" stroke-width="4" fill="none"/>
          </svg>
        </div>
        <div class="aurea-header-info">
          <div class="aurea-header-nombre">Áurea — Asistente</div>
          <div class="aurea-header-estado">
            <div class="aurea-dot-verde"></div>
            En línea ahora
          </div>
        </div>
        <button id="aurea-chat-cerrar" onclick="aureaToggleChat()">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <!-- Mensajes -->
      <div id="aurea-chat-mensajes"></div>

      <!-- Input -->
      <div id="aurea-chat-input-area">
        <textarea id="aurea-chat-input"
          placeholder="Escribí tu consulta..."
          rows="1"
          onkeydown="aureaKeyDown(event)"
          oninput="aureaAutoResize(this)"></textarea>
        <button id="aurea-chat-enviar" onclick="aureaEnviar()" title="Enviar mensaje">
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  `;

  const container = document.createElement("div");
  container.innerHTML = html;
  document.body.appendChild(container);

  // =====================================================
  // LÓGICA DEL CHAT
  // =====================================================
  let chatAbierto = false;
  let esperando = false;

  // Mensaje de bienvenida al abrir por primera vez
  let primerApertura = true;

  // Buscar el botón WA flotante de la página (puede cargarse después)
  function getWABtn() {
    return document.querySelector(".wa-flotante");
  }

  window.aureaToggleChat = function () {
    chatAbierto = !chatAbierto;
    const ventana = document.getElementById("aurea-chat-window");
    const esMobile = window.innerWidth <= 600;

    ventana.classList.toggle("abierto", chatAbierto);

    // Ocultar/mostrar el botón WA flotante de la página directamente con JS
    const waBtn = getWABtn();
    if (waBtn) {
      waBtn.style.display = chatAbierto ? "none" : "";
    }

    // También ocultar el propio botón del chat en mobile cuando está abierto
    const chatBtn = document.getElementById("aurea-chat-btn");
    if (esMobile && chatBtn) {
      chatBtn.style.display = chatAbierto ? "none" : "";
    }

    if (chatAbierto) {
      // Ocultar badge
      document.getElementById("aurea-chat-badge").style.display = "none";

      if (primerApertura) {
        primerApertura = false;
        setTimeout(() => {
          agregarMensajeBot(
            "¡Hola! 👋 Soy el asistente de <strong>Áurea Laboratorio Bioquímico</strong>. Podés preguntarme sobre horarios, preparación de estudios, extracción a domicilio y más.",
            true,
          );
        }, 300);
      }

      // En mobile NO hacemos focus automático
      if (!esMobile) {
        setTimeout(
          () => document.getElementById("aurea-chat-input").focus(),
          350,
        );
      }
    } else {
      // Al cerrar: bajar teclado y restaurar botón del chat
      document.getElementById("aurea-chat-input").blur();
      if (esMobile && chatBtn) {
        chatBtn.style.display = "";
      }
    }
  };

  window.aureaKeyDown = function (e) {
    // En desktop: Enter envía. En mobile: Enter hace salto de línea (comportamiento normal)
    const esMobile = window.innerWidth <= 480;
    if (e.key === "Enter" && !e.shiftKey && !esMobile) {
      e.preventDefault();
      aureaEnviar();
    }
  };

  window.aureaAutoResize = function (el) {
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 80) + "px";
  };

  window.aureaEnviar = async function () {
    const input = document.getElementById("aurea-chat-input");
    const texto = input.value.trim();
    if (!texto || esperando) return;

    input.value = "";
    input.style.height = "auto";
    agregarMensajeUsuario(texto);
    await procesarMensaje(texto);
  };

  window.aureaChip = function (texto) {
    document.getElementById("aurea-chat-input").value = texto;
    aureaEnviar();
  };

  // =====================================================
  // AGREGAR MENSAJES AL DOM
  // =====================================================
  function hora() {
    return new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function agregarMensajeUsuario(texto) {
    const msgs = document.getElementById("aurea-chat-mensajes");
    const div = document.createElement("div");
    div.className = "aurea-msg aurea-msg-user";
    div.innerHTML = `
      <div class="aurea-msg-burbuja">${escHtml(texto)}</div>
      <div class="aurea-msg-hora">${hora()}</div>
    `;
    msgs.appendChild(div);
    scrollAbajo();
  }

  function agregarMensajeBot(texto, chips = false) {
    const msgs = document.getElementById("aurea-chat-mensajes");

    // Procesar [MOSTRAR_WHATSAPP]
    let mostrarWA = false;
    if (texto.includes("[MOSTRAR_WHATSAPP]")) {
      mostrarWA = true;
      texto = texto.replace("[MOSTRAR_WHATSAPP]", "").trim();
    }

    const div = document.createElement("div");
    div.className = "aurea-msg aurea-msg-bot";

    let chipsHTML = "";
    if (chips) {
      chipsHTML = `
        <div class="aurea-chips">
          <button class="aurea-chip" onclick="aureaChip('¿Cuánto ayuno necesito?')">¿Cuánto ayuno?</button>
          <button class="aurea-chip" onclick="aureaChip('¿Cuáles son los horarios?')">Horarios</button>
          <button class="aurea-chip" onclick="aureaChip('¿Hacen extracción a domicilio?')">Domicilio</button>
          <button class="aurea-chip" onclick="aureaChip('¿Qué obras sociales aceptan?')">Obras sociales</button>
        </div>`;
    }

    const waBtn = mostrarWA
      ? `
      <div style="margin-top:0.4rem;">
        <a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" class="aurea-btn-wa">
          <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Hablar por WhatsApp
        </a>
      </div>`
      : "";

    div.innerHTML = `
      <div class="aurea-msg-burbuja">${texto}${waBtn}${chipsHTML}</div>
      <div class="aurea-msg-hora">${hora()}</div>
    `;
    msgs.appendChild(div);
    scrollAbajo();
  }

  function mostrarTyping() {
    const msgs = document.getElementById("aurea-chat-mensajes");
    const div = document.createElement("div");
    div.id = "aurea-typing";
    div.className = "aurea-typing";
    div.innerHTML = "<span></span><span></span><span></span>";
    msgs.appendChild(div);
    scrollAbajo();
  }

  function quitarTyping() {
    const el = document.getElementById("aurea-typing");
    if (el) el.remove();
  }

  function scrollAbajo() {
    const msgs = document.getElementById("aurea-chat-mensajes");
    msgs.scrollTop = msgs.scrollHeight;
  }

  function escHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");
  }

  // =====================================================
  // LLAMADA A LA API DE CLAUDE
  // =====================================================
  async function procesarMensaje(texto) {
    esperando = true;
    document.getElementById("aurea-chat-enviar").disabled = true;
    mostrarTyping();

    // Agregar al historial
    historial.push({ role: "user", content: texto });

    // Verificar si tiene API key configurada
    if (CONFIG.apiKey === "TU_API_KEY_AQUI") {
      quitarTyping();
      esperando = false;
      document.getElementById("aurea-chat-enviar").disabled = false;

      // Respuestas de fallback sin API
      const respuestaFallback = respuestaLocal(texto);
      historial.push({ role: "assistant", content: respuestaFallback });
      agregarMensajeBot(respuestaFallback);
      return;
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": CONFIG.apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: historial,
        }),
      });

      const data = await response.json();
      quitarTyping();

      if (data.content && data.content[0]) {
        const respuesta = data.content[0].text;
        historial.push({ role: "assistant", content: respuesta });
        agregarMensajeBot(respuesta);
      } else {
        throw new Error("Sin respuesta");
      }
    } catch (err) {
      quitarTyping();
      const fallback = respuestaLocal(texto);
      historial.push({ role: "assistant", content: fallback });
      agregarMensajeBot(fallback);
    }

    esperando = false;
    document.getElementById("aurea-chat-enviar").disabled = false;
  }

  // =====================================================
  // RESPUESTAS LOCALES (sin API / fallback)
  // =====================================================
  function respuestaLocal(texto) {
    const t = texto.toLowerCase();

    if (
      t.includes("hola") ||
      t.includes("buenas") ||
      t.includes("buen dia") ||
      t.includes("buenos días")
    ) {
      return `¡Hola! 👋 Bienvenido/a a ${CONFIG.nombre}. ¿En qué puedo ayudarte hoy? [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("horario") ||
      t.includes("cuando") ||
      t.includes("abierto") ||
      t.includes("atienden")
    ) {
      return `📅 Nuestros horarios son:\n${CONFIG.horarios}\n\nNo necesitás turno previo para atención presencial.`;
    }
    if (t.includes("ayuno") || t.includes("ayunar") || t.includes("comer")) {
      return `⏱ Depende del análisis:\n• Hemograma: sin ayuno\n• Glucosa, colesterol, triglicéridos: <strong>8 a 12 horas</strong>\n• Cortisol: extracción entre 7:00 y 9:00 hs\n\nPara saber la preparación exacta de tu estudio, consultá la sección "Estudios" del sitio.`;
    }
    if (t.includes("domicilio") || t.includes("casa") || t.includes("visita")) {
      return `🏠 Sí, hacemos extracción a domicilio. Para solicitarla entrá a la sección <strong>"Extracción a domicilio"</strong> del sitio y completá el formulario. También podés coordinar por WhatsApp. [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("obra social") ||
      t.includes("prepaga") ||
      t.includes("cobertura") ||
      t.includes("osde") ||
      t.includes("ioma") ||
      t.includes("pami")
    ) {
      return `💳 Trabajamos con: ${CONFIG.obrasSociales}\n\nSi no ves la tuya, consultanos por WhatsApp y te confirmamos. [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("resultado") ||
      t.includes("análisis listo") ||
      t.includes("ver resultado")
    ) {
      return `📄 Podés ver tus resultados en la sección <strong>"Resultados online"</strong> del sitio ingresando con tu DNI. Si tenés algún problema, escribinos. [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("turno") ||
      t.includes("sacar turno") ||
      t.includes("reservar")
    ) {
      return `📋 No necesitás turno previo para venir al laboratorio. Para <strong>extracción a domicilio</strong> sí necesitás solicitarlo. Podés hacerlo desde el sitio en la sección "Extracción a domicilio" o por WhatsApp. [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("direccion") ||
      t.includes("dónde") ||
      t.includes("donde") ||
      t.includes("ubicacion") ||
      t.includes("ubicación")
    ) {
      return `📍 Estamos en ${CONFIG.direccion}.\n\nPodés ver el mapa en la sección <strong>Contacto</strong> del sitio.`;
    }
    if (
      t.includes("telefono") ||
      t.includes("teléfono") ||
      t.includes("llamar") ||
      t.includes("numero")
    ) {
      return `📞 Podés llamarnos al ${CONFIG.telefono} o escribirnos por WhatsApp. [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("precio") ||
      t.includes("costo") ||
      t.includes("cuanto sale") ||
      t.includes("cuánto sale") ||
      t.includes("cuanto cuesta")
    ) {
      return `Los precios varían según el análisis y la cobertura. Para consultar podés escribirnos por WhatsApp y te respondemos enseguida. [MOSTRAR_WHATSAPP]`;
    }
    if (
      t.includes("whatsapp") ||
      t.includes("contacto") ||
      t.includes("hablar") ||
      t.includes("comunicar")
    ) {
      return `Podés contactarnos directamente por WhatsApp haciendo clic acá abajo. [MOSTRAR_WHATSAPP]`;
    }
    if (t.includes("gracias") || t.includes("muchas gracias")) {
      return `¡De nada! 😊 Si tenés más consultas, estoy acá. Que tengas un excelente día.`;
    }

    // Respuesta genérica
    return `Entendí tu consulta. Para darte la información más precisa, te recomiendo comunicarte con nosotros directamente por WhatsApp. [MOSTRAR_WHATSAPP]`;
  }
})();
