const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Asus/Invite.uz';
const outDir = path.join(dir, 'lib/templates');

// Ensure outDir exists
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.startsWith('template-') && f.endsWith('.html'));

let indexExports = `// Auto-generated exports for new templates\nimport { TemplateData } from "../generate-invitation";\n\n`;
let templatesListExt = [];

files.forEach(file => {
    const html = fs.readFileSync(path.join(dir, file), 'utf8');

    // Extract name
    // e.g. template-1-royal-gold.html -> royalGold
    const nameParts = file.replace('template-', '').replace('.html', '').split('-');
    const templateId = nameParts.slice(1).join('-'); // royal-gold
    const fnName = nameParts.slice(1).map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)).join('');

    // Extract style
    let styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
    let style = styleMatch ? styleMatch[1] : '';

    // Scope the styles
    // Replace "body {" with ".template-wrapper {"
    // Also remove global selectors like "* { margin: 0; padding: 0; box-sizing: border-box; }"
    style = style.replace(/\* \s*\{[\s\S]*?\}/g, '');
    style = style.replace(/body\s*{/g, '.template-wrapper {');
    style = style.replace(/:\s*root\s*{/g, '.template-wrapper {'); // variables on root -> wrapper

    // Extract body content
    let bodyMatch = html.match(/<body>([\s\S]*?)<\/body>/);
    let bodyContent = bodyMatch ? bodyMatch[1] : '';

    // Apply interpolations
    bodyContent = bodyContent.replace(/Aziza.*Jasur/gi, '${brideGroom}');
    bodyContent = bodyContent.replace(/Aziza/gi, '${part1}');
    bodyContent = bodyContent.replace(/Jasur/gi, '${part2}');

    // Date replace
    bodyContent = bodyContent.replace(/2026 yil 15 iyun, Shanba/gi, '${formattedDate}');
    bodyContent = bodyContent.replace(/15 Iyun, 2026 - Shanba/gi, '${formattedDate}');
    bodyContent = bodyContent.replace(/15 Iyun, Shanba • 2026/gi, '${formattedDate}');
    bodyContent = bodyContent.replace(/ON BESHINCHI IYUN, 2026/gi, '${formattedDate}');
    bodyContent = bodyContent.replace(/15 IYUN, 2026/gi, '${formattedDate}');
    bodyContent = bodyContent.replace(/O\'N BESHINCHI IYUN, 2026/gi, '${formattedDate}');
    bodyContent = bodyContent.replace(/ON BESHINCHI IYUN, IKKI MING YIGIRMA OLTINCHI YIL/gi, '${formattedDate}');

    // Time replace
    bodyContent = bodyContent.replace(/Soat 12:00 da osh tortiladi/gi, '${eventTime ? `Soat ${eventTime} da osh tortiladi` : ""}');
    bodyContent = bodyContent.replace(/SOAT 12:00 DA TASHRIF BUYURING/gi, '${eventTime ? `SOAT ${eventTime} DA TASHRIF BUYURING` : ""}');
    bodyContent = bodyContent.replace(/🕰 Soat 12:00 da/gi, '${eventTime ? `🕰 Soat ${eventTime} da` : ""}');
    bodyContent = bodyContent.replace(/🕰 12:00/gi, '${eventTime ? `🕰 ${eventTime}` : ""}');
    bodyContent = bodyContent.replace(/SOAT 12:00/gi, '${eventTime ? `SOAT ${eventTime}` : ""}');
    bodyContent = bodyContent.replace(/12:00/gi, '${eventTime || ""}');

    // Venue Replace
    bodyContent = bodyContent.replace(/Guliston Banquet Hall/gi, '${venue || "To\'yxona"}');
    bodyContent = bodyContent.replace(/GULISTON BANQUET/gi, '${venue || "TO\'YXONA"}');
    bodyContent = bodyContent.replace(/Toshkent sh., Yunusobod tumani,<br>14-mavze, Oltin tepa(\sk[o']chasi)?/gi, '${venueAddress || ""}');
    bodyContent = bodyContent.replace(/Toshkent sh., Yunusobod tumani,<br>14-mavze/gi, '${venueAddress || ""}');
    bodyContent = bodyContent.replace(/Toshkent shahri, Yunusobod tumani,<br>14-mavze, Oltin tepa ko'chasi/gi, '${venueAddress || ""}');

    // Phone Replace
    bodyContent = bodyContent.replace(/\+998 90 123 45 67/g, '${phone || ""}');

    // Buttons (Hide if disabled)
    bodyContent = bodyContent.replace(/<button class="btn gift-btn".*?<\/button>/g, '${giftEnabled ? `<button class="btn gift-btn" id="trigger-gift">💝 Hadya Yuborish</button>` : ""}');
    bodyContent = bodyContent.replace(/<button class="btn photo-btn".*?<\/button>/g, '${photoEnabled ? `<button class="btn photo-btn" id="trigger-photo">📸 Rasm Yuklash</button>` : ""}');

    // Create the TS code
    const tsCode = `import { TemplateData } from "./index";

export function ${fnName}(data: TemplateData): string {
    const {
        brideGroom, formattedDate, eventTime, venue, venueAddress,
        venueLat, venueLng, phone, giftEnabled, photoEnabled
    } = data;

    const part1 = brideGroom.split(/ & | va | \\+ /i)[0] || brideGroom;
    const part2 = brideGroom.split(/ & | va | \\+ /i)[1] || '';

    return \`
<div class="template-wrapper">
    <style>
        \${/* Scoped Styles */}
        \${String.raw\`${style.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`}
    </style>
    \${/* Template Body */}
    ${bodyContent}
</div>\`;
}`;

    // Write file
    fs.writeFileSync(path.join(outDir, `${templateId}.ts`), tsCode);

    indexExports += `export { ${fnName} } from "./${templateId}";\n`;
    templatesListExt.push({
        id: templateId,
        name: nameParts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' '),
        eventTypes: ["WEDDING", "ENGAGEMENT", "OTHER"],
        preview: "Exclusive premium template"
    });
});

console.log(indexExports);
console.log(JSON.stringify(templatesListExt, null, 2));

// Delete old HTMLs
files.forEach(file => {
    fs.unlinkSync(path.join(dir, file));
});
