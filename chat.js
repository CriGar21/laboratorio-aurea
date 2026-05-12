/* =====================================================
   ÁUREA LAB - CHAT IA PRO (VISUAL + INTELIGENTE)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "5491100000000";
  const BRAND = "Áurea Laboratorio Bioquímico";

  /* =========================
      👉 PEGÁ TUS EXÁMENES ACÁ
  ========================= */
  const examenes = [
    {
      nombre: "Ácido úrico",
      sigla: "AURIC",
      cat: "Bioquímica",
      ayuno: "8 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 8 horas. Los 3 días previos evitá mariscos, vísceras y alcohol.",
      nota: "",
    },
    {
      nombre: "Antibiograma",
      sigla: "ANTIBIOG",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Según cultivo",
      resultado: "48–72 horas",
      prep: "Se informa junto con el cultivo correspondiente. No requiere preparación adicional del paciente.",
      nota: "",
    },
    {
      nombre: "Bilirrubina total y fracciones",
      sigla: "BILI",
      cat: "Hepático",
      ayuno: "4 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 4 horas. Evitá exposición solar directa antes de la extracción.",
      nota: "",
    },
    {
      nombre: "Calcio sérico",
      sigla: "CA",
      cat: "Bioquímica",
      ayuno: "4 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno mínimo de 4 horas.",
      nota: "",
    },
    {
      nombre: "Chagas (serología)",
      sigla: "CHAG",
      cat: "Serología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Coagulograma (TP y KPTT)",
      sigla: "COAG",
      cat: "Hematología",
      ayuno: "No requerido",
      muestra: "Sangre venosa (citrato)",
      resultado: "Mismo día",
      prep: "No se requiere preparación especial. Informá si tomás anticoagulantes.",
      nota: "Informá siempre si tomás anticoagulantes (warfarina, acenocumarol, heparina).",
    },
    {
      nombre: "Colesterol total y fracciones",
      sigla: "COL",
      cat: "Bioquímica",
      ayuno: "12 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 12 horas. Los 3 días previos evitá comidas grasosas y el consumo de alcohol.",
      nota: "",
    },
    {
      nombre: "Coprocultivo",
      sigla: "COPRO",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Materia fecal",
      resultado: "48–72 horas",
      prep: "Recolectá una muestra de materia fecal fresca en un frasco estéril. No mezclar con orina. Llevá la muestra dentro de las 2 horas de recolección.",
      nota: "No usar antibióticos 48 hs antes sin consultarnos.",
    },
    {
      nombre: "Cortisol basal",
      sigla: "CORT",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "La extracción debe realizarse entre las 7:00 y 9:00 de la mañana. No hacer ejercicio intenso el día previo.",
      nota: "El cortisol tiene variación diurna — el horario de extracción es clave.",
    },
    {
      nombre: "Creatinina y urea",
      sigla: "CREA",
      cat: "Bioquímica",
      ayuno: "4 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno mínimo de 4 horas. Hidratación normal.",
      nota: "",
    },
    {
      nombre: "Eritrosedimentación (VSG)",
      sigla: "VSG",
      cat: "Hematología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Estradiol",
      sigla: "E2",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "El médico indicará el día del ciclo en que debe realizarse la extracción (generalmente día 3 del ciclo).",
      nota: "Informá el día del ciclo menstrual al momento de la extracción.",
    },
    {
      nombre: "Ferritina",
      sigla: "FERR",
      cat: "Hematología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24 horas",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Fibrinógeno",
      sigla: "FIB",
      cat: "Hematología",
      ayuno: "No requerido",
      muestra: "Sangre venosa (citrato)",
      resultado: "Mismo día",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Fosfatasa alcalina (FAL)",
      sigla: "FAL",
      cat: "Hepático",
      ayuno: "4–6 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 4 a 6 horas.",
      nota: "",
    },
    {
      nombre: "FSH y LH",
      sigla: "FSH/LH",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "El médico indicará el día del ciclo. Generalmente día 2 o 3 del ciclo menstrual.",
      nota: "Informá el día del ciclo al momento de la extracción.",
    },
    {
      nombre: "Glucosa en ayunas",
      sigla: "GLUC",
      cat: "Bioquímica",
      ayuno: "8–12 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 8 a 12 horas. Podés tomar agua. Evitá el ejercicio intenso las 24 horas previas.",
      nota: "Si sos diabético o tomás insulina, consultanos antes del estudio.",
    },
    {
      nombre: "Hepatitis B (HBsAg)",
      sigla: "HBsAg",
      cat: "Serología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24 horas",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Hepatitis C (Anti-HCV)",
      sigla: "HCV",
      cat: "Serología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24 horas",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Hemoglobina glicosilada (HbA1c)",
      sigla: "HBA1C",
      cat: "Diabetes",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "No se requiere ayuno ni preparación especial.",
      nota: "",
    },
    {
      nombre: "Hemograma completo",
      sigla: "HMG",
      cat: "Hematología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "No se requiere preparación especial. No es necesario el ayuno.",
      nota: "",
    },
    {
      nombre: "Hierro sérico y transferrina",
      sigla: "HIERRO",
      cat: "Hematología",
      ayuno: "8 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 8 horas. No tomes suplementos de hierro las 24 horas previas.",
      nota: "",
    },
    {
      nombre: "HIV (Anticuerpos)",
      sigla: "HIV",
      cat: "Serología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24 horas",
      prep: "No se requiere preparación especial.",
      nota: "Resultado completamente confidencial.",
    },
    {
      nombre: "HOMA (resistencia a la insulina)",
      sigla: "HOMA",
      cat: "Diabetes",
      ayuno: "8–12 horas",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "Ayuno de 8 a 12 horas. Se calcula con glucosa e insulina en ayunas.",
      nota: "",
    },
    {
      nombre: "Insulina",
      sigla: "INS",
      cat: "Hormonas",
      ayuno: "8–12 horas",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "Ayuno de 8 a 12 horas. Se solicita generalmente junto con glucosa.",
      nota: "",
    },
    {
      nombre: "Magnesio sérico",
      sigla: "MG",
      cat: "Bioquímica",
      ayuno: "4 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno mínimo de 4 horas.",
      nota: "",
    },
    {
      nombre: "Orina completa (uroanálisis)",
      sigla: "ORIN",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Orina",
      resultado: "Mismo día",
      prep: "Primera orina de la mañana. Higiene genital previa. Recolectá el chorro del medio en frasco limpio.",
      nota: "",
    },
    {
      nombre: "Parasitológico de materia fecal",
      sigla: "PARA",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Materia fecal",
      resultado: "24–48 horas",
      prep: "Se necesitan 3 muestras en días distintos. Recolectá en frasco estéril. No mezclar con orina ni agua del inodoro.",
      nota: "Consultanos si debés suspender algún medicamento.",
    },
    {
      nombre: "Potasio y sodio (ionograma)",
      sigla: "ION",
      cat: "Bioquímica",
      ayuno: "4 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 4 horas. No realizar ejercicio intenso previo.",
      nota: "",
    },
    {
      nombre: "Progesterona",
      sigla: "PROG",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "El médico indicará el día del ciclo para la extracción (generalmente día 21 del ciclo).",
      nota: "Informá el día del ciclo al momento de la extracción.",
    },
    {
      nombre: "Prolactina",
      sigla: "PRL",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "La extracción se realiza en reposo. Debés esperar al menos 30 minutos de reposo antes de la extracción. Evitá el estrés y la actividad física el día del estudio.",
      nota: "Informá si tomás medicamentos que puedan alterarla (anticonceptivos, metoclopramida, etc.).",
    },
    {
      nombre: "Proteína C reactiva (PCR)",
      sigla: "PCR",
      cat: "Inflamación",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Proteínas totales y albúmina",
      sigla: "PROT",
      cat: "Hepático",
      ayuno: "4 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 4 horas.",
      nota: "",
    },
    {
      nombre: "PSA total y libre (próstata)",
      sigla: "PSA",
      cat: "Marcadores",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24 horas",
      prep: "No realizar tacto rectal, relaciones sexuales ni ejercicio intenso 48 horas antes.",
      nota: "Informá si tenés sonda vesical o infección urinaria activa.",
    },
    {
      nombre: "T3 libre y T4 libre",
      sigla: "T3L/T4L",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "Si tomás medicación tiroidea, hacé la extracción antes de la primera dosis del día.",
      nota: "",
    },
    {
      nombre: "Testosterona total y libre",
      sigla: "TEST",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "La extracción debe realizarse entre las 7:00 y 9:00 de la mañana (pico hormonal).",
      nota: "Informá si tomás anabólicos o corticoides.",
    },
    {
      nombre: "Toxoplasmosis (IgG e IgM)",
      sigla: "TOXO",
      cat: "Serología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "No se requiere preparación especial.",
      nota: "Importante en embarazadas e inmunocomprometidos.",
    },
    {
      nombre: "Transaminasas (TGO y TGP)",
      sigla: "TGO/TGP",
      cat: "Hepático",
      ayuno: "4–6 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 4 a 6 horas. Evitá el ejercicio intenso 48 hs antes.",
      nota: "El ejercicio puede elevar las transaminasas falsamente.",
    },
    {
      nombre: "Triglicéridos",
      sigla: "TRIG",
      cat: "Bioquímica",
      ayuno: "12 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno estricto de 12 horas. Evitá el alcohol 48 hs antes.",
      nota: "El alcohol eleva significativamente los triglicéridos.",
    },
    {
      nombre: "TSH (Hormona tiroidea)",
      sigla: "TSH",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "No se requiere ayuno. Si tomás levotiroxina, tomala DESPUÉS de la extracción.",
      nota: "Informá todos los medicamentos que estés tomando.",
    },
    {
      nombre: "Urocultivo con antibiograma",
      sigla: "UROC",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Orina (primer chorro matinal)",
      resultado: "48–72 horas",
      prep: "Primera orina de la mañana. Limpiar genitales con agua y jabón. Descartar el primer chorro. Recolectar el chorro del medio en el frasco estéril que entregamos.",
      nota: "No suspendas antibióticos sin consultarnos, ya que pueden alterar el resultado.",
    },
    {
      nombre: "VDRL (Sífilis)",
      sigla: "VDRL",
      cat: "Serología",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Vitamina B12",
      sigla: "VIT-B12",
      cat: "Vitaminas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
    {
      nombre: "Vitamina D (25-OH)",
      sigla: "VIT-D",
      cat: "Vitaminas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "No se requiere preparación especial.",
      nota: "",
    },
  ];

  /* =========================
      NORMALIZAR TEXTO
  ========================= */
  function normalizar(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* =========================
      GENERAR KEYS INTELIGENTES
  ========================= */
  const EXAMENES = examenes.map((e) => {
    const palabras = normalizar(e.nombre)
      .split(" ")
      .filter((p) => p.length > 3);

    return {
      ...e,
      keys: [normalizar(e.nombre), normalizar(e.sigla), ...palabras],
    };
  });

  /* =========================
      DETECCIÓN DE INTENCIÓN
  ========================= */
  function detectarIntencion(t) {
    if (t.includes("hola") || t.includes("buenas")) return "saludo";
    if (t.includes("analisis") || t.includes("sangre") || t.includes("estudio"))
      return "general";
    if (
      t.includes("ayuno") ||
      t.includes("puedo comer") ||
      t.includes("puedo tomar")
    )
      return "ayuno";
    if (t.includes("resultado")) return "resultados";
    if (t.includes("turno") || t.includes("horario")) return "horario";

    return null;
  }

  /* =========================
      HTML
  ========================= */
  const chatHTML = `
  <div id="aurea-chat-launcher">
    <svg viewBox="0 0 24 24">
      <path d="M4 5h16v10H7l-3 3V5z"/>
    </svg>
  </div>

  <div id="aurea-chat-box">
    <div class="chat-header">
      <div>
        <strong>Asistente Áurea</strong>
        <span>Online ahora</span>
      </div>
      <button id="chat-close">×</button>
    </div>

    <div id="chat-messages"></div>

    <div class="chat-quick">
      <button data-msg="Glucosa">Glucosa</button>
      <button data-msg="Colesterol">Colesterol</button>
      <button data-msg="Hemograma">Hemograma</button>
      <button data-msg="Horarios">Horarios</button>
    </div>

    <div class="chat-input-wrap">
      <input type="text" id="chat-input" placeholder="Escribí tu consulta..." />
      <button id="chat-send">Enviar</button>
    </div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", chatHTML);

  /* =========================
      CSS PREMIUM
  ========================= */
  const style = document.createElement("style");
  style.innerHTML = `
  #aurea-chat-launcher{
    position:fixed;
    bottom:90px;
    right:22px;
    width:64px;
    height:64px;
    border-radius:50%;
    background:linear-gradient(135deg,#445925,#6b8c3a);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    z-index:9999;
    box-shadow:0 12px 30px rgba(0,0,0,.2);
  }

  #aurea-chat-launcher svg{
    width:28px;
    fill:white;
  }

  #aurea-chat-box{
    position:fixed;
    right:22px;
    bottom:165px;
    width:370px;
    max-height:620px;
    background:#fff;
    border-radius:22px;
    overflow:hidden;
    display:none;
    flex-direction:column;
    box-shadow:0 30px 80px rgba(0,0,0,.25);
    animation:fadeIn .3s ease;
  }

  .chat-header{
    background:linear-gradient(135deg,#445925,#6b8c3a);
    color:white;
    padding:18px;
    display:flex;
    justify-content:space-between;
  }

  #chat-messages{
    padding:18px;
    height:380px;
    overflow-y:auto;
    background:#f6f8f3;
    display:flex;
    flex-direction:column;
    gap:10px;
  }

  .msg{
    max-width:80%;
    padding:12px;
    border-radius:16px;
    animation:fadeUp .2s ease;
  }

  .bot{ background:white; }
  .user{ background:#445925;color:white;margin-left:auto; }

  .chat-input-wrap{
    display:flex;
    padding:12px;
    gap:6px;
  }

  #chat-input{
    flex:1;
    padding:10px;
    border-radius:10px;
    border:1px solid #ddd;
  }

  #chat-send{
    background:#445925;
    color:#fff;
    border:none;
    padding:0 16px;
    border-radius:10px;
  }

  .chat-quick{
    padding:10px;
    display:flex;
    gap:6px;
    flex-wrap:wrap;
  }

  .chat-quick button{
    border:none;
    padding:6px 10px;
    border-radius:20px;
    background:#eef2e8;
    cursor:pointer;
  }

  @keyframes fadeUp{
    from{opacity:0; transform:translateY(8px)}
    to{opacity:1}
  }

  @keyframes fadeIn{
    from{opacity:0; transform:translateY(20px)}
    to{opacity:1}
  }
  `;
  document.head.appendChild(style);

  /* =========================
      FUNCIONES
  ========================= */
  const launcher = document.getElementById("aurea-chat-launcher");
  const box = document.getElementById("aurea-chat-box");
  const close = document.getElementById("chat-close");
  const messages = document.getElementById("chat-messages");
  const input = document.getElementById("chat-input");

  function addMsg(text, type = "bot") {
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerHTML = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function botReply(q) {
    const t = normalizar(q);
    const intencion = detectarIntencion(t);

    // 🧠 RESPUESTAS INTELIGENTES
    if (intencion === "saludo") {
      return `Hola 👋 Bienvenido a <strong>${BRAND}</strong>`;
    }

    if (intencion === "general") {
      return `🧪 Podemos ayudarte con análisis como:<br>• Hemograma<br>• Glucosa<br>• Colesterol<br><br>Decime cuál te indicaron 😊`;
    }

    if (intencion === "ayuno") {
      return `💧 En general:<br>✔ Podés tomar agua<br>❌ No comer durante el ayuno<br><br>Decime el estudio y te indico exacto 👇`;
    }

    if (intencion === "resultados") {
      return `📄 Podés ver resultados online o te los enviamos por WhatsApp 😊`;
    }

    if (intencion === "horario") {
      return `🕒 Lunes a Viernes de 7:00 a 12:00 hs`;
    }

    // 🔬 BUSCADOR INTELIGENTE
    for (let ex of EXAMENES) {
      let match = false;

      for (let k of ex.keys) {
        if (t.includes(k)) {
          match = true;
        }
      }

      if (!match) {
        const palabras = t.split(" ");
        for (let p of palabras) {
          if (ex.keys.includes(p)) {
            match = true;
          }
        }
      }

      if (match) {
        return `
        🔬 <strong>${ex.nombre}</strong><br><br>
        • Categoría: ${ex.cat}<br>
        • Ayuno: ${ex.ayuno}<br>
        • Muestra: ${ex.muestra}<br>
        • Resultado: ${ex.resultado}<br><br>
        🧪 ${ex.prep}<br><br>
        ${ex.nota || ""}
        `;
      }
    }

    return `No encontré ese estudio 😌<br>Probá escribir otro o consultanos por WhatsApp`;
  }

  function process() {
    const txt = input.value.trim();
    if (!txt) return;

    addMsg(txt, "user");
    input.value = "";

    setTimeout(() => {
      addMsg(botReply(txt), "bot");
    }, 300);
  }

  /* =========================
      EVENTOS
  ========================= */
  launcher.onclick = () => {
    box.style.display = "flex";
    launcher.style.display = "none";

    if (messages.innerHTML === "") {
      addMsg(`Hola 👋 Soy el asistente de <strong>${BRAND}</strong>`);
    }
  };

  close.onclick = () => {
    box.style.display = "none";
    launcher.style.display = "flex";
  };

  document.getElementById("chat-send").onclick = process;

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") process();
  });

  document.querySelectorAll(".chat-quick button").forEach((btn) => {
    btn.onclick = () => {
      input.value = btn.dataset.msg;
      process();
    };
  });
});
