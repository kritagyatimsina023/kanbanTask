"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1],
  ) => void;
  scrollToTop: () => void;
  resize: () => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  scrollToTop: () => {},
  resize: () => {},
});

export const useLenis = () => useContext(LenisContext);

interface LenisProviderProps {
  children: React.ReactNode;
  options?: ConstructorParameters<typeof Lenis>[0];
}

export const LenisProvider = ({ children, options }: LenisProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      orientation: "vertical",
      gestureOrientation: "vertical",
      lerp: 0.07,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node) => {
        return (
          node.classList.contains("lenis-prevent") ||
          node.closest("[data-lenis-prevent]") !== null
        );
      },
      ...options,
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = lenisInstance;

    setTimeout(() => setLenis(lenisInstance), 0);

    return () => {
      gsap.ticker.remove(update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisInstance.destroy();
      lenisRef.current = null;
      setTimeout(() => setLenis(null), 0);
    };
  }, []);

  useEffect(() => {
    const instance = lenisRef.current;
    if (!instance) return;

    instance.stop();
    instance.scrollTo(0, { immediate: true, force: true });

    const refresh = () => {
      instance.resize();
      ScrollTrigger.refresh();
    };

    refresh();

    const startTimeout = setTimeout(() => {
      instance.start();
      refresh();
    }, 50);

    const refresh1 = setTimeout(refresh, 150);
    const refresh2 = setTimeout(refresh, 300);
    const refresh3 = setTimeout(refresh, 500);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(refresh1);
      clearTimeout(refresh2);
      clearTimeout(refresh3);
    };
  }, [pathname]);

  const scrollTo = useCallback<LenisContextValue["scrollTo"]>(
    (target, scrollOptions) => {
      lenisRef.current?.scrollTo(target as never, scrollOptions);
    },
    [],
  );

  const scrollToTop = useCallback(() => {
    lenisRef.current?.scrollTo(0, { duration: 1.2 });
  }, []);

  const resize = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      });
    });
  }, []);

  return (
    <LenisContext.Provider value={{ lenis, scrollTo, scrollToTop, resize }}>
      {children}
    </LenisContext.Provider>
  );
};

export default LenisProvider;
