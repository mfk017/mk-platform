const fs = require('fs');
const files = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/pricing/page.tsx',
  'src/app/register/page.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    
    if (f === 'src/app/page.tsx') {
      if (!content.includes('const isAr = lang === \'ar\';')) {
        content = content.replace(
          "const [lang, handleLangChange] = useLanguage('ar');", 
          "const [lang, handleLangChange] = useLanguage('ar');\n  const isAr = lang === 'ar';\n  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;"
        );
      }
    } else {
      if (!content.includes('const isAr = lang === \'ar\';')) {
        content = content.replace(
          "const [lang, setLang] = useLanguage('ar');", 
          "const [lang, setLang] = useLanguage('ar');\n  const isAr = lang === 'ar';"
        );
      }
    }
    
    fs.writeFileSync(f, content);
  }
});
