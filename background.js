const DEFAULT_LAYOUT = "popout";
let currentLayout = DEFAULT_LAYOUT;

chrome.runtime.onInstalled.addListener(() => {
  ensureSidePanelEnabled();
  loadLayoutPreference();
  syncActionBehavior();
});

chrome.runtime.onStartup.addListener(() => {
  ensureSidePanelEnabled();
  loadLayoutPreference();
  syncActionBehavior();
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== "local" || !changes.layout) return;
  currentLayout = normalizeLayout(changes.layout.newValue);
  syncActionBehavior(currentLayout);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "layoutChanged") {
    currentLayout = normalizeLayout(message.layout);
    syncActionBehavior(currentLayout);
  }
});

chrome.action.onClicked.addListener((tab) => {
  const tabId = tab?.id;
  if (currentLayout === "sidebar" && tabId !== undefined) {
    tryOpenSidePanel(tabId);
  } else {
    chrome.action.openPopup().catch((error) => {
      console.warn("openPopup failed", error);
    });
  }
});

function ensureSidePanelEnabled() {
  try {
    chrome.sidePanel.setOptions({ enabled: true, path: "index.html?view=sidepanel" }).catch((error) => {
      console.warn("Unable to initialize side panel", error);
    });
  } catch (error) {
    console.warn("Side panel API not available", error);
  }
}

function loadLayoutPreference() {
  chrome.storage.local.get({ layout: DEFAULT_LAYOUT }, ({ layout }) => {
    currentLayout = normalizeLayout(layout);
  });
}

function syncActionBehavior(layoutPreference) {
  const layout = normalizeLayout(layoutPreference ?? currentLayout);
  currentLayout = layout;
  if (layout === "sidebar") {
    chrome.action.setPopup({ popup: "" }).catch((error) => {
      console.warn("Unable to clear popup", error);
    });
  } else {
    chrome.action.setPopup({ popup: "index.html" }).catch((error) => {
      console.warn("Unable to set popup", error);
    });
  }
}

function tryOpenSidePanel(tabId) {
  try {
    chrome.sidePanel
      .setOptions({ tabId, path: "index.html?view=sidepanel" })
      .catch((error) => console.warn("setOptions failed", error));
    chrome.sidePanel
      .open({ tabId })
      .catch((error) => {
        if (/user gesture/i.test(error?.message || "")) {
          console.warn("Side panel open requires an immediate user gesture.", error);
        } else {
          console.error("Unable to open side panel", error);
        }
      });
  } catch (error) {
    console.warn("Side panel API not available", error);
  }
}

function normalizeLayout(layout) {
  return layout === "sidebar" ? "sidebar" : "popout";
}
