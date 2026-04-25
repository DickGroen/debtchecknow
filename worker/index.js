
import TRIAGE_PROMPT from '../prompts/triage.js';
import HAIKU_PROMPT from '../prompts/haiku.js';
import SONNET_PROMPT from '../prompts/sonnet.js';

const FREE_PROMPT = `You are an analysis system for debt collection letters.

Your task:
Read the document and provide a short, free initial assessment.

Focus: Are there potentially grounds to challenge this debt letter?

Always return your answer in exactly this structure:

[SENDER]
Name of the debt collector or company
[/SENDER]

[SENDER_TYPE]
Type of sender (e.g. Debt Collector, Bailiff, Company, Solicitor)
[/SENDER_TYPE]

[CLAIM_AMOUNT]
Amount claimed as a number (number only, no currency symbol)
[/CLAIM_AMOUNT]

[RISK]
low or medium or high
[/RISK]

[TEASER]
Write exactly 1 sentence: state ONLY that there may be grounds to challenge this letter.
Do NOT mention reasons, articles or details.
[/TEASER]`;

// ── Claude API ────────────────────────────────────────────────────────────────

async function callClaudeDocument(env, { model, maxTokens, prompt, fileBase64, mediaType }) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      messages: [{
        role: "user",
        content: [
          mediaType === "application/pdf"
            ? { type: "document", source: { type: "base64", media_type: mediaType, data: fileBase64 } }
            : { type: "image", source: { type: "base64", media_type: mediaType, data: fileBase64 } },
          { type: "text", text: prompt }
        ]
      }]
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Claude API error: ${JSON.stringify(data)}`);
  return data?.content?.[0]?.text || "";
}

// ── Utils ─────────────────────────────────────────────────────────────────────

async function fileToBase64(file) {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
  return { base64: btoa(binary), mediaType: file.type || "application/pdf" };
}

function safeJsonParse(str) {
  try { return JSON.parse(String(str).trim()); }
  catch {
    try {
      const match = String(str).match(/\{[\s\S]*\}/);
      return match ? JSON.parse(match[0]) : null;
    } catch { return null; }
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
  });
}

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 8 * 1024 * 1024;

function validateUploadInput({ file, name, email }) {
  if (!file) return "No file received";
  if (file.size > MAX_FILE_SIZE) return "File too large (max 8 MB)";
  if (!ALLOWED_TYPES.includes(file.type)) return "File type not allowed. Please use PDF, JPG or PNG.";
  if (!name || !String(name).trim()) return "Name is required";
  if (!email || !String(email).includes("@") || !String(email).includes(".")) return "Invalid email address";
  return null;
}

function extractTaggedSection(text, tag) {
  const start = `[${tag}]`;
  const end = `[/${tag}]`;
  const si = text.indexOf(start);
  const ei = text.indexOf(end);
  if (si === -1 || ei === -1) return "";
  return text.substring(si + start.length, ei).trim();
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

// ── RTF ───────────────────────────────────────────────────────────────────────

function rtfEscape(str) {
  return String(str || "")
    .replace(/\\/g, "\\\\").replace(/\{/g, "\\{").replace(/\}/g, "\\}")
    .replace(/\n/g, "\\par\n")
    .replace(/[^\x00-\x7F]/g, c => `\\u${c.charCodeAt(0)}?`);
}

function rtfToBase64(rtfString) {
  const bytes = new TextEncoder().encode(rtfString);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function bulletLines(text) {
  return String(text || "").split("\n").map(l => l.trim()).filter(Boolean)
    .map(l => `{\\pard\\sb0\\sa200\\fi-300\\li300\\f1\\fs22 \\bullet  ${rtfEscape(l.replace(/^- /, ""))}\\par}`)
    .join("\n");
}

function makeAnalysisRtf(analysis, customerName, customerEmail, triage) {
  const title = extractTaggedSection(analysis, "TITLE") || "Debt Letter Analysis";
  const claimAmount = triage?.claim_amount ? `\\u163?${triage.claim_amount}` : "unknown";

  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fcharset0 Arial;}}
{\\colortbl;\\red27\\green58\\blue140;\\red153\\green26\\blue26;}
\\paperw11906\\paperh16838\\margl1800\\margr1800\\margt1440\\margb1440\\f1\\fs22
{\\pard\\sb400\\sa200\\f1\\fs32\\b\\cf1 ${rtfEscape(title)}\\par}
{\\pard\\sb0\\sa100\\f1\\fs20\\cf0 Name: ${rtfEscape(customerName || "")} (${rtfEscape(customerEmail || "")})\\par}
{\\pard\\sb0\\sa200\\f1\\fs20\\cf0 Sender: ${rtfEscape(triage?.sender || "unknown")} | Type: ${rtfEscape(triage?.sender_type || "unknown")} | Amount: ${claimAmount} | Risk: ${rtfEscape(triage?.risk || "")}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Summary\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "SUMMARY"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Findings\\par}
${bulletLines(extractTaggedSection(analysis, "ISSUES"))}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Assessment\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "ASSESSMENT"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Next Steps\\par}
${bulletLines(extractTaggedSection(analysis, "NEXT_STEPS"))}
{\\pard\\sb400\\sa100\\f1\\fs18\\cf0\\i Note: This is an informational analysis and not legal advice. For complex situations or large amounts, we recommend consulting a solicitor or Citizens Advice.\\par}
}`;
}

function makeDisputeLetterRtf(analysis, customerName, triage) {
  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fcharset0 Arial;}}
{\\colortbl;\\red27\\green58\\blue140;\\red153\\green26\\blue26;}
\\paperw11906\\paperh16838\\margl1800\\margr1800\\margt1440\\margb1440\\f1\\fs22
{\\pard\\sb400\\sa200\\f1\\fs28\\b\\cf2 Dispute Letter\\par}
{\\pard\\sb0\\sa200\\f1\\fs20\\cf0 Prepared for: ${rtfEscape(customerName || "")} | Sender: ${rtfEscape(triage?.sender || "unknown")}\\par}
{\\pard\\sb300\\sa200\\f1\\fs22\\cf0 ${rtfEscape(extractTaggedSection(analysis, "OBJECTION"))}\\par}
{\\pard\\sb400\\sa100\\f1\\fs18\\cf0\\i Note: This is a draft letter and not legal advice. DebtCheck is not liable for the outcome of your dispute.\\par}
}`;
}

function makeAdminRtf(analysis, customerName, customerEmail, triage) {
  const claimAmount = triage?.claim_amount ? `\\u163?${triage.claim_amount}` : "unknown";

  return `{\\rtf1\\ansi\\deff0
{\\fonttbl{\\f0\\froman\\fcharset0 Times New Roman;}{\\f1\\fswiss\\fcharset0 Arial;}}
{\\colortbl;\\red27\\green58\\blue140;\\red153\\green26\\blue26;}
\\paperw11906\\paperh16838\\margl1800\\margr1800\\margt1440\\margb1440\\f1\\fs22
{\\pard\\sb400\\sa200\\f1\\fs32\\b\\cf1 ${rtfEscape(extractTaggedSection(analysis, "TITLE") || "Debt Letter Analysis")}\\par}
{\\pard\\sb0\\sa100\\f1\\fs20\\cf0 Name: ${rtfEscape(customerName || "")} (${rtfEscape(customerEmail || "")})\\par}
{\\pard\\sb0\\sa200\\f1\\fs20\\cf0 Sender: ${rtfEscape(triage?.sender || "unknown")} | Type: ${rtfEscape(triage?.sender_type || "unknown")} | Amount: ${claimAmount} | Risk: ${rtfEscape(triage?.risk || "")}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Summary\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "SUMMARY"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Findings\\par}
${bulletLines(extractTaggedSection(analysis, "ISSUES"))}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Assessment\\par}
{\\pard\\sa200\\f1\\fs22 ${rtfEscape(extractTaggedSection(analysis, "ASSESSMENT"))}\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b Next Steps\\par}
${bulletLines(extractTaggedSection(analysis, "NEXT_STEPS"))}
{\\pard\\sa200\\par}
{\\pard\\sb300\\sa120\\f1\\fs24\\b\\cf2 Dispute Letter\\par}
{\\pard\\sa200\\f1\\fs22\\cf0 ${rtfEscape(extractTaggedSection(analysis, "OBJECTION"))}\\par}
{\\pard\\sb400\\sa100\\f1\\fs18\\cf0\\i Note: Informational analysis, not legal advice.\\par}
}`;
}

// ── Handlers ──────────────────────────────────────────────────────────────────

async function handleTriage(env, fileBase64, mediaType) {
  const raw = await callClaudeDocument(env, {
    model: "claude-haiku-4-5-20251001", maxTokens: 800,
    prompt: TRIAGE_PROMPT, fileBase64, mediaType
  });
  console.log("TRIAGE RAW:", raw.substring(0, 300));
  const p = safeJsonParse(raw);
  console.log("TRIAGE RESULT:", JSON.stringify(p));
  if (!p) return { sender: null, sender_type: null, claim_amount: null, original_amount: null, due_date: null, risk: "medium", route: "SONNET" };
  return {
    sender: p.sender || null,
    sender_type: p.sender_type || null,
    claim_amount: typeof p.claim_amount === "number" ? p.claim_amount : null,
    original_amount: typeof p.original_amount === "number" ? p.original_amount : null,
    due_date: p.due_date || null,
    risk: p.risk || "medium",
    route: p.route || "SONNET"
  };
}

async function handleFreeAnalysis(env, fileBase64, mediaType) {
  const raw = await callClaudeDocument(env, {
    model: "claude-haiku-4-5-20251001", maxTokens: 600,
    prompt: FREE_PROMPT, fileBase64, mediaType
  });
  console.log("FREE RAW:", raw.substring(0, 300));
  return {
    sender: extractTaggedSection(raw, "SENDER") || null,
    sender_type: extractTaggedSection(raw, "SENDER_TYPE") || null,
    claim_amount: parseFloat(extractTaggedSection(raw, "CLAIM_AMOUNT")) || null,
    risk: extractTaggedSection(raw, "RISK") || "medium",
    teaser: extractTaggedSection(raw, "TEASER") || null
  };
}

async function generateAnalysis(env, { fileBase64, mediaType, route }) {
  const useSonnet = route === "SONNET";
  const analysis = await callClaudeDocument(env, {
    model: useSonnet ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001",
    maxTokens: useSonnet ? 3500 : 1800,
    prompt: useSonnet ? SONNET_PROMPT : HAIKU_PROMPT,
    fileBase64, mediaType
  }) || "";
  console.log("ANALYSIS MODEL:", useSonnet ? "sonnet" : "haiku");
  console.log("ANALYSIS LENGTH:", analysis.length);
  console.log("ANALYSIS TAGS:", ["TITLE","SUMMARY","ISSUES","ASSESSMENT","NEXT_STEPS","OBJECTION"].map(t => `${t}:${extractTaggedSection(analysis,t).length > 0 ? "OK" : "MISSING"}`).join(" "));
  return analysis;
}

// ── Mail helpers ──────────────────────────────────────────────────────────────

function buildFreeMailHtml({ name, sender, sender_type, claim_amount, risk, teaser, stripeLink }) {
  const riskLabel = { low: "Low", medium: "Medium", high: "High" }[risk] || risk;
  const currency = claim_amount ? `£${claim_amount}` : "unknown";
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
      <h2 style="color:#1d3a6e;">Your free initial assessment</h2>
      <p>Hi ${escapeHtml(name)},</p>
      <p>We've analysed your debt letter for potential grounds to challenge it.</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;">
        <tr style="background:#f3f4f6;"><td style="padding:10px 14px;font-weight:bold;">Sender</td><td style="padding:10px 14px;">${escapeHtml(sender || "unknown")}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:bold;">Type</td><td style="padding:10px 14px;">${escapeHtml(sender_type || "unknown")}</td></tr>
        <tr style="background:#f3f4f6;"><td style="padding:10px 14px;font-weight:bold;">Amount claimed</td><td style="padding:10px 14px;font-weight:bold;color:#1d3a6e;">${currency}</td></tr>
        <tr><td style="padding:10px 14px;font-weight:bold;">Challenge potential</td><td style="padding:10px 14px;">${riskLabel}</td></tr>
      </table>
      <p style="background:#fef9c3;border-left:4px solid #eab308;padding:12px 16px;border-radius:4px;">${escapeHtml(teaser || "Based on your letter, there may be grounds to challenge this debt.")}</p>
      <p>For a full analysis with a ready-to-send dispute letter:</p>
      <a href="${stripeLink}" style="display:inline-block;background:#1d3a6e;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin:8px 0;">
        Full analysis for £29 →
      </a>
      <p style="color:#6b7280;font-size:0.85rem;margin-top:32px;">Note: This is an informational assessment and not legal advice. For complex situations, we recommend Citizens Advice or a solicitor.</p>
    </div>
  `;
}

// ── Mailers ───────────────────────────────────────────────────────────────────

async function sendAdminFreeNotification(env, { name, email, free, stripeLink }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "DebtCheck <noreply@debtcheck.co.uk>",
      to: [env.ADMIN_EMAIL],
      reply_to: [email],
      subject: `New free request: ${name} (${email})`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <p style="background:#f3f4f6;padding:10px 14px;border-radius:6px;font-size:0.85rem;color:#6b7280;">📬 Customer email will be sent tomorrow at 15:00 to <strong>${escapeHtml(email)}</strong></p>
        ${buildFreeMailHtml({ name, ...free, stripeLink })}
      </div>`
    })
  });
  if (!res.ok) throw new Error(`Admin notification failed: ${await res.text()}`);
}

async function sendAdminPaidNotification(env, { customerName, customerEmail, triage, analysis }) {
  const rtfContent = makeAdminRtf(analysis, customerName, customerEmail, triage);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "DebtCheck <noreply@debtcheck.co.uk>",
      to: [env.ADMIN_EMAIL],
      reply_to: [customerEmail],
      subject: `New paid analysis: ${customerName} (${customerEmail})`,
      html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;">
        <p style="background:#f3f4f6;padding:10px 14px;border-radius:6px;font-size:0.85rem;color:#6b7280;">📬 Customer email (2 attachments) will be sent tomorrow at 15:00 to <strong>${escapeHtml(customerEmail)}</strong></p>
        <h2>New paid debt letter analysis</h2>
        <p><strong>Name:</strong> ${escapeHtml(customerName || "")}</p>
        <p><strong>Sender:</strong> ${escapeHtml(triage?.sender || "unknown")}</p>
        <p><strong>Type:</strong> ${escapeHtml(triage?.sender_type || "unknown")}</p>
        <p><strong>Amount:</strong> ${triage?.claim_amount ? `£${triage.claim_amount}` : "unknown"}</p>
        <p><strong>Risk:</strong> ${escapeHtml(triage?.risk || "")}</p>
      </div>`,
      attachments: [{ filename: "DebtCheck-Analysis.rtf", content: rtfToBase64(rtfContent) }]
    })
  });
  if (!res.ok) throw new Error(`Admin email failed: ${await res.text()}`);
}

async function sendDelayedFreeEmail(env, entry) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "DebtCheck <noreply@debtcheck.co.uk>",
      to: [entry.email],
      subject: "Your free debt letter assessment — DebtCheck",
      html: buildFreeMailHtml({
        name: entry.name,
        sender: entry.sender,
        sender_type: entry.sender_type,
        claim_amount: entry.claim_amount,
        risk: entry.risk,
        teaser: entry.teaser,
        stripeLink: entry.stripe_link || "https://debtcheck.co.uk"
      })
    })
  });
  if (!res.ok) throw new Error(`Free email failed: ${await res.text()}`);
}

async function sendDelayedPaidEmail(env, entry) {
  const analysisRtf = makeAnalysisRtf(entry.analysis, entry.name, entry.email, entry.triage);
  const disputeRtf = makeDisputeLetterRtf(entry.analysis, entry.name, entry.triage);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Authorization": `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "DebtCheck <noreply@debtcheck.co.uk>",
      to: [entry.email],
      subject: "Your full debt letter analysis — DebtCheck",
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1f2937;">
        <h2 style="color:#1d3a6e;">Your full analysis is ready</h2>
        <p>Hi ${escapeHtml(entry.name)},</p>
        <p>Please find two files attached:</p>
        <ul style="line-height:1.9;">
          <li><strong>DebtCheck-Analysis.rtf</strong> — full analysis with all findings, assessment and next steps</li>
          <li><strong>Dispute-Letter.rtf</strong> — ready-to-send dispute letter, use it straight away</li>
        </ul>
        ${entry.triage?.sender ? `<p>Sender: <strong>${escapeHtml(entry.triage.sender)}</strong></p>` : ""}
        ${entry.triage?.claim_amount ? `<p>Amount claimed: <strong>£${entry.triage.claim_amount}</strong></p>` : ""}
        <p style="background:#f0fdf4;border-left:4px solid #22c55e;padding:12px 16px;border-radius:4px;font-size:0.9rem;">
          💡 Tip: Send the dispute letter by recorded post or email with read receipt. Keep proof of sending. If no satisfactory response, escalate to the Financial Ombudsman Service (UK) or CFPB (US).
        </p>
        <p style="color:#6b7280;font-size:0.85rem;margin-top:32px;">Note: This is an informational analysis and not legal advice.</p>
      </div>`,
      attachments: [
        { filename: "DebtCheck-Analysis.rtf", content: rtfToBase64(analysisRtf) },
        { filename: "Dispute-Letter.rtf", content: rtfToBase64(disputeRtf) }
      ]
    })
  });
  if (!res.ok) throw new Error(`Paid email failed: ${await res.text()}`);
}

// ── Cron handler ──────────────────────────────────────────────────────────────

async function handleCron(env) {
  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;
  const list = await env.DEBT_QUEUE.list();

  for (const key of list.keys) {
    try {
      const raw = await env.DEBT_QUEUE.get(key.name);
      if (!raw) continue;
      const entry = JSON.parse(raw);
      if (now - new Date(entry.created_at).getTime() < oneDayMs) continue;
      if (entry.type === "free") {
        await sendDelayedFreeEmail(env, entry);
      } else {
        await sendDelayedPaidEmail(env, entry);
      }
      await env.DEBT_QUEUE.delete(key.name);
    } catch (err) {
      console.error(`Cron error for ${key.name}:`, err.message);
    }
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/analyze") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        if (!file) return jsonResponse({ ok: false, error: "No file received" }, 400);
        const { base64, mediaType } = await fileToBase64(file);
        const triage = await handleTriage(env, base64, mediaType);
        return jsonResponse({ ok: true, ...triage });
      } catch (err) {
        return jsonResponse({ ok: false, error: err.message }, 500);
      }
    }

    if (request.method === "POST" && url.pathname === "/analyze-free") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        const name = formData.get("name");
        const email = formData.get("email");
        const stripeLink = env.STRIPE_LINK || "https://debtcheck.co.uk";

        const err = validateUploadInput({ file, name, email });
        if (err) return jsonResponse({ ok: false, error: err }, 400);

        const { base64, mediaType } = await fileToBase64(file);
        const free = await handleFreeAnalysis(env, base64, mediaType);

        await env.DEBT_QUEUE.put(`free:${Date.now()}:${email}`, JSON.stringify({
          type: "free", name, email,
          sender: free.sender || "",
          sender_type: free.sender_type || "",
          claim_amount: free.claim_amount || null,
          risk: free.risk || "medium",
          teaser: free.teaser || "",
          stripe_link: stripeLink,
          created_at: new Date().toISOString()
        }));

        try { await sendAdminFreeNotification(env, { name, email, free, stripeLink }); } catch (_) {}

        return jsonResponse({ ok: true, message: "You'll receive your assessment by the next business day before 4pm." });
      } catch (err) {
        return jsonResponse({ ok: false, error: err.message }, 500);
      }
    }

    if (request.method === "POST" && url.pathname === "/submit") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");
        const name = formData.get("name");
        const email = formData.get("email");

        const err = validateUploadInput({ file, name, email });
        if (err) return jsonResponse({ ok: false, error: err }, 400);

        const { base64, mediaType } = await fileToBase64(file);
        const triage = await handleTriage(env, base64, mediaType);
        const analysis = await generateAnalysis(env, { fileBase64: base64, mediaType, route: triage.route });

        await env.DEBT_QUEUE.put(`paid:${Date.now()}:${email}`, JSON.stringify({
          type: "paid", name, email, analysis, triage,
          created_at: new Date().toISOString()
        }));

        await sendAdminPaidNotification(env, { customerName: name, customerEmail: email, triage, analysis });

        return jsonResponse({ ok: true, message: "Upload successful. You'll receive your full analysis by the next business day before 4pm." });
      } catch (err) {
        return jsonResponse({ ok: false, error: err.message }, 500);
      }
    }

    return new Response("Not found", { status: 404 });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(handleCron(env));
  }
};
