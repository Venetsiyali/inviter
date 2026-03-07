const fs = require('fs');
const indexFile = 'lib/templates/index.ts';
let content = fs.readFileSync(indexFile, 'utf8');

const newImports = `
import { royalGold } from "./royal-gold";
import { roseGarden } from "./rose-garden";
import { orientalSilk } from "./oriental-silk";
import { mintFresh } from "./mint-fresh";
import { midnightLuxury } from "./midnight-luxury";
import { sageBotanical } from "./sage-botanical";
import { azureDream } from "./azure-dream";
import { terracottaBoho } from "./terracotta-boho";
import { cherryBlossom } from "./cherry-blossom";
import { velvetPurple } from "./velvet-purple";
import { sandyBeach } from "./sandy-beach";
import { emeraldClassic } from "./emerald-classic";
`;

const newTemplates = `
    "royal-gold": royalGold,
    "rose-garden": roseGarden,
    "oriental-silk": orientalSilk,
    "mint-fresh": mintFresh,
    "midnight-luxury": midnightLuxury,
    "sage-botanical": sageBotanical,
    "azure-dream": azureDream,
    "terracotta-boho": terracottaBoho,
    "cherry-blossom": cherryBlossom,
    "velvet-purple": velvetPurple,
    "sandy-beach": sandyBeach,
    "emerald-classic": emeraldClassic,
`;

const newListItems = `
    {
        id: "royal-gold",
        name: "Hashamatli Oltin",
        eventTypes: ["WEDDING", "ENGAGEMENT"],
        preview: "Hashamatli oltin va zangori uslub"
    },
    {
        id: "rose-garden",
        name: "Atirgul Bog'i",
        eventTypes: ["WEDDING"],
        preview: "Pushti barglar tushadigan romantik dizayn"
    },
    {
        id: "oriental-silk",
        name: "Sharqona Ipak",
        eventTypes: ["WEDDING", "SUNNAT", "OSH"],
        preview: "O'zbekcha beqasam/adras milliy uslub"
    },
    {
        id: "mint-fresh",
        name: "Yalpiz Ifori",
        eventTypes: ["WEDDING", "BIRTHDAY"],
        preview: "Minimalist, yalpiz rangli dizayn"
    },
    {
        id: "midnight-luxury",
        name: "Tungi Hashamat",
        eventTypes: ["WEDDING", "ENGAGEMENT"],
        preview: "Qora va Oltin Gatsby uslubi"
    },
    {
        id: "sage-botanical",
        name: "Zaytun Barglari",
        eventTypes: ["WEDDING"],
        preview: "Tabiat va barglar, elegant shriftlar"
    },
    {
        id: "azure-dream",
        name: "Zangori Orzu",
        eventTypes: ["WEDDING", "BIRTHDAY"],
        preview: "Osmon va bulutlar aks etgan romantika"
    },
    {
        id: "terracotta-boho",
        name: "Terrakota Boho",
        eventTypes: ["WEDDING"],
        preview: "Terrakota va qum rangli Bohemian uslubi"
    },
    {
        id: "cherry-blossom",
        name: "Sakura Guli",
        eventTypes: ["WEDDING", "BIRTHDAY"],
        preview: "Yapon sakura gullari yog'adigan dizayn"
    },
    {
        id: "velvet-purple",
        name: "Binafsha Baxmal",
        eventTypes: ["WEDDING", "ENGAGEMENT"],
        preview: "To'q binafsha va tilla rangli hashamat"
    },
    {
        id: "sandy-beach",
        name: "Sohil Bo'yi",
        eventTypes: ["WEDDING", "OTHER"],
        preview: "Dengiz va qum rangli to'lqin effekti"
    },
    {
        id: "emerald-classic",
        name: "Klassik Zumrad",
        eventTypes: ["WEDDING", "OSH"],
        preview: "Klassik zumrad yashil va tilla, monogrammali"
    },
`;

if (!content.includes('royalGold')) {
    content = content.replace('import { sunnatCelebration } from "./sunnat-celebration";', 'import { sunnatCelebration } from "./sunnat-celebration";' + newImports);
    content = content.replace('"sunnat-celebration": sunnatCelebration,\n};', '"sunnat-celebration": sunnatCelebration,' + newTemplates + '\n};');
    content = content.replace(/];\s*$/, newListItems + '];\n');
    fs.writeFileSync(indexFile, content);
    console.log("Index updated successfully");
} else {
    console.log("Already updated");
}
