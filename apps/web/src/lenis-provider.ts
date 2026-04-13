import Lenis from "lenis";

class LenisProvider {
  private lenis: Lenis | null = null;
  private rafId: number | null = null;

  public init(options = {}): void {
    if (this.lenis) {
      return;
    }

    this.lenis = new Lenis({
      duration: 1.5,
      lerp: 0.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: false,
      touchMultiplier: 2,
      wheelMultiplier: 1.1,
      smoothWheel: true,
      infinite: false,
      ...options,
    });

    const animate = (time: number): void => {
      this.lenis?.raf(time);
      this.rafId = requestAnimationFrame(animate);
    };

    this.rafId = requestAnimationFrame(animate);
  }

  public update(): void {
    if (this.lenis) {
      this.lenis.resize();
    }
  }

  public destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }

    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
  }

  public getInstance(): Lenis | null {
    return this.lenis;
  }
}

export const lenisProvider = new LenisProvider();
