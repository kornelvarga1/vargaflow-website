# SMS Opt-In Page Content

This document defines the content for the `/sms-optin` page on vargaflow.com. The actual form is implemented as a React component, but all consent text and labels below **must appear verbatim** — TCR reviewers cross-check this language against the A2P campaign submission.

---

## Page Header

**VargaFlow LLC**

## About Us

Done-for-you marketing automation services for home service businesses.

---

## Section Header

Input Your Information Here to Get Started 👋

---

## Form Fields

The form must collect the following required fields:

- First name (required)
- Last name (required)
- Email (required)
- Phone (required, with country code dropdown defaulting to 🇺🇸 +1)

---

## Consent Checkboxes

Two separate, individually selectable checkboxes must appear above the submit button. Both default to unchecked. The submit button is enabled only when all required fields are filled AND both checkboxes are selected.

### Checkbox 1 — Customer Care

Label text (display verbatim, including punctuation):

> By providing a telephone number, clicking this button, and submitting the form, you are consenting to be contacted by SMS text message and AI-powered voice calls from VargaFlow LLC, regarding Customer Care, (our message frequency may vary). Message & data rates apply. Reply STOP to unsubscribe from further messaging from VargaFlow LLC. Reply HELP for more information. See our Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.

### Checkbox 2 — Marketing

Label text (display verbatim, including punctuation):

> By providing a telephone number, clicking this button, and submitting the form, you are consenting to be contacted by SMS text message from VargaFlow LLC, regarding new offers (marketing), (our message frequency may vary). Message & data rates apply. Reply STOP to unsubscribe from further messaging from VargaFlow LLC. Reply HELP for more information. See our Privacy Policy (containing our SMS Terms) at the bottom of the page for more information.

---

## Closing Consent Statement

Display directly below the checkboxes, before the submit button:

> Consent is provided exclusively for VargaFlow LLC to contact the user based on the selection, not any other third parties mentioned on the site. SMS opt-in data is not shared/sold to third parties for promotional/marketing purposes.

---

## Submit Button

Label: **Submit**

## Success Message

After successful form submission, replace the form with:

> ✓ Thank you for submitting! We'll be in touch with you soon.

---

## Footer Links

The page must include footer links to:

- **Terms of Service** → `/terms-of-service`
- **Privacy Policy** → `/privacy-policy`

---

## Data Capture Requirements (Backend)

The form submission must POST to a Supabase edge function (`sms-optin-submit`) that inserts a row into a new `sms_optins` table with the following columns:

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `business_id` | uuid | VargaFlow's own business_id (multi-tenant pattern) |
| `first_name` | text | from form |
| `last_name` | text | from form |
| `email` | text | from form |
| `phone` | text | E.164 format (e.g. +13075551234) |
| `customer_care_consent` | boolean | checkbox 1 state |
| `marketing_consent` | boolean | checkbox 2 state |
| `ip_address` | text | server-side capture from request headers |
| `user_agent` | text | server-side capture from request headers |
| `consent_text_version` | text | hardcoded version string e.g. `"2026-04-27-v1"` so we can prove which exact wording was shown if challenged |
| `created_at` | timestamptz | default `now()` |

These fields form the TCPA paper trail. If a recipient ever sues claiming they didn't consent, this row is the evidence — name, phone, timestamp, IP, user agent, exact consent wording shown, and which checkboxes they ticked.
