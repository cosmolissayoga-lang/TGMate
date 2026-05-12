export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
};

export type GeneratedPost = {
  id: string;
  title: string;
  body: string;
  emoji: string;
  mediaHint: string;
};

export type PostMetric = {
  id: string;
  title: string;
  likes: number;
  donationsStars: number;
};

export type StarsPeriod = "today" | "week" | "month";

export type StarsStats = Record<StarsPeriod, number>;

export type MiniGameKind = "predictions" | "wheel" | "quiz";

export type MiniGame = {
  id: string;
  kind: MiniGameKind;
  title: string;
  description: string;
  rewardStars: number;
};

export type LeaderboardRow = {
  rank: number;
  name: string;
  score: number;
};

export type WalletTransaction = {
  id: string;
  amountStars: number;
  label: string;
  at: string;
};

export type LinkedCard = {
  id: string;
  last4: string;
  brand: string;
};
