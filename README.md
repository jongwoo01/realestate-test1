# Real Estate Consultation Funnel

Small Next.js consultation site for a local real estate office focused on homeowners in Gangdong-gu.

## Product Scope

The site supports a simple consultation journey:

- explain the service area and seller-focused value proposition
- show the service workflow before asking for user information
- collect only the minimum consultation fields needed for follow-up
- validate the same fields on the client and API route
- forward clean consultation data to a Google Sheets webhook
- show users what happens after submission

## Core User Requirements

- A homeowner should understand what kind of help is offered before opening the form.
- The form should distinguish transaction type, property type, preferred timing, location, contact information, and optional details.
- Invalid phone numbers, missing consent, missing location, and unsupported option values should be rejected before webhook forwarding.
- The completion screen should explain the next handling steps instead of only saying the form was submitted.
- Mobile users should always have quick access to phone, KakaoTalk, and the consultation form.

## Environment

Create `.env.local` from `.env.example` and set:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=
```

## Local Checks

```bash
npm run lint
npm run build
```

## Manual QA Checklist

- Submit the consultation form with empty required fields and confirm field-level errors appear.
- Enter `01012345678` and confirm the API formats it before forwarding.
- Select each transaction type, property type, and preferred timing option.
- Disable the webhook URL and confirm the API returns a clear setup error.
- On mobile width, confirm the sticky bottom bar does not cover the submit button.
- After a successful submission, confirm the completion page explains the follow-up sequence.
