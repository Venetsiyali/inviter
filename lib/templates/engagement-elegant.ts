import { TemplateData } from "./index";

export function engagementElegant(data: TemplateData): string {
    return `<!DOCTYPE html>
<html lang="uz"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${data.brideGroom} — Unashtiruv</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Georgia,serif;background:${data.primaryColor};color:#fff;min-height:100vh}
.c{max-width:480px;margin:0 auto;padding:40px 24px;text-align:center}
.ring{font-size:64px;margin-bottom:20px;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}
.label{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:${data.secondaryColor};opacity:.7;margin-bottom:16px}
.names{font-size:32px;font-weight:700;margin-bottom:8px;line-height:1.2}
.sub{font-size:15px;opacity:.7;margin-bottom:32px}
.card{background:${data.secondaryColor}12;border:1px solid ${data.secondaryColor}25;border-radius:16px;padding:20px;margin-bottom:12px;text-align:left;display:flex;align-items:center;gap:14px}
.card-icon{width:44px;height:44px;background:${data.secondaryColor}18;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.card-label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${data.secondaryColor}cc;margin-bottom:4px;font-weight:600}
.card-value{font-size:15px;font-weight:600}
.card-sub{font-size:13px;opacity:.6;margin-top:2px}
.divider{width:40px;height:2px;background:${data.secondaryColor};margin:24px auto;border-radius:2px;opacity:.3}
.footer{font-size:11px;opacity:.2;margin-top:40px}
.footer a{color:${data.secondaryColor};opacity:.5;text-decoration:none}
</style></head><body>
<div class="c">
<div class="ring">💍</div>
<div class="label">Taklif</div>
<div class="names">${data.brideGroom}</div>
<div class="sub">unashtiruv marosimiga taklif etamiz</div>
<div class="card"><div class="card-icon">📅</div><div><div class="card-label">Sana</div><div class="card-value">${data.formattedDate}</div>${data.eventTime ? `<div class="card-sub">Soat ${data.eventTime}</div>` : ""}</div></div>
${data.venue ? `<div class="card"><div class="card-icon">📍</div><div><div class="card-label">Manzil</div><div class="card-value">${data.venue}</div>${data.venueAddress ? `<div class="card-sub">${data.venueAddress}</div>` : ""}</div></div>` : ""}
${data.phone ? `<div class="card"><div class="card-icon">📞</div><div><div class="card-label">Aloqa</div><div class="card-value">${data.phone}</div></div></div>` : ""}
<div class="divider"></div>
<div class="footer"><a href="https://inviter.uz">inviter.uz</a></div>
</div></body></html>`;
}
