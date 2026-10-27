"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { services } from "@/content/services";

type BookingContextValue = {
  serviceSlug: string;
  setServiceSlug: (slug: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

/**
 * Wspólny stan wybranej usługi — pozwala przyciskom z cennika
 * od razu ustawić usługę w formularzu rezerwacji.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [serviceSlug, setServiceSlug] = useState(services[0].slug);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <BookingContext value={{ serviceSlug, setServiceSlug }}>
          {children}
        </BookingContext>
      </MotionConfig>
    </LazyMotion>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking musi być użyty wewnątrz <Providers>");
  return ctx;
}
