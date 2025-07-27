import { LitElement, html } from "lit";
import { toastItemStyles } from "./toast-item.styles.js";

export class ToastItem extends LitElement {
  static properties = {
    fadeIn: { type: Boolean, reflect: true },
    exiting: { type: Boolean, reflect: true },
    exitup: { type: Boolean, reflect: true },
    message: { type: String },
    type: { type: String, reflect: true },
  };

  static styles = [toastItemStyles];

  constructor() {
    super();
    this.exiting = false;
    this.exitup = false;
    this.type = "default";
    this.fadeIn = true;
  }

  firstUpdated() {
    // 500ms 후 fadeIn false로 변경
    setTimeout(() => {
      this.fadeIn = false;
    }, 500);
  }

  render() {
    return html`<div class="toast-message">${this.message}</div>`;
  }
}

customElements.define("toast-item", ToastItem);