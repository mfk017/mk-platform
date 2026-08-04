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
    
    // Add import if not exists
    if (!content.includes('useLanguage')) {
      content = content.replace("import { MarketingHeader", "import { useLanguage } from '@/hooks/useLanguage';\nimport { MarketingHeader");
    }
    
    // For page.tsx which was already modified manually
    if (f === 'src/app/page.tsx') {
      content = content.replace(/const \[lang, setLang\] = useState<Language>\('ar'\);[\s\S]*?localStorage\.setItem\('mk_lang', newLang\);\n  };/, "const [lang, handleLangChange] = useLanguage('ar');");
    } else {
      content = content.replace(/const \[lang, setLang\] = useState<Language>\('ar'\);/, "const [lang, setLang] = useLanguage('ar');");
    }
    
    fs.writeFileSync(f, content);
  }
});
