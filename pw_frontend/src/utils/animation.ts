// animation.ts
export const scrollToElement = (
  elementId: string,
  offset: number = 0,
  duration: number = 800
): void => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  // Using window.scrollY instead of the deprecated pageYOffset
  const offsetPosition = elementPosition + window.scrollY - offset;
  
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    return;
  }
  
  // Using window.scrollY instead of the deprecated pageYOffset
  const startPosition = window.scrollY;
  const distance = offsetPosition - startPosition;
  let startTime: number | null = null;
  
  const animateScroll = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easing = (t: number) => 
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    
    window.scrollTo(0, startPosition + distance * easing(progress));
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animateScroll);
    }
  };
  
  requestAnimationFrame(animateScroll);
};

export const staggeredAnimation = (
  elements: HTMLElement[],
  baseDelay: number = 100,
  increment: number = 50,
  animationClass: string = 'animate'
): void => {
  Array.from(elements).forEach((element, index) => {
    const delay = baseDelay + (index * increment);

    element.style.animationDelay = `${delay}ms`;
    element.style.transitionDelay = `${delay}ms`;

    setTimeout(() => {
      element.classList.add(animationClass);
    }, 10);
  });
};

export const onElementInView = (
  element: HTMLElement | null,
  callback: (entry: IntersectionObserverEntry) => void,
  threshold: number = 0.1,
  rootMargin: string = '0px'
): (() => void) => {
  if (!element || typeof IntersectionObserver === 'undefined') {
    return () => {};
  }
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    },
    { threshold, rootMargin }
  );
  
  observer.observe(element);
  
  return () => observer.disconnect();
};

export default {
  scrollToElement,
  staggeredAnimation,
  onElementInView
};