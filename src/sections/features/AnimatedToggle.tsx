import { useEffect, useState } from "react";

/** delay 후 켜지는 토글. delay가 null이면 꺼진 채로 둔다 */
export function AnimatedToggle({ delay }: { delay: number | null }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (delay === null) return;
    const timer = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
        on ? "bg-accent-blue" : "bg-[#38444d]"
      }`}
    >
      <div
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </div>
  );
}
