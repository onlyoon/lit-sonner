import { css } from "lit";

export const toastContainerStyles = css`
  :host {
    position: fixed;
    z-index: 9999;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
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

  /* Container wrapper */
  div {
    display: flex;
    flex-direction: column;
    gap: 8px;
    pointer-events: auto;
  }

  /* Toast items */
  toast-item {
    pointer-events: auto;
  }

  /* Stacked toast effect */
  toast-item:not(:last-child) {
    margin-bottom: -4px;
  }

  /* Hover effect for expanded state */
  toast-item.expanded {
    margin-bottom: 0;
  }
`;