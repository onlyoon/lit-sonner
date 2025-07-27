import { css } from "lit";

export const toastItemStyles = css`
  :host {
    display: block;
    position: relative;
    width: 270px; /* 300 - 30px */
    background: white;
    border: 1px solid black;
    padding: 12px 16px;
    margin-top: 12px;
    /* margin 애니메이션은 hover 시 사용할 수 있음 */
    transition: margin 0.3s ease;
    /* z-index 음수는 위험, 기본 혹은 0 이상으로 */
    z-index: 0;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    font-family: Pretendard;
    font-size: 0.85rem;
    opacity: 1;
    /* fadein 애니메이션은 상황에 맞게 필요하면 유지 */
    animation: none;
  }

  :host(.expanded) {
    margin-top: 12px; /* hover 시 간격 벌리기 */
    z-index: 10;
  }

  :host([fadeIn]) {
    animation: fadein 0.5s ease forwards;
  }

  :host([exiting]) {
    animation: fadeout 0.5s ease forwards;
  }

  :host([exitup]) {
    animation: fadeout-up 1s ease forwards;
  }

  /* 타입별 색상 */
  :host([type="default"]) {
    background: white;
    border: 1px solid #ccc;
    color: #333;
  }

  :host([type="success"]) {
    background: #e6ffed;
    border: 1px solid #2ecc71;
    color: #2ecc71;
  }

  :host([type="info"]) {
    background: #eaf6ff;
    border: 1px solid #3498db;
    color: #3498db;
  }

  :host([type="warn"]) {
    background: #fff8e6;
    border: 1px solid #f39c12;
    color: #f39c12;
  }

  :host([type="error"]) {
    background: #ffeaea;
    border: 1px solid #e74c3c;
    color: #e74c3c;
  }

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeout {
    from {
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(90px);
    }
  }

  @keyframes fadeout-up {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-90px);
    }
  }

  .toast-message {
    white-space: pre-wrap; /* 줄바꿈 및 공백 유지 */
    word-wrap: break-word;
    -webkit-line-clamp: 2; /* 최대 2줄 */
  }
`;