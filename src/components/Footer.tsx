import { useI18n } from "../hooks/useI18n";
import { AUTHOR_X_URL, AUTHOR_HANDLE, FEEDBACK_URL, GITHUB_URL } from "../lib/constants";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border py-8 pb-20 lg:pb-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-sm text-text-secondary">
        <div className="flex items-center gap-4">
          <a
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-primary"
          >
            {t("footer.feedback")}
          </a>
          <span className="text-border">·</span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text-primary"
          >
            GitHub
          </a>
        </div>
        <p>
          {t("footer.credit")}{" "}
          <a
            href={AUTHOR_X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-blue hover:underline"
          >
            {AUTHOR_HANDLE}
          </a>
        </p>
      </div>
    </footer>
  );
}
