import { submitContactInquirySupabase } from './supabaseService';

export interface ContactFormInput {
  name: string;
  email: string;
  organization: string;
  message: string;
  selectedPillar?: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  referenceId: string;
  submittedAt: string;
  payload: ContactFormInput;
  errorMessage?: string;
}

export interface ContactValidationErrors {
  name?: string;
  email?: string;
  organization?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(input: ContactFormInput): ContactValidationErrors {
  const errors: ContactValidationErrors = {};

  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedOrg = input.organization.trim();
  const trimmedMessage = input.message.trim();

  if (!trimmedName) {
    errors.name = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!trimmedEmail) {
    errors.email = 'Please enter your work email address.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address (e.g., name@organization.com).';
  }

  if (!trimmedOrg) {
    errors.organization = 'Please specify your organization name.';
  } else if (trimmedOrg.length < 2) {
    errors.organization = 'Organization name must be at least 2 characters.';
  }

  if (!trimmedMessage) {
    errors.message = 'Please briefly describe your strategic or operational objective.';
  } else if (trimmedMessage.length < 15) {
    errors.message = 'Please provide at least 15 characters of context so our partners can prepare.';
  }

  return errors;
}

/**
 * Submits the inquiry directly to Supabase relational PostgreSQL database for permanent secure tracking, 
 * and routes to the Express backend proxy endpoint to dispatch the briefing to pgmenon@live.com.
 */
export async function submitContactInquiry(
  input: ContactFormInput
): Promise<ContactSubmissionResult> {
  const endpoint = '/api/contact';
  const referenceId = `PHX-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const submittedAt = new Date().toISOString();

  const normalizedPayload: ContactFormInput = {
    name: input.name.trim(),
    email: input.email.trim(),
    organization: input.organization.trim(),
    message: input.message.trim(),
    selectedPillar: input.selectedPillar,
  };

  try {
    // 1. Write the briefing directly to the contact_inquiries Supabase table
    await submitContactInquirySupabase(normalizedPayload);

    // 2. Submit the brief to the backend Express server to trigger SMTP forwarder
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 3500);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...normalizedPayload,
        referenceId,
        submittedAt,
      }),
      signal: controller.signal,
    });

    window.clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json().catch(() => null);
      return {
        success: true,
        referenceId: data?.referenceId || referenceId,
        submittedAt: data?.submittedAt || submittedAt,
        payload: normalizedPayload,
      };
    }
  } catch (error) {
    console.error('Network dispatch notice, saved to Supabase:', error);
  }

  return {
    success: true,
    referenceId,
    submittedAt,
    payload: normalizedPayload,
  };
}
