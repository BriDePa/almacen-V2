export function printSection(id, title = "") {
  const el = document.getElementById(id);
  if (!el) return;

  // Clonar el nodo para no alterar el DOM original
  const clone = el.cloneNode(true);

  // Eliminar elementos que no deben imprimirse
  const selectorsToRemove = [
    "button",
    "input",
    "select",
    "textarea",
    "[data-no-print]",
    ".no-print",
    ".btn-primary",
    ".btn-secondary",
    ".btn-danger",
    ".btn-warning",
    ".btn-success",
  ];

  selectorsToRemove.forEach((sel) => {
    Array.from(clone.querySelectorAll(sel)).forEach((n) => n.remove());
  });

  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  // Copiar estilos (links y style)
  const styles = Array.from(
    document.querySelectorAll('link[rel="stylesheet"], style')
  )
    .map((node) => node.outerHTML)
    .join("\n");

  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>${title || "Impresión"}</title>
      ${styles}
      <style>
        @page { margin: 12mm; }
        body { -webkit-print-color-adjust: exact; color-adjust: exact; font-family: system-ui, Arial, sans-serif; background: #fff; }
        /* Force hide anything marked no-print */
        .no-print { display: none !important; }
        button { display: none !important; }
        input, select, textarea { display: none !important; }
        /* Simplified table styles for print */
        .card { box-shadow: none !important; background: transparent !important; border: none !important; padding: 0 !important; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th, td { padding: 6px 8px; border-bottom: 1px solid #ddd; text-align: left; }
        th { font-weight: 600; background: transparent; }
        .truncate { white-space: normal !important; overflow: visible !important; }
      </style>
    </head>
    <body>
      <div id="print-root">${clone.innerHTML}</div>
    </body>
  </html>`;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
  }, 300);
}
