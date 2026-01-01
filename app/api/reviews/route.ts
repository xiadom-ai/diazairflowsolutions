import { NextResponse } from "next/server";

export async function GET() {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
    const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;

    if (!apiKey || !placeId) {
        console.error("Missing Google API Key or Place ID. Check your .env file.");
        return NextResponse.json({
            error: "Configuration error",
            details: "Missing API Key or Place ID"
        }, { status: 500 });
    }

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total,url&key=${apiKey}`;

        const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
        const data = await response.json();

        if (data.status !== "OK") {
            console.error(`Google Places API error: ${data.status}`, data.error_message || "");
            return NextResponse.json({
                error: data.status,
                message: data.error_message
            }, { status: 400 });
        }

        const result = data.result || {};
        const reviews = result.reviews || [];
        const rating = result.rating || 5;
        const totalReviews = result.user_ratings_total || 0;
        const placeUrl = result.url || `https://www.google.com/maps/search/?api=1&query=google&query_place_id=${placeId}`;

        const formattedReviews = reviews.map((review: any, index: number) => ({
            id: `google-${index}-${Date.now()}`,
            author: review.author_name,
            role: "Verified Customer",
            company: review.relative_time_description,
            content: review.text,
            rating: review.rating,
            profile_photo_url: review.profile_photo_url
        }));

        return NextResponse.json({
            reviews: formattedReviews,
            rating,
            totalReviews,
            placeUrl
        });
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}
