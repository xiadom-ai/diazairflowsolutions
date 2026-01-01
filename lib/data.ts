import {
    Snowflake,
    Wrench,
    Flame,
    Hammer,
    ClipboardCheck,
    Wind,
    type LucideIcon
} from "lucide-react";

export interface Service {
    id: string;
    title: string;
    short_description: string;
    full_description: string;
    icon: LucideIcon;
    image: string;
    features: string[];
    price_range: string;
    duration: string;
    href: string;
}

export const services: Service[] = [
    {
        id: "ac-installation",
        title: "Air Conditioning Installation",
        short_description: "Professional AC installation with energy-efficient systems. We ensure proper sizing and maximum comfort.",
        full_description: "Our certified technicians provide expert installation of high-efficiency air conditioning systems. We perform detailed load calculations, recommend the perfect system for your space, and ensure proper installation for maximum efficiency and longevity.",
        icon: Snowflake,
        image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
        features: [
            "Free in-home consultation",
            "Load calculation and system sizing",
            "Energy Star certified equipment",
            "10-year labor warranty",
            "Financing options available",
            "Same-day installation available"
        ],
        price_range: "$$$$",
        duration: "4-8 hours",
        href: "/services/ac-installation"
    },
    {
        id: "ac-repair",
        title: "Air Conditioner Repair",
        short_description: "Fast, reliable AC repair service 24/7. We diagnose and fix all makes and models quickly.",
        full_description: "When your AC breaks down, we're here to help. Our experienced technicians diagnose and repair all makes and models quickly and efficiently. We carry common parts in our service vehicles for faster repairs.",
        icon: Wrench,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
        features: [
            "24/7 emergency service",
            "Free diagnostic with repair",
            "Upfront pricing",
            "All brands serviced",
            "90-day repair warranty",
            "2-hour emergency response"
        ],
        price_range: "$$",
        duration: "1-3 hours",
        href: "/services/ac-repair"
    },
    {
        id: "heating-installation",
        title: "Heating Installation",
        short_description: "Stay warm with high-efficiency furnaces and heat pumps designed for Maryland winters.",
        full_description: "Stay warm all winter with our professional heating installation services. We install high-efficiency furnaces, heat pumps, and hybrid systems designed to provide reliable comfort while minimizing energy costs.",
        icon: Flame,
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
        features: [
            "Gas furnaces up to 98% AFUE",
            "Heat pump systems",
            "Hybrid dual-fuel systems",
            "Smart thermostat integration",
            "Rebate assistance",
            "Extended warranties available"
        ],
        price_range: "$$$$",
        duration: "4-8 hours",
        href: "/services/heating-installation"
    },
    {
        id: "heating-repair",
        title: "Heating Repair",
        short_description: "Emergency heating repair when you need it most. 24/7 service for all heating systems.",
        full_description: "Don't let a broken heater leave you in the cold. Our heating repair experts are available 24/7 to diagnose and fix any heating system issue, ensuring your family stays warm and comfortable.",
        icon: Hammer,
        image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
        features: [
            "24/7 emergency service",
            "All heating types serviced",
            "Carbon monoxide testing",
            "Safety inspections included",
            "Transparent pricing",
            "Fast response times"
        ],
        price_range: "$$",
        duration: "1-3 hours",
        href: "/services/heating-repair"
    },
    {
        id: "maintenance",
        title: "HVAC Maintenance",
        short_description: "Prevent breakdowns and extend system life with our comprehensive maintenance plans.",
        full_description: "Regular maintenance is key to system longevity and efficiency. Our comprehensive maintenance programs include seasonal tune-ups, priority service, and discounts on repairs.",
        icon: ClipboardCheck,
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
        features: [
            "Bi-annual inspections",
            "Priority emergency service",
            "15% discount on repairs",
            "No overtime charges",
            "Filter replacements included",
            "Digital service records"
        ],
        price_range: "$",
        duration: "1-2 hours",
        href: "/services/maintenance"
    },
    {
        id: "air-quality",
        title: "Indoor Air Quality",
        short_description: "Breathe easier with air purifiers, humidifiers, and filtration systems for your home.",
        full_description: "Improve your indoor air quality with our comprehensive solutions including air purifiers, humidifiers, UV lights, and duct cleaning services. Breathe easier and live healthier.",
        icon: Wind,
        image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=800&q=80",
        features: [
            "HEPA filtration systems",
            "UV germicidal lights",
            "Whole-home humidifiers",
            "Duct cleaning and sealing",
            "Air quality testing",
            "Allergen reduction systems"
        ],
        price_range: "$$$",
        duration: "2-4 hours",
        href: "/services/air-quality"
    }
];

export const gallery = {
    residential: [
        "https://storage.googleapis.com/diazairflow/gallery/residential-1.jpg",
        "https://storage.googleapis.com/diazairflow/gallery/residential-2.jpg",
        "https://storage.googleapis.com/diazairflow/gallery/residential-3.jpg"
    ],
    commercial: [
        "https://storage.googleapis.com/diazairflow/gallery/commercial-1.jpg",
        "https://storage.googleapis.com/diazairflow/gallery/commercial-2.jpg",
        "https://storage.googleapis.com/diazairflow/gallery/commercial-3.jpg"
    ],
    ductwork: [
        "https://storage.googleapis.com/diazairflow/gallery/ductwork-1.jpg",
        "https://storage.googleapis.com/diazairflow/gallery/ductwork-2.jpg",
        "https://storage.googleapis.com/diazairflow/gallery/ductwork-3.jpg"
    ]
};

export const companyInfo = {
    name: "Diaz Airflow Solutions Inc.",
    phone: "(240) 432-7489",
    email: "info@diazairflowsolutions.com",
    address: "13133 Beaver Terrace, Rockville, MD 20853",
    hours: {
        weekdays: "7:00 AM - 6:00 PM",
        saturday: "8:00 AM - 4:00 PM",
        sunday: "Emergency Service Only"
    }
};

export const statistics = [
    { value: "25+", label: "Years of Experience", icon: "award" },
    { value: "10,000+", label: "Happy Customers", icon: "users" },
    { value: "24/7", label: "Emergency Service", icon: "clock" },
    { value: "100%", label: "Satisfaction Guarantee", icon: "shield-check" },
    { value: "A+", label: "BBB Rating", icon: "star" },
    { value: "50+", label: "Certified Technicians", icon: "certificate" }
];

export const certifications = [
    {
        name: "EPA Certification",
        description: "Environmental Protection Agency certified for safe refrigerant handling",
        logo: "/epa-cert.png"
    },
    {
        name: "NATE Certification",
        description: "North American Technician Excellence certified technicians",
        logo: "/nate-cert.png"
    },
    {
        name: "Energy Star Partner",
        description: "Certified partner for energy-efficient installations",
        logo: "/energy-star.png"
    },
    {
        name: "BBB Accredited",
        description: "A+ rating with Better Business Bureau",
        logo: "/bbb-logo.png"
    },
    {
        name: "Factory Authorized",
        description: "Factory authorized dealer for major brands",
        logo: "/factory-auth.png"
    }
];

export const serviceAreas = [
    "Bowie, MD",
    "Upper Marlboro, MD",
    "Laurel, MD",
    "Silver Spring, MD",
    "Rockville, MD",
    "Bethesda, MD",
    "College Park, MD",
    "Hyattsville, MD",
    "Washington, DC",
    "Arlington, VA",
    "Alexandria, VA"
];

export const faqs = [
    {
        question: "Do you offer 24/7 emergency service?",
        answer: "Yes! We provide 24/7 emergency HVAC service throughout the DMV area. Our emergency response team typically arrives within 2 hours for urgent heating and cooling issues."
    },
    {
        question: "What brands do you service?",
        answer: "We service all major HVAC brands including Carrier, Trane, Lennox, Rheem, Goodman, York, Bryant, American Standard, and more. Our technicians are factory-trained and certified."
    },
    {
        question: "Do you offer financing?",
        answer: "Yes, we offer flexible financing options for new HVAC installations with approved credit. We have plans with 0% interest for qualified customers and terms up to 10 years."
    },
    {
        question: "How often should I service my HVAC system?",
        answer: "We recommend bi-annual maintenance - once in spring for your AC and once in fall for your heating system. Regular maintenance extends equipment life and prevents unexpected breakdowns."
    },
    {
        question: "What's included in your maintenance plan?",
        answer: "Our maintenance plan includes two annual tune-ups, priority emergency service, 15% discount on repairs, no overtime charges, filter replacements, and a comprehensive 25-point inspection."
    },
    {
        question: "How long do HVAC systems typically last?",
        answer: "With proper maintenance, air conditioners and heat pumps typically last 12-15 years, while furnaces can last 15-20 years. Regular maintenance can extend these lifespans significantly."
    },
    {
        question: "Do you offer free estimates?",
        answer: "Yes! We provide free in-home estimates for all new HVAC installations. For repairs, we offer free diagnostics when you approve the repair."
    },
    {
        question: "Are your technicians certified?",
        answer: "All our technicians are EPA certified, NATE certified, and undergo continuous training. They're also background-checked, drug-tested, and fully insured for your peace of mind."
    }
];

export const heroSection = {
    main_headline: "Expert HVAC Solutions for Perfect Indoor Comfort",
    sub_headline: "24/7 Emergency Service • Licensed & Insured • Serving DMV Since 2010",
    hero_image: "https://storage.googleapis.com/diazairflowsolutions/heros/DAFS-02.jpeg",
    cta_primary: {
        text: "Get Free Estimate",
        action: "/contact"
    },
    cta_secondary: {
        text: "Call Now: (240) 432-7489",
        action: "tel:2404327489"
    }
};
