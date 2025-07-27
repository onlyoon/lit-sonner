import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('lit-sonner')
export class LitSonner extends LitElement {
  @state()
  toasts = [];

  static styles = css`
    :host {
      position: fixed;
      z-index: 9999;
      pointer-events: none;
    }

    .toast-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-width: 356px;
    }

    .toast {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      pointer-events: auto;
      transform: translateX(0);
      transition: all 0.3s ease;
    }

    .toast.entering {
      transform: translateX(100%);
      opacity: 0;
    }

    .toast.exiting {
      transform: translateX(100%);
      opacity: 0;
    }

    .toast-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }

    .toast-icon {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    .toast-title {
      font-weight: 500;
      font-size: 14px;
      line-height: 1.4;
      color: #111827;
    }

    .toast-description {
      font-size: 13px;
      line-height: 1.4;
      color: #6b7280;
    }

    .toast-actions {
      display: flex;
      gap: 8px;
      margin-top: 8px;
    }

    .toast-button {
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #d1d5db;
      background: white;
      font-size: 12px;
      cursor: pointer;
    }

    .toast-button:hover {
      background: #f9fafb;
    }

    .toast-dismiss {
      position: absolute;
      top: 8px;
      right: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
    }

    .toast-dismiss:hover {
      background: #f3f4f6;
    }

    /* Position styles */
    :host([position="top-right"]) {
      top: 16px;
      right: 16px;
    }

    :host([position="top-left"]) {
      top: 16px;
      left: 16px;
    }

    :host([position="top-center"]) {
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    :host([position="bottom-right"]) {
      bottom: 16px;
      right: 16px;
    }

    :host([position="bottom-left"]) {
      bottom: 16px;
      left: 16px;
    }

    :host([position="bottom-center"]) {
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
    }

    /* Toast type styles */
    .toast.success {
      border-color: #10b981;
    }

    .toast.error {
      border-color: #ef4444;
    }

    .toast.warning {
      border-color: #f59e0b;
    }

    .toast.info {
      border-color: #3b82f6;
    }

    .success .toast-icon {
      color: #10b981;
    }

    .error .toast-icon {
      color: #ef4444;
    }

    .warning .toast-icon {
      color: #f59e0b;
    }

    .info .toast-icon {
      color: #3b82f6;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    // Toast 이벤트 리스너 등록
    window.addEventListener('lit-sonner-add', this.handleAddToast.bind(this));
    window.addEventListener('lit-sonner-remove', this.handleRemoveToast.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('lit-sonner-add', this.handleAddToast.bind(this));
    window.removeEventListener('lit-sonner-remove', this.handleRemoveToast.bind(this));
  }

  handleAddToast(event) {
    const toast = event.detail;
    this.toasts = [...this.toasts, toast];
    
    // Auto-dismiss 설정
    if (toast.duration > 0) {
      setTimeout(() => {
        this.dismissToast(toast.id);
        if (toast.onAutoClose) {
          toast.onAutoClose();
        }
      }, toast.duration);
    }
  }

  handleRemoveToast(event) {
    const toastId = event.detail;
    this.dismissToast(toastId);
  }

  dismissToast(id) {
    const toast = this.toasts.find(t => t.id === id);
    if (toast && toast.onDismiss) {
      toast.onDismiss();
    }
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  renderIcon(type) {
    switch (type) {
      case 'success':
        return html`✓`;
      case 'error':
        return html`✕`;
      case 'warning':
        return html`⚠`;
      case 'info':
        return html`ℹ`;
      case 'loading':
        return html`⟳`;
      default:
        return html``;
    }
  }

  render() {
    return html`
      <div class="toast-container">
        ${this.toasts.map(toast => html`
          <div class="toast ${toast.type}" data-id="${toast.id}">
            ${toast.dismissible ? html`
              <button 
                class="toast-dismiss" 
                @click=${() => this.dismissToast(toast.id)}
              >
                ✕
              </button>
            ` : ''}
            
            <div class="toast-header">
              ${toast.type !== 'default' ? html`
                <span class="toast-icon">${this.renderIcon(toast.type)}</span>
              ` : ''}
              ${toast.title ? html`
                <div class="toast-title">${toast.title}</div>
              ` : ''}
            </div>
            
            ${toast.description ? html`
              <div class="toast-description">${toast.description}</div>
            ` : ''}
            
            ${toast.action || toast.cancel ? html`
              <div class="toast-actions">
                ${toast.action ? html`
                  <button 
                    class="toast-button" 
                    @click=${toast.action.onClick}
                  >
                    ${toast.action.label}
                  </button>
                ` : ''}
                ${toast.cancel ? html`
                  <button 
                    class="toast-button" 
                    @click=${() => {
                      if (toast.cancel.onClick) toast.cancel.onClick();
                      this.dismissToast(toast.id);
                    }}
                  >
                    ${toast.cancel.label}
                  </button>
                ` : ''}
              </div>
            ` : ''}
          </div>
        `)}
      </div>
    `;
  }
}