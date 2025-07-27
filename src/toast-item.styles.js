import { css } from "lit";

export const toastItemStyles = css`
  :host {
    display: block;
    background: white;
    border: 1px solid #e1e5e9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-bottom: 8px;
    min-width: 356px;
    transition: all 300ms ease;
    transform: translateX(0);
    opacity: 1;
    pointer-events: auto;
    position: relative;
    overflow: hidden;
  }

  /* Fade in animation */
  :host([fadein]) {
    transform: translateX(100%);
    opacity: 0;
  }

  /* Exit animation */
  :host([exiting]) {
    transform: translateX(100%);
    opacity: 0;
  }

  /* Exit up animation */
  :host([exitup]) {
    transform: translateY(-100%);
    opacity: 0;
  }

  /* Toast type colors */
  :host([type="success"]) {
    border-left: 4px solid #22c55e;
  }

  :host([type="error"]) {
    border-left: 4px solid #ef4444;
  }

  :host([type="warn"]) {
    border-left: 4px solid #f59e0b;
  }

  :host([type="info"]) {
    border-left: 4px solid #3b82f6;
  }

  .toast-message {
    font-size: 14px;
    line-height: 1.4;
    color: #1f2937;
    word-wrap: break-word;
  }

  /* Hover states */
  :host(.expanded) {
    transform: scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  /* Type-specific icon colors (if we add icons later) */
  :host([type="success"]) .toast-icon {
    color: #22c55e;
  }

  :host([type="error"]) .toast-icon {
    color: #ef4444;
  }

  :host([type="warn"]) .toast-icon {
    color: #f59e0b;
  }

  :host([type="info"]) .toast-icon {
    color: #3b82f6;
  }
`;