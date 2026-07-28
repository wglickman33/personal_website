import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

// Nested modals (e.g. ConfirmModal inside ProjectCaseStudyModal) share one
// body overflow lock. A simple depth counter restores the prior value only
// when the outermost modal closes - otherwise unlocking the nested one
// would re-enable background scroll under the still-open parent.
let scrollLockCount = 0;
let savedBodyOverflow = '';

function acquireScrollLock() {
  if (scrollLockCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount += 1;
}

function releaseScrollLock() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = savedBodyOverflow;
  }
}

interface ModalStackEntry {
  onClose: () => void;
  containerRef: RefObject<HTMLElement | null>;
}

// Only the topmost open modal should handle Escape and Tab-trap. A stack
// keeps nested portals from fighting each other.
const modalStack: ModalStackEntry[] = [];

function getFocusable(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.getAttribute('aria-hidden') !== 'true' && !el.hasAttribute('disabled')
  );
}

interface UseModalA11yOptions {
  isOpen: boolean;
  onClose: () => void;
  /** The dialog container that should trap focus */
  containerRef: RefObject<HTMLElement | null>;
  /** Prefer this element for initial focus (e.g. close button) */
  initialFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Shared modal accessibility: body scroll lock (nesting-safe), Escape to
 * close (topmost only), Tab focus trap, initial focus, and restore focus
 * to the trigger on close.
 */
const useModalA11y = ({
  isOpen,
  onClose,
  containerRef,
  initialFocusRef,
}: UseModalA11yOptions): void => {
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    acquireScrollLock();

    const entry: ModalStackEntry = {
      onClose: () => onCloseRef.current(),
      containerRef,
    };
    modalStack.push(entry);

    const focusInitial = () => {
      const preferred = initialFocusRef?.current;
      if (preferred) {
        preferred.focus({ preventScroll: true });
        return;
      }
      const container = containerRef.current;
      if (!container) return;
      const focusable = getFocusable(container);
      (focusable[0] ?? container).focus({ preventScroll: true });
    };

    const raf = requestAnimationFrame(focusInitial);

    const onKeyDown = (e: KeyboardEvent) => {
      const top = modalStack[modalStack.length - 1];
      if (top !== entry) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        entry.onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const container = containerRef.current;
      if (!container) return;

      const focusable = getFocusable(container);
      if (focusable.length === 0) {
        e.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !container.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else if (active === last || !container.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKeyDown);

      const idx = modalStack.indexOf(entry);
      if (idx >= 0) modalStack.splice(idx, 1);

      releaseScrollLock();

      const prev = previouslyFocusedRef.current;
      if (prev && typeof prev.focus === 'function' && document.contains(prev)) {
        prev.focus({ preventScroll: true });
      }
    };
  }, [isOpen, containerRef, initialFocusRef]);
};

export default useModalA11y;
