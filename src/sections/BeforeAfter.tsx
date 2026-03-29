import { Check } from "lucide-react";
import { useI18n } from "../hooks/useI18n";

export function BeforeAfter() {
  const { t } = useI18n();

  return (
    <section className="mx-auto max-w-4xl px-4 py-(--spacing-section)">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr]">
        {/* Before */}
        <div className="overflow-hidden rounded-2xl border border-accent-red/20 bg-accent-red/[0.04]">
          <div className="flex items-center gap-2 px-4 pt-4 pb-3">
            <span className="rounded-md bg-accent-red px-2.5 py-0.5 text-xs font-semibold text-white">
              {t("ba.before")}
            </span>
            <span className="text-xs text-text-secondary">{t("ba.before.desc")}</span>
          </div>
          <div className="bg-black">
            <Tweet
              avatar="🤑"
              name="spam_promoter"
              handle="@spam_promo"
              badge
              time="2h"
              text={t("ba.spam1")}
              replies="2" retweets="0" likes="1" views="342"
              faded
            />
            <Tweet
              avatar="😊"
              name="친구"
              handle="@friend_kr"
              time="3h"
              text={t("ba.clean1")}
              replies="5" retweets="2" likes="18" views="1.2K"
            />
            <Tweet
              avatar="💸"
              name="badge_buyer"
              handle="@badge_buy"
              badge
              time="4h"
              text={t("ba.spam2")}
              replies="0" retweets="1" likes="0" views="89"
              faded
              last
            />
          </div>
        </div>

        {/* Arrow */}
        <div className="hidden items-center text-2xl font-bold text-accent-blue md:flex">
          →
        </div>
        <div className="flex items-center justify-center text-2xl font-bold text-accent-blue md:hidden">
          ↓
        </div>

        {/* After */}
        <div className="overflow-hidden rounded-2xl border border-green-500/15 bg-green-500/[0.03]">
          <div className="flex items-center gap-2 px-4 pt-4 pb-3">
            <span className="rounded-md bg-green-500 px-2.5 py-0.5 text-xs font-semibold text-white">
              {t("ba.after")}
            </span>
            <span className="text-xs text-text-secondary">{t("ba.after.desc")}</span>
          </div>
          <div className="bg-black">
            <Tweet
              avatar="😊"
              name="친구"
              handle="@friend_kr"
              time="3h"
              text={t("ba.clean1")}
              replies="5" retweets="2" likes="18" views="1.2K"
            />
            <Tweet
              avatar="🎬"
              name="동료"
              handle="@colleague"
              time="5h"
              text={t("ba.clean2")}
              replies="12" retweets="8" likes="45" views="3.4K"
              last
            />
          </div>
          <div className="flex items-center justify-center gap-1.5 bg-black px-4 py-3 text-xs text-green-500">
            <Check className="h-3.5 w-3.5" aria-hidden="true" />
            {t("ba.hidden")}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tweet({
  avatar,
  name,
  handle,
  time,
  text,
  badge,
  faded,
  last,
  replies,
  retweets,
  likes,
  views,
}: {
  avatar: string;
  name: string;
  handle: string;
  time: string;
  text: string;
  badge?: boolean;
  faded?: boolean;
  last?: boolean;
  replies: string;
  retweets: string;
  likes: string;
  views: string;
}) {
  return (
    <div
      className={`flex gap-3 px-4 py-3 ${!last ? "border-b border-[#2f3336]" : ""} ${faded ? "opacity-50" : ""}`}
    >
      {/* Avatar */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#16181c] text-lg">
        {avatar}
      </div>
      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Name row */}
        <div className="flex items-center gap-1">
          <span className="truncate text-[15px] font-bold text-[#e7e9ea]">{name}</span>
          {badge && <BlueBadge />}
          <span className="truncate text-[15px] text-[#71767b]">{handle}</span>
          <span className="text-[15px] text-[#71767b]">·</span>
          <span className="text-[15px] text-[#71767b]">{time}</span>
        </div>
        {/* Text */}
        <p className="mt-0.5 text-[15px] leading-5 text-[#e7e9ea]">{text}</p>
        {/* Engagement row */}
        <div className="mt-2 flex max-w-[400px] justify-between">
          <EngagementButton icon="reply" count={replies} />
          <EngagementButton icon="retweet" count={retweets} />
          <EngagementButton icon="like" count={likes} />
          <EngagementButton icon="views" count={views} />
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

function EngagementButton({ icon, count }: { icon: string; count: string }) {
  const icons: Record<string, string> = {
    reply: "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z",
    retweet: "M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z",
    like: "M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z",
    views: "M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z",
  };

  return (
    <div className="group flex items-center gap-1">
      <div className="rounded-full p-1.5">
        <svg className="h-[15px] w-[15px] text-[#71767b]" viewBox="0 0 24 24" fill="currentColor">
          <path d={icons[icon]} />
        </svg>
      </div>
      {count !== "0" && (
        <span className="text-[13px] text-[#71767b]">{count}</span>
      )}
    </div>
  );
}
