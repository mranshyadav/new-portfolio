import { useEffect, useState, useRef, useCallback } from 'react';
import cursorHandIcon from '@/assets/cursor-hand.png';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const rafRef = useRef<number>();
  const cursorRef = useRef({ x: 0, y: 0 });

  // Check if device is touch-enabled
  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    setIsTouchDevice(checkTouchDevice());
  }, []);

  // Optimized cursor update with RAF
  const updateCursorPosition = useCallback(() => {
    setPosition({ x: cursorRef.current.x, y: cursorRef.current.y });
    rafRef.current = requestAnimationFrame(updateCursorPosition);
  }, []);

  // Detect interactive elements - throttled
  const detectInteractiveElement = useCallback((x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return;

    const isInteractive = 
      element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT' ||
      element.getAttribute('role') === 'button' ||
      element.classList.contains('clickable') ||
      window.getComputedStyle(element).cursor === 'pointer' ||
      element.closest('a') !== null ||
      element.closest('button') !== null;

    setIsHovering(isInteractive);
  }, []);

  // Main effect for cursor tracking
  useEffect(() => {
    if (isTouchDevice) return;

    let lastDetectTime = 0;
    const detectThrottle = 100; // Check for interactive elements every 100ms

    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Throttle interactive element detection
      const now = Date.now();
      if (now - lastDetectTime > detectThrottle) {
        detectInteractiveElement(e.clientX, e.clientY);
        lastDetectTime = now;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Start RAF loop
    rafRef.current = requestAnimationFrame(updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouchDevice, detectInteractiveElement, updateCursorPosition]);

  // Hide default cursor
  useEffect(() => {
    if (isTouchDevice) return;

    document.body.style.cursor = 'none';
    
    // Apply cursor: none to all elements
    const style = document.createElement('style');
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = '';
      document.head.removeChild(style);
    };
  }, [isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // Calculate scale based on state
  const cursorScale = isClicking ? 0.85 : isHovering ? 1.3 : 1;
  const ringScale = isClicking ? 0.7 : isHovering ? 1.5 : 1;

  return (
    <>
      {/* Cursor Ring - only show when not hovering */}
      {!isHovering && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 99998,
            opacity: isVisible ? 0.4 : 0,
            transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
            width: '40px',
            height: '40px',
            border: '2px solid rgba(0, 0, 0, 0.25)',
            borderRadius: '50%',
            mixBlendMode: 'difference',
            filter: 'blur(1px)',
          }}
        />
      )}

      {/* Hand Cursor on Hover */}
      {isHovering ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 99999,
            opacity: isVisible ? 1 : 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: '28px',
            height: '30px',
            filter: 'drop-shadow(0 2px 1.5px rgba(0, 0, 0, 0.50))',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="30" viewBox="0 0 70 75" fill="none">
            <g filter="url(#filter0_d_1417_8194)">
              <path d="M16.9951 51.1175C15.8284 49.6175 14.3701 46.5759 11.8284 42.7842C10.3701 40.7009 6.78674 36.7425 5.70341 34.7009C4.92245 33.4602 4.69584 31.9494 5.07841 30.5342C5.73241 27.8434 8.28491 26.0584 11.0367 26.3675C13.1651 26.7951 15.121 27.8382 16.6617 29.3675C17.7375 30.3808 18.727 31.4818 19.6201 32.6592C20.2867 33.4925 20.4534 33.8259 21.2034 34.7842C21.9534 35.7425 22.4534 36.7009 22.0784 35.2842C21.7867 33.2009 21.2867 29.7009 20.5784 26.5759C20.0367 24.2009 19.9117 23.8259 19.4117 22.0342C18.9117 20.2425 18.6201 18.7425 18.0784 16.7009C17.5833 14.6949 17.1938 12.6643 16.9117 10.6175C16.3865 7.99964 16.7686 5.28093 17.9951 2.9092C19.4509 1.53991 21.5864 1.17851 23.4117 1.99254C25.2476 3.3481 26.6163 5.24108 27.3284 7.4092C28.4203 10.0775 29.1491 12.8803 29.4951 15.7425C30.1617 19.9092 31.4534 25.9925 31.4951 27.2425C31.4951 25.7009 31.2034 22.4509 31.4951 20.9925C31.784 19.4722 32.8407 18.2105 34.2867 17.6592C35.5276 17.2785 36.8403 17.1929 38.1201 17.4092C39.4119 17.6793 40.5562 18.4223 41.3284 19.4925C42.2937 21.9233 42.8295 24.5034 42.9117 27.1175C43.0233 24.8283 43.4151 22.5614 44.0784 20.3675C44.7747 19.3865 45.7915 18.6792 46.9534 18.3675C48.3309 18.1157 49.7426 18.1157 51.1201 18.3675C52.2496 18.7452 53.2377 19.4572 53.9534 20.4092C54.8358 22.619 55.3699 24.9523 55.5367 27.3259C55.5367 27.9092 55.8284 25.7009 56.7451 24.2425C57.2214 22.8284 58.416 21.7757 59.8789 21.4812C61.3418 21.1866 62.8507 21.6949 63.8373 22.8145C64.8238 23.9341 65.1381 25.495 64.6617 26.9092C64.6617 29.6175 64.6617 29.4925 64.6617 31.3259C64.6617 33.1592 64.6617 34.7842 64.6617 36.3259C64.5099 38.7641 64.1756 41.1876 63.6617 43.5759C62.9366 45.6889 61.9274 47.6934 60.6617 49.5342C58.6386 51.7841 56.967 54.3266 55.7034 57.0759C55.3899 58.4417 55.2499 59.8417 55.2867 61.2425C55.2826 62.5368 55.4507 63.8259 55.7867 65.0759C54.0832 65.256 52.3653 65.256 50.6617 65.0759C49.0367 64.8259 47.0367 61.5759 46.4951 60.5759C46.2271 60.0389 45.6785 59.6996 45.0784 59.6996C44.4783 59.6996 43.9297 60.0389 43.6617 60.5759C42.7451 62.1592 40.7034 65.0342 39.2867 65.2009C36.4951 65.5342 30.7451 65.2009 26.2034 65.2009C26.2034 65.2009 26.9534 61.0342 25.2451 59.5342C23.5367 58.0342 21.7867 56.2842 20.4951 55.1175L16.9951 51.1175Z" fill="white" style={{fill: 'white', fillOpacity: 1}} />
              <path fillRule="evenodd" clipRule="evenodd" d="M16.9951 51.1175C15.8284 49.6175 14.3701 46.5759 11.8284 42.7842C10.3701 40.7009 6.78674 36.7425 5.70341 34.7009C4.92245 33.4602 4.69584 31.9494 5.07841 30.5342C5.73241 27.8434 8.28491 26.0584 11.0367 26.3675C13.1651 26.7951 15.121 27.8382 16.6617 29.3675C17.7375 30.3808 18.727 31.4818 19.6201 32.6592C20.2867 33.4925 20.4534 33.8259 21.2034 34.7842C21.9534 35.7425 22.4534 36.7009 22.0784 35.2842C21.7867 33.2009 21.2867 29.7009 20.5784 26.5759C20.0367 24.2009 19.9117 23.8259 19.4117 22.0342C18.9117 20.2425 18.6201 18.7425 18.0784 16.7009C17.5833 14.6949 17.1938 12.6643 16.9117 10.6175C16.3865 7.99964 16.7686 5.28093 17.9951 2.9092C19.4509 1.53991 21.5864 1.17851 23.4117 1.99254C25.2476 3.3481 26.6163 5.24108 27.3284 7.4092C28.4203 10.0775 29.1491 12.8803 29.4951 15.7425C30.1617 19.9092 31.4534 25.9925 31.4951 27.2425C31.4951 25.7009 31.2034 22.4509 31.4951 20.9925C31.784 19.4722 32.8407 18.2105 34.2867 17.6592C35.5276 17.2785 36.8403 17.1929 38.1201 17.4092C39.4119 17.6793 40.5562 18.4223 41.3284 19.4925C42.2937 21.9233 42.8295 24.5034 42.9117 27.1175C43.0233 24.8283 43.4151 22.5614 44.0784 20.3675C44.7747 19.3865 45.7915 18.6792 46.9534 18.3675C48.3309 18.1157 49.7426 18.1157 51.1201 18.3675C52.2496 18.7452 53.2377 19.4572 53.9534 20.4092C54.8358 22.619 55.3699 24.9523 55.5367 27.3259C55.5367 27.9092 55.8284 25.7009 56.7451 24.2425C57.2214 22.8284 58.416 21.7757 59.8789 21.4812C61.3418 21.1866 62.8507 21.6949 63.8373 22.8145C64.8238 23.9341 65.1381 25.495 64.6617 26.9092C64.6617 29.6175 64.6617 29.4925 64.6617 31.3259C64.6617 33.1592 64.6617 34.7842 64.6617 36.3259C64.5099 38.7641 64.1756 41.1876 63.6617 43.5759C62.9366 45.6889 61.9274 47.6934 60.6617 49.5342C58.6386 51.7841 56.967 54.3266 55.7034 57.0759C55.3899 58.4417 55.2499 59.8417 55.2867 61.2425C55.2826 62.5368 55.4507 63.8259 55.7867 65.0759C54.0832 65.256 52.3653 65.256 50.6617 65.0759C49.0367 64.8259 47.0367 61.5759 46.4951 60.5759C46.2271 60.0389 45.6785 59.6996 45.0784 59.6996C44.4783 59.6996 43.9297 60.0389 43.6617 60.5759C42.7451 62.1592 40.7034 65.0342 39.2867 65.2009C36.4951 65.5342 30.7451 65.2009 26.2034 65.2009C26.2034 65.2009 26.9534 61.0342 25.2451 59.5342C23.5367 58.0342 21.7867 56.2842 20.4951 55.1175L16.9951 51.1175Z" stroke="black" style={{stroke: 'black', strokeOpacity: 1}} strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M52.3281 53.3924V39.01C52.3281 38.1491 51.6286 37.4512 50.7656 37.4512C49.9027 37.4512 49.2031 38.1491 49.2031 39.01V53.3924C49.2031 54.2533 49.9027 54.9512 50.7656 54.9512C51.6286 54.9512 52.3281 54.2533 52.3281 53.3924Z" fill="black" style={{fill: 'black', fillOpacity: 1}}/>
              <path d="M44.0774 53.3871L43.9941 38.9973C43.9891 38.1385 43.2856 37.4462 42.4226 37.4512C41.5597 37.4561 40.8642 38.1564 40.8692 39.0152L40.9525 53.405C40.9575 54.2639 41.661 54.9561 42.524 54.9511C43.3869 54.9462 44.0824 54.246 44.0774 53.3871Z" fill="black" style={{fill: 'black', fillOpacity: 1}}/>
              <path d="M32.5371 39.0303L32.6205 53.3903C32.6255 54.2574 33.3291 54.9562 34.1921 54.9511C35.055 54.9461 35.7504 54.2391 35.7454 53.372L35.6621 39.012C35.6571 38.1449 34.9534 37.4461 34.0905 37.4512C33.2276 37.4563 32.5321 38.1632 32.5371 39.0303Z" fill="black" style={{fill: 'black', fillOpacity: 1}}/>
            </g>
            <defs>
              <filter id="filter0_d_1417_8194" x="0.000651121" y="0" width="69.776" height="74.4121" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4.16667"/>
                <feGaussianBlur stdDeviation="1.66667"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1417_8194"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1417_8194" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>
      ) : (
        /* Main Cursor Arrow */
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 99999,
            opacity: isVisible ? 1 : 0,
            transform: `translate(${position.x}px, ${position.y}px) rotate(-18deg)`,
            width: '24px',
            height: '33px',
            filter: 'blur(0.3px)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="33" viewBox="0 0 116 149" fill="none">
            <defs>
              <filter id="dynamic_cursor_shadow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
                <feOffset dy="7.58621" result="offsetblur" />
                <feFlood floodColor="rgba(0, 0, 0, 0.25)" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#dynamic_cursor_shadow)">
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M13.6543 127.448V6.06836L101.654 94.1299H48.1983L47.0519 95.0697L13.6543 127.448Z" 
                fill="white" 
                style={{ fill: 'white', fillOpacity: 1 }} 
              />
              <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M21.2402 23.5234V108.489L43.7637 86.7236L44.9775 85.6679L83.1816 85.7303L21.2402 23.5234Z" 
                fill="black" 
                style={{ fill: 'black', fillOpacity: 1 }} 
              />
            </g>
          </svg>
        </div>
      )}
    </>
  );
}