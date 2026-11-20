// Canva Bulk Create CSV and Clipboard Exporter

function escapeCsvField(field) {
  if (field === null || field === undefined) return '""';
  const stringField = String(field);
  // If field contains quotes, commas, or newlines, wrap in quotes and double internal quotes
  if (/[",\n\r]/.test(stringField)) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  return `"${stringField}"`;
}

export function generateCanvaCsv(slides, clientName = 'Client') {
  if (!slides || slides.length === 0) return '';

  const headers = [
    'Slide_Number',
    'Slide_Role',
    'Header_Hook',
    'Body_Text',
    'Highlight_Words',
    'Font_Pairing',
    'Text_Color',
    'Accent_Color',
    'Canva_Layout_Blueprint'
  ];

  const rows = slides.map(slide => {
    return [
      escapeCsvField(slide.slideNumber),
      escapeCsvField(slide.role),
      escapeCsvField(slide.hook),
      escapeCsvField(slide.body),
      escapeCsvField(slide.highlightWords),
      escapeCsvField(slide.fontPairing),
      escapeCsvField(slide.textColor),
      escapeCsvField(slide.accentColor),
      escapeCsvField(slide.layoutBlueprint)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\r\n');
}

export function downloadCanvaCsv(slides, clientName = 'Client', format = 'Carousel') {
  const csvContent = generateCanvaCsv(slides, clientName);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  const sanitizedClient = clientName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const sanitizedFormat = format.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const dateStr = new Date().toISOString().split('T')[0];
  
  link.setAttribute('href', url);
  link.setAttribute('download', `CanvaBulk_${sanitizedClient}_${sanitizedFormat}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function formatSlidesAsPlainText(slides, clientName, format) {
  if (!slides || slides.length === 0) return '';

  let output = `⚡ CAROUSEL & WEEKLY DESK EXPORT\n`;
  output += `Client: ${clientName} | Format: ${format}\n`;
  output += `Generated: ${new Date().toLocaleDateString()}\n`;
  output += `-------------------------------------------\n\n`;

  slides.forEach(slide => {
    output += `[SLIDE ${slide.slideNumber}] - ${slide.role}\n`;
    output += `HEADLINE: ${slide.hook}\n`;
    output += `BODY:\n${slide.body}\n`;
    output += `HIGHLIGHT WORDS: ${slide.highlightWords} (Accent: ${slide.accentColor})\n`;
    output += `FONT PAIRING: ${slide.fontPairing}\n`;
    output += `CANVA LAYOUT: ${slide.layoutBlueprint}\n\n`;
  });

  return output.trim();
}
