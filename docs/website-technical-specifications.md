# DIAZ AIRFLOW SOLUTIONS INC. - Especificaciones Técnicas del Website

## 🚀 RESUMEN EJECUTIVO

Este documento contiene todas las especificaciones técnicas y de contenido para crear el website de **Diaz Airflow Solutions Inc.**, una empresa líder en servicios HVAC en el área DMV (DC, Maryland, Virginia) con más de 25 años de experiencia.

### Objetivos del Website:
1. **Generación de Leads:** Formularios optimizados y CTAs estratégicos
2. **Servicio 24/7:** Facilitar contacto de emergencia
3. **Autoridad Local:** Posicionamiento SEO en Maryland
4. **Conversión:** Diseño orientado a resultados

---

## 📂 ESTRUCTURA DE PÁGINAS

```
/
├── Home (Landing Page)
│   ├── Hero Section con Video
│   ├── Servicios Destacados
│   ├── Por Qué Elegirnos
│   ├── Estadísticas
│   ├── Testimonios
│   ├── CTA de Emergencia
│   └── Footer
│
├── Services
│   ├── /ac-installation
│   ├── /ac-repair
│   ├── /heating-installation
│   ├── /heating-repair
│   ├── /maintenance
│   └── /air-quality
│
├── About
│   ├── Nuestra Historia
│   ├── Misión y Valores
│   ├── Equipo
│   └── Certificaciones
│
├── Service Areas
│   ├── Mapa Interactivo
│   └── Lista de Ciudades
│
├── Gallery
│   ├── Proyectos Residenciales
│   ├── Proyectos Comerciales
│   └── Trabajos Especiales
│
├── Contact
│   ├── Formulario de Contacto
│   ├── Información de Ubicación
│   ├── Horarios
│   └── Mapa Google
│
├── Emergency Service (Landing especial)
│
├── Free Estimate (Formulario dedicado)
│
└── Resources
    ├── FAQs
    ├── Maintenance Tips
    └── Energy Savings Guide
```

---

## 🎨 DISEÑO Y UX/UI

### Paleta de Colores
```css
:root {
  /* Colores Principales */
  --primary: #003361;        /* Azul Corporativo */
  --primary-dark: #002244;   /* Azul Oscuro */
  --primary-light: #0052a3;  /* Azul Claro */
  
  /* Colores de Acción */
  --accent: #ff6b35;         /* Naranja CTA */
  --emergency: #dc2626;      /* Rojo Emergencia */
  --success: #10b981;        /* Verde Confirmación */
  
  /* Neutros */
  --gray-900: #1a1a1a;       /* Texto Principal */
  --gray-700: #4a4a4a;       /* Texto Secundario */
  --gray-500: #737373;       /* Texto Terciario */
  --gray-300: #d1d5db;       /* Bordes */
  --gray-100: #f3f4f6;       /* Fondos */
  --white: #ffffff;          /* Blanco Puro */
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.1);
}
```

### Tipografía
```css
/* Fuentes */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

/* Sistema Tipográfico */
--font-heading: 'Montserrat', sans-serif;
--font-body: 'Inter', sans-serif;

/* Tamaños Responsivos */
--text-xs: clamp(0.75rem, 2vw, 0.875rem);
--text-sm: clamp(0.875rem, 2.5vw, 1rem);
--text-base: clamp(1rem, 3vw, 1.125rem);
--text-lg: clamp(1.125rem, 3.5vw, 1.25rem);
--text-xl: clamp(1.25rem, 4vw, 1.5rem);
--text-2xl: clamp(1.5rem, 5vw, 2rem);
--text-3xl: clamp(2rem, 6vw, 3rem);
--text-4xl: clamp(2.5rem, 7vw, 4rem);
```

---

## 🧩 COMPONENTES PRINCIPALES

### 1. Hero Section
```javascript
{
  type: "hero_with_video",
  layout: "split_screen",
  content: {
    headline: "Expert HVAC Solutions for Perfect Indoor Comfort",
    subheadline: "24/7 Emergency • Licensed & Insured • Serving DMV Since 2010",
    cta_primary: {
      text: "Get Free Estimate",
      style: "filled",
      size: "large",
      icon: "calculator"
    },
    cta_secondary: {
      text: "(240) 338-0049",
      style: "outlined",
      size: "large",
      icon: "phone"
    },
    trust_badges: ["EPA", "NATE", "Energy Star", "BBB A+"]
  },
  media: {
    video: "hero-video.mp4",
    poster: "hero-poster.jpg",
    autoplay: true,
    loop: true,
    muted: true
  },
  animations: {
    headline: "fade-in-up",
    cta: "bounce-in",
    badges: "slide-in-bottom"
  }
}
```

### 2. Sticky Emergency Bar
```javascript
{
  type: "sticky_bar",
  position: "top",
  content: {
    message: "24/7 Emergency HVAC Service",
    phone: "(240) 338-0049",
    button: "Call Now",
    icon: "phone-emergency"
  },
  behavior: {
    show_on_scroll: true,
    scroll_threshold: 100,
    mobile_visible: true
  },
  style: {
    background: "var(--emergency)",
    text_color: "white",
    height: "50px"
  }
}
```

### 3. Service Cards Grid
```javascript
{
  type: "service_grid",
  layout: "3_columns",
  cards: [
    {
      icon: "snowflake",
      title: "AC Installation",
      description: "Energy-efficient cooling systems",
      link: "/services/ac-installation",
      badge: "Most Popular",
      hover_effect: "lift"
    }
  ],
  responsive: {
    mobile: "1_column",
    tablet: "2_columns",
    desktop: "3_columns"
  }
}
```

### 4. Interactive Contact Form
```javascript
{
  type: "smart_form",
  fields: [
    {
      name: "service_type",
      type: "select",
      label: "What service do you need?",
      options: [
        "AC Installation",
        "AC Repair",
        "Heating Installation",
        "Heating Repair",
        "Maintenance",
        "Emergency Service"
      ],
      required: true,
      conditional_fields: {
        "Emergency Service": ["urgency_level", "issue_description"]
      }
    },
    {
      name: "preferred_time",
      type: "datetime",
      label: "Preferred appointment time",
      min: "today",
      max: "+30days"
    }
  ],
  integrations: {
    crm: "hubspot",
    email: "sendgrid",
    sms: "twilio"
  },
  validation: {
    phone: "US_format",
    email: "RFC5322"
  }
}
```

---

## 📊 INTEGRACIONES TÉCNICAS

### APIs y Servicios
```json
{
  "analytics": {
    "google_analytics_4": "G-XXXXXXXXXX",
    "google_tag_manager": "GTM-XXXXXXX",
    "facebook_pixel": "XXXXXXXXXX",
    "microsoft_clarity": "XXXXXXXXXX"
  },
  
  "marketing": {
    "google_ads": {
      "conversion_id": "AW-XXXXXXXXXX",
      "conversion_labels": {
        "form_submit": "XXXXXXXXXX",
        "phone_call": "XXXXXXXXXX"
      }
    },
    "mailchimp": {
      "api_key": "XXXXXXXXXX",
      "list_id": "XXXXXXXXXX"
    }
  },
  
  "communication": {
    "twilio": {
      "account_sid": "XXXXXXXXXX",
      "auth_token": "XXXXXXXXXX",
      "phone_number": "+12403380049"
    },
    "sendgrid": {
      "api_key": "XXXXXXXXXX",
      "template_ids": {
        "contact": "d-XXXXXXXXXX",
        "estimate": "d-XXXXXXXXXX",
        "emergency": "d-XXXXXXXXXX"
      }
    }
  },
  
  "customer_service": {
    "intercom": {
      "app_id": "XXXXXXXXXX"
    },
    "calendly": {
      "url": "https://calendly.com/diazairflow"
    }
  },
  
  "reviews": {
    "google_my_business": {
      "place_id": "ChIJXXXXXXXXXXXXXXXXXXXX"
    },
    "yelp": {
      "business_id": "diaz-air-flow-solutions-bowie"
    }
  }
}
```

---

## 🔍 OPTIMIZACIÓN SEO

### Estructura de URLs
```
Patrón: /categoria/subcategoria
Ejemplos:
- /services/ac-installation
- /service-areas/silver-spring
- /gallery/residential-projects
```

### Meta Tags por Página
```html
<!-- Home -->
<title>Diaz Airflow Solutions Inc. | HVAC Services Maryland | 24/7 Emergency AC Repair</title>
<meta name="description" content="Expert HVAC services in Maryland. 24/7 emergency repairs, AC installation, heating services. Licensed & insured. Call (240) 338-0049 for immediate service.">

<!-- Service Page Example -->
<title>AC Installation Maryland | Energy-Efficient Air Conditioning | Diaz Airflow Solutions Inc.</title>
<meta name="description" content="Professional AC installation in Maryland. Energy Star certified systems, 10-year warranty, free estimates. Serving Bowie, Silver Spring, Rockville. Call (240) 338-0049.">
```

### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Diaz Airflow Solutions Inc.",
  "description": "Professional HVAC services in Maryland",
  "telephone": "(240) 338-0049",
  "email": "info@diazairflowsolutions.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bowie",
    "addressRegion": "MD",
    "postalCode": "20721"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "18:00"
    }
  ],
  "areaServed": [
    "Bowie", "Silver Spring", "Rockville", "Bethesda", "Laurel"
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "487"
  }
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */
/* Base: 0-639px */

/* Tablet */
@media (min-width: 640px) { }

/* Desktop Small */
@media (min-width: 1024px) { }

/* Desktop Large */
@media (min-width: 1280px) { }

/* Ultra Wide */
@media (min-width: 1536px) { }
```

---

## ⚡ PERFORMANCE TARGETS

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.8s
- **TTI (Time to Interactive):** < 3.8s

### Optimizaciones
- Lazy loading para imágenes
- Código splitting por ruta
- Minificación CSS/JS
- Compresión Brotli
- CDN para assets estáticos
- Service Worker para offline
- Preconnect a dominios externos
- Font display swap

---

## 🚦 FLUJOS DE CONVERSIÓN

### Flujo Principal: Solicitud de Servicio
```
1. Usuario llega al sitio
   ↓
2. Ve hero con oferta clara
   ↓
3. Explora servicios
   ↓
4. Click en "Get Free Estimate"
   ↓
5. Completa formulario
   ↓
6. Recibe confirmación inmediata
   ↓
7. Llamada de seguimiento en <1 hora
```

### Flujo de Emergencia
```
1. Usuario con emergencia HVAC
   ↓
2. Ve banner de emergencia sticky
   ↓
3. Click en número de teléfono
   ↓
4. Conecta directamente
   ↓
5. Despacho de técnico
```

---

## 📈 MÉTRICAS Y KPIs

### Métricas Principales
- **Tasa de Conversión:** Formularios / Visitantes
- **CTR Teléfono:** Clicks en teléfono / Visitantes
- **Tiempo en Sitio:** Promedio por sesión
- **Tasa de Rebote:** Por página y fuente
- **Leads Calificados:** Formularios válidos / Total

### Eventos a Trackear
```javascript
// Google Analytics Events
gtag('event', 'form_submit', {
  'form_type': 'contact',
  'service_requested': 'ac_installation'
});

gtag('event', 'phone_click', {
  'button_location': 'header',
  'page': 'home'
});

gtag('event', 'emergency_cta', {
  'action': 'click',
  'time_of_day': 'after_hours'
});
```

---

## 🔧 STACK TECNOLÓGICO RECOMENDADO

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn/UI
- **Animaciones:** Framer Motion
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

### Backend
- **API:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Email:** SendGrid
- **SMS:** Twilio
- **Storage:** Cloudinary

### Deployment
- **Hosting:** Vercel
- **CDN:** Cloudflare
- **Monitoring:** Sentry
- **Analytics:** Google Analytics 4

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Fundación (Semana 1)
- [ ] Setup del proyecto Next.js
- [ ] Configuración de Tailwind CSS
- [ ] Estructura de carpetas
- [ ] Componentes base
- [ ] Sistema de diseño

### Fase 2: Desarrollo (Semanas 2-3)
- [ ] Página Home completa
- [ ] Páginas de servicios
- [ ] Sistema de formularios
- [ ] Integración con APIs
- [ ] Galería de proyectos

### Fase 3: Optimización (Semana 4)
- [ ] SEO on-page
- [ ] Performance optimization
- [ ] Testing responsive
- [ ] Accesibilidad WCAG
- [ ] Cross-browser testing

### Fase 4: Launch (Semana 5)
- [ ] Deploy a producción
- [ ] Configuración DNS
- [ ] SSL certificate
- [ ] Google Analytics
- [ ] Search Console
- [ ] Monitoreo activo

---

### Color Scheme

#### Primary Blue: #003361 (Confianza, profesionalismo)
#### Accent Orange: #ff6b35 (CTAs, urgencia)
#### Emergency Red: #dc2626 (Servicios 24/7)
#### Success Green: #10b981 (Confirmaciones)
#### Neutral Grays: #1a1a1a to #f5f5f5

## 📞 INFORMACIÓN DE CONTACTO DEL PROYECTO

**Cliente:** Diaz Airflow Solutions Inc.
**Contacto Principal:** (240) 338-0049
**Email:** info@diazairflowsolutions.com
**Website Actual:** www.diazairflowsolutions.com

---

Este documento contiene todas las especificaciones necesarias para crear un website profesional, optimizado y orientado a conversiones para Diaz Airflow Solutions Inc.