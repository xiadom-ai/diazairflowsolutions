import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <Image
                            src="/logo-diazairflowsolutions.png"
                            alt="Diaz Airflow Solutions Inc."
                            width={180}
                            height={60}
                            className="h-12 w-auto mb-4"
                        />
                        <p className="text-primary-200 text-sm mb-4">
                            Expert HVAC installation, repair, and maintenance with 20+ years of experience
                            serving Maryland, Virginia, and DC.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-primary-300 hover:text-secondary-500 transition-colors" aria-label="Facebook">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-primary-300 hover:text-secondary-500 transition-colors" aria-label="Instagram">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-primary-300 hover:text-secondary-500 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-white">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/services#installation" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    New Installations
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#maintenance" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    Maintenance
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#troubleshooting" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    Troubleshooting
                                </Link>
                            </li>
                            <li>
                                <Link href="/services#emergency" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                    Emergency Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <Phone className="h-5 w-5 text-secondary-500 mt-0.5" />
                                <div>
                                    <a href="tel:2404327489" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                        (240) 432-7489
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail className="h-5 w-5 text-secondary-500 mt-0.5" />
                                <div>
                                    <a href="mailto:info@diazairflowsolutions.com" className="text-primary-200 hover:text-secondary-500 transition-colors">
                                        info@diazairflowsolutions.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=13133+Beaver+Terrace+Rockville+MD+20853"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-2 hover:text-secondary-500 transition-colors group"
                                    aria-label="View location on Google Maps"
                                >
                                    <MapPin className="h-5 w-5 text-secondary-500 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <div className="text-primary-200 group-hover:text-secondary-500 transition-colors">
                                        13133 Beaver Terrace<br />
                                        Rockville, MD 20853<br />
                                        Serving MD, VA, DC
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 text-center text-primary-300 text-sm">
                    <p>&copy; {currentYear} Diaz Airflow Solutions Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
