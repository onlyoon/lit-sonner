import { css } from "lit";

export const toastContainerStyles = css`
  :host {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    width: 300px;
    min-height: 50px;
    /* background: rgba(255, 0, 0, 0.3); */
    padding-bottom: 2rem;
    pointer-events: auto;
  }

  :host([position="top-right"]) {
    top: 0px;
    right: 16px;
    align-items: flex-end;
  }

  :host([position="top-left"]) {
    top: 0px;
    left: 16px;
    align-items: flex-start;
  }

  :host([position="bottom-right"]) {
    bottom: 0px;
    right: 16px;
    align-items: flex-end;
  }

  :host([position="bottom-left"]) {
    bottom: 0px;
    left: 16px;
    align-items: flex-start;
  }

  :host([position="top-center"]) {
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }

  :host([position="bottom-center"]) {
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
  }
`;