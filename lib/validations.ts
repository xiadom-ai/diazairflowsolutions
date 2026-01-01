import { z } from "zod";

/**
 * Contact Form Validation Schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .toLowerCase()
    .trim(),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\d\s\-\+\(\)]{10,}$/.test(val),
      "Please enter a valid phone number"
    ),

  service: z
    .string()
    .min(1, "Please select a service"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),

  preferredTime: z.string().optional(),
  urgency: z.enum(["low", "medium", "high", "emergency"]).optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Emergency Service Form Schema
 */
export const emergencyFormSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{10,}$/, "Valid phone number required"),
  address: z.string().min(5, "Address is required for emergency service"),
  issueDescription: z.string().min(20, "Please describe the issue in detail"),
  urgencyLevel: z.enum(["urgent", "critical"]),
});

export type EmergencyFormData = z.infer<typeof emergencyFormSchema>;

/**
 * Free Estimate Form Schema
 */
export const estimateFormSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^[\d\s\-\+\(\)]{10,}$/, "Valid phone number required"),
  address: z.string().min(5),
  serviceType: z.enum([
    "ac-installation",
    "ac-repair",
    "heating-installation",
    "heating-repair",
    "maintenance",
    "air-quality",
  ]),
  propertyType: z.enum(["residential", "commercial"]),
  squareFootage: z.string().optional(),
  currentSystem: z.string().optional(),
  preferredDate: z.string().optional(),
  additionalNotes: z.string().max(500).optional(),
});

export type EstimateFormData = z.infer<typeof estimateFormSchema>;

/**
 * Newsletter Subscription Schema
 */
export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Service Request Schema (for API validation)
 */
export const serviceRequestSchema = z.object({
  type: z.enum(["contact", "emergency", "estimate", "newsletter"]),
  data: z.union([
    contactFormSchema,
    emergencyFormSchema,
    estimateFormSchema,
    newsletterSchema,
  ]),
  metadata: z.object({
    userAgent: z.string().optional(),
    referrer: z.string().optional(),
    timestamp: z.string().optional(),
  }).optional(),
});

export type ServiceRequest = z.infer<typeof serviceRequestSchema>;
