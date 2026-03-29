export const LOCALES = ["ko", "en", "ja"] as const;
export type Locale = (typeof LOCALES)[number];

type TranslationKey = keyof typeof translations.ko;

const translations = {
  ko: {
    "hero.title": "나의 타임라인을 되찾으세요",
    "hero.subtitle":
      "X의 유료 파란 뱃지 계정을 자동으로 숨겨주는 무료 Chrome 확장",
    "hero.cta": "Chrome에 추가",
    "hero.cta.sub": "무료 · 데이터 수집 없음",
    "hero.badge": "10,000+ RT · Chrome Extension",
    "hero.github": "GitHub",
    "ba.before": "BEFORE",
    "ba.before.desc": "유료 뱃지 스팸이 가득한 타임라인",
    "ba.after": "AFTER",
    "ba.after.desc": "팔로우한 사람의 트윗만 보이는 타임라인",
    "ba.spam1": "🚀 이 코인 지금 안 사면 후회합니다!! 100배 수익 보장...",
    "ba.spam2": "팔로우하면 DM으로 투자 정보 드립니다 💰💰",
    "ba.clean1": "오늘 날씨 진짜 좋다 ☀️",
    "ba.clean2": "이 영화 진짜 추천! 주말에 꼭 보세요 🎬",
    "ba.hidden": "스팸 트윗 2개 숨김 처리됨",
    "demo.title": "이렇게 작동합니다",
    "demo.subtitle": "확장 프로그램이 유료 뱃지 계정의 트윗을 실시간으로 감지하고 타임라인에서 자동으로 걸러냅니다. 아래 토글을 직접 눌러보세요.",
    "demo.badge.detected": "유료 뱃지 감지",
    "features.title": "주요 기능",
    "features.subtitle": "단순 숨김 그 이상. 타임라인을 원하는 대로 제어하세요.",
    "features.badge.title": "유료 뱃지 감지",
    "features.badge.desc":
      "API 응답 분석으로 유료 구독 뱃지와 레거시 인증 뱃지를 정확히 구분합니다",
    "features.filter.title": "트윗 필터링",
    "features.filter.desc":
      "홈 타임라인, 트윗 상세, 검색 결과에서 영역별로 필터링을 설정할 수 있습니다",
    "features.hide.title": "숨김 모드",
    "features.hide.desc":
      "완전 삭제 또는 접기(클릭으로 펼치기) 중 원하는 방식을 선택하세요",
    "features.whitelist.title": "화이트리스트",
    "features.whitelist.desc":
      "팔로우 중인 계정은 자동 제외. 수동 화이트리스트도 지원합니다",
    "features.quote.title": "인용 트윗 처리",
    "features.quote.desc":
      "인용 트윗을 필터링하지 않거나, 인용 블록만 숨기거나, 전체 트윗을 숨길 수 있습니다",
    "features.i18n.title": "다국어 지원",
    "features.i18n.desc": "한국어, 영어, 일본어를 지원합니다",
    "social.title": "사용자 반응",
    "social.subtitle": "10,000+ RT · 실제 사용자들의 이야기",
    "privacy.title": "프라이버시 보호",
    "privacy.subtitle": "모든 처리는 브라우저 안에서 끝납니다",
    "privacy.local.title": "100% 로컬 처리",
    "privacy.local.desc": "필터링 로직이 브라우저 내에서 실행됩니다. 외부 서버와 통신하지 않습니다.",
    "privacy.nocollect.title": "데이터 수집 없음",
    "privacy.nocollect.desc": "사용자 데이터를 수집하거나 저장하지 않습니다. 어떤 정보도 외부로 전송되지 않습니다.",
    "privacy.opensource.title": "오픈소스",
    "privacy.opensource.desc": "GitHub에서 전체 소스코드를 확인할 수 있습니다. 투명한 개발을 지향합니다.",
    "guide.step": "Step",
    "guide.title": "설치 가이드",
    "guide.step1.title": "Chrome 웹 스토어 방문",
    "guide.step1.desc":
      "아래 버튼을 클릭하여 확장 프로그램 페이지로 이동합니다",
    "guide.step2.title": "Chrome에 추가",
    "guide.step2.desc": "'Chrome에 추가' 버튼을 클릭하여 설치합니다",
    "guide.step3.title": "팔로우 동기화 후 사용",
    "guide.step3.desc":
      "X의 팔로잉 페이지를 한 번 방문하여 팔로우 목록을 초기화한 뒤, 타임라인에서 바로 필터링이 시작됩니다",
    "faq.title": "자주 묻는 질문",
    "faq.q1": "팔로우 중인 계정도 숨겨지나요?",
    "faq.a1":
      "아니요. 팔로우 중인 계정은 자동으로 제외됩니다. 팔로잉 페이지에서 목록을 동기화하면 더 정확하게 작동합니다.",
    "faq.q2": "기업 인증 계정(금색/회색 뱃지)도 숨겨지나요?",
    "faq.a2":
      "아니요. Blue Badge Remover는 유료 구독으로 받은 파란 뱃지만 감지합니다. 기업 인증(금색)이나 정부 기관(회색) 뱃지는 영향받지 않습니다.",
    "faq.q3": "개인정보를 수집하나요?",
    "faq.a3":
      "전혀 수집하지 않습니다. 모든 처리는 브라우저 내에서 로컬로 이루어지며, 외부 서버와 통신하지 않습니다.",
    "faq.q4": "Firefox나 Safari에서도 사용할 수 있나요?",
    "faq.a4":
      "현재는 Chrome(및 Chromium 기반 브라우저)만 지원합니다. 다른 브라우저 지원은 검토 중입니다.",
    "nav.features": "기능",
    "nav.guide": "설치",
    "nav.faq": "FAQ",
    "footer.credit": "made by",
    "footer.feedback": "피드백 보내기",
  },
  en: {
    "hero.title": "Take back your clean timeline",
    "hero.subtitle":
      "A Chrome extension that automatically hides tweets from paid blue badge accounts on X (Twitter)",
    "hero.cta": "Add to Chrome",
    "hero.cta.sub": "Free · No data collection",
    "hero.badge": "10,000+ RT · Chrome Extension",
    "hero.github": "GitHub",
    "ba.before": "BEFORE",
    "ba.before.desc": "Timeline full of paid badge spam",
    "ba.after": "AFTER",
    "ba.after.desc": "Only tweets from people you follow",
    "ba.spam1": "🚀 Don't miss this coin!! 100x returns guaranteed...",
    "ba.spam2": "Follow me for investment tips via DM 💰💰",
    "ba.clean1": "Such beautiful weather today ☀️",
    "ba.clean2": "This movie is amazing! Must watch this weekend 🎬",
    "ba.hidden": "2 spam tweets hidden",
    "demo.title": "See it in action",
    "demo.subtitle": "The extension detects paid badge accounts in real time and filters them from your timeline automatically. Try the toggle below.",
    "features.subtitle": "More than just hiding. Take full control of your timeline.",
    "demo.badge.detected": "Paid badge detected",
    "features.title": "Key Features",
    "features.badge.title": "Paid Badge Detection",
    "features.badge.desc":
      "Accurately distinguishes paid subscription badges from legacy verified badges through API response analysis",
    "features.filter.title": "Tweet Filtering",
    "features.filter.desc":
      "Configure filtering per area: home timeline, tweet detail, and search results",
    "features.hide.title": "Hide Modes",
    "features.hide.desc":
      "Choose between complete removal or collapse (click to expand)",
    "features.whitelist.title": "Whitelist",
    "features.whitelist.desc":
      "Followed accounts are auto-excluded. Manual whitelist also supported",
    "features.quote.title": "Quote Tweet Handling",
    "features.quote.desc":
      "Don't filter, hide quote block only, or hide the entire tweet",
    "features.i18n.title": "Multi-language",
    "features.i18n.desc": "Supports Korean, English, and Japanese",
    "social.title": "User Response",
    "social.subtitle": "10,000+ RT · Real stories from real users",
    "privacy.title": "Privacy First",
    "privacy.subtitle": "Everything happens inside your browser",
    "privacy.local.title": "100% Local Processing",
    "privacy.local.desc": "Filtering runs entirely in your browser. No external server communication.",
    "privacy.nocollect.title": "No Data Collection",
    "privacy.nocollect.desc": "We never collect or store user data. Nothing is transmitted externally.",
    "privacy.opensource.title": "Open Source",
    "privacy.opensource.desc": "Full source code available on GitHub. We believe in transparent development.",
    "guide.step": "Step",
    "guide.title": "Installation Guide",
    "guide.step1.title": "Visit Chrome Web Store",
    "guide.step1.desc": "Click the button below to go to the extension page",
    "guide.step2.title": "Add to Chrome",
    "guide.step2.desc": "Click 'Add to Chrome' button to install",
    "guide.step3.title": "Sync follows & go",
    "guide.step3.desc":
      "Visit your Following page on X once to sync your follow list, then filtering starts automatically on your timeline",
    "faq.title": "FAQ",
    "faq.q1": "Are followed accounts also hidden?",
    "faq.a1":
      "No. Followed accounts are automatically excluded. Syncing your follow list from the Following page makes it even more accurate.",
    "faq.q2": "Are business verified accounts (gold/gray badge) hidden too?",
    "faq.a2":
      "No. Blue Badge Remover only detects blue badges from paid subscriptions. Business (gold) and government (gray) badges are not affected.",
    "faq.q3": "Do you collect personal data?",
    "faq.a3":
      "Absolutely not. All processing happens locally in your browser with no external server communication.",
    "faq.q4": "Can I use it on Firefox or Safari?",
    "faq.a4":
      "Currently only Chrome (and Chromium-based browsers) are supported. Other browser support is under consideration.",
    "nav.features": "Features",
    "nav.guide": "Install",
    "nav.faq": "FAQ",
    "footer.credit": "made by",
    "footer.feedback": "Send Feedback",
  },
  ja: {
    "hero.title": "タイムラインを\n取り戻そう",
    "hero.subtitle":
      "X（Twitter）で有料青バッジアカウントのツイートを自動的に非表示にするChrome拡張機能",
    "hero.cta": "Chromeに追加",
    "hero.cta.sub": "無料・データ収集なし",
    "hero.badge": "10,000+ RT · Chrome Extension",
    "hero.github": "GitHub",
    "ba.before": "BEFORE",
    "ba.before.desc": "有料バッジスパムだらけのタイムライン",
    "ba.after": "AFTER",
    "ba.after.desc": "フォローした人のツイートだけのタイムライン",
    "ba.spam1": "🚀 このコイン今買わないと後悔します！100倍利益保証...",
    "ba.spam2": "フォローでDM投資情報お届けします💰💰",
    "ba.clean1": "今日の天気めっちゃいい ☀️",
    "ba.clean2": "この映画マジおすすめ！週末にぜひ 🎬",
    "ba.hidden": "スパムツイート2件を非表示",
    "demo.title": "動作を確認",
    "demo.subtitle": "拡張機能が有料バッジアカウントのツイートをリアルタイムで検出し、タイムラインから自動的にフィルタリングします。下のトグルを押してみてください。",
    "features.subtitle": "ただ隠すだけじゃない。タイムラインを思い通りにコントロール。",
    "demo.badge.detected": "有料バッジ検出",
    "features.title": "主な機能",
    "features.badge.title": "有料バッジ検出",
    "features.badge.desc":
      "APIレスポンス分析で有料サブスクバッジとレガシー認証バッジを正確に区別します",
    "features.filter.title": "ツイートフィルタリング",
    "features.filter.desc":
      "ホームタイムライン、ツイート詳細、検索結果ごとにフィルタリングを設定できます",
    "features.hide.title": "非表示モード",
    "features.hide.desc":
      "完全削除または折りたたみ（クリックで展開）から選べます",
    "features.whitelist.title": "ホワイトリスト",
    "features.whitelist.desc":
      "フォロー中のアカウントは自動除外。手動ホワイトリストもサポート",
    "features.quote.title": "引用ツイート処理",
    "features.quote.desc":
      "フィルタしない、引用ブロックのみ非表示、ツイート全体を非表示から選べます",
    "features.i18n.title": "多言語対応",
    "features.i18n.desc": "韓国語、英語、日本語に対応しています",
    "social.title": "ユーザーの反応",
    "social.subtitle": "10,000+ RT · 実際のユーザーの声",
    "privacy.title": "プライバシー保護",
    "privacy.subtitle": "すべての処理はブラウザ内で完結します",
    "privacy.local.title": "100%ローカル処理",
    "privacy.local.desc": "フィルタリングロジックはブラウザ内で実行されます。外部サーバーとの通信はありません。",
    "privacy.nocollect.title": "データ収集なし",
    "privacy.nocollect.desc": "ユーザーデータの収集や保存は一切行いません。外部への送信もありません。",
    "privacy.opensource.title": "オープンソース",
    "privacy.opensource.desc": "GitHubでソースコード全体を確認できます。透明な開発を目指しています。",
    "guide.step": "Step",
    "guide.title": "インストールガイド",
    "guide.step1.title": "Chrome Web Storeにアクセス",
    "guide.step1.desc": "下のボタンをクリックして拡張機能ページに移動します",
    "guide.step2.title": "Chromeに追加",
    "guide.step2.desc":
      "「Chromeに追加」ボタンをクリックしてインストールします",
    "guide.step3.title": "フォロー同期して使用",
    "guide.step3.desc":
      "Xのフォロー中ページを一度訪問してフォローリストを同期すると、タイムラインで自動的にフィルタリングが始まります",
    "faq.title": "よくある質問",
    "faq.q1": "フォロー中のアカウントも非表示になりますか？",
    "faq.a1":
      "いいえ。フォロー中のアカウントは自動的に除外されます。フォローページでリストを同期するとより正確に動作します。",
    "faq.q2": "企業認証アカウント（金色/灰色バッジ）も非表示になりますか？",
    "faq.a2":
      "いいえ。Blue Badge Removerは有料サブスクリプションの青バッジのみを検出します。企業認証（金色）や政府機関（灰色）バッジには影響しません。",
    "faq.q3": "個人情報を収集しますか？",
    "faq.a3":
      "一切収集しません。すべての処理はブラウザ内でローカルに行われ、外部サーバーとの通信はありません。",
    "faq.q4": "FirefoxやSafariでも使えますか？",
    "faq.a4":
      "現在はChrome（およびChromiumベースのブラウザ）のみサポートしています。他のブラウザのサポートは検討中です。",
    "nav.features": "機能",
    "nav.guide": "インストール",
    "nav.faq": "FAQ",
    "footer.credit": "made by",
    "footer.feedback": "フィードバックを送る",
  },
} as const;

export type TranslationKeys = TranslationKey;

export function t(locale: Locale, key: TranslationKey): string {
  const localeTranslations = translations[locale];
  return (localeTranslations[key] as string) ?? key;
}
