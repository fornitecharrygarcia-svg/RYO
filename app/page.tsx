"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Bot,
  Globe,
  FileImage,
  Fuel,
  Gauge,
  LocateFixed,
  Camera,
  Menu,
  MapPin,
  MessageCircle,
  Settings2,
  Upload,
  UserRound,
  X,
  Music2,
} from "lucide-react";

type Machine = {
  id: string;
  name: string;
  image: string;
  views: string[];
  price: number;
  location: string;
  description: string;
  function: string;
  specs: string[];
  included: string[];
};
const machines: Machine[] = [
  {
    id: "excavadora",
    name: "Excavadora 320",
    image: "/excavadora.png",
    views: ["/excavadora.png", "/retroexcavadora.png", "/excavadora.png"],
    price: 185000,
    location: "Bogotá, Colombia",
    description: "Potencia y precisión para excavación y movimiento de tierra.",
    function:
      "Abre zanjas, remueve tierra, demuele estructuras y prepara terrenos.",
    specs: ["20 toneladas", "Diésel", "Automática"],
    included: [
      "Operador certificado",
      "Casco y chaleco",
      "Inspección de seguridad",
      "Soporte RYO",
    ],
  },
  {
    id: "cargador",
    name: "Cargador frontal 950",
    image: "/cargador.png",
    views: ["/cargador.png", "/excavadora.png", "/cargador.png"],
    price: 155000,
    location: "Bogotá, Colombia",
    description: "Ideal para cargar, nivelar y transportar materiales.",
    function:
      "Mueve arena, grava, tierra y escombros en proyectos de construcción.",
    specs: ["18 toneladas", "Diésel", "Automática"],
    included: [
      "Entrega en obra",
      "Inspección de seguridad",
      "Soporte RYO",
      "Limpieza final",
    ],
  },
  {
    id: "retro",
    name: "Retroexcavadora 4x4",
    image: "/retroexcavadora.png",
    views: ["/retroexcavadora.png", "/excavadora.png", "/retroexcavadora.png"],
    price: 120000,
    location: "Medellín, Colombia",
    description: "Una máquina versátil para zanjas y trabajos urbanos.",
    function: "Perfecta para excavaciones pequeñas, reparaciones y paisajismo.",
    specs: ["8 toneladas", "Diésel", "Manual"],
    included: [
      "Operador certificado",
      "Kit de herramientas",
      "Seguro básico",
      "Mantenimiento",
    ],
  },
];
const money = (n: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);
const icon = (s: string) =>
  s.includes("Diésel") ? (
    <Fuel size={14} />
  ) : s.includes("tonelada") ? (
    <Gauge size={14} />
  ) : (
    <Settings2 size={14} />
  );

export default function Page() {
  const [selected, setSelected] = useState<Machine | null>(null),
    [query, setQuery] = useState(""),
    [start, setStart] = useState("2026-09-01"),
    [end, setEnd] = useState("2026-09-02"),
    [pickup, setPickup] = useState("08:00"),
    [returnTime, setReturnTime] = useState("18:00"),
    [delivery, setDelivery] = useState(false),
    [driver, setDriver] = useState(true),
    [fullscreen, setFullscreen] = useState(false),
    [operatorAddress, setOperatorAddress] = useState(""),
    [siteAddress, setSiteAddress] = useState(""),
    [step, setStep] = useState(1),
    [confirmed, setConfirmed] = useState(false),
    [language, setLanguage] = useState<"es" | "en">("es"),
    [publishOpen, setPublishOpen] = useState(false),
    [publishStep, setPublishStep] = useState(1),
    [published, setPublished] = useState(false),
    [hasDriver, setHasDriver] = useState(false),
    [address, setAddress] = useState(""),
    [country, setCountry] = useState(""),
    [city, setCity] = useState(""),
    [state, setState] = useState(""),
    [postal, setPostal] = useState(""),
    [position, setPosition] = useState(""),
    [machinePhotos, setMachinePhotos] = useState<FileList | null>(null),
    [menuOpen, setMenuOpen] = useState(false),
    [aiOpen, setAiOpen] = useState(false),
    [aiQuestion, setAiQuestion] = useState(""),
    [aiSubmitted, setAiSubmitted] = useState("");
  const t =
    language === "es"
      ? {
          publish: "Ofrece tu maquinaria",
          next: "Siguiente",
          back: "Volver",
          location: "Ubicación",
          country: "País",
          address: "Dirección",
          city: "Ciudad",
          state: "Estado / Departamento",
          postal: "Código postal",
          photos: "Fotos de la maquinaria",
          driver: "Ofrezco servicio de chofer",
          id: "Foto de la cédula",
          license: "Foto de la licencia",
          age: "Edad",
          sent: "Publicación enviada",
          sentText:
            "Revisaremos tus datos y fotos antes de activar el anuncio.",
          heroKicker: "ALQUILER DE MAQUINARIA",
          heroTitle: "La máquina que tu obra necesita.",
          heroText: "Elige tu equipo, revisa sus detalles, selecciona las fechas y conoce el precio total antes de reservar.",
          view: "Ver maquinaria",
          search: "¿Qué necesitas para tu obra?",
          searchButton: "Buscar",
          catalog: "CATÁLOGO RYO",
          available: "Maquinaria disponible",
          catalogText: "Fotos, especificaciones y precio por hora.",
          availableBadge: "Disponible",
          rent: "Ver y alquilar",
          perHour: " / hora",
          mapTitle: "Maquinaria cerca de tu obra.",
          mapText: "Publica tu equipo y permite que nuevos clientes lo encuentren.",
          close: "Cerrar",
          previous: "Vista anterior",
          following: "Siguiente vista",
          exitFullscreen: "Salir de pantalla completa",
          fullscreen: "Ver pantalla completa",
          previousStep: "Volver a la configuración",
          configure: "Configura tu alquiler",
          payment: "Datos y pago simulado",
          received: "SOLICITUD RECIBIDA",
          ready: "Reserva lista para revisión.",
          request: "Tu solicitud para",
          simulation: "fue recibida. Este es un pago simulado, no se realizó ningún cobro.",
          estimated: "Total estimado",
          backCatalog: "Volver al catálogo",
          purpose: "¿Para qué sirve?",
          included: "Incluido en el precio",
          from: "Desde",
          until: "Hasta",
          deliveryTime: "Hora de entrega",
          returnTime: "Hora de entrada",
          needDriver: "Necesito conductor / operador",
          driverAddress: "Dirección para el operador",
          workAddress: "Dirección exacta de la obra",
          needTransport: "Necesito transporte a la obra",
          transportAddress: "Dirección para llevar la maquinaria",
          continue: "Continuar",
          demoPayment: "Pago simulado para mostrar el flujo de reserva. No se cobrará dinero.",
          fullName: "Nombre completo",
          yourName: "Tu nombre",
          email: "Correo electrónico",
          card: "Número de tarjeta",
          expiry: "Vencimiento / CVV",
          totalBooking: "Total de la reserva",
          confirmPayment: "Confirmar pago simulado",
          companyTitle: "RYO mueve tus proyectos.",
          companyText: "RYO se dedica al alquiler de maquinaria pesada para construcción, movimiento de tierra y proyectos industriales en Colombia.",
          advisor: "Hablar con un asesor",
          follow: "Síguenos en redes",
          ai: "RYO IA",
          ask: "Escribe tu pregunta...",
          askButton: "Preguntar",
          aiWelcome: "Hola. Puedo ayudarte a conocer la maquinaria disponible y explicarte cómo alquilarla paso a paso.",
          menu: "Abrir menú",
        }
      : {
          publish: "List your equipment",
          next: "Next",
          back: "Back",
          location: "Location",
          country: "Country",
          address: "Address",
          city: "City",
          state: "State / Province",
          postal: "Postal code",
          photos: "Machinery photos",
          driver: "I offer a driver service",
          id: "ID photo",
          license: "License photo",
          age: "Age",
          sent: "Listing submitted",
          sentText:
            "We will review your details and photos before activating the listing.",
          heroKicker: "MACHINERY RENTAL",
          heroTitle: "The machine your project needs.",
          heroText: "Choose your equipment, review the details, select dates and see the total price before booking.",
          view: "View equipment",
          search: "What does your project need?",
          searchButton: "Search",
          catalog: "RYO CATALOG",
          available: "Available equipment",
          catalogText: "Photos, specifications and hourly pricing.",
          availableBadge: "Available",
          rent: "View and rent",
          perHour: " / hour",
          mapTitle: "Equipment near your project.",
          mapText: "List your equipment and let new customers find it.",
          close: "Close",
          previous: "Previous view",
          following: "Next view",
          exitFullscreen: "Exit fullscreen",
          fullscreen: "View fullscreen",
          previousStep: "Back to setup",
          configure: "Configure your rental",
          payment: "Details and simulated payment",
          received: "REQUEST RECEIVED",
          ready: "Booking ready for review.",
          request: "Your request for",
          simulation: "was received. This is a simulated payment; no charge was made.",
          estimated: "Estimated total",
          backCatalog: "Back to catalog",
          purpose: "What is it used for?",
          included: "Included in the price",
          from: "From",
          until: "Until",
          deliveryTime: "Delivery time",
          returnTime: "Return time",
          needDriver: "I need a driver / operator",
          driverAddress: "Operator address",
          workAddress: "Exact project address",
          needTransport: "I need transport to the project",
          transportAddress: "Equipment delivery address",
          continue: "Continue",
          demoPayment: "Simulated payment to demonstrate the booking flow. No money will be charged.",
          fullName: "Full name",
          yourName: "Your name",
          email: "Email address",
          card: "Card number",
          expiry: "Expiry / CVV",
          totalBooking: "Booking total",
          confirmPayment: "Confirm simulated payment",
          companyTitle: "RYO moves your projects.",
          companyText: "RYO specializes in heavy machinery rental for construction, earthmoving and industrial projects in Colombia.",
          advisor: "Talk to an advisor",
          follow: "Follow us",
          ai: "RYO AI",
          ask: "Type your question...",
          askButton: "Ask",
          aiWelcome: "Hello. I can help you learn about available equipment and explain how to rent it step by step.",
          menu: "Open menu",
        };
  const machineDescription = (machine: Machine) => language === "es" ? machine.description : ({ excavadora: "Power and precision for excavation and earthmoving.", cargador: "Ideal for loading, leveling and transporting materials.", retro: "A versatile machine for trenches and urban work." }[machine.id] || machine.description);
  const machineSpecs = (machine: Machine) => language === "es" ? machine.specs : machine.specs.map((spec) => spec.replace("toneladas", "tons").replace("Diésel", "Diesel").replace("Automática", "Automatic").replace("Manual", "Manual"));
  const getLocation = () =>
    navigator.geolocation?.getCurrentPosition(({ coords }) =>
      setPosition(
        `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`,
      ),
    );
  const openGoogleMaps = () =>
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([address, city, state, country].filter(Boolean).join(", "))}`,
      "_blank",
      "noopener,noreferrer",
    );
  const aiAnswer = aiSubmitted.toLowerCase().includes("cuant") || aiSubmitted.toLowerCase().includes("how many")
    ? language === "es" ? "Ahora hay 3 máquinas disponibles: una excavadora, un cargador frontal y una retroexcavadora." : "There are 3 machines available: an excavator, a front loader and a backhoe."
    : /^(hola|buenas|buenos días|buenas tardes|hello|hi|hey)\b/i.test(aiSubmitted.trim())
      ? language === "es" ? "¡Hola! ¿Qué necesitas? Puedo ayudarte a alquilar, comprar o publicar maquinaria." : "Hello! What do you need? I can help you rent, buy or list machinery."
    : aiSubmitted.toLowerCase().includes("compr") || aiSubmitted.toLowerCase().includes("buy")
      ? language === "es" ? "Para comprar maquinaria, habla con un asesor de RYO para revisar disponibilidad, precios y condiciones." : "To buy machinery, talk to a RYO advisor to review availability, prices and terms."
    : language === "es" ? "Para alquilar: 1) elige una máquina, 2) selecciona fechas y horarios, 3) indica entrega u operador, 4) completa tus datos y confirma la solicitud." : "To rent: 1) choose a machine, 2) select dates and times, 3) choose delivery or an operator, 4) enter your details and confirm the request.";
  const askAi = () => setAiSubmitted(aiQuestion.trim() || (language === "es" ? "¿Cómo alquilo?" : "How do I rent?"));
  useEffect(() => {
    if (!fullscreen) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [fullscreen]);
  const aiOptions = language === "es" ? ["Alquilar maquinaria", "Comprar maquinaria", "Publicar mi maquinaria", "Ver maquinaria disponible", "Hablar con un asesor"] : ["Rent machinery", "Buy machinery", "List my machinery", "View available equipment", "Talk to an advisor"];
  const chooseAiOption = (option: string) => {
    setAiQuestion(option);
    setAiSubmitted(option);
    const normalized = option.toLowerCase();
    setAiOpen(false);
    if (normalized.includes("publicar") || normalized.includes("list my")) {
      setPublishOpen(true);
      setPublishStep(1);
      return;
    }
    if (normalized.includes("asesor") || normalized.includes("advisor")) {
      window.open("https://wa.me/573332886151?text=" + encodeURIComponent(language === "es" ? "Hola RYO, quiero hablar con un asesor." : "Hello RYO, I would like to talk to an advisor."), "_blank", "noopener,noreferrer");
      return;
    }
    if (normalized.includes("comprar") || normalized.includes("buy")) {
      window.open("https://wa.me/573332886151?text=" + encodeURIComponent(language === "es" ? "Hola RYO, estoy interesado en comprar maquinaria." : "Hello RYO, I am interested in buying machinery."), "_blank", "noopener,noreferrer");
      return;
    }
    document.getElementById("maquinaria")?.scrollIntoView({ behavior: "smooth" });
  };
  const hours = useMemo(
    () =>
      Math.max(
        1,
        Math.ceil(
          (new Date(`${end}T${returnTime}`).getTime() -
            new Date(`${start}T${pickup}`).getTime()) /
            3600000,
        ),
      ),
    [start, end, pickup, returnTime],
  );
  const total = selected
    ? selected.price * hours +
      (delivery ? 180000 : 0) +
      (driver ? 95000 * hours : 0)
    : 0;
  const open = (m: Machine) => {
    setSelected(m);
    setStep(1);
    setConfirmed(false);
    setFullscreen(false);
  };
  return (
    <main className="site-shell">
      <div className="announcement">
        {language === "es"
          ? "Alquiler de maquinaria simple, segura y sin sorpresas."
          : "Simple, safe machinery rental without surprises."}
      </div>
      <header className="topbar">
        <a href="#inicio" className="brand">
          <img src="/logo.png" alt="RYO - alquiler de maquinaria" />
        </a>
        <nav>
          <a href="#maquinaria">
            {language === "es" ? "Maquinaria" : "Machinery"}
          </a>
          <button className="publish-nav" onClick={() => setPublishOpen(true)}>
            <Upload size={14} />
            {t.publish}
          </button>
          <div className="language-switch" aria-label="Language / Idioma">
            <button
              className={language === "es" ? "language-option active" : "language-option"}
              onClick={() => setLanguage("es")}
              aria-pressed={language === "es"}
            >
              <span aria-hidden="true">🇨🇴</span> Español
            </button>
            <button
              className={language === "en" ? "language-option active" : "language-option"}
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
            >
              <span aria-hidden="true">🇺🇸</span> English
            </button>
          </div>
          <a href="#maquinaria" className="nav-cta">
            {language === "es" ? "Alquilar ahora" : "Rent now"}
          </a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menu} aria-expanded={menuOpen}>
            <Menu size={20} />
          </button>
        </nav>
        {menuOpen && <div className="quick-menu">
          <button onClick={() => { setAiOpen(true); setMenuOpen(false) }}><Bot size={17} /> {t.ai}</button>
          <a href="#ubicacion" onClick={() => setMenuOpen(false)}><MapPin size={17} /> {language === "es" ? "Ver mapa" : "View map"}</a>
        </div>}
      </header>
      <section id="inicio" className="hero">
        <div className="hero-copy">
          <p className="kicker">{t.heroKicker}</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <a className="primary" href="#maquinaria">
            {t.view}
          </a>
        </div>
        <div className="hero-image">
          <img src="/excavadora.png" alt="Excavadora RYO" />
          <div>
            <strong>Excavadora 320</strong>
            <span>{language === "es" ? "Desde" : "From"} {money(185000)}{t.perHour}</span>
          </div>
        </div>
      </section>
      <section className="search-panel" aria-label={t.search}>
        <label>
          {t.search}
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === "es" ? "Buscar excavadora, cargador..." : "Search excavator, loader..."}
          />
        </label>
        <a className="primary" href="#maquinaria">
          {t.searchButton}
        </a>
      </section>
      <section id="maquinaria" className="catalog">
        <div className="section-title">
          <div>
            <p className="kicker">{t.catalog}</p>
            <h2>{t.available}</h2>
            <p>{t.catalogText}</p>
          </div>
        </div>
        <div className="machine-grid">
          {machines
            .filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
            .map((m) => (
              <article className="machine-card" key={m.id}>
                <div className="machine-photo">
                  <img src={m.image} alt={m.name} />
                  <span>{t.availableBadge}</span>
                </div>
                <div className="machine-body">
                  <p className="location">
                    <MapPin size={13} />
                    {m.location}
                  </p>
                  <h3>{m.name}</h3>
                  <p className="description">{machineDescription(m)}</p>
                  <div className="specs">
                    {machineSpecs(m).map((s) => (
                      <span key={s}>
                        {icon(s)}
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="card-footer">
                    <p>
                      <strong>{money(m.price)}</strong>
                      <small>{t.perHour}</small>
                    </p>
                    <button onClick={() => open(m)}>{t.rent}</button>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </section>
      <section id="ubicacion" className="map-section">
        <div>
          <p className="kicker">
            RYO · {language === "es" ? "EMPRESA" : "COMPANY"}
          </p>
          <h2>{t.companyTitle}</h2>
          <p>{t.companyText}</p>
          <a className="advisor-button" href="https://wa.me/573332886151?text=Hola%20RYO,%20quiero%20hablar%20con%20un%20asesor" target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> {t.advisor}
          </a>
          <div className="social-block"><span>{t.follow}</span><div className="social-links">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook"><Globe size={18} /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={18} /></a>
            <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer" aria-label="TikTok"><Music2 size={18} /></a>
          </div></div>
        </div>
        <iframe
          title="Mapa de cobertura RYO"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-74.3%2C4.4%2C-73.8%2C4.9&layer=mapnik&marker=4.711%2C-74.072"
        />
      </section>
      <footer>
        <img src="/logo.png" alt="RYO - alquiler de maquinaria" />
        <span>{language === "es" ? "Maquinaria que mueve proyectos." : "Machinery that moves projects."}</span>
        <small>© 2026 RYO Colombia</small>
      </footer>
      {aiOpen && <div className="ai-panel" role="dialog" aria-label={t.ai}>
        <div className="ai-header"><span><Bot size={18} /> {t.ai}</span><button onClick={() => setAiOpen(false)} aria-label={t.close}><X size={17} /></button></div>
        <p className="ai-welcome">{t.aiWelcome}</p>
        {aiSubmitted && <p className="ai-answer"><strong>{aiSubmitted}</strong><br />{aiAnswer}</p>}
        <div className="ai-options">{aiOptions.map((option) => <button key={option} onClick={() => chooseAiOption(option)}>{option}</button>)}</div>
        <div className="ai-form"><input value={aiQuestion} onChange={(e) => setAiQuestion(e.target.value)} placeholder={t.ask} onKeyDown={(e) => { if (e.key === "Enter") askAi() }} /><button onClick={askAi}>{t.askButton}</button></div>
      </div>}
      {publishOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={t.publish}
        >
          <div className="publish-modal">
            <button
              className="close"
              onClick={() => setPublishOpen(false)}
              aria-label={language === "es" ? "Cerrar" : "Close"}
            >
              <X size={18} />
            </button>
            {published ? (
              <div className="confirmation">
                <p className="kicker">RYO</p>
                <h2>{t.sent}</h2>
                <p>{t.sentText}</p>
                <button
                  className="primary"
                  onClick={() => setPublishOpen(false)}
                >
                  {language === "es" ? "Volver" : "Back"}
                </button>
              </div>
            ) : (
              <>
                <div className="modal-heading">
                  <p className="kicker">
                    RYO · {language === "es" ? "PASO" : "STEP"} {publishStep}{" "}
                    {language === "es" ? "DE" : "OF"} 3
                  </p>
                  <h2>
                    {publishStep === 1
                      ? language === "es"
                        ? "¿Dónde está tu maquinaria?"
                        : "Where is your machinery?"
                      : publishStep === 2
                        ? language === "es"
                          ? "Ubicación y fotos"
                          : "Location and photos"
                        : language === "es"
                          ? "Servicio de chofer"
                          : "Driver service"}
                  </h2>
                  <div className="step-dots">
                    <i className={publishStep >= 1 ? "active" : ""} />
                    <i className={publishStep >= 2 ? "active" : ""} />
                    <i className={publishStep >= 3 ? "active" : ""} />
                  </div>
                </div>
                {publishStep === 1 && (
                  <div className="publish-form">
                    <div className="form-grid">
                      <label>
                        {t.country}
                        <input
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </label>
                      <label>
                        {t.state}
                        <input
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </label>
                      <label>
                        {t.city}
                        <input
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </label>
                      <label>
                        {t.postal}
                        <input
                          value={postal}
                          onChange={(e) => setPostal(e.target.value)}
                        />
                      </label>
                    </div>
                    <label className="address-field">
                      {t.address}
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder={
                          language === "es"
                            ? "Calle, número y complemento"
                            : "Street, number and details"
                        }
                      />
                    </label>
                    <div className="location-actions">
                      <button className="secondary" onClick={getLocation}>
                        <LocateFixed size={16} />
                        {language === "es"
                          ? "Usar mi ubicación"
                          : "Use my location"}
                      </button>
                      {position && (
                        <small>
                          <MapPin size={13} /> {position}
                        </small>
                      )}
                    </div>
                    <button
                      className="primary full"
                      onClick={() => setPublishStep(2)}
                    >
                      {t.next}
                      <ChevronRight size={17} />
                    </button>
                  </div>
                )}
                {publishStep === 2 && (
                  <div className="publish-form">
                    <div className="map-preview">
                      <MapPin size={20} />
                      <strong>
                        {position ||
                          [address, city, state, country]
                            .filter(Boolean)
                            .join(", ") ||
                          (language === "es"
                            ? "Añade una dirección"
                            : "Add an address")}
                      </strong>
                      <button className="secondary" onClick={openGoogleMaps}>
                        {language === "es"
                          ? "Buscar en Google Maps"
                          : "Search on Google Maps"}
                      </button>
                    </div>
                    <label className="upload-box">
                      <FileImage size={25} />
                      <strong>{t.photos}</strong>
                      <small>
                        {language === "es"
                          ? "JPG o PNG, máximo 10 fotos"
                          : "JPG or PNG, up to 10 photos"}
                      </small>
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        multiple
                        onChange={(e) => setMachinePhotos(e.target.files)}
                      />
                    </label>
                    {machinePhotos && (
                      <p className="file-count">
                        {machinePhotos.length}{" "}
                        {language === "es"
                          ? "fotos seleccionadas"
                          : "photos selected"}
                      </p>
                    )}
                    <div className="publish-actions">
                      <button
                        className="back-button"
                        onClick={() => setPublishStep(1)}
                      >
                        <ChevronLeft size={15} />
                        {t.back}
                      </button>
                      <button
                        className="primary"
                        onClick={() => setPublishStep(3)}
                      >
                        {t.next}
                        <ChevronRight size={17} />
                      </button>
                    </div>
                  </div>
                )}
                {publishStep === 3 && (
                  <div className="publish-form">
                    <label className="driver-toggle">
                      <input
                        type="checkbox"
                        checked={hasDriver}
                        onChange={(e) => setHasDriver(e.target.checked)}
                      />
                      <span>
                        <strong>{t.driver}</strong>
                        <small>
                          {language === "es"
                            ? "La documentación no se publica."
                            : "Documents are not published."}
                        </small>
                      </span>
                    </label>
                    {hasDriver && (
                      <div className="driver-docs">
                        <label className="upload-box compact">
                          <UserRound size={20} />
                          <strong>{t.id}</strong>
                          <input type="file" accept="image/*" />
                        </label>
                        <label className="upload-box compact">
                          <FileImage size={20} />
                          <strong>{t.license}</strong>
                          <input type="file" accept="image/*" />
                        </label>
                        <label>
                          {t.age}
                          <input type="number" min="18" placeholder="18+" />
                        </label>
                      </div>
                    )}
                    <div className="publish-actions">
                      <button
                        className="back-button"
                        onClick={() => setPublishStep(2)}
                      >
                        <ChevronLeft size={15} />
                        {t.back}
                      </button>
                      <button
                        className="primary"
                        onClick={() => setPublished(true)}
                      >
                        {language === "es" ? "Enviar" : "Submit"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {selected && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={language === "es" ? "Reserva de maquinaria" : "Equipment booking"}
        >
          <div className="rental-modal">
            <button
              className="close"
              onClick={() => setSelected(null)}
              aria-label={t.close}
            >
              <X size={18} />
            </button>
            {confirmed ? (
              <div className="confirmation">
                <p className="kicker">{t.received}</p>
                <h2>{t.ready}</h2>
                <p>
                  {t.request} <strong>{selected.name}</strong> {t.simulation}
                </p>
                <div className="summary">
                  <span>{t.estimated}</span>
                  <strong>{money(total)}</strong>
                </div>
                <button className="primary" onClick={() => setSelected(null)}>
                  {t.backCatalog}
                </button>
              </div>
            ) : (
              <>
                <div className="modal-heading">
                  <p className="kicker">RYO · {language === "es" ? "RESERVA" : "BOOKING"} · {language === "es" ? "PASO" : "STEP"} {step} / 2</p>
                  <h2>
                    {step === 1
                      ? t.configure
                      : t.payment}
                  </h2>
                </div>
                {step === 1 ? (
                  <>
                    {fullscreen ? (
                      <div className="viewer-fullscreen" onClick={() => setFullscreen(false)}>
                        <img src={selected.image} alt={selected.name} onClick={(event) => event.stopPropagation()} />
                        <button
                          className="fullscreen-button"
                          onClick={(event) => { event.stopPropagation(); setFullscreen(false); }}
                          aria-label={t.exitFullscreen}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="viewer-preview">
                        <img src={selected.image} alt={selected.name} />
                        <button className="fullscreen-button" onClick={() => setFullscreen(true)} aria-label={t.fullscreen}>
                          <span>⛶</span>
                        </button>
                      </div>
                    )}
                    <div className="chosen">
                      <strong>{selected.name}</strong>
                      <span>{money(selected.price)}{t.perHour}</span>
                    </div>
                    <div className="machine-info">
                      <div>
                        <strong>{t.purpose}</strong>
                        <p>{selected.function}</p>
                      </div>
                      <div>
                        <strong>{t.included}</strong>
                        <ul>
                          {selected.included.map((i) => (
                            <li key={i}>✓ {i}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="form-grid">
                      <label>
                        {t.from}
                        <input
                          type="date"
                          value={start}
                          onChange={(e) => setStart(e.target.value)}
                        />
                      </label>
                      <label>
                        {t.until}
                        <input
                          type="date"
                          min={start}
                          value={end}
                          onChange={(e) => setEnd(e.target.value)}
                        />
                      </label>
                      <label>
                        {t.deliveryTime}
                        <input
                          type="time"
                          value={pickup}
                          onChange={(e) => setPickup(e.target.value)}
                        />
                      </label>
                      <label>
                        {t.returnTime}
                        <input
                          type="time"
                          value={returnTime}
                          onChange={(e) => setReturnTime(e.target.value)}
                        />
                      </label>
                    </div>
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={driver}
                        onChange={(e) => setDriver(e.target.checked)}
                      />
                      <span>{t.needDriver}</span>
                      <b>+{money(95000)}{t.perHour}</b>
                    </label>
                    {driver && (
                      <label className="address-field">
                        {t.driverAddress}
                        <input
                          value={operatorAddress}
                          onChange={(e) => setOperatorAddress(e.target.value)}
                          placeholder={t.workAddress}
                        />
                      </label>
                    )}
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={delivery}
                        onChange={(e) => setDelivery(e.target.checked)}
                      />
                      <span>{t.needTransport}</span>
                      <b>+{money(180000)}</b>
                    </label>
                    {delivery && (
                      <label className="address-field">
                        {t.transportAddress}
                        <input
                          value={siteAddress}
                          onChange={(e) => setSiteAddress(e.target.value)}
                          placeholder={t.transportAddress}
                        />
                      </label>
                    )}
                    <div className="quote">
                      <span>
                        {hours} {language === "es" ? "horas" : "hours"} × {money(selected.price)}
                      </span>
                      <strong>{money(total)}</strong>
                    </div>
                    <button className="primary full" onClick={() => setStep(2)}>
                      {t.continue}
                    </button>
                  </>
                ) : (
                  <>
                    <p className="demo-note">
                      {t.demoPayment}
                    </p>
                    <div className="form-grid">
                      <label>
                        {t.fullName}
                        <input placeholder={t.yourName} />
                      </label>
                      <label>
                        {t.email}
                        <input type="email" placeholder="you@email.com" />
                      </label>
                      <label>
                        {t.card}
                        <input
                          placeholder="4242 4242 4242 4242"
                          inputMode="numeric"
                        />
                      </label>
                      <label>
                        {t.expiry}
                        <input placeholder="12/28 · 123" />
                      </label>
                    </div>
                    <div className="quote">
                      <span>{t.totalBooking}</span>
                      <strong>{money(total)}</strong>
                    </div>
                    <button
                      className="primary full"
                      onClick={() => setConfirmed(true)}
                    >
                      {t.confirmPayment}
                    </button>
                    <button className="back-button" onClick={() => setStep(1)}>
                      {t.previousStep}
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
