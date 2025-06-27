const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');
const jsEditor = document.getElementById('js');
const preview = document.getElementById('preview');
const downloadBtn = document.getElementById('downloadBtn');

function updatePreview() {
  const html = htmlEditor.value;
  const css = `<style>${cssEditor.value}</style>`;
  const js = `<script>${jsEditor.value}<\/script>`;
  const content = `${html}\n${css}\n${js}`;
  preview.srcdoc = content;
}

htmlEditor.addEventListener('input', updatePreview);
cssEditor.addEventListener('input', updatePreview);
jsEditor.addEventListener('input', updatePreview);

// Initial render
updatePreview();

// Download as ZIP functionality
downloadBtn.addEventListener('click', () => {
  const zip = new JSZip();

  const html = htmlEditor.value;
  const css = `<style>\n${cssEditor.value}\n</style>`;
  const js = `<script>\n${jsEditor.value}\n<\/script>`;
  const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Downloaded Site</title>
  ${css}
</head>
<body>
  ${html}
  ${js}
</body>
</html>`;

  zip.file("index.html", finalHtml);

  zip.generateAsync({ type: "blob" }).then(content => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(content);
    a.download = "website.zip";
    a.click();
  });
});
    
