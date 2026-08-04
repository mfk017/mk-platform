const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

const filePaths = [];
walkDir('./src', (filePath) => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    filePaths.push(filePath);
  }
});

let markdown = '# Phase 1: Interactive Elements Inventory\n\n';
markdown += 'This document catalogues every interactive element (buttons, links, inputs, selects, forms) across the platform.\n\n';

filePaths.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const elementRegex = /<(button|Link|a|select|input|form)[^>]*>|<[^>]+onClick=[^>]+>/g;
  const matches = content.match(elementRegex);
  
  if (matches && matches.length > 0) {
    markdown += `### ${filePath}\n\n`;
    markdown += `| Element Type | Text / Context | Current Behavior | Target / Should Do | Status |\n`;
    markdown += `|--------------|----------------|------------------|-------------------|--------|\n`;
    
    matches.forEach(m => {
      if(m.includes('<any') || m.includes('<line_') || m.includes('</')) return;
      
      let type = 'Unknown';
      if (m.startsWith('<button')) type = 'Button';
      else if (m.startsWith('<Link')) type = 'Link';
      else if (m.startsWith('<a ')) type = 'Anchor';
      else if (m.startsWith('<select')) type = 'Select';
      else if (m.startsWith('<input')) type = 'Input';
      else if (m.startsWith('<form')) type = 'Form';
      else if (m.includes('onClick=')) type = 'Clickable Element';
      
      let hasOnClick = m.includes('onClick');
      let hasHref = m.includes('href');
      let hasOnChange = m.includes('onChange');
      let hasOnSubmit = m.includes('onSubmit');
      
      let behavior = 'Nothing / Unwired';
      if (hasOnClick) behavior = 'onClick handler present';
      else if (hasHref) behavior = 'href present (Navigates)';
      else if (hasOnChange) behavior = 'onChange handler present';
      else if (hasOnSubmit) behavior = 'onSubmit handler present';
      else if (type === 'Input') behavior = 'Data entry';
      else if (m.includes('type="submit"')) behavior = 'Submits form';
      
      // Try to extract some context
      let context = 'N/A';
      if (m.includes('title=')) {
        const titleMatch = m.match(/title="([^"]+)"/);
        if (titleMatch) context = titleMatch[1];
      }
      
      let status = behavior === 'Nothing / Unwired' ? '🔴 Broken/Unwired' : '🟢 Working/Wired';
      // For input elements, they usually just hold data
      if (type === 'Input' || type === 'Select') status = '🟢 Working/Wired';
      
      markdown += `| ${type} | ${context} | ${behavior} | Needs review in Phase 2 | ${status} |\n`;
    });
    markdown += '\n';
  }
});

fs.writeFileSync('inventory.md', markdown);
