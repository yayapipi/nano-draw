const MAX_STYLE_IMAGES = 6;
const MAX_RESULTS = 20;
const MODEL_NAME = "gemini-2.5-flash-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

const state = {
  apiKey: "",
  currentInputs: [],
  library: [],
  results: []
};

let loadingMessage = "";

const els = {
  prompt: document.getElementById("promptInput"),
  promptCount: document.getElementById("promptCount"),
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
  thumbTemplate: document.getElementById("thumbTemplate"),
  resultTemplate: document.getElementById("resultTemplate")
};

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}


init();

async function init() {
  attachEventListeners();
  await hydrateState();
  updatePromptCount();
  renderLibrary();
  renderCurrentInputs();
  renderResults();
}

function attachEventListeners() {
  els.prompt.addEventListener("input", updatePromptCount);
  els.imageInput.addEventListener("change", onFilePick);
  els.generateBtn.addEventListener("click", generateImages);
  els.clearCurrent.addEventListener("click", () => {
    state.currentInputs = [];
    renderCurrentInputs();
  });
  els.clearLibrary.addEventListener("click", async () => {
    if (!state.library.length) return;
    if (!confirm("Clear all saved styles?")) return;
    state.library = [];
    await chrome.storage.local.set({ styleLibrary: [] });
    renderLibrary();
  });
  els.clearResults.addEventListener("click", () => {
    state.results = [];
    renderResults();
  });
  els.openSettings.addEventListener("click", () => toggleDialog(true));
  els.closeSettings.addEventListener("click", () => toggleDialog(false));
  els.settingsDialog.addEventListener("click", (evt) => {
    if (evt.target === els.settingsDialog) toggleDialog(false);
  });
  els.saveApiKey.addEventListener("click", saveApiKey);
  els.deleteApiKey.addEventListener("click", removeApiKey);

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
}

async function hydrateState() {
  try {
    const { apiKey = "", styleLibrary = [] } = await chrome.storage.local.get({
      apiKey: "",
      styleLibrary: []
    });
    state.apiKey = apiKey;
    state.library = styleLibrary;
    els.apiKeyInput.value = apiKey;
  } catch (error) {
    console.error("Failed to hydrate state", error);
    notify("Unable to load saved settings.");
  }
}

function updatePromptCount() {
  const current = els.prompt.value.length;
  els.promptCount.textContent = `${current} / ${els.prompt.maxLength}`;
}

function onFilePick(evt) {
  const files = evt.target.files;
  if (files?.length) {
    processFiles(files);
    els.imageInput.value = "";
  }
}

function processFiles(fileList) {
  const files = Array.from(fileList).slice(0, MAX_STYLE_IMAGES);
  const slotsLeft = MAX_STYLE_IMAGES - state.currentInputs.length;
  if (slotsLeft <= 0) {
    notify(`Maximum of ${MAX_STYLE_IMAGES} style images reached.`);
    return;
  }

  const toProcess = files.slice(0, slotsLeft);
  toProcess.forEach(async (file) => {
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
      notify(`Unable to read ${file.name}.`);
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
  els.currentGrid.innerHTML = "";
  state.currentInputs.forEach((item, index) => {
    const node = els.thumbTemplate.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    img.src = item.dataUrl;
    img.alt = item.name || `Style ${index + 1}`;
    node.dataset.id = item.id;
    const actions = node.querySelector(".thumb-actions");
    actions.innerHTML = `
      <button class="ghost-btn small" data-action="save" type="button">Save</button>
      <button class="ghost-btn small" data-action="remove" type="button">Remove</button>
    `;
    els.currentGrid.appendChild(node);
  });
}

function renderLibrary() {
  els.libraryGrid.innerHTML = "";
  state.library.forEach((item, index) => {
    const node = els.thumbTemplate.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    img.src = item.dataUrl;
    img.alt = item.label || `Library ${index + 1}`;
    node.dataset.id = item.id;
    const actions = node.querySelector(".thumb-actions");
    actions.innerHTML = `
      <button class="ghost-btn small" data-action="use" type="button">Use</button>
      <button class="ghost-btn small" data-action="delete" type="button">Delete</button>
    `;
    els.libraryGrid.appendChild(node);
  });
}

function renderResults() {
  els.resultsGrid.innerHTML = "";
  state.results.forEach((item, index) => {
    const node = els.resultTemplate.content.firstElementChild.cloneNode(true);
    const img = node.querySelector("img");
    img.src = item.dataUrl;
    img.alt = item.label || `Result ${index + 1}`;
    node.dataset.id = item.id;
    els.resultsGrid.appendChild(node);
  });
}

async function saveApiKey() {
  const key = els.apiKeyInput.value.trim();
  if (!key) {
    notify("API key is empty.");
    return;
  }
  await chrome.storage.local.set({ apiKey: key });
  state.apiKey = key;
  notify("API key saved.");
  toggleDialog(false);
}

async function removeApiKey() {
  await chrome.storage.local.remove("apiKey");
  state.apiKey = "";
  els.apiKeyInput.value = "";
  notify("API key removed.");
}

function toggleDialog(open) {
  els.settingsDialog.classList.toggle("hidden", !open);
  if (open) {
    els.apiKeyInput.focus();
  }
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
    deleteFromLibrary(id);
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
    persistToLibrary(state.currentInputs[idx]);
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

  const action = button.dataset.action;
  if (action === "copy") {
    copyImageToClipboard(item.dataUrl).catch((error) => {
      console.error("Clipboard error", error);
      notify("Copy failed. Try downloading instead.");
    });
  } else if (action === "download") {
    downloadImage(item);
  } else if (action === "style") {
    addToCurrent(item);
  }
}

function addToCurrent(source) {
  if (state.currentInputs.length >= MAX_STYLE_IMAGES) {
    notify(`Maximum of ${MAX_STYLE_IMAGES} style images reached.`);
    return;
  }
  const payload = {
    id: uuid(),
    name: source.label || source.name || "Style",
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
}

async function persistToLibrary(item) {
  if (state.library.some((entry) => entry.dataUrl === item.dataUrl)) {
    notify("Already saved.");
    return;
  }
  const entry = {
    id: uuid(),
    label: item.name || "Style",
    mimeType: item.mimeType,
    dataUrl: item.dataUrl,
    createdAt: Date.now()
  };
  state.library.unshift(entry);
  await chrome.storage.local.set({ styleLibrary: state.library });
  renderLibrary();
  notify("Saved to library.");
}

async function generateImages() {
  if (!state.apiKey) {
    notify("Add your Gemini API key in Settings.");
    toggleDialog(true);
    return;
  }
  const prompt = els.prompt.value.trim();
  if (!prompt) {
    notify("Write a prompt to generate.");
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

  setLoading(true, "Generating images...");

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
      notify("No images returned.");
      return;
    }

    imageParts.forEach((image, idx) => {
      if (!image?.base64) return;
      const mime = image.mimeType || "image/png";
      const dataUrl = `data:${mime};base64,${image.base64}`;
      state.results.unshift({
        id: uuid(),
        dataUrl,
        label: `Result ${state.results.length + idx + 1}`
      });
    });

    while (state.results.length > MAX_RESULTS) {
      state.results.pop();
    }

    renderResults();
    notify(`Received ${imageParts.length} image(s).`);
  } catch (error) {
    console.error("Generation failed", error);
    notify(error.message || "Generation failed.");
  } finally {
    setLoading(false);
  }
}

function setLoading(isLoading, message = "") {
  els.generateBtn.disabled = isLoading;
  if (isLoading) {
    loadingMessage = message;
    els.status.textContent = message;
    return;
  }
  if (els.status.textContent === loadingMessage) {
    els.status.textContent = "";
  }
  loadingMessage = "";
}

function notify(message) {
  els.status.textContent = message;
  if (!message) return;
  clearTimeout(notify._timeout);
  notify._timeout = setTimeout(() => {
    if (els.status.textContent === message) {
      els.status.textContent = "";
    }
  }, 3000);
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
      (typeof candidate.content === "string"
        ? candidate.content
        : candidate.content?.data) ||
      (typeof candidate.rawContent === "string"
        ? candidate.rawContent
        : candidate.rawContent?.data);

    const base64 =
      typeof rawBase64 === "string" ? rawBase64.replace(/\s+/g, "") : "";

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


async function copyImageToClipboard(dataUrl) {
  if (!navigator?.clipboard?.write || typeof ClipboardItem === "undefined") {
    notify("Clipboard not available in this context.");
    return;
  }
  const blob = dataUrlToBlob(dataUrl);
  await navigator.clipboard.write([
    new ClipboardItem({ [blob.type]: blob })
  ]);
  notify("Copied to clipboard.");
}

function downloadImage(item) {
  const blob = dataUrlToBlob(item.dataUrl);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${item.label || "nano-draw"}.png`;
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








