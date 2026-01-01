import { NextRequest, NextResponse } from "next/server";
import { emergencyFormSchema } from "@/lib/validations";
import { sendEmergencyEmail } from "@/lib/email";
import { isRateLimited, getRateLimitInfo } from "@/lib/rate-limit";

/**
 * POST /api/emergency
 * Handle emergency service requests
 * Higher priority than regular contact forms
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get("x-forwarded-for") ||
                     request.headers.get("x-real-ip") ||
                     "unknown";

    // Check rate limit (stricter for emergency - prevent abuse)
    if (isRateLimited(`emergency-${clientIp}`)) {
      const rateLimitInfo = getRateLimitInfo(`emergency-${clientIp}`);
      return NextResponse.json(
        {
          success: false,
          error: "Too many emergency requests. Please call us directly at (240) 432-7489",
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
    const validationResult = emergencyFormSchema.safeParse(body);

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

    // Send emergency email via Resend
    const emailResult = await sendEmergencyEmail(formData);

    if (!emailResult.success) {
      console.error("Failed to send emergency email:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send emergency request. Please call us immediately at (240) 432-7489",
        },
        { status: 500 }
      );
    }

    // TODO: Send SMS via Twilio (if configured)
    // This would provide immediate notification to the on-call technician

    // Track emergency conversion
    // This will be handled client-side via gtag

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Emergency request received. A technician will call you within 5 minutes.",
        estimatedResponse: "Under 2 hours",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Emergency API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please call us immediately at (240) 432-7489",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/emergency
 * Return API status
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Emergency Service API",
    version: "1.0.0",
    priority: "high",
    responseTime: "< 5 minutes",
  });
}
