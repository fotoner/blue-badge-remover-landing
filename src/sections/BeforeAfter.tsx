import { useState, useEffect, useCallback, useRef } from "react";
import { Check, ShieldAlert } from "lucide-react";
import { useI18n } from "../hooks/useI18n";
import { useInView } from "../hooks/useInView";

export function BeforeAfter() {
  const { t } = useI18n();
  const [isActive, setIsActive] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const userInteracted = useRef(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    if (userInteracted.current) return;

    function cycle() {
      setIsActive(false);
      setShowStatus(false);

      addTimer(() => {
        if (userInteracted.current) return;
        setIsActive(true);
        addTimer(() => {
          if (userInteracted.current) return;
          setShowStatus(true);
          addTimer(() => {
            if (userInteracted.current) return;
            cycle();
          }, 3000);
        }, 900);
      }, 2500);
    }

    cycle();
    return clearTimers;
  }, [addTimer, clearTimers]);

  const handleToggle = useCallback(() => {
    userInteracted.current = true;
    clearTimers();
    setIsActive((prev) => {
      const next = !prev;
      if (next) {
        addTimer(() => setShowStatus(true), 900);
      } else {
        setShowStatus(false);
      }
      return next;
    });
  }, [addTimer, clearTimers]);

  const spamTweets = [
    {
      avatar: "🤑",
      name: "spam_promoter",
      handle: "@spam_promo",
      time: "2h",
      textKey: "ba.spam1" as const,
      delay: 0,
    },
    {
      avatar: "💸",
      name: "badge_buyer",
      handle: "@badge_buy",
      time: "4h",
      textKey: "ba.spam2" as const,
      delay: 150,
    },
  ];

  const cleanTweets = [
    {
      avatar: "😊",
      name: "친구",
      handle: "@friend_kr",
      time: "3h",
      textKey: "ba.clean1" as const,
    },
    {
      avatar: "🎬",
      name: "동료",
      handle: "@colleague",
      time: "5h",
      textKey: "ba.clean2" as const,
    },
  ];

  const allTweets: Array<{
    avatar: string;
    name: string;
    handle: string;
    time: string;
    textKey: "ba.spam1" | "ba.spam2" | "ba.clean1" | "ba.clean2";
    isSpam: boolean;
    delay: number;
  }> = [
    { ...spamTweets[0], isSpam: true },
    { ...cleanTweets[0], isSpam: false, delay: 0 },
    { ...spamTweets[1], isSpam: true },
    { ...cleanTweets[1], isSpam: false, delay: 0 },
  ];

  const { ref: sectionRef, inView } = useInView();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`min-h-[750px] bg-bg-card py-(--spacing-section) transition-all duration-700 ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
    >
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-heading text-center text-3xl font-bold text-text-primary sm:text-4xl">
          {t("demo.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-text-secondary">
          {t("demo.subtitle")}
        </p>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/[0.08] bg-black shadow-[0_25px_80px_rgba(0,0,0,0.5)]">
          {/* Extension header bar */}
          <div className="flex items-center justify-between border-b border-[#2f3336] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-red">
                <span className="text-xs font-bold text-white">✕</span>
              </div>
              <span className="text-sm font-bold text-[#e7e9ea]">
                Blue Badge Remover
              </span>
            </div>
            <button
              onClick={handleToggle}
              className="cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
              aria-label={isActive ? "Disable filtering" : "Enable filtering"}
            >
              <ToggleSwitch on={isActive} />
            </button>
          </div>

          {/* Tweet list */}
          <div className="divide-y divide-[#2f3336]">
            {allTweets.map((tweet, i) => (
              <TweetRow
                key={i}
                avatar={tweet.avatar}
                name={tweet.name}
                handle={tweet.handle}
                time={tweet.time}
                text={t(tweet.textKey)}
                isSpam={tweet.isSpam}
                isHidden={isActive && tweet.isSpam}
                badgeLabel={t("demo.badge.detected")}
                delay={tweet.isSpam ? (tweet.delay ?? 0) : 0}
              />
            ))}
          </div>

          {/* Status bar */}
          <div
            className="overflow-hidden border-t border-[#2f3336] transition-all duration-500 ease-out"
            style={{
              maxHeight: showStatus ? "48px" : "0px",
              opacity: showStatus ? 1 : 0,
            }}
          >
            <div className="flex items-center justify-center gap-1.5 px-4 py-3 text-xs text-green-500">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              {t("ba.hidden")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleSwitch({ on }: { on: boolean }) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
        on ? "bg-accent-blue" : "bg-[#38444d]"
      }`}
    >
      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
          on ? "translate-x-5.5" : "translate-x-1"
        }`}
      />
    </div>
  );
}

function TweetRow({
  avatar,
  name,
  handle,
  time,
  text,
  isSpam,
  isHidden,
  badgeLabel,
  delay,
}: {
  avatar: string;
  name: string;
  handle: string;
  time: string;
  text: string;
  isSpam: boolean;
  isHidden: boolean;
  badgeLabel: string;
  delay: number;
}) {
  return (
    <div
      className="overflow-hidden transition-all ease-out"
      style={{
        maxHeight: isHidden ? "0px" : "200px",
        opacity: isHidden ? 0 : 1,
        transitionDuration: "500ms",
        transitionDelay: isHidden ? `${delay}ms` : "0ms",
      }}
    >
      <div className="flex gap-3 px-4 py-3">
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#16181c] text-lg">
          {avatar}
        </div>
        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Name row */}
          <div className="flex items-center gap-1">
            <span className="truncate text-[15px] font-bold text-[#e7e9ea]">
              {name}
            </span>
            {isSpam && <BlueBadge />}
            <span className="truncate text-[15px] text-[#71767b]">
              {handle}
            </span>
            <span className="text-[15px] text-[#71767b]">·</span>
            <span className="text-[15px] text-[#71767b]">{time}</span>
          </div>
          {/* Text */}
          <p className="mt-0.5 text-[15px] leading-5 text-[#e7e9ea]">{text}</p>
          {/* Spam indicator */}
          {isSpam && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-accent-red/70">
              <ShieldAlert className="h-3 w-3" aria-hidden="true" />
              {badgeLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BlueBadge() {
  return (
    <svg
      className="h-[18px] w-[18px] flex-shrink-0"
      viewBox="0 0 22 22"
      aria-label="Verified account"
    >
      <path
        fill="#1d9bf0"
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.607-.274 1.264-.144 1.897.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
      />
    </svg>
  );
}
