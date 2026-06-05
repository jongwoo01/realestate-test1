const SUCCESS_STATUSES = [200, 201, 302];
const ALLOWED_TRANSACTION_TYPES = ["매도", "전세", "월세"];
const ALLOWED_PROPERTY_TYPES = ["아파트", "오피스텔", "빌라/주택"];
const ALLOWED_PREFERRED_TIMINGS = ["가능한 빨리", "1개월 이내", "3개월 이내", "아직 미정"];
const WEBHOOK_TIMEOUT_MS = 8000;
const MAX_LENGTH = {
  name: 20,
  phone: 20,
  location: 80,
  details: 500,
};

type ConsultingRequest = {
  name?: string;
  phone?: string;
  transactionType?: string;
  propertyType?: string;
  preferredTiming?: string;
  location?: string;
  details?: string;
  privacyAgreed?: boolean;
};

type FieldErrors = Partial<Record<keyof ConsultingRequest, string>>;

const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizePhone = (phone: string) => phone.replace(/[^\d]/g, "");

const isValidPhone = (phone: string) =>
  /^0\d{8,10}$/.test(normalizePhone(phone));

const formatPhone = (phone: string) => {
  const digits = normalizePhone(phone);

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return phone;
};

const isWithinLength = (value: string, max: number) => value.length <= max;

const validateConsultingRequest = (data: ConsultingRequest) => {
  const name = normalizeText(data.name);
  const phone = normalizeText(data.phone);
  const transactionType = normalizeText(data.transactionType);
  const propertyType = normalizeText(data.propertyType);
  const preferredTiming = normalizeText(data.preferredTiming);
  const location = normalizeText(data.location);
  const details = normalizeText(data.details);
  const fieldErrors: FieldErrors = {};

  if (!data.privacyAgreed) {
    fieldErrors.privacyAgreed = "개인정보 수집 및 이용에 동의해주세요.";
  }

  if (!ALLOWED_TRANSACTION_TYPES.includes(transactionType)) {
    fieldErrors.transactionType = "거래 유형을 다시 선택해주세요.";
  }

  if (!ALLOWED_PROPERTY_TYPES.includes(propertyType)) {
    fieldErrors.propertyType = "매물 종류를 다시 선택해주세요.";
  }

  if (!ALLOWED_PREFERRED_TIMINGS.includes(preferredTiming)) {
    fieldErrors.preferredTiming = "상담 희망 시점을 다시 선택해주세요.";
  }

  if (!name) {
    fieldErrors.name = "성함을 입력해주세요.";
  } else if (!isWithinLength(name, MAX_LENGTH.name)) {
    fieldErrors.name = `성함은 ${MAX_LENGTH.name}자 이내로 입력해주세요.`;
  }

  if (!phone) {
    fieldErrors.phone = "연락처를 입력해주세요.";
  } else if (!isWithinLength(phone, MAX_LENGTH.phone) || !isValidPhone(phone)) {
    fieldErrors.phone = "연락처 형식을 확인해주세요. 예: 010-0000-0000";
  }

  if (!location) {
    fieldErrors.location = "지역 또는 단지명을 입력해주세요.";
  } else if (!isWithinLength(location, MAX_LENGTH.location)) {
    fieldErrors.location = `지역 또는 단지명은 ${MAX_LENGTH.location}자 이내로 입력해주세요.`;
  }

  if (!isWithinLength(details, MAX_LENGTH.details)) {
    fieldErrors.details = `문의 내용은 ${MAX_LENGTH.details}자 이내로 입력해주세요.`;
  }

  return {
    values: {
      name,
      phone: formatPhone(phone),
      transactionType,
      propertyType,
      preferredTiming,
      location,
      details,
      privacyAgreed: data.privacyAgreed === true,
    },
    fieldErrors,
  };
};

export async function POST(request: Request) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    return Response.json(
      { ok: false, message: "상담 접수 환경 설정이 완료되지 않았습니다." },
      { status: 500 },
    );
  }

  let data: ConsultingRequest;

  try {
    data = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "요청 형식이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const { values, fieldErrors } = validateConsultingRequest(data);

  if (Object.keys(fieldErrors).length > 0) {
    return Response.json(
      { ok: false, message: "입력 내용을 확인해주세요.", fieldErrors },
      { status: 400 },
    );
  }

  const payload = {
    createdAt: new Date().toISOString(),
    ...values,
    source: "realestate-test1",
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      redirect: "manual",
      signal: controller.signal,
    });

    if (SUCCESS_STATUSES.includes(response.status)) {
      return Response.json({ ok: true });
    }

    return Response.json(
      { ok: false, message: "상담 신청 전송에 실패했습니다." },
      { status: 502 },
    );
  } catch (error) {
    const message =
      error instanceof DOMException && error.name === "AbortError"
        ? "상담 신청 전송 시간이 초과되었습니다. 잠시 후 다시 시도해주세요."
        : "상담 신청 전송 중 오류가 발생했습니다.";

    return Response.json(
      { ok: false, message },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
