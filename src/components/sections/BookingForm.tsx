"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, m } from "motion/react";
import { services } from "@/content/services";
import { team } from "@/content/team";
import { site } from "@/content/site";
import { useBooking } from "@/components/providers/Providers";
import { ButtonArrow, buttonClasses } from "@/components/ui/Button";
import { DemoTag } from "@/components/ui/SectionLabel";
import { formatLongDate, getTimeSlots, getUpcomingDays, toDateKey } from "@/lib/booking";
import { cn, formatDuration, formatPrice, pad } from "@/lib/utils";

const ANY_BARBER = "dowolny";
const DAYS_AHEAD = 14;
const PHONE_PATTERN = /^(\+?48)?[\s-]?(\d[\s-]?){8}\d$/;

type Errors = Partial<Record<"date" | "time" | "name" | "phone", string>>;

// Data „dzisiaj” jest odczytywana tylko w przeglądarce, żeby HTML
// z prerenderingu nie zależał od dnia builda.
const noopSubscribe = () => () => {};
const getTodayKey = () => toDateKey(new Date());
const getServerTodayKey = () => null;

const optionBase =
  "relative flex cursor-pointer border border-ink/15 transition-colors duration-300 hover:border-ink has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-rust has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-bone";

function Step({
  index,
  title,
  children,
  error,
}: {
  index: number;
  title: string;
  children: ReactNode;
  error?: string;
}) {
  return (
    <fieldset className="min-w-0 border-t border-ink/15 py-8 first:border-t-0 first:pt-0 md:py-10">
      <legend className="float-left mb-6 flex w-full items-baseline gap-3">
        <span className="font-mono text-xs text-stone-deep">{pad(index)}</span>
        <span className="font-condensed text-3xl leading-none md:text-4xl">{title}</span>
      </legend>
      <div className="clear-both">{children}</div>
      {error && (
        <p role="alert" className="mt-3 text-sm font-medium text-rust-deep">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function BookingForm() {
  const { serviceSlug, setServiceSlug } = useBooking();
  const todayKey = useSyncExternalStore(noopSubscribe, getTodayKey, getServerTodayKey);
  const [barber, setBarber] = useState(ANY_BARBER);
  const [dateKey, setDateKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const service = services.find((s) => s.slug === serviceSlug) ?? services[0];
  const barberName =
    barber === ANY_BARBER ? "Pierwszy wolny barber" : team.find((b) => b.slug === barber)?.name;
  const days = todayKey ? getUpcomingDays(todayKey, DAYS_AHEAD, site.hours) : [];
  const slots = dateKey ? getTimeSlots(dateKey, service.duration, site.hours, barber) : [];
  // Zmiana usługi lub barbera może unieważnić wybraną godzinę
  const validTime = slots.some((s) => s.time === time && s.available) ? time : null;

  const validate = (): Errors => {
    const next: Errors = {};
    if (!dateKey) next.date = "Wybierz dzień wizyty.";
    else if (!validTime) next.time = "Wybierz wolną godzinę.";
    if (!name.trim()) next.name = "Podaj imię.";
    if (!PHONE_PATTERN.test(phone.trim()))
      next.phone = "Podaj numer telefonu w formacie 9 cyfr, np. 600 100 200.";
    return next;
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    setSubmitted(true);
  };

  const reset = () => {
    setBarber(ANY_BARBER);
    setDateKey(null);
    setTime(null);
    setName("");
    setPhone("");
    setNotes("");
    setErrors({});
    setServiceSlug(services[0].slug);
    setSubmitted(false);
  };

  const summary = [
    { label: "Usługa", value: `${service.name} · ${formatDuration(service.duration)}` },
    { label: "Barber", value: barberName },
    {
      label: "Termin",
      value: dateKey && validTime ? `${formatLongDate(dateKey)}, ${validTime}` : "—",
    },
    { label: "Cena", value: formatPrice(service.price) },
  ];

  return (
    <div className="bg-bone p-5 text-ink sm:p-8 md:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <m.div
            key="result"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            // Panel montuje się dopiero po animacji wyjścia formularza
            onAnimationComplete={() => resultRef.current?.focus()}
          >
            <DemoTag label="Wersja demonstracyjna" className="text-rust-deep" />
            <h3
              ref={resultRef}
              tabIndex={-1}
              className="font-condensed mt-6 text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] outline-none"
            >
              Tu kończy się demo<span className="text-rust">.</span>
            </h3>
            <p className="mt-6 max-w-xl leading-relaxed text-stone-deep">
              Tak wyglądałaby Twoja wizyta. <strong className="text-ink">Nie utworzyliśmy
              rezerwacji i nie wysłaliśmy żadnych danych</strong> — wszystko zostało
              w Twojej przeglądarce. W wersji produkcyjnej w tym miejscu pojawi się
              potwierdzenie z systemu rezerwacji salonu.
            </p>
            <dl className="mt-10 border-t border-ink/15">
              {[...summary, { label: "Imię", value: name }].map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[6rem_1fr] gap-4 border-b border-ink/15 py-4 sm:grid-cols-[9rem_1fr]"
                >
                  <dt className="eyebrow pt-0.5 text-stone-deep">{row.label}</dt>
                  <dd className="font-medium first-letter:uppercase">{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className={buttonClasses("dark")}
              >
                <span>Zmień szczegóły</span>
                <ButtonArrow />
              </button>
              <button type="button" onClick={reset} className={buttonClasses("outline-dark")}>
                <span>Zacznij od nowa</span>
              </button>
            </div>
          </m.div>
        ) : (
          <m.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            aria-label="Demonstracyjny formularz rezerwacji"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Step index={1} title="Usługa">
              <div className="grid gap-2">
                {services.map((s) => (
                  <label key={s.slug} className={cn(optionBase, "items-center gap-4 px-4 py-3.5")}>
                    <input
                      type="radio"
                      name="service"
                      value={s.slug}
                      checked={serviceSlug === s.slug}
                      onChange={() => setServiceSlug(s.slug)}
                      className="sr-only"
                    />
                    <span className="flex-1 font-semibold">{s.name}</span>
                    <span className="font-mono text-xs opacity-70">{formatDuration(s.duration)}</span>
                    <span className="w-16 text-right font-semibold">{formatPrice(s.price)}</span>
                  </label>
                ))}
              </div>
            </Step>

            <Step index={2} title="Barber">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                <label className={cn(optionBase, "flex-col justify-between gap-6 p-4")}>
                  <input
                    type="radio"
                    name="barber"
                    value={ANY_BARBER}
                    checked={barber === ANY_BARBER}
                    onChange={() => setBarber(ANY_BARBER)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center border border-current font-condensed text-xl"
                  >
                    B<span className="text-rust">.</span>
                  </span>
                  <span>
                    <span className="block font-semibold">Bez preferencji</span>
                    <span className="block text-xs opacity-70">Pierwszy wolny</span>
                  </span>
                </label>
                {team.map((b) => (
                  <label key={b.slug} className={cn(optionBase, "flex-col justify-between gap-6 p-4")}>
                    <input
                      type="radio"
                      name="barber"
                      value={b.slug}
                      checked={barber === b.slug}
                      onChange={() => setBarber(b.slug)}
                      className="sr-only"
                    />
                    <Image
                      src={b.portrait.src}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 object-cover grayscale"
                      style={{ objectPosition: b.portrait.focus }}
                    />
                    <span>
                      <span className="block font-semibold">{b.name}</span>
                      <span className="block text-xs opacity-70">{b.role}</span>
                    </span>
                  </label>
                ))}
              </div>
            </Step>

            <Step index={3} title="Termin" error={errors.date ?? errors.time}>
              {todayKey === null ? (
                <p className="text-sm text-stone-deep">Ładowanie kalendarza…</p>
              ) : (
                <>
                  <p id={`${uid}-days`} className="eyebrow mb-3 text-stone-deep">
                    Dzień
                  </p>
                  <div
                    role="radiogroup"
                    aria-labelledby={`${uid}-days`}
                    className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
                  >
                    {days.map((day, i) => (
                      <label
                        key={day.key}
                        className={cn(
                          optionBase,
                          "w-[4.5rem] shrink-0 flex-col items-center py-3",
                          day.closed && "pointer-events-none border-dashed opacity-45",
                        )}
                      >
                        <input
                          type="radio"
                          name="date"
                          value={day.key}
                          checked={dateKey === day.key}
                          disabled={day.closed}
                          onChange={() => {
                            setDateKey(day.key);
                            setTime(null);
                            setErrors((e) => ({ ...e, date: undefined }));
                          }}
                          data-field={
                            i === days.findIndex((d) => !d.closed) ? "date" : undefined
                          }
                          className="sr-only"
                        />
                        <span className="eyebrow text-[0.625rem]">{day.weekday}</span>
                        <span className="mt-1 text-lg font-semibold">{day.label}</span>
                        {day.closed && <span className="text-[0.625rem]">nieczynne</span>}
                      </label>
                    ))}
                  </div>

                  <p id={`${uid}-times`} className="eyebrow mt-8 mb-3 text-stone-deep">
                    Godzina
                  </p>
                  {dateKey ? (
                    <div
                      role="radiogroup"
                      aria-labelledby={`${uid}-times`}
                      className="grid grid-cols-4 gap-2 sm:grid-cols-6"
                    >
                      {slots.map((slot, i) => (
                        <label
                          key={slot.time}
                          className={cn(
                            optionBase,
                            "justify-center py-3 text-sm font-semibold",
                            !slot.available &&
                              "pointer-events-none border-transparent bg-bone-2 text-stone-deep line-through",
                          )}
                        >
                          <input
                            type="radio"
                            name="time"
                            value={slot.time}
                            checked={validTime === slot.time}
                            disabled={!slot.available}
                            onChange={() => {
                              setTime(slot.time);
                              setErrors((e) => ({ ...e, time: undefined }));
                            }}
                            data-field={
                              i === slots.findIndex((s) => s.available) ? "time" : undefined
                            }
                            className="sr-only"
                          />
                          {slot.time}
                          {!slot.available && <span className="sr-only"> — zajęte</span>}
                        </label>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-stone-deep">Najpierw wybierz dzień.</p>
                  )}
                  <p className="mt-4 text-xs text-stone-deep">
                    Dostępność terminów jest symulowana na potrzeby demo.
                  </p>
                </>
              )}
            </Step>

            <Step index={4} title="Twoje dane">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field
                  id={`${uid}-name`}
                  label="Imię"
                  error={errors.name}
                  input={
                    <input
                      id={`${uid}-name`}
                      data-field="name"
                      type="text"
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                      className={inputClass}
                    />
                  }
                />
                <Field
                  id={`${uid}-phone`}
                  label="Telefon"
                  error={errors.phone}
                  input={
                    <input
                      id={`${uid}-phone`}
                      data-field="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="600 100 200"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                      className={inputClass}
                    />
                  }
                />
                <div className="sm:col-span-2">
                  <Field
                    id={`${uid}-notes`}
                    label="Uwagi (opcjonalnie)"
                    input={
                      <textarea
                        id={`${uid}-notes`}
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Np. zdjęcie fryzury pokażę na miejscu"
                        className={cn(inputClass, "resize-none")}
                      />
                    }
                  />
                </div>
              </div>
            </Step>

            <div className="border-t border-ink pt-8">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-4">
                {summary.map((row) => (
                  <div key={row.label}>
                    <dt className="eyebrow text-stone-deep">{row.label}</dt>
                    <dd className="mt-1 text-sm font-semibold first-letter:uppercase">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <button type="submit" className={buttonClasses("dark", "mt-8 w-full md:min-h-14")}>
                <span>Podsumuj wizytę</span>
                <ButtonArrow />
              </button>
              <p className="mt-3 text-center text-xs text-stone-deep">
                Wersja demonstracyjna — dane nie są nigdzie wysyłane ani zapisywane.
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "mt-2 block w-full border-0 border-b border-ink/30 bg-transparent px-0 py-3 text-base placeholder:text-stone-deep/70 transition-colors hover:border-ink focus:border-ink aria-[invalid=true]:border-rust-deep";

function Field({
  id,
  label,
  input,
  error,
}: {
  id: string;
  label: string;
  input: ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow text-stone-deep">
        {label}
      </label>
      {input}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-rust-deep">
          {error}
        </p>
      )}
    </div>
  );
}
