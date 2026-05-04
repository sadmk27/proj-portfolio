import Lenis, { type LenisOptions } from "lenis";

class LenisProvider {
  private lenis: Lenis | null = null;
  private rafId: number | null = null;
  private resizeRafId: number | null = null;
  private handleWindowResize = (): void => {
    this.update();
  };
  private refCount = 0;

  private defaultOptions: LenisOptions = {
    duration: 2.5,
    lerp: 0.025,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    syncTouch: false,
    touchMultiplier: 1.5,
    wheelMultiplier: 0.8,
    smoothWheel: true,
    infinite: false,
  };

  public init(options: LenisOptions = {}): void {
    this.refCount++;

    if (this.lenis) {
      if (Object.keys(options).length > 0) {
        console.warn(
          "LenisProvider: init was called with options but an instance already exists. " +
            "These options will be ignored to ensure consistent behavior across the application.",
        );
      }
      return;
    }

    this.lenis = new Lenis({
      ...this.defaultOptions,
      ...options,
    });

    const animate = (time: number): void => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(animate);
    };

    this.rafId = requestAnimationFrame(animate);

    window.addEventListener("resize", this.handleWindowResize, {
      passive: true,
    });
  }

  public update(): void {
    if (!this.lenis || this.resizeRafId !== null) {
      return;
    }

    this.resizeRafId = requestAnimationFrame(() => {
      this.resizeRafId = null;
      this.lenis?.resize();
    });
  }

  public destroy(): void {
    this.refCount--;

    if (this.refCount > 0) {
      return;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.resizeRafId !== null) {
      cancelAnimationFrame(this.resizeRafId);
      this.resizeRafId = null;
    }

    window.removeEventListener("resize", this.handleWindowResize);

    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }

    this.refCount = Math.max(0, this.refCount);
  }

  public getInstance(): Lenis | null {
    return this.lenis;
  }

  public scrollTo(
    target: number | string | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1],
  ): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, options);
    }
  }

  public scrollToTop(): void {
    this.scrollTo(0);
  }
}

export const lenisProvider = new LenisProvider();
