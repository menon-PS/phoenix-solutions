/**
 * Sample Serverless Node Function: Gemini <LEAD_SUMMARY> Parser & Webhook Forwarder
 * Phoenix Strategic Evolution
 * 
 * Usage: Place on serverless runner (AWS Lambda / Google Cloud Function / Express backend)
 */

const axios = require('axios');

async function handleChatbotLeadHandoff(geminiReplyText, userEmail, conversationTranscript) {
  // Regex to extract <LEAD_SUMMARY> block
  const match = geminiReplyText.match(/<LEAD_SUMMARY>([\s\S]*?)<\/LEAD_SUMMARY>/i);
  
  if (!match) {
    console.log('No lead summary block found in AI reply.');
    return null;
  }

  const blockText = match[1];
  const lines = blockText.split('\n');
  const leadPayload = {
    consent: true,
    conversation_transcript: conversationTranscript || ''
  };

  lines.forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.substring(0, colonIdx).trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
      const val = line.substring(colonIdx + 1).trim();

      if (key.includes('name')) leadPayload.name = val;
      else if (key.includes('company') || key.includes('industry')) leadPayload.company = val;
      else if (key.includes('contact') || key.includes('email')) leadPayload.email = val || userEmail;
      else if (key.includes('phone')) leadPayload.phone = val;
      else if (key.includes('service')) leadPayload.service_interest = val;
      else if (key.includes('project')) leadPayload.project_type = val;
      else if (key.includes('goal')) leadPayload.core_goal = val;
      else if (key.includes('requirement')) leadPayload.key_requirements = val;
      else if (key.includes('timeline')) leadPayload.timeline = val;
      else if (key.includes('budget')) leadPayload.budget_range = val;
      else if (key.includes('temperature')) leadPayload.lead_temperature = val.includes('Hot') ? 'Hot' : 'Warm';
    }
  });

  // POST payload to Phoenix Public CRM Webhook Endpoint
  try {
    const response = await axios.post('https://phoenixsolutions.com/api/public/chatbot-leads', leadPayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Phoenix-Api-Key': process.env.PHOENIX_CRM_SECRET || 'phx_live_99201'
      }
    });

    console.log('Chatbot Lead successfully forwarded to CRM:', response.data);
    return response.data;
  } catch (error) {
    console.error('Webhook dispatch error:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { handleChatbotLeadHandoff };
