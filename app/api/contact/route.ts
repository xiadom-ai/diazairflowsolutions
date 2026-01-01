import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { isRateLimited, getRateLimitInfo } from "@/lib/rate-limit";

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get("x-forwarded-for") ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    // Check rate limit
    if (isRateLimited(clientIp)) {
      const rateLimitInfo = getRateLimitInfo(clientIp);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          rateLimitInfo,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil((rateLimitInfo.resetTime - Date.now()) / 1000)),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate data with Zod
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid form data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData = validationResult.data;

    // Send email via Resend
    const emailResult = await sendContactEmail(formData);

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send message. Please try calling us directly at (240) 432-7489",
        },
        { status: 500 }
      );
    }

    // Track conversion (Google Analytics)
    // This will be handled client-side via gtag

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! We'll contact you within 2 hours.",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again or call (240) 432-7489",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Return API status (optional)
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Contact Form API",
    version: "1.0.0",
  });
}
