# Nano Draw

Nano Draw is a Chrome extension that lets you prototype visuals with Google Gemini's `gemini-2.5-flash-image-preview` model. Upload inspirational images, craft prompts, and iterate directly inside the browser popup.

## Highlights
- Combine up to six reference images to steer the model's style.
- Save prompt presets (including a default) for quick reuse.
- Maintain a style library and keep your five most recent generations handy between sessions.
- Switch between light or dark themes and popout or sidebar layouts.
- Drag and reorder modules to suit your workflow.
- Work in English or Traditional Chinese, all stored locally in the browser.
- Generate images, then copy, download, or reapply them as styling inputs.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yayapipi/nano-draw.git
   cd nano-draw
   ```
2. Open `chrome://extensions` and enable **Developer mode**.
3. Choose **Load unpacked** and select the project folder.

## First Run
1. Open the Nano Draw popup from the Chrome toolbar.
2. Click **Settings** and paste a valid Gemini API key.
3. Optionally upload style reference images (drag-and-drop is supported).
4. Enter or select a prompt preset, then press **Generate**.

## Prompt Presets
- Use **Save Preset** to store the current prompt for later.
- Click **Apply** on any preset to populate the prompt field.
- Mark a preset as **Default** to auto-fill the prompt when the popup opens.
- Presets are stored locally and can be removed individually or cleared in one click.

## Tips
- Hold on to favourite results by copying them to the clipboard or downloading locally.
- Saved styles can be reapplied to new generations from the combined **Style Reference** module.
- Adjust language, theme, and layout in **Settings** to match your workflow.
- Check the popup's DevTools (... > Inspect) if you need detailed API error messages.

## License
MIT


