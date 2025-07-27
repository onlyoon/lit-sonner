import { LitElement, html, css } from "lit";
import { toastContainerStyles } from "./toast-container.styles.js";

export class ToastContainer extends LitElement {
  static properties = {
    position: { type: String, reflect: true },
    toasts: { type: Array },
    _hovered: { type: Boolean },
    maxVisible: { type: Number },
  };

  static styles = [toastContainerStyles];

  constructor() {
    super();
    this.position = "top-right"; // 기본 위치
    this.toasts = [];
    this._hovered = false;
    this.maxVisible = 5;
  }

  /**
   * Adds a new toast to the container
   * @param {string} message - Toast message content
   * @param {string} type - Toast type (default, success, error, etc.)
   */
  async addToast(message, type = "default") {
    const id = Date.now() + Math.random();

    const oldItems = Array.from(this.shadowRoot.querySelectorAll("toast-item"));
    const oldRects = new Map(oldItems.map(el => [el.getAttribute("data-id"), el.getBoundingClientRect()]));

    this.toasts = [...this.toasts, { id, message, type, exiting: false, fadeIn: true, exitUp: false }];
    await this.updateComplete;

    const newItems = Array.from(this.shadowRoot.querySelectorAll("toast-item"));
    newItems.forEach((el, index) => {
      const elId = el.getAttribute("data-id");
      if (elId === String(id)) return;
      const prev = oldRects.get(elId);
      if (!prev) return;
      const next = el.getBoundingClientRect();
      const dy = prev.top - next.top;
      if (dy !== 0) {
        el.style.transition = "none";
        el.style.transform = `translateY(${dy}px)`;
        if (index === 0 && this.toasts.length >= 5) el.style.opacity = "1";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            el.style.transition = "transform 300ms ease, opacity 300ms ease";
            el.style.transform = "translateY(0)";
            if (index === 0 && this.toasts.length >= 5) el.style.opacity = "0";
          });
        });
      }
    });

    clearTimeout(this._exitTimer);
    this._exitTimer = setTimeout(() => this._beginExitSequence(), 2000);
    if (this.toasts.length >= this.maxVisible) {
      this._handleOverflow();
    }
  }

  /**
   * Handles overflow by removing oldest toast after animation completes
   */
  _handleOverflow() {
    this.toasts = this.toasts.slice(-5);
    this.requestUpdate();
  }

  /**
   * Begins the exit sequence for all toasts
   * Each toast will exit upward (exitUp: true) for a more natural animation
   */
  async _beginExitSequence() {
    const step = 200;

    for (let i = 0; i < this.toasts.length; i++) {
      const toast = this.toasts[i];
      setTimeout(async () => {
        this.toasts = this.toasts.map(item => (item.id === toast.id ? { ...item, exiting: true } : item));
        await this.updateComplete;
        setTimeout(() => {
          this.toasts = this.toasts.filter(item => item.id !== toast.id);
          this.requestUpdate();

          if (this.toasts.length === 0) {
            this.dispatchEvent(new CustomEvent("toast-container-empty", { bubbles: true, composed: true }));
          }
        }, 1000);
      }, step * i);
    }
  }

  render() {
    const expanded = this._hovered; // 내부 hover 상태
    return html`
      <div @mouseenter=${() => (this._hovered = true)} @mouseleave=${() => (this._hovered = false)}>
        ${this.toasts.map(
          t =>
            html`<toast-item
              data-id="${t.id}"
              class=${this._hovered ? "expanded" : ""}
              .fadeIn=${t.fadeIn}
              .exiting=${t.exiting}
              .exitup=${t.exitUp}
              type=${t.type ?? "default"}
              .message=${t.message}
            ></toast-item>`,
        )}
      </div>
    `;
  }
}

customElements.define("toast-container", ToastContainer);