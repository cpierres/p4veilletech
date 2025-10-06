// Script to generate a normalized JSON from projets-ocr.component.html and projets-openclassrooms-evaluations.md
// Usage: node scripts/generate-ocr-json.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname ? path.resolve(__dirname, '..') : process.cwd();
const HTML_PATH = path.join(ROOT, 'src', 'app', 'pages', 'about', 'projets-ocr', 'projets-ocr.component.html');
const MD_PATH = path.join(ROOT, 'src', 'assets', 'docs', 'projets-openclassrooms-evaluations.md');
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'data');
const OUT_PATH = path.join(OUT_DIR, 'projets-ocr.json');

function readFile(p) {
  return fs.readFileSync(p, 'utf8');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function stripHtml(html) {
  if (!html) return '';
  let s = html;
  // Replace breaks and list items with line breaks for readability
  s = s.replace(/<\s*br\s*\/?\s*>/gi, '\n');
  s = s.replace(/<\s*li\b[^>]*>/gi, '\n- ');
  s = s.replace(/<\s*\/\s*li\s*>/gi, '');
  s = s.replace(/<\s*\/?\s*p\b[^>]*>/gi, '\n');
  s = s.replace(/<\s*\/?\s*h[1-6]\b[^>]*>/gi, '\n\n');
  // Remove icons and script/style tags entirely
  s = s.replace(/<mat-icon[\s\S]*?<\/mat-icon>/gi, '');
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  s = s.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Remove all other tags
  s = s.replace(/<[^>]+>/g, '');
  // Decode HTML entities (basic)
  s = s.replace(/&nbsp;/g, ' ')
       .replace(/&amp;/g, '&')
       .replace(/&quot;/g, '"')
       .replace(/&#39;/g, "'")
       .replace(/&lt;/g, '<')
       .replace(/&gt;/g, '>');
  // Collapse multiple whitespace
  s = s.replace(/[\t\x0B\f\r]+/g, ' ');
  s = s.replace(/\s*\n\s*/g, '\n');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

function extractBetween(str, startIdx, endIdx) {
  return str.substring(startIdx, endIdx);
}

function parseHtmlProjects(html) {
  // Split into panels
  const panels = [];
  const panelRegex = /<mat-expansion-panel[\s\S]*?<\/mat-expansion-panel>/gi;
  let match;
  while ((match = panelRegex.exec(html)) !== null) {
    panels.push({ html: match[0] });
  }
  const projects = [];
  panels.forEach((p, idx) => {
    const panelHtml = p.html;
    // Title
    const titleMatch = panelHtml.match(/<mat-panel-title[\s\S]*?>([\s\S]*?)<\/mat-panel-title>/i);
    const title = titleMatch ? stripHtml(titleMatch[1]) : `Projet ${idx + 1}`;
    // Description (subtitle)
    const descMatch = panelHtml.match(/<mat-panel-description[\s\S]*?>([\s\S]*?)<\/mat-panel-description>/i);
    const description = descMatch ? stripHtml(descMatch[1]) : '';
    // Headings within panel
    const headingMatches = [...panelHtml.matchAll(/<h[3-5][^>]*>([\s\S]*?)<\/h[3-5]>/gi)].map(m => stripHtml(m[1]));
    // Links
    const links = [...panelHtml.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(m => ({ href: m[1], text: stripHtml(m[2]) }));
    // Full text content inside the panel content div(s)
    // Heuristic: everything after </mat-expansion-panel-header>
    const headerEndIdx = panelHtml.indexOf('</mat-expansion-panel-header>');
    const bodyHtml = headerEndIdx >= 0 ? panelHtml.substring(headerEndIdx + '</mat-expansion-panel-header>'.length) : panelHtml;
    const textContent = stripHtml(bodyHtml);
    // Project number heuristic: starts with "Projet N" in title
    let id = null;
    const idMatch = title.match(/Projet\s+(\d+)/i);
    if (idMatch) {
      id = parseInt(idMatch[1], 10);
    } else {
      // Fallback based on order
      id = idx + 1;
    }
    // Map to OC external id when possible (Projet 2 -> OC-P2, etc.)
    const externalId = id >= 2 ? `OC-P${id}` : null;

    projects.push({
      id,
      title,
      description,
      headings: headingMatches,
      links,
      textContent,
      externalId
    });
  });
  return projects;
}

function parseEvaluations(md) {
  // Split by project sections beginning with "# Projet : OC-PX"
  // Better approach: find all headers and slice between indices
  const headerRegex = /^#\s*Projet\s*:\s*(OC-P\d+)\s*$/gmi;
  const headers = [];
  let m;
  while ((m = headerRegex.exec(md)) !== null) {
    headers.push({ key: m[1], index: m.index });
  }
  const evalMap = {};
  for (let i = 0; i < headers.length; i++) {
    const start = headers[i].index;
    const end = i + 1 < headers.length ? headers[i + 1].index : md.length;
    const section = md.substring(start, end);
    const key = headers[i].key;

    function find(re, multi = false) {
      if (multi) {
        return [...section.matchAll(re)].map(m => (m[1] || m[0]).trim());
      }
      const mm = section.match(re);
      if (!mm) return undefined;
      const val = mm[1] !== undefined ? String(mm[1]).trim() : undefined;
      return val && val.length > 0 ? val : undefined;
    }

    const evaluator = find(/^##\s*Evaluateur\s*:\s*(.+)$/mi);
    const date = find(/^##\s*Date\s*:\s*(.+)$/mi);
    const github = find(/^##\s*Github\s*:\s*(.+)$/mi);
    const titre = find(/^##\s*Titre\s*:\s*(.+)$/mi);
    const lienOcr = find(/^##\s*Lien\s*ocr\s*:\s*(.+)$/mi);

    // Competences and statuses: capture lines after headings
    const competenceBlocks = [];
    const compHeaderRegex = /^####\s*Compétence\s*\d+\.[^\n]*$/gmi;
    let cm;
    while ((cm = compHeaderRegex.exec(section)) !== null) {
      const compStart = cm.index;
      const compEnd = (() => {
        const next = section.slice(compStart + 1).search(/^####\s*Compétence\s*\d+\./gmi);
        if (next === -1) return section.length;
        return compStart + 1 + next;
      })();
      const compText = section.substring(compStart, compEnd);
      const compTitle = (compText.match(/^####\s*(Compétence\s*\d+\.[^\n]*)/i) || [])[1];
      const status = (compText.match(/^\s*(Validé|Non validé|Partiellement validé)\s*$/im) || [])[1];
      const comments = (compText.match(/#####\s*Commentaires\s*:\s*([\s\S]*?)\n(?=####|###|$)/i) || [])[1];
      competenceBlocks.push({ title: compTitle && compTitle.trim(), status: status && status.trim(), comments: comments ? comments.trim() : undefined });
    }

    function listAfter(headerRe) {
      const mm = section.match(headerRe);
      if (!mm) return undefined;
      const start = mm.index + mm[0].length;
      const tail = section.substring(start);
      // Limit to before the next heading (### or ####)
      const nextHeadingIdx = tail.search(/\n###\s|\n####\s/);
      const slice = nextHeadingIdx === -1 ? tail : tail.substring(0, nextHeadingIdx);
      const list = [];
      const listRe = /^-\s+(.+)$/gmi;
      let lm;
      while ((lm = listRe.exec(slice)) !== null) list.push(lm[1].trim());
      return list.length ? list : undefined;
    }

    const pointsForts = listAfter(/####\s*Points\s*forts\s*:\s*/i);
    const axesAmelioration = listAfter(/####\s*Axes\s*d'amélioration\s*:\s*/i);

    // Remarques (livrable or soutenance sections)
    const remarques = find(/####\s*Remarques\s*:\s*([\s\S]*?)(?=\n###|\n####|$)/i);

    // Soutenance remarks (if a ### Soutenance section exists)
    const soutenanceSectionMatch = section.match(/###\s*Soutenance[\s\S]*$/i);
    let soutenance = undefined;
    if (soutenanceSectionMatch) {
      const ss = soutenanceSectionMatch[0];
      const sRem = ss.match(/####\s*Remarques\s*:\s*([\s\S]*?)$/i);
      if (sRem) {
        const text = sRem[1];
        const list = [];
        const listRe = /^-\s+(.+)$/gmi;
        let lm;
        while ((lm = listRe.exec(text)) !== null) list.push(lm[1].trim());
        soutenance = list.length ? list : text.trim();
      }
    }

    evalMap[key] = {
      project: key,
      evaluator,
      date,
      github,
      titre,
      lienOcr,
      competences: competenceBlocks,
      pointsForts,
      axesAmelioration,
      remarques,
      soutenance
    };
  }
  return evalMap;
}

function generate() {
  console.log('[generate-ocr-json] Reading sources...');
  const html = readFile(HTML_PATH);
  const md = fs.existsSync(MD_PATH) ? readFile(MD_PATH) : '';

  const projects = parseHtmlProjects(html);
  const evalMap = md ? parseEvaluations(md) : {};

  // Merge evaluations into projects by externalId
  const merged = projects.map(p => {
    const evaluation = p.externalId && evalMap[p.externalId] ? evalMap[p.externalId] : undefined;
    return { ...p, evaluation };
  });

  const out = {
    generatedAt: new Date().toISOString(),
    sourcePaths: {
      html: path.relative(ROOT, HTML_PATH).replace(/\\/g, '/'),
      evaluationsMd: fs.existsSync(MD_PATH) ? path.relative(ROOT, MD_PATH).replace(/\\/g, '/') : null
    },
    projectCount: merged.length,
    projects: merged
  };

  ensureDir(OUT_DIR);
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), 'utf8');
  console.log(`[generate-ocr-json] Wrote ${OUT_PATH}`);
}

if (require.main === module) {
  try {
    generate();
  } catch (e) {
    console.error('[generate-ocr-json] Failed:', e);
    process.exit(1);
  }
}

module.exports = { generate };
