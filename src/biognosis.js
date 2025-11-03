/**
 * biognosis.js
 * A ritual library to obscure subtle biometric signals from browsers + UIs
 * Part of The Listening Root codex | invisibleweave
 */

const Biognosis = (() => {
  let isInitialized = false;

  const subtleDisruptions = {
    cursorNoise: () => {
      document.addEventListener("mousemove", (e) => {
        e.movementX += Math.random() * 0.3 - 0.15;
        e.movementY += Math.random() * 0.3 - 0.15;
      });
    },
    keystrokeObfuscation: () => {
      const originalAddEventListener = KeyboardEvent.prototype.addEventListener;
      KeyboardEvent.prototype.addEventListener = function (type, listener, options) {
        if (type === 'keydown') {
          const wrapped = (e) => {
            const delay = Math.random() * 30; // Introduces natural delay
            setTimeout(() => listener.call(this, e), delay);
          };
          return originalAddEventListener.call(this, type, wrapped, options);
        }
        return originalAddEventListener.call(this, type, listener, options);
      };
    }
  };

  const init = () => {
    if (isInitialized) return;
    subtleDisruptions.cursorNoise();
    subtleDisruptions.keystrokeObfuscation();
    isInitialized = true;
    console.log("🧿 biognosis activated.");
  };

  return { init };
})();

// Auto-init on load
window.addEventListener("DOMContentLoaded", () => {
  Biognosis.init();
});
