
const MAX_STYLE_IMAGES = 6;
const MAX_RESULTS = 5;
const MAX_PRESETS = 12;
const MODEL_NAME = "gemini-2.5-flash-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const MODULE_KEYS = ["prompt", "styles", "generate", "results"];
const DEFAULT_MODULE_ORDER = [...MODULE_KEYS];

const STORAGE_DEFAULTS = {
  apiKey: "",
  styleLibrary: [],
  promptPresets: [],
  defaultPresetId: "",
  recentResults: [],
  theme: "light",
  language: "en",
  layout: "popout",
  moduleOrder: DEFAULT_MODULE_ORDER
};

const translations = {
  en: {
    "app.title": "Nano Draw",
    "app.subtitle": "Gemini image companion",
    "app.credit": "Crafted by Yapi",
    "panel.promptTitle": "Prompt Studio",
    "panel.promptDescription": "Craft your idea and keep the best prompts close.",
    "prompt.placeholder": "Describe what you want to create.",
    "panel.presetsTitle": "Presets",
    "panel.presetsEmpty": "No presets yet. Save prompts you love for one-click reuse.",
    "panel.stylesTitle": "Style Reference",
    "panel.stylesDescription": "Upload inspiration and curate a reusable style library.",
    "panel.currentStyles": "Current Inputs",
    "panel.libraryStyles": "Style Library",
    "panel.generateTitle": "Generate",
    "panel.generateDescription": "Send your prompt to Gemini and iterate quickly.",
    "panel.resultsTitle": "Results",
    "panel.resultsDescription": "Copy, download, or convert outputs into new styles.",
    "upload.title": "Add reference images",
    "upload.subtitle": "Drop files or click to browse (up to 6).",
    "loading.generating": "Crafting your images...",
    "actions.savePreset": "Save Preset",
    "actions.clearPrompt": "Clear",
    "actions.clearAll": "Clear All",
    "actions.resetInputs": "Reset Inputs",
    "actions.clearLibrary": "Clear Library",
    "actions.generate": "Generate",
    "actions.clearResults": "Clear Results",
    "actions.save": "Save",
    "actions.remove": "Remove",
    "actions.applyPreset": "Apply",
    "actions.setDefault": "Set Default",
    "actions.defaultActive": "Default",
    "actions.deletePreset": "Delete",
    "actions.saveToLibrary": "Save",
    "actions.removeInput": "Remove",
    "actions.useStyle": "Use",
    "actions.deleteStyle": "Delete",
    "actions.copy": "Copy",
    "actions.download": "Download",
    "actions.styleFromResult": "Use as Style",
    "settings.title": "Settings",
    "settings.apiTitle": "Gemini API",
    "settings.apiKeyLabel": "API Key",
    "settings.apiKeyPlaceholder": "AIza...",
    "settings.appearanceTitle": "Appearance",
    "settings.theme": "Theme",
    "settings.themeLight": "Light",
    "settings.themeDark": "Dark",
    "settings.layout": "Layout",
    "settings.layoutPopout": "Popout",
    "settings.layoutSidebar": "Sidebar",
    "settings.languageTitle": "Language",
    "settings.language": "Interface language",
    "settings.languageEnglish": "English",
    "settings.languageChinese": "Traditional Chinese",
    "settings.aboutTitle": "About",
    "settings.credit": "Designed and built by Yapi.",
    "badge.default": "Default",
    "grid.currentEmpty": "No inputs selected.",
    "grid.libraryEmpty": "No saved styles yet.",
    "grid.resultsEmpty": "Images will appear here.",
    "status.promptRequired": "Write a prompt to generate.",
    "status.apiKeyMissing": "Add your Gemini API key in Settings.",
    "status.apiKeyEmpty": "API key is empty.",
    "status.inputLimit": "Maximum of {{max}} style images reached.",
    "status.readFailed": "Unable to read {{name}}.",
    "status.styleSaved": "Saved to library.",
    "status.styleExists": "Already saved.",
    "status.styleRemoved": "Removed from library.",
    "status.libraryCleared": "Style library cleared.",
    "status.presetSaved": "Preset saved.",
    "status.presetExists": "Preset already exists.",
    "status.presetLimit": "Limit of {{max}} presets reached.",
    "status.presetApplied": "Preset applied.",
    "status.defaultPresetSet": "Default preset updated.",
    "status.presetRemoved": "Preset removed.",
    "status.presetsCleared": "All presets cleared.",
    "status.resultsCleared": "Results cleared.",
    "status.promptCleared": "Prompt cleared.",
    "status.apiSaved": "API key saved.",
    "status.apiRemoved": "API key removed.",
    "status.copySuccess": "Copied to clipboard.",
    "status.copyFailed": "Copy failed. Try downloading instead.",
    "status.noImages": "No images returned.",
    "status.generatedCount": "Received {{count}} image(s).",
    "status.generationFailed": "Generation failed.",
    "status.loadSettingsFailed": "Unable to load saved settings.",
    "confirm.clearLibrary": "Clear all saved styles?",
    "confirm.clearPresets": "Remove all prompt presets?",
    "aria.openSettings": "Open settings",
    "aria.closeSettings": "Close settings",
    "aria.dragModule": "Reorder module",
    "result.alt": "Generated result {{index}}",
    "label.style": "Style",
    "label.result": "Result {{index}}",
    "file.default": "nano-draw"
  },
  "zh-TW": {
    "app.title": "Nano Draw",
    "app.subtitle": "Gemini ????",
    "app.credit": "? Yapi ??",
    "panel.promptTitle": "?????",
    "panel.promptDescription": "??????,????????",
    "prompt.placeholder": "??????????",
    "panel.presetsTitle": "????",
    "panel.presetsEmpty": "????,??????????????",
    "panel.stylesTitle": "????",
    "panel.stylesDescription": "?????????????????",
    "panel.currentStyles": "????",
    "panel.libraryStyles": "???",
    "panel.generateTitle": "??",
    "panel.generateDescription": "????? Gemini,?????",
    "panel.resultsTitle": "??",
    "panel.resultsDescription": "?????,???????????",
    "upload.title": "??????",
    "upload.subtitle": "?????????(?? 6 ?)?",
    "loading.generating": "????????...",
    "actions.savePreset": "????",
    "actions.clearPrompt": "??",
    "actions.clearAll": "????",
    "actions.resetInputs": "????",
    "actions.clearLibrary": "?????",
    "actions.generate": "????",
    "actions.clearResults": "????",
    "actions.save": "??",
    "actions.remove": "??",
    "actions.applyPreset": "??",
    "actions.setDefault": "????",
    "actions.defaultActive": "??",
    "actions.deletePreset": "??",
    "actions.saveToLibrary": "??",
    "actions.removeInput": "??",
    "actions.useStyle": "??",
    "actions.deleteStyle": "??",
    "actions.copy": "??",
    "actions.download": "??",
    "actions.styleFromResult": "????",
    "settings.title": "??",
    "settings.apiTitle": "Gemini API",
    "settings.apiKeyLabel": "API ??",
    "settings.apiKeyPlaceholder": "AIza...",
    "settings.appearanceTitle": "??",
    "settings.theme": "??",
    "settings.themeLight": "??",
    "settings.themeDark": "??",
    "settings.layout": "??",
    "settings.layoutPopout": "????",
    "settings.layoutSidebar": "???",
    "settings.languageTitle": "????",
    "settings.language": "????",
    "settings.languageEnglish": "??",
    "settings.languageChinese": "????",
    "settings.aboutTitle": "??",
    "settings.credit": "? Yapi ??????",
    "badge.default": "??",
    "grid.currentEmpty": "?????????",
    "grid.libraryEmpty": "???????",
    "grid.resultsEmpty": "??????????",
    "status.promptRequired": "??????????",
    "status.apiKeyMissing": "???????? Gemini API ???",
    "status.apiKeyEmpty": "??? API ???",
    "status.inputLimit": "?? {{max}} ?????????",
    "status.readFailed": "???? {{name}}?",
    "status.styleSaved": "????????",
    "status.styleExists": "?????????",
    "status.styleRemoved": "????????",
    "status.libraryCleared": "???????",
    "status.presetSaved": "????????",
    "status.presetExists": "???????",
    "status.presetLimit": "??????? {{max}} ??",
    "status.presetApplied": "????????",
    "status.defaultPresetSet": "????????",
    "status.presetRemoved": "????????",
    "status.presetsCleared": "??????????",
    "status.resultsCleared": "????????",
    "status.promptCleared": "????????",
    "status.apiSaved": "??? API ???",
    "status.apiRemoved": "??? API ???",
    "status.copySuccess": "????????",
    "status.copyFailed": "????,??????",
    "status.noImages": "?????????",
    "status.generatedCount": "?? {{count}} ????",
    "status.generationFailed": "?????",
    "status.loadSettingsFailed": "??????????",
    "confirm.clearLibrary": "???????????",
    "confirm.clearPresets": "?????????????",
    "aria.openSettings": "????",
    "aria.closeSettings": "????",
    "aria.dragModule": "???????",
    "result.alt": "? {{index}} ?????",
    "label.style": "??",
    "label.result": "?? {{index}}",
    "file.default": "nano-draw"
  }
};

const LOCALES = {
  en: "en-US",
  "zh-TW": "zh-TW"
};

const state = {
  apiKey: "",
  currentInputs: [],
  library: [],
  results: [],
  promptPresets: [],
  defaultPresetId: "",
  theme: "light",
  language: "en",
  layout: "popout",
  moduleOrder: [...DEFAULT_MODULE_ORDER]
};

let loadingMessage = "";
let draggingModuleKey = null;

const els = {
  body: document.body,
  modulesRoot: document.getElementById("modulesRoot"),
  prompt: document.getElementById("promptInput"),
  promptCount: document.getElementById("promptCount"),
  savePresetBtn: document.getElementById("savePresetBtn"),
  clearPromptBtn: document.getElementById("clearPromptBtn"),
  clearPresets: document.getElementById("clearPresets"),
  presetList: document.getElementById("presetList"),
  presetEmpty: document.getElementById("presetEmpty"),
  presetTemplate: document.getElementById("presetTemplate"),
  imageInput: document.getElementById("imageInput"),
  uploadZone: document.getElementById("uploadZone"),
  currentGrid: document.getElementById("currentGrid"),
  libraryGrid: document.getElementById("libraryGrid"),
  resultsGrid: document.getElementById("resultsGrid"),
  status: document.getElementById("status"),
  generateBtn: document.getElementById("generateBtn"),
  clearCurrent: document.getElementById("clearCurrent"),
  clearLibrary: document.getElementById("clearLibrary"),
  clearResults: document.getElementById("clearResults"),
  openSettings: document.getElementById("openSettings"),
  closeSettings: document.getElementById("closeSettings"),
  saveApiKey: document.getElementById("saveApiKey"),
  deleteApiKey: document.getElementById("deleteApiKey"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  settingsDialog: document.getElementById("settingsDialog"),
  themeSelect: document.getElementById("themeSelect"),
  languageSelect: document.getElementById("languageSelect"),
  layoutSelect: document.getElementById("layoutSelect"),
  loadingOverlay: document.getElementById("loadingOverlay"),
  thumbTemplate: document.getElementById("thumbTemplate"),
  resultTemplate: document.getElementById("resultTemplate")
};

(async function init() {
  const params = new URLSearchParams(location.search);
  const requestedView = params.get("view");
  attachEventListeners();
  await hydrateState();

  if (requestedView === "sidepanel") {
    state.layout = "sidebar";
  } else if (requestedView === "popout") {
    state.layout = "popout";
  }

  applyTheme(state.theme);
  applyLayout(state.layout);
  applyLanguage(state.language);
  applyModuleOrder(state.moduleOrder);
  setupDragAndDrop();
  updatePromptCount();
  renderPresets();
  renderLibrary();
  renderCurrentInputs();
  renderResults();
})();
function t(key, replacements) {
  const languagePack = translations[state.language] || translations.en;
  const fallbackPack = translations.en;
  const template = languagePack[key] ?? fallbackPack[key] ?? key;
  if (!replacements) {
    return template;
  }
  return template.replace(/\{\{(.*?)\}\}/g, (_, token) => {
    const trimmed = token.trim();
    return replacements[trimmed] ?? "";
  });
}

function attachEventListeners() {
  els.prompt.addEventListener("input", updatePromptCount);
  els.imageInput.addEventListener("change", onFilePick);
  els.generateBtn.addEventListener("click", () => {
    void generateImages();
  });
  els.clearCurrent.addEventListener("click", () => {
    state.currentInputs = [];
    renderCurrentInputs();
  });
  els.clearLibrary.addEventListener("click", async () => {
    if (!state.library.length) return;
    if (!confirm(t("confirm.clearLibrary"))) return;
    state.library = [];
    await chrome.storage.local.set({ styleLibrary: state.library });
    renderLibrary();
    notify(t("status.libraryCleared"));
  });
  els.clearResults.addEventListener("click", () => {
    void clearResultsList();
  });
  els.openSettings.addEventListener("click", () => toggleDialog(true));
  els.closeSettings.addEventListener("click", () => toggleDialog(false));
  els.settingsDialog.addEventListener("click", (evt) => {
    if (evt.target === els.settingsDialog) toggleDialog(false);
  });
  els.saveApiKey.addEventListener("click", () => {
    void saveApiKey();
  });
  els.deleteApiKey.addEventListener("click", () => {
    void removeApiKey();
  });

  els.savePresetBtn.addEventListener("click", () => {
    void savePromptPreset();
  });
  els.clearPromptBtn.addEventListener("click", () => {
    setPrompt("");
    notify(t("status.promptCleared"));
  });
  els.clearPresets.addEventListener("click", () => {
    void clearAllPresets();
  });
  els.presetList.addEventListener("click", onPresetAction);

  els.libraryGrid.addEventListener("click", onLibraryAction);
  els.currentGrid.addEventListener("click", onCurrentAction);
  els.resultsGrid.addEventListener("click", onResultAction);

  ["dragenter", "dragover"].forEach((eventName) => {
    els.uploadZone.addEventListener(eventName, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      els.uploadZone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    els.uploadZone.addEventListener(eventName, (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      els.uploadZone.classList.remove("dragging");
    });
  });

  els.uploadZone.addEventListener("drop", (evt) => {
    const files = evt.dataTransfer?.files;
    if (files?.length) {
      processFiles(files);
    }
  });

  els.themeSelect.addEventListener("change", (evt) => {
    const value = evt.target.value === "dark" ? "dark" : "light";
    applyTheme(value, { persist: true });
  });

  els.languageSelect.addEventListener("change", (evt) => {
    const value = translations[evt.target.value] ? evt.target.value : "en";
    applyLanguage(value, { persist: true });
  });

  els.layoutSelect.addEventListener("change", (evt) => {
    const value = evt.target.value === "sidebar" ? "sidebar" : "popout";
    applyLayout(value, { persist: true });
  });
}

async function hydrateState() {
  try {
    const stored = await chrome.storage.local.get(STORAGE_DEFAULTS);
    state.apiKey = stored.apiKey || "";
    state.library = Array.isArray(stored.styleLibrary) ? stored.styleLibrary : [];
    state.promptPresets = Array.isArray(stored.promptPresets) ? stored.promptPresets : [];
    state.defaultPresetId = stored.defaultPresetId || "";
    state.theme = stored.theme === "dark" ? "dark" : "light";
    state.language = translations[stored.language] ? stored.language : "en";
    state.layout = stored.layout === "sidebar" ? "sidebar" : "popout";
    state.moduleOrder = sanitizeModuleOrder(stored.moduleOrder);
    state.results = (Array.isArray(stored.recentResults) ? stored.recentResults : [])
      .slice(0, MAX_RESULTS)
      .filter((item) => item?.dataUrl)
      .map((item) => ({
        id: item.id || uuid(),
        dataUrl: item.dataUrl,
        label: item.label || null,
        createdAt: item.createdAt || Date.now()
      }));

    els.apiKeyInput.value = state.apiKey;
    els.themeSelect.value = state.theme;
    els.languageSelect.value = state.language;
    els.layoutSelect.value = state.layout;
  } catch (error) {
    console.error("Failed to hydrate state", error);
    notify(t("status.loadSettingsFailed"));
  }
}

function applyTheme(theme, options = {}) {
  const resolved = theme === "dark" ? "dark" : "light";
  state.theme = resolved;
  els.body.classList.remove("theme-light", "theme-dark");
  els.body.classList.add(`theme-${resolved}`);
  els.themeSelect.value = resolved;
  if (options.persist) {
    void chrome.storage.local.set({ theme: resolved });
  }
}

function applyLayout(layout, options = {}) {
  const resolved = layout === "sidebar" ? "sidebar" : "popout";
  state.layout = resolved;
  els.body.classList.remove("layout-popout", "layout-sidebar");
  els.body.classList.add(`layout-${resolved}`);
  els.layoutSelect.value = resolved;
  if (options.persist) {
    void chrome.storage.local.set({ layout: resolved });
  }
  notifyActionOfLayout(resolved);
}

function applyLanguage(language, options = {}) {
  const resolved = translations[language] ? language : "en";
  state.language = resolved;
  document.documentElement.lang = resolved;
  els.languageSelect.value = resolved;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;
    node.setAttribute("placeholder", t(key));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
    const key = node.dataset.i18nAriaLabel;
    node.setAttribute("aria-label", t(key));
  });

  els.currentGrid.dataset.empty = t("grid.currentEmpty");
  els.libraryGrid.dataset.empty = t("grid.libraryEmpty");
  els.resultsGrid.dataset.empty = t("grid.resultsEmpty");
  els.presetEmpty.textContent = t("panel.presetsEmpty");

  applyModuleOrder(state.moduleOrder);
  setupDragAndDrop();

  if (options.persist) {
    void chrome.storage.local.set({ language: resolved });
  }
}

function applyModuleOrder(order) {
  if (!els.modulesRoot) return;
  const sanitized = sanitizeModuleOrder(order);
  state.moduleOrder = sanitized;
  const panels = Array.from(els.modulesRoot.querySelectorAll("[data-module]"));
  const panelMap = new Map(panels.map((panel) => [panel.dataset.module, panel]));
  sanitized.forEach((key) => {
    const panel = panelMap.get(key);
    if (panel) {
      els.modulesRoot.appendChild(panel);
    }
  });
  panels.forEach((panel) => {
    if (!sanitized.includes(panel.dataset.module)) {
      els.modulesRoot.appendChild(panel);
    }
  });
}

function setupDragAndDrop() {
  if (!els.modulesRoot) return;
  const panels = Array.from(els.modulesRoot.querySelectorAll("[data-module]"));
  panels.forEach((panel) => {
    const handle = panel.querySelector(".drag-handle");
    if (!handle) return;
    handle.setAttribute("draggable", "true");
    if (!handle.dataset.dragBound) {
      handle.addEventListener("dragstart", onDragHandleStart);
      handle.addEventListener("dragend", onDragHandleEnd);
      handle.dataset.dragBound = "true";
    }
    if (!panel.dataset.dragBound) {
      panel.addEventListener("dragover", onPanelDragOver);
      panel.addEventListener("drop", onPanelDrop);
      panel.dataset.dragBound = "true";
    }
  });
}

function onDragHandleStart(evt) {
  const panel = evt.currentTarget.closest("[data-module]");
  if (!panel) return;
  draggingModuleKey = panel.dataset.module;
  panel.classList.add("panel-dragging");
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("text/plain", draggingModuleKey);
}

function onDragHandleEnd(evt) {
  const panel = evt.currentTarget.closest("[data-module]");
  if (panel) {
    panel.classList.remove("panel-dragging");
  }
  finalizeModuleOrder();
}

function onPanelDragOver(evt) {
  if (!draggingModuleKey) return;
  evt.preventDefault();
  const target = evt.currentTarget;
  const draggingPanel = els.modulesRoot.querySelector(".panel-dragging");
  if (!draggingPanel || draggingPanel === target) return;
  const rect = target.getBoundingClientRect();
  const isAfter = evt.clientY - rect.top > rect.height / 2;
  if (isAfter) {
    target.after(draggingPanel);
  } else {
    target.before(draggingPanel);
  }
}

function onPanelDrop(evt) {
  evt.preventDefault();
  finalizeModuleOrder();
}

function finalizeModuleOrder() {
  if (!els.modulesRoot) return;
  const panels = Array.from(els.modulesRoot.querySelectorAll("[data-module]"));
  panels.forEach((panel) => panel.classList.remove("panel-dragging"));
  draggingModuleKey = null;
  const newOrder = panels.map((panel) => panel.dataset.module);
  state.moduleOrder = sanitizeModuleOrder(newOrder);
  void chrome.storage.local.set({ moduleOrder: state.moduleOrder });
}

function sanitizeModuleOrder(order) {
  const list = Array.isArray(order) ? order : [];
  const filtered = list.filter((key) => MODULE_KEYS.includes(key));
  MODULE_KEYS.forEach((key) => {
    if (!filtered.includes(key)) {
      filtered.push(key);
    }
  });
  return filtered;
}
function setPrompt(value) {
  els.prompt.value = value;
  updatePromptCount();
  els.prompt.focus();
}

function updatePromptCount() {
  els.promptCount.textContent = `${els.prompt.value.length} / ${els.prompt.maxLength}`;
}

function onFilePick(evt) {
  const files = evt.target.files;
  if (files?.length) {
    processFiles(files);
    els.imageInput.value = "";
  }
}

function processFiles(fileList) {
  const files = Array.from(fileList);
  const slotsLeft = MAX_STYLE_IMAGES - state.currentInputs.length;
  if (slotsLeft <= 0) {
    notify(t("status.inputLimit", { max: MAX_STYLE_IMAGES }));
    return;
  }

  files.slice(0, slotsLeft).forEach(async (file) => {
    if (!file.type.startsWith("image/")) return;
    try {
      const dataUrl = await readFile(file);
      state.currentInputs.push({
        id: uuid(),
        name: file.name,
        mimeType: file.type,
        dataUrl
      });
      renderCurrentInputs();
    } catch (error) {
      console.error("Failed to read file", error);
      notify(t("status.readFailed", { name: file.name }));
    }
  });
}

function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderCurrentInputs() {
  els.currentGrid.dataset.empty = t("grid.currentEmpty");
  els.currentGrid.innerHTML = "";
  state.currentInputs.forEach((item, index) => {
    const node = els.thumbTemplate.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    img.src = item.dataUrl;
    img.alt = item.name || `${t("label.style")} ${index + 1}`;
    node.dataset.id = item.id;
    const actions = node.querySelector(".thumb-actions");
    actions.innerHTML = `
      <button class="ghost-btn xsmall" data-action="save" type="button">${t("actions.saveToLibrary")}</button>
      <button class="ghost-btn xsmall" data-action="remove" type="button">${t("actions.removeInput")}</button>
    `;
    els.currentGrid.appendChild(node);
  });
  els.clearCurrent.disabled = !state.currentInputs.length;
}

function renderLibrary() {
  els.libraryGrid.dataset.empty = t("grid.libraryEmpty");
  els.libraryGrid.innerHTML = "";
  state.library.forEach((item, index) => {
    const node = els.thumbTemplate.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    img.src = item.dataUrl;
    img.alt = item.label || `${t("label.style")} ${index + 1}`;
    node.dataset.id = item.id;
    const actions = node.querySelector(".thumb-actions");
    actions.innerHTML = `
      <button class="ghost-btn xsmall" data-action="use" type="button">${t("actions.useStyle")}</button>
      <button class="ghost-btn xsmall" data-action="delete" type="button">${t("actions.deleteStyle")}</button>
    `;
    els.libraryGrid.appendChild(node);
  });
  els.clearLibrary.disabled = !state.library.length;
}

function renderPresets() {
  els.presetList.innerHTML = "";
  if (!state.promptPresets.length) {
    els.presetEmpty.style.display = "block";
    els.clearPresets.disabled = true;
    return;
  }

  els.presetEmpty.style.display = "none";
  els.clearPresets.disabled = false;
  const locale = LOCALES[state.language] || "en-US";

  state.promptPresets.forEach((preset, index) => {
    const node = els.presetTemplate.content.firstElementChild.cloneNode(true);
    const titleEl = node.querySelector(".preset-card-title");
    const bodyEl = node.querySelector(".preset-card-body");
    const badgeEl = node.querySelector(".preset-badge");
    const actionsEl = node.querySelector(".preset-card-actions");

    const firstLine = (preset.text || "").split(/\r?\n/).find(Boolean) || `${t("label.style")} ${index + 1}`;
    titleEl.textContent = firstLine.length > 60 ? `${firstLine.slice(0, 57)}…` : firstLine;

    if (preset.createdAt) {
      const meta = document.createElement("small");
      meta.textContent = new Date(preset.createdAt).toLocaleString(locale, { hour12: false });
      titleEl.appendChild(meta);
    }

    bodyEl.textContent = preset.text;
    node.dataset.id = preset.id;

    const isDefault = preset.id === state.defaultPresetId;
    node.classList.toggle("is-default", isDefault);
    badgeEl.textContent = t("badge.default");

    const defaultLabel = isDefault ? t("actions.defaultActive") : t("actions.setDefault");
    const defaultDisabled = isDefault ? "disabled" : "";

    actionsEl.innerHTML = `
      <button class="primary-btn xsmall" data-action="apply" type="button">${t("actions.applyPreset")}</button>
      <button class="ghost-btn xsmall" data-action="default" type="button" ${defaultDisabled}>${defaultLabel}</button>
      <button class="ghost-btn xsmall" data-action="delete" type="button">${t("actions.deletePreset")}</button>
    `;

    els.presetList.appendChild(node);
  });
}

function renderResults() {
  els.resultsGrid.dataset.empty = t("grid.resultsEmpty");
  els.resultsGrid.innerHTML = "";
  state.results.forEach((item, index) => {
    const node = els.resultTemplate.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    img.src = item.dataUrl;
    img.alt = t("result.alt", { index: index + 1 });
    node.dataset.id = item.id;

    const actions = node.querySelector(".thumb-actions");
    actions.innerHTML = `
      <button class="ghost-btn xsmall" data-action="copy" type="button">${t("actions.copy")}</button>
      <button class="ghost-btn xsmall" data-action="download" type="button">${t("actions.download")}</button>
      <button class="ghost-btn xsmall" data-action="style" type="button">${t("actions.styleFromResult")}</button>
    `;

    if (item.fresh) {
      node.classList.add("enter");
      node.addEventListener("animationend", () => {
        node.classList.remove("enter");
      }, { once: true });
      delete item.fresh;
    }

    els.resultsGrid.appendChild(node);
  });

  els.clearResults.disabled = !state.results.length;
}

function onLibraryAction(evt) {
  const button = evt.target.closest("button[data-action]");
  if (!button) return;
  const id = button.closest(".thumb")?.dataset.id;
  if (!id) return;
  const item = state.library.find((entry) => entry.id === id);
  if (!item) return;

  if (button.dataset.action === "use") {
    addToCurrent(item);
  } else if (button.dataset.action === "delete") {
    void deleteFromLibrary(id);
  }
}

function onCurrentAction(evt) {
  const button = evt.target.closest("button[data-action]");
  if (!button) return;
  const id = button.closest(".thumb")?.dataset.id;
  if (!id) return;
  const idx = state.currentInputs.findIndex((entry) => entry.id === id);
  if (idx === -1) return;

  if (button.dataset.action === "save") {
    void persistToLibrary(state.currentInputs[idx]);
  } else if (button.dataset.action === "remove") {
    state.currentInputs.splice(idx, 1);
    renderCurrentInputs();
  }
}

function onResultAction(evt) {
  const button = evt.target.closest("button[data-action]");
  if (!button) return;
  const id = button.closest(".thumb")?.dataset.id;
  if (!id) return;
  const item = state.results.find((entry) => entry.id === id);
  if (!item) return;

  if (button.dataset.action === "copy") {
    copyImageToClipboard(item.dataUrl).catch((error) => {
      console.error("Clipboard error", error);
      notify(t("status.copyFailed"));
    });
  } else if (button.dataset.action === "download") {
    downloadImage(item);
  } else if (button.dataset.action === "style") {
    addToCurrent(item);
  }
}

function onPresetAction(evt) {
  const button = evt.target.closest("button[data-action]");
  if (!button) return;
  const card = button.closest(".preset-card");
  if (!card) return;
  const id = card.dataset.id;
  const preset = state.promptPresets.find((entry) => entry.id === id);
  if (!preset) return;

  if (button.dataset.action === "apply") {
    setPrompt(preset.text);
    notify(t("status.presetApplied"));
  } else if (button.dataset.action === "default") {
    void setDefaultPreset(id);
  } else if (button.dataset.action === "delete") {
    void deletePreset(id);
  }
}

function addToCurrent(source) {
  if (state.currentInputs.length >= MAX_STYLE_IMAGES) {
    notify(t("status.inputLimit", { max: MAX_STYLE_IMAGES }));
    return;
  }
  const payload = {
    id: uuid(),
    name: source.label || source.name || t("label.style"),
    mimeType: source.mimeType || inferMimeFromDataUrl(source.dataUrl),
    dataUrl: source.dataUrl
  };
  state.currentInputs.push(payload);
  renderCurrentInputs();
}

async function deleteFromLibrary(id) {
  state.library = state.library.filter((entry) => entry.id !== id);
  await chrome.storage.local.set({ styleLibrary: state.library });
  renderLibrary();
  notify(t("status.styleRemoved"));
}

async function persistToLibrary(item) {
  if (state.library.some((entry) => entry.dataUrl === item.dataUrl)) {
    notify(t("status.styleExists"));
    return;
  }
  const entry = {
    id: uuid(),
    label: item.name || t("label.style"),
    mimeType: item.mimeType,
    dataUrl: item.dataUrl,
    createdAt: Date.now()
  };
  state.library.unshift(entry);
  await chrome.storage.local.set({ styleLibrary: state.library });
  renderLibrary();
  notify(t("status.styleSaved"));
}
async function savePromptPreset() {
  const text = els.prompt.value.trim();
  if (!text) {
    notify(t("status.promptRequired"));
    els.prompt.focus();
    return;
  }
  if (state.promptPresets.some((preset) => preset.text === text)) {
    notify(t("status.presetExists"));
    return;
  }
  if (state.promptPresets.length >= MAX_PRESETS) {
    notify(t("status.presetLimit", { max: MAX_PRESETS }));
    return;
  }
  state.promptPresets.unshift({
    id: uuid(),
    text,
    createdAt: Date.now()
  });
  await persistPresets();
  renderPresets();
  notify(t("status.presetSaved"));
}

async function setDefaultPreset(id) {
  state.defaultPresetId = id;
  await persistPresets();
  renderPresets();
  notify(t("status.defaultPresetSet"));
}

async function deletePreset(id) {
  const index = state.promptPresets.findIndex((entry) => entry.id === id);
  if (index === -1) return;
  state.promptPresets.splice(index, 1);
  if (state.defaultPresetId === id) {
    state.defaultPresetId = state.promptPresets[0]?.id || "";
  }
  await persistPresets();
  renderPresets();
  notify(t("status.presetRemoved"));
}

async function clearAllPresets() {
  if (!state.promptPresets.length) return;
  if (!confirm(t("confirm.clearPresets"))) return;
  state.promptPresets = [];
  state.defaultPresetId = "";
  await persistPresets();
  renderPresets();
  notify(t("status.presetsCleared"));
}

async function persistPresets() {
  await chrome.storage.local.set({
    promptPresets: state.promptPresets,
    defaultPresetId: state.defaultPresetId
  });
}

async function persistResults() {
  const payload = state.results.slice(0, MAX_RESULTS).map((item) => ({
    id: item.id,
    dataUrl: item.dataUrl,
    label: item.label || null,
    createdAt: item.createdAt || Date.now()
  }));
  await chrome.storage.local.set({ recentResults: payload });
}

async function clearResultsList() {
  if (!state.results.length) return;
  state.results = [];
  renderResults();
  await persistResults();
  notify(t("status.resultsCleared"));
}

async function generateImages() {
  if (!state.apiKey) {
    notify(t("status.apiKeyMissing"));
    toggleDialog(true);
    return;
  }
  const prompt = els.prompt.value.trim();
  if (!prompt) {
    notify(t("status.promptRequired"));
    els.prompt.focus();
    return;
  }

  const inputs = state.currentInputs.map((item) => ({
    inline_data: {
      mime_type: item.mimeType || inferMimeFromDataUrl(item.dataUrl),
      data: toBase64(item.dataUrl)
    }
  }));

  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }, ...inputs]
      }
    ]
  };

  setLoading(true, t("loading.generating"));

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": state.apiKey
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorDetail = await safeParse(response);
      throw new Error(errorDetail?.error?.message || response.statusText);
    }

    const payload = await response.json();
    const imageParts = collectImageParts(payload);
    if (!imageParts.length) {
      notify(t("status.noImages"));
      return;
    }

    imageParts.forEach((image, idx) => {
      if (!image?.base64) return;
      const mime = image.mimeType || "image/png";
      const dataUrl = `data:${mime};base64,${image.base64}`;
      state.results.unshift({
        id: uuid(),
        dataUrl,
        label: t("label.result", { index: state.results.length + idx + 1 }),
        createdAt: Date.now(),
        fresh: true
      });
    });

    while (state.results.length > MAX_RESULTS) {
      state.results.pop();
    }

    renderResults();
    await persistResults();
    notify(t("status.generatedCount", { count: imageParts.length }));
  } catch (error) {
    console.error("Generation failed", error);
    notify(error.message || t("status.generationFailed"));
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading, message = "") {
  els.generateBtn.disabled = isLoading;
  els.loadingOverlay.classList.toggle("hidden", !isLoading);
  if (isLoading) {
    loadingMessage = message;
    if (message) {
      els.status.textContent = message;
    }
  } else {
    if (els.status.textContent === loadingMessage) {
      els.status.textContent = "";
    }
    loadingMessage = "";
  }
}

function notify(message) {
  els.status.textContent = message;
  if (!message) return;
  clearTimeout(notify._timeout);
  notify._timeout = setTimeout(() => {
    if (els.status.textContent === message) {
      els.status.textContent = "";
    }
  }, 3200);
}

function inferMimeFromDataUrl(dataUrl) {
  const match = /^data:([^;]+);/.exec(dataUrl);
  return match ? match[1] : "image/png";
}

function toBase64(dataUrl) {
  return dataUrl.split(",")[1] || "";
}

function collectImageParts(payload) {
  const bucket = [];

  const pushCandidate = (candidate) => {
    if (!candidate) return;
    if (candidate.inlineData) {
      pushCandidate(candidate.inlineData);
      return;
    }
    if (candidate.inline_data) {
      pushCandidate(candidate.inline_data);
      return;
    }
    if (candidate.image) {
      pushCandidate(candidate.image);
      return;
    }
    if (candidate.imageData) {
      pushCandidate(candidate.imageData);
      return;
    }

    const rawBase64 =
      candidate.data ||
      candidate.base64 ||
      candidate.bytesBase64 ||
      candidate.imageBytes ||
      candidate.imageBase64 ||
      (typeof candidate.content === "string" ? candidate.content : candidate.content?.data) ||
      (typeof candidate.rawContent === "string" ? candidate.rawContent : candidate.rawContent?.data);

    const base64 = typeof rawBase64 === "string" ? rawBase64.replace(/\s+/g, "") : "";
    if (!base64) return;

    const mime =
      candidate.mimeType ||
      candidate.mime_type ||
      candidate.contentType ||
      candidate.mediaType ||
      "image/png";

    bucket.push({
      base64,
      mimeType: mime
    });
  };

  const visit = (items) => {
    if (!Array.isArray(items)) return;
    items.forEach((item) => {
      if (item?.parts) {
        visit(item.parts);
        return;
      }
      pushCandidate(item);
    });
  };

  visit(payload?.images);
  visit(payload?.generatedImages);
  visit(payload?.generated_images);
  visit(payload?.data);
  visit(payload?.results);

  if (Array.isArray(payload?.candidates)) {
    payload.candidates.forEach((candidate) => {
      visit(candidate?.content?.parts);
    });
  }

  if (Array.isArray(payload?.response?.candidates)) {
    payload.response.candidates.forEach((candidate) => {
      visit(candidate?.content?.parts);
    });
  }

  if (Array.isArray(payload?.responses)) {
    payload.responses.forEach((entry) => {
      visit(entry?.content?.parts || entry?.parts);
    });
  }

  if (Array.isArray(payload?.outputs)) {
    payload.outputs.forEach((output) => {
      visit(output?.content?.parts);
    });
  }

  if (payload?.output) {
    visit(payload.output?.content?.parts);
  }

  return bucket;
}

async function saveApiKey() {
  const key = els.apiKeyInput.value.trim();
  if (!key) {
    notify(t("status.apiKeyEmpty"));
    return;
  }
  await chrome.storage.local.set({ apiKey: key });
  state.apiKey = key;
  notify(t("status.apiSaved"));
  toggleDialog(false);
}

async function removeApiKey() {
  await chrome.storage.local.remove("apiKey");
  state.apiKey = "";
  els.apiKeyInput.value = "";
  notify(t("status.apiRemoved"));
}

function toggleDialog(open) {
  els.settingsDialog.classList.toggle("hidden", !open);
  if (open) {
    els.apiKeyInput.focus();
  }
}

async function copyImageToClipboard(dataUrl) {
  if (!navigator?.clipboard?.write || typeof ClipboardItem === "undefined") {
    notify(t("status.copyFailed"));
    return;
  }
  const blob = dataUrlToBlob(dataUrl);
  await navigator.clipboard.write([
    new ClipboardItem({ [blob.type]: blob })
  ]);
  notify(t("status.copySuccess"));
}

function downloadImage(item) {
  const blob = dataUrlToBlob(item.dataUrl);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const base = item.label || t("file.default");
  a.download = `${base}-${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function dataUrlToBlob(dataUrl) {
  const base64 = toBase64(dataUrl);
  const mime = inferMimeFromDataUrl(dataUrl);
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  return new Blob([bytes], { type: mime });
}

async function safeParse(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function notifyActionOfLayout(layout) {
  try {
    chrome?.runtime?.sendMessage?.({ type: "layoutChanged", layout });
  } catch (error) {
    console.warn("Unable to notify layout change", error);
  }
}

function uuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}


