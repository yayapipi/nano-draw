import re
from pathlib import Path
path = Path('index.js')
source = path.read_text(encoding='utf-8')
pattern = r"const translations = \{\s+en: \{([\s\S]*?)\n  \},\s+\"zh-TW\": \{[\s\S]*?  \}" 
match = re.search(pattern, source)
if not match:
    raise SystemExit('pattern not found')
en_block = match.group(1)
replacement = f"const translations = {{\n  en: {{{en_block}\n  }},\n  \"zh-TW\": {{{en_block}\n  }}"
source = re.sub(pattern, replacement, source)
path.write_text(source, encoding='utf-8')
print('zh-TW translations set to English fallback')
