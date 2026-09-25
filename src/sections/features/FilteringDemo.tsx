import { AnimatedToggle } from "./AnimatedToggle";

export function FilteringDemo() {
  const scopes = ["Home Timeline", "Tweet Detail", "Search Results"];
  return (
    <div className="p-4">
      <p className="mb-3 text-[10px] uppercase tracking-wider text-[#71767b]">
        Filter Scope
      </p>
      {scopes.map((scope, i) => (
        <div
          key={scope}
          className="flex items-center justify-between border-b border-[#2f3336] py-3 last:border-0"
          style={{ animation: `fade-in-up 0.4s ease-out ${i * 150}ms both` }}
        >
          <span className="text-sm text-[#e7e9ea]">{scope}</span>
          <AnimatedToggle delay={800 + i * 300} />
        </div>
      ))}
    </div>
  );
}
