// Toast 기본 설정
const DEFAULT_DURATION = 4000;
const DEFAULT_POSITION = 'bottom-right';

// Toast ID 생성기
let toastCounter = 0;
function generateId() {
  return `toast-${++toastCounter}-${Date.now()}`;
}

// Toast 기본 옵션
function createToast(options) {
  const toast = {
    id: options.id || generateId(),
    type: options.type || 'default',
    title: options.title || '',
    description: options.description || '',
    duration: options.duration !== undefined ? options.duration : DEFAULT_DURATION,
    position: options.position || DEFAULT_POSITION,
    dismissible: options.dismissible !== undefined ? options.dismissible : true,
    createdAt: Date.now(),
    action: options.action,
    cancel: options.cancel,
    onDismiss: options.onDismiss,
    onAutoClose: options.onAutoClose
  };

  return toast;
}

// Toast 추가 이벤트 발송
function addToast(options) {
  const toast = createToast(options);
  
  // Sonner 컴포넌트가 있는지 확인하고 없으면 생성
  let sonner = document.querySelector('lit-sonner');
  if (!sonner) {
    sonner = document.createElement('lit-sonner');
    sonner.setAttribute('position', toast.position);
    document.body.appendChild(sonner);
  }

  // Toast 추가 이벤트 발송
  window.dispatchEvent(new CustomEvent('lit-sonner-add', {
    detail: toast
  }));

  return toast.id;
}

// Toast 제거 이벤트 발송
function removeToast(id) {
  window.dispatchEvent(new CustomEvent('lit-sonner-remove', {
    detail: id
  }));
}

// 메인 toast 함수
export function toast(message, options = {}) {
  if (typeof message === 'string') {
    options = { ...options, title: message };
  } else {
    options = { ...message, ...options };
  }

  return addToast(options);
}

// Toast 타입별 헬퍼 함수들
toast.success = (message, options = {}) => {
  return toast(message, { ...options, type: 'success' });
};

toast.error = (message, options = {}) => {
  return toast(message, { ...options, type: 'error' });
};

toast.warning = (message, options = {}) => {
  return toast(message, { ...options, type: 'warning' });
};

toast.info = (message, options = {}) => {
  return toast(message, { ...options, type: 'info' });
};

toast.loading = (message, options = {}) => {
  return toast(message, { ...options, type: 'loading', duration: 0 });
};

// Toast 제거 함수
toast.dismiss = (id) => {
  if (id) {
    removeToast(id);
  } else {
    // 모든 toast 제거
    const sonner = document.querySelector('lit-sonner');
    if (sonner && sonner.toasts) {
      sonner.toasts.forEach(toast => removeToast(toast.id));
    }
  }
};

// Promise와 함께 사용할 수 있는 헬퍼
toast.promise = async (promise, options = {}) => {
  const loadingId = toast.loading(options.loading || 'Loading...', {
    duration: 0
  });

  try {
    const result = await promise;
    toast.dismiss(loadingId);
    toast.success(options.success || 'Success!');
    return result;
  } catch (error) {
    toast.dismiss(loadingId);
    toast.error(options.error || 'Error occurred');
    throw error;
  }
};