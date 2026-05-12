/**
 * ÁUREA — Chat Widget con buscador inteligente de estudios
 * Incluir en cualquier página: <script src="chat.js"></script>
 */
(function () {
  /* ============================================================
     CONFIGURACIÓN — editá estos datos
  ============================================================ */
  const CFG = {
    whatsapp: "5491100000000",
    nombre: "Áurea Laboratorio Bioquímico",
    horarios: "Lunes a viernes 7:00–12:00 hs · Sábados 7:00–10:00 hs",
    direccion: "Av. [Tu dirección], Junín, Buenos Aires",
    telefono: "(xxx) xxx-xxxx",
    obrasSociales:
      "IOMA, OSDE, Swiss Medical, Galeno, PAMI, Medifé, OSECAC, OSPEDYC, SANCOR Salud y más.",
  };

  /* ============================================================
     BASE DE EXÁMENES — con preparación completa
  ============================================================ */
  const EXAMENES = [
    {
      nombre: "Ácido úrico",
      sigla: "AURIC",
      cat: "Bioquímica",
      ayuno: "8 horas",
      muestra: "Sangre venosa",
      resultado: "Mismo día",
      prep: "Ayuno de 8 horas. Evitá mariscos, vísceras y alcohol los 3 días previos.",
      nota: "",
    },
    {
      nombre: "Antibiograma",
      sigla: "ANTIBIOG",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Según cultivo",
      resultado: "48–72 horas",
      prep: "Se informa junto con el cultivo. No requiere preparación adicional.",
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
      prep: "Ayuno de 12 horas. Los 3 días previos evitá comidas grasosas y alcohol.",
      nota: "",
    },
    {
      nombre: "Coprocultivo",
      sigla: "COPRO",
      cat: "Microbiología",
      ayuno: "No requerido",
      muestra: "Materia fecal",
      resultado: "48–72 horas",
      prep: "Recolectá una muestra de materia fecal fresca en frasco estéril. No mezclar con orina. Llevá la muestra dentro de las 2 horas.",
      nota: "No usar antibióticos 48 hs antes sin consultarnos.",
    },
    {
      nombre: "Cortisol basal",
      sigla: "CORT",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "Extracción entre las 7:00 y 9:00 hs. No hacer ejercicio intenso el día previo.",
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
      prep: "El médico indicará el día del ciclo (generalmente día 3).",
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
      prep: "El médico indicará el día del ciclo (generalmente día 2 o 3).",
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
      prep: "Se necesitan 3 muestras en días distintos. Frasco estéril, no mezclar con orina ni agua.",
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
      prep: "El médico indicará el día del ciclo (generalmente día 21).",
      nota: "Informá el día del ciclo al momento de la extracción.",
    },
    {
      nombre: "Prolactina",
      sigla: "PRL",
      cat: "Hormonas",
      ayuno: "No requerido",
      muestra: "Sangre venosa",
      resultado: "24–48 horas",
      prep: "Extracción en reposo. Esperá al menos 30 minutos de reposo antes. Evitá el estrés y actividad física el día del estudio.",
      nota: "Informá si tomás medicamentos que puedan alterarla.",
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
      prep: "Extracción entre las 7:00 y 9:00 hs (pico hormonal).",
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
      prep: "Primera orina de la mañana. Higiene genital con agua y jabón. Descartar el primer chorro. Recolectar el chorro del medio en frasco estéril.",
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

  /* ============================================================
     NORMALIZAR TEXTO (quita tildes, minúsculas)
  ============================================================ */
  function norm(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* ============================================================
     BUSCAR EXAMEN por texto libre
  ============================================================ */
  function buscarExamen(texto) {
    const t = norm(texto);
    let mejor = null;
    let maxScore = 0;

    for (const ex of EXAMENES) {
      let score = 0;
      const nombre = norm(ex.nombre);
      const sigla = norm(ex.sigla);
      const cat = norm(ex.cat);

      if (t.includes(nombre)) score += 10;
      if (t.includes(sigla)) score += 8;
      if (nombre.includes(t) && t.length > 3) score += 6;

      // palabras individuales
      const palabras = t.split(/\s+/).filter((p) => p.length > 3);
      for (const p of palabras) {
        if (nombre.includes(p)) score += 3;
        if (sigla.includes(p)) score += 2;
        if (cat.includes(p)) score += 1;
      }

      if (score > maxScore) {
        maxScore = score;
        mejor = ex;
      }
    }

    return maxScore >= 2 ? mejor : null;
  }

  /* ============================================================
     LÓGICA DE RESPUESTA
  ============================================================ */
  function responder(texto) {
    const t = norm(texto);

    // Saludos
    if (
      /^(hola|buenas|buen\s?d[ií]a|buenas\s?(tardes|noches)|ola|hi)/.test(t)
    ) {
      return {
        tipo: "texto",
        texto: `¡Hola! 👋 Soy el asistente de <strong>${CFG.nombre}</strong>. Podés preguntarme sobre preparación de estudios, horarios, domicilio y más.`,
        chips: true,
      };
    }

    // Horarios
    if (/horario|cuando|abierto|atienden|abren/.test(t)) {
      return {
        tipo: "texto",
        texto: `🕒 <strong>Horarios de atención:</strong><br>${CFG.horarios}<br><br>No necesitás turno previo para venir al laboratorio.`,
      };
    }

    // Ayuno genérico
    if (/ayuno|puedo comer|puedo tomar|debo ayunar|cuanto ayuno/.test(t)) {
      return {
        tipo: "texto",
        texto: `⏱ El ayuno depende del estudio:<br><br>• <strong>Sin ayuno:</strong> Hemograma, TSH, HIV, etc.<br>• <strong>4–6 horas:</strong> Función hepática, creatinina<br>• <strong>8–12 horas:</strong> Glucosa, colesterol, triglicéridos<br><br>Escribime el nombre del estudio y te digo exactamente 👇`,
      };
    }

    // Domicilio
    if (/domicilio|casa|visita|extracci[oó]n a dom/.test(t)) {
      return {
        tipo: "texto",
        texto: `🏠 Sí, hacemos extracción a domicilio.<br><br>Podés solicitarla desde la sección <strong>"Extracción a domicilio"</strong> del sitio o contactarnos por WhatsApp.`,
        wa: true,
      };
    }

    // Resultados
    if (/resultado|análisis listo|ver resultado|mis an[aá]lisis/.test(t)) {
      return {
        tipo: "texto",
        texto: `📄 Podés ver tus resultados en <strong>Resultados online</strong> con tu DNI.<br><br>Si tenés algún problema para acceder, escribinos.`,
        wa: true,
      };
    }

    // Obras sociales
    if (/obra social|prepaga|cobertura|osde|ioma|pami|galeno/.test(t)) {
      return {
        tipo: "texto",
        texto: `💳 Trabajamos con: ${CFG.obrasSociales}<br><br>Si no ves la tuya, consultanos por WhatsApp.`,
        wa: true,
      };
    }

    // Turno
    if (/turno|reservar|sacar turno/.test(t)) {
      return {
        tipo: "texto",
        texto: `📋 No necesitás turno previo para venir al laboratorio.<br><br>Para <strong>extracción a domicilio</strong> sí se requiere solicitud previa.`,
        wa: true,
      };
    }

    // Dirección
    if (/direcci[oó]n|d[oó]nde|ubicaci[oó]n|como llego/.test(t)) {
      return {
        tipo: "texto",
        texto: `📍 Estamos en <strong>${CFG.direccion}</strong>.<br><br>Podés ver el mapa en la sección <strong>Contacto</strong> del sitio.`,
      };
    }

    // Precio
    if (/precio|costo|cu[aá]nto|vale|sale/.test(t)) {
      return {
        tipo: "texto",
        texto: `Los precios varían según el análisis y tu cobertura. Escribinos por WhatsApp y te respondemos enseguida.`,
        wa: true,
      };
    }

    // WhatsApp explícito
    if (/whatsapp|contacto|hablar|comunicar|llamar/.test(t)) {
      return {
        tipo: "texto",
        texto: `Podés contactarnos directamente por WhatsApp 👇`,
        wa: true,
      };
    }

    // Gracias
    if (/gracias|muchas gracias|ok gracias/.test(t)) {
      return {
        tipo: "texto",
        texto: `¡De nada! 😊 Si tenés más consultas, estoy acá. ¡Que tengas un buen día!`,
      };
    }

    // BUSCADOR DE EXÁMENES
    const examen = buscarExamen(texto);
    if (examen) {
      return { tipo: "examen", examen };
    }

    // Respuesta por defecto
    return {
      tipo: "texto",
      texto: `No encontré información sobre eso 😌<br>Probá escribir el nombre del estudio o consultanos directamente.`,
      wa: true,
    };
  }

  /* ============================================================
     ESTILOS CSS — responsive, sin posicionamiento fijo roto
  ============================================================ */
  const css = `
    /* ── BURBUJA ── */
    #ac-btn {
      position: fixed;
      bottom: 5.5rem;
      right: 1.5rem;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #445925, #6b8c3a);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9998;
      box-shadow: 0 6px 24px rgba(68,89,37,0.4);
      border: none;
      transition: transform 0.2s;
      animation: ac-pulse 3s infinite;
    }
    #ac-btn:hover { transform: scale(1.08); }
    #ac-btn svg { width: 26px; height: 26px; fill: white; }

    @keyframes ac-pulse {
      0%,100% { box-shadow: 0 6px 24px rgba(68,89,37,0.4); }
      50%      { box-shadow: 0 6px 32px rgba(68,89,37,0.65); }
    }

    /* Badge */
    #ac-badge {
      position: absolute;
      top: -3px; right: -3px;
      width: 18px; height: 18px;
      background: #BC6849;
      border-radius: 50%;
      border: 2px solid white;
      font-size: 10px;
      font-weight: 700;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: sans-serif;
    }

    /* ── VENTANA DESKTOP ── */
    #ac-win {
      position: fixed;
      right: 1.5rem;
      bottom: 8rem;
      width: min(380px, calc(100vw - 2rem));
      max-height: min(580px, calc(100vh - 10rem));
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.18);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9997;
      animation: ac-slide-in 0.25s ease;
      font-family: 'DM Sans', sans-serif;
    }

    #ac-win.visible { display: flex; }

    @keyframes ac-slide-in {
      from { opacity: 0; transform: translateY(16px) scale(0.96); }
      to   { opacity: 1; transform: none; }
    }

    /* ── HEADER ── */
    #ac-header {
      background: linear-gradient(135deg, #445925, #6b8c3a);
      padding: 1rem 1.2rem;
      display: flex;
      align-items: center;
      gap: 0.8rem;
      flex-shrink: 0;
    }

    .ac-avatar {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }

    .ac-avatar svg { width: 28px; height: 28px; }

    .ac-header-txt { flex: 1; }
    .ac-header-nombre { font-size: 0.9rem; font-weight: 600; color: white; }
    .ac-header-estado {
      font-size: 0.7rem; color: rgba(255,255,255,0.7);
      display: flex; align-items: center; gap: 0.3rem; margin-top: 0.1rem;
    }
    .ac-dot { width: 6px; height: 6px; border-radius: 50%; background: #7dde9a; }

    #ac-cerrar {
      background: none; border: none; cursor: pointer;
      color: rgba(255,255,255,0.8); padding: 0.2rem;
      transition: color 0.2s;
    }
    #ac-cerrar:hover { color: white; }
    #ac-cerrar svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 2.2; }

    /* ── MENSAJES ── */
    #ac-msgs {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      background: #f6f8f3;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      min-height: 0;
    }

    #ac-msgs::-webkit-scrollbar { width: 4px; }
    #ac-msgs::-webkit-scrollbar-thumb { background: #9BAB8F; border-radius: 10px; }

    .ac-msg { max-width: 88%; animation: ac-fade 0.2s ease; }
    .ac-msg-bot { align-self: flex-start; }
    .ac-msg-user { align-self: flex-end; }

    @keyframes ac-fade {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: none; }
    }

    .ac-burbuja {
      padding: 0.7rem 0.95rem;
      border-radius: 16px;
      font-size: 0.84rem;
      line-height: 1.55;
      word-break: break-word;
    }

    .ac-msg-bot .ac-burbuja {
      background: white;
      color: #2a2a2a;
      border-bottom-left-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    }

    .ac-msg-user .ac-burbuja {
      background: #445925;
      color: white;
      border-bottom-right-radius: 4px;
    }

    .ac-hora { font-size: 0.64rem; color: #bbb; margin-top: 0.2rem; padding: 0 0.3rem; }
    .ac-msg-user .ac-hora { text-align: right; }

    /* Examen card */
    .ac-examen-card {
      background: white;
      border-radius: 14px;
      border: 1px solid #DEE8D2;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
    }

    .ac-examen-head {
      background: #445925;
      padding: 0.7rem 1rem;
      color: white;
    }

    .ac-examen-nombre { font-weight: 600; font-size: 0.9rem; }
    .ac-examen-cat { font-size: 0.68rem; color: rgba(255,255,255,0.65); margin-top: 0.1rem; }

    .ac-examen-body { padding: 0.8rem 1rem; }

    .ac-fila {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
      padding: 0.3rem 0;
      border-bottom: 1px solid #f0ece2;
      font-size: 0.8rem;
    }

    .ac-fila:last-child { border-bottom: none; }
    .ac-fila-lbl { font-weight: 500; color: #445925; flex-shrink: 0; min-width: 80px; }
    .ac-fila-val { color: #555; }

    .ac-nota-card {
      background: #fff8e8;
      border-left: 3px solid #e8a500;
      border-radius: 0 8px 8px 0;
      padding: 0.5rem 0.7rem;
      font-size: 0.77rem;
      color: #7a5500;
      margin: 0.5rem 1rem 0.8rem;
    }

    /* Typing */
    .ac-typing {
      align-self: flex-start;
      background: white;
      border-radius: 14px;
      border-bottom-left-radius: 4px;
      padding: 0.65rem 1rem;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
      display: flex;
      gap: 4px;
      align-items: center;
    }

    .ac-typing span {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #9BAB8F;
      animation: ac-typing 1.2s infinite;
    }

    .ac-typing span:nth-child(2) { animation-delay: 0.2s; }
    .ac-typing span:nth-child(3) { animation-delay: 0.4s; }

    @keyframes ac-typing {
      0%,80%,100% { transform: scale(0.7); opacity: 0.5; }
      40%          { transform: scale(1);   opacity: 1; }
    }

    /* Botón WA dentro del chat */
    .ac-wa-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: #25D366;
      color: white;
      border: none;
      border-radius: 20px;
      padding: 0.5rem 1rem;
      font-size: 0.79rem;
      font-weight: 600;
      text-decoration: none;
      margin-top: 0.5rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .ac-wa-btn:hover { background: #1ebe5d; }
    .ac-wa-btn svg { width: 13px; height: 13px; fill: white; }

    /* Chips */
    .ac-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-top: 0.6rem;
    }

    .ac-chip {
      background: #DEE8D2;
      color: #445925;
      border: none;
      border-radius: 20px;
      padding: 0.3rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s;
      font-family: inherit;
    }

    .ac-chip:hover { background: #c8dab8; }

    /* ── INPUT ── */
    #ac-input-area {
      padding: 0.75rem 1rem;
      background: white;
      border-top: 1px solid #eee8d8;
      display: flex;
      gap: 0.6rem;
      align-items: center;
      flex-shrink: 0;
    }

    #ac-input {
      flex: 1;
      border: 1.5px solid #ddd8c8;
      border-radius: 22px;
      padding: 0.6rem 1rem;
      font-family: inherit;
      font-size: 0.88rem;
      color: #2a2a2a;
      background: #f6f8f3;
      outline: none;
      transition: border-color 0.2s;
    }

    #ac-input:focus { border-color: #445925; background: white; }
    #ac-input::placeholder { color: #aaa; }

    #ac-enviar {
      width: 38px; height: 38px;
      background: #445925;
      border: none;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      flex-shrink: 0;
    }

    #ac-enviar:hover { background: #354a1c; transform: scale(1.05); }
    #ac-enviar svg { width: 15px; height: 15px; stroke: white; fill: none; stroke-width: 2.5; }

    /* ── MOBILE ── */
    @media (max-width: 600px) {
      /* Ventana pantalla completa */
      #ac-win {
        position: fixed;
        inset: 0;
        width: 100%;
        max-height: 100%;
        height: 100dvh;
        border-radius: 0;
        bottom: 0;
        right: 0;
      }

      /* Burbuja más abajo para no chocar con WA */
      #ac-btn {
        bottom: 5rem;
        right: 1.2rem;
        width: 52px;
        height: 52px;
      }

      /* Input más grande para dedos */
      #ac-input {
        font-size: 16px; /* evita zoom en iOS */
        padding: 0.65rem 1rem;
      }

      #ac-enviar {
        width: 42px;
        height: 42px;
      }

      /* Espacio seguro en iPhone con notch */
      #ac-input-area {
        padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
      }
    }
  `;

  const styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ============================================================
     HTML DEL WIDGET
  ============================================================ */
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <button id="ac-btn" title="Chateá con nosotros">
      <div id="ac-badge">1</div>
      <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
    </button>

    <div id="ac-win">
      <div id="ac-header">
        <div class="ac-avatar">
          <svg viewBox="0 0 100 100" fill="none">
            <path d="M15 78L15 42A38 38 0 0153 4L85 4L85 78Z" stroke="white" stroke-width="5" fill="none" stroke-linejoin="round"/>
            <rect x="53" y="42" width="32" height="36" stroke="white" stroke-width="4.5" fill="none"/>
            <rect x="53" y="61" width="17" height="17" stroke="white" stroke-width="4" fill="none"/>
            <path d="M53 78A36 36 0 0015 42" stroke="white" stroke-width="4.5" fill="none"/>
            <path d="M53 61A19 19 0 0085 42" stroke="rgba(255,255,255,0.6)" stroke-width="4" fill="none"/>
          </svg>
        </div>
        <div class="ac-header-txt">
          <div class="ac-header-nombre">Áurea — Asistente</div>
          <div class="ac-header-estado"><div class="ac-dot"></div>En línea ahora</div>
        </div>
        <button id="ac-cerrar" title="Cerrar">
          <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div id="ac-msgs"></div>

      <div id="ac-input-area">
        <input type="text" id="ac-input" placeholder="Escribí tu consulta..."/>
        <button id="ac-enviar" title="Enviar">
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>
  `,
  );

  /* ============================================================
     FUNCIONES DOM
  ============================================================ */
  const btn = document.getElementById("ac-btn");
  const win = document.getElementById("ac-win");
  const msgs = document.getElementById("ac-msgs");
  const input = document.getElementById("ac-input");
  const enviar = document.getElementById("ac-enviar");
  const cerrar = document.getElementById("ac-cerrar");
  const badge = document.getElementById("ac-badge");

  let abierto = false;
  let primerVez = true;
  let esperando = false;

  function hora() {
    return new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getWA() {
    return document.querySelector(".wa-flotante");
  }

  function abrirCerrar() {
    abierto = !abierto;
    win.classList.toggle("visible", abierto);

    // Ocultar/mostrar botón WA de la página
    const wa = getWA();
    if (wa) wa.style.display = abierto ? "none" : "";

    // En mobile: ocultar también el botón del chat cuando está abierto
    const mobile = window.innerWidth <= 600;
    btn.style.display = abierto && mobile ? "none" : "";

    if (abierto) {
      badge.style.display = "none";

      if (primerVez) {
        primerVez = false;
        setTimeout(
          () =>
            mostrarBotConChips(
              `¡Hola! 👋 Soy el asistente de <strong>${CFG.nombre}</strong>.<br>Preguntame sobre preparación de estudios, horarios, domicilio y más.`,
            ),
          350,
        );
      }

      if (!mobile) input.focus();
    } else {
      input.blur();
      if (mobile) btn.style.display = "";
    }
  }

  btn.onclick = abrirCerrar;
  cerrar.onclick = abrirCerrar;

  /* ============================================================
     AGREGAR MENSAJES
  ============================================================ */
  function addMsg(html, tipo) {
    const div = document.createElement("div");
    div.className = `ac-msg ac-msg-${tipo}`;
    div.innerHTML = `
      <div class="ac-burbuja">${html}</div>
      <div class="ac-hora">${hora()}</div>
    `;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function addMsgUser(texto) {
    addMsg(esc(texto), "user");
  }

  function mostrarBotConChips(html) {
    const div = document.createElement("div");
    div.className = "ac-msg ac-msg-bot";
    div.innerHTML = `
      <div class="ac-burbuja">
        ${html}
        <div class="ac-chips">
          <button class="ac-chip" onclick="acChip('¿Cuánto ayuno necesito?')">¿Cuánto ayuno?</button>
          <button class="ac-chip" onclick="acChip('¿Cuáles son los horarios?')">Horarios</button>
          <button class="ac-chip" onclick="acChip('¿Hacen extracción a domicilio?')">Domicilio</button>
          <button class="ac-chip" onclick="acChip('¿Qué obras sociales aceptan?')">Obras sociales</button>
          <button class="ac-chip" onclick="acChip('Hemograma')">Hemograma</button>
          <button class="ac-chip" onclick="acChip('Glucosa')">Glucosa</button>
        </div>
      </div>
      <div class="ac-hora">${hora()}</div>
    `;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function mostrarTyping() {
    const el = document.createElement("div");
    el.id = "ac-typing";
    el.className = "ac-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function quitarTyping() {
    const el = document.getElementById("ac-typing");
    if (el) el.remove();
  }

  function waBtn(txtMsg) {
    const msg = encodeURIComponent(
      txtMsg || "Hola, quiero hacer una consulta.",
    );
    return `<br><a href="https://wa.me/${CFG.whatsapp}?text=${msg}" target="_blank" class="ac-wa-btn">
      <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Hablar por WhatsApp
    </a>`;
  }

  function renderRespuesta(resp) {
    if (resp.tipo === "examen") {
      const ex = resp.examen;
      const div = document.createElement("div");
      div.className = "ac-msg ac-msg-bot";

      let notaHtml = ex.nota
        ? `<div class="ac-nota-card">⚠ ${ex.nota}</div>`
        : "";

      div.innerHTML = `
        <div class="ac-examen-card">
          <div class="ac-examen-head">
            <div class="ac-examen-nombre">${ex.nombre}</div>
            <div class="ac-examen-cat">${ex.cat} · ${ex.sigla}</div>
          </div>
          <div class="ac-examen-body">
            <div class="ac-fila"><span class="ac-fila-lbl">⏱ Ayuno</span><span class="ac-fila-val">${ex.ayuno}</span></div>
            <div class="ac-fila"><span class="ac-fila-lbl">🧪 Muestra</span><span class="ac-fila-val">${ex.muestra}</span></div>
            <div class="ac-fila"><span class="ac-fila-lbl">📅 Resultado</span><span class="ac-fila-val">${ex.resultado}</span></div>
            <div class="ac-fila"><span class="ac-fila-lbl">📋 Preparación</span><span class="ac-fila-val">${ex.prep}</span></div>
          </div>
          ${notaHtml}
        </div>
        <div class="ac-hora">${hora()}</div>
      `;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
      return;
    }

    // Texto normal
    let html = resp.texto;
    if (resp.wa)
      html += waBtn(`Hola ${CFG.nombre}, quiero hacer una consulta.`);

    const div = document.createElement("div");
    div.className = "ac-msg ac-msg-bot";
    div.innerHTML = `<div class="ac-burbuja">${html}</div><div class="ac-hora">${hora()}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;

    if (resp.chips) {
      // Ya incluidos en mostrarBotConChips — no duplicar
    }
  }

  /* ============================================================
     PROCESAR ENVÍO
  ============================================================ */
  function procesar() {
    const txt = input.value.trim();
    if (!txt || esperando) return;

    input.value = "";
    addMsgUser(txt);
    esperando = true;
    mostrarTyping();

    setTimeout(
      () => {
        quitarTyping();
        const resp = responder(txt);
        renderRespuesta(resp);
        esperando = false;
      },
      400 + Math.random() * 300,
    );
  }

  window.acChip = function (txt) {
    input.value = txt;
    procesar();
  };

  enviar.onclick = procesar;

  input.addEventListener("keydown", (e) => {
    // Desktop: Enter envía. Mobile: Enter = nueva línea normal
    if (e.key === "Enter" && window.innerWidth > 600) {
      e.preventDefault();
      procesar();
    }
  });

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
})();
