import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse request body
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.treatment) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get Google Apps Script URL from environment
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;

    if (!googleScriptUrl) {
      console.error("GOOGLE_SCRIPT_URL environment variable not set");
      return NextResponse.json(
        { success: false, error: "Configuration error" },
        { status: 500 }
      );
    }

    // Prepare data for Google Sheets
    const payload = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      treatment: body.treatment.trim(),
      preferredDate: body.preferredDate || "",
      preferredTime: body.preferredTime || "",
      message: body.message || "",
      source: body.source || "Website",
    };

    // Send to Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Check if response is OK
    if (!response.ok) {
      console.error(`Google Apps Script returned ${response.status}`);
      return NextResponse.json(
        { success: false, error: "Failed to save booking" },
        { status: response.status }
      );
    }

    // Parse response
    const result = await response.json();

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Booking submitted successfully",
        data: payload,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
