let container;

function initToastContainer(position = "top-right") {
  if (!container) {
    container = document.createElement("toast-container");
    container.position = position;
    container.addEventListener("toast-container-empty", () => {
      container.remove();
      container = null;
    });
    document.body.appendChild(container);
  } else container.position = position;
}

export function toast(message, options = {}) {
  const position = options.position || "top-right";
  const type = options.type || "default";
  if (!container) initToastContainer(position);
  else if (container.position !== position) container.position = position;
  container.addToast(message, type);
}

toast.success = (msg, opts = {}) => toast(msg, { ...opts, type: "success" });
toast.info = (msg, opts = {}) => toast(msg, { ...opts, type: "info" });
toast.warn = (msg, opts = {}) => toast(msg, { ...opts, type: "warn" });
toast.error = (msg, opts = {}) => toast(msg, { ...opts, type: "error" });