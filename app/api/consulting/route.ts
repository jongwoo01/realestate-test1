const SUCCESS_STATUSES = [200, 201, 302];

type ConsultingRequest = {
  name?: string;
  phone?: string;
  transactionType?: string;
  propertyType?: string;
  location?: string;
  details?: string;
  privacyAgreed?: boolean;
};

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { ok: false, message: "GOOGLE_SHEETS_WEBHOOK_URL is not configured." },
      { status: 500 },
    );
  }

  let data: ConsultingRequest;

  try {
    data = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  if (!data.privacyAgreed) {
    return Response.json(
      { ok: false, message: "Privacy agreement is required." },
      { status: 400 },
    );
  }

  const payload = {
    createdAt: new Date().toISOString(),
    name: data.name ?? "",
    phone: data.phone ?? "",
    transactionType: data.transactionType ?? "",
    propertyType: data.propertyType ?? "",
    location: data.location ?? "",
    details: data.details ?? "",
    privacyAgreed: data.privacyAgreed,
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "manual",
    });

    if (SUCCESS_STATUSES.includes(response.status)) {
      return Response.json({ ok: true });
    }

    return Response.json(
      { ok: false, message: "Webhook submission failed." },
      { status: 502 },
    );
  } catch {
    return Response.json(
      { ok: false, message: "Webhook request failed." },
      { status: 502 },
    );
  }
}
