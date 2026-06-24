import {
  Database,
  MapPin,
  TabletSmartphone,
  type LucideIcon,
} from "lucide-react";

export const GITHUB_URL = "https://github.com/sadmk27/filmapp";
export const PDF_NAME = "Praca_dyplomowa_Adamkiewicz_Szymon.pdf";
export const PDF_PATH = `/files/${PDF_NAME}`;
export const VIDEO_PATH = "/videos/project.mp4";
export const VIDEO_POSTER = "/screenshots/movie-marker.png";

export const TECH_STACK = [
  "React",
  "Google Maps API",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "REST API",
];

export const CHALLENGE_ICONS: Record<string, LucideIcon> = {
  geospatial: MapPin,
  dataModeling: Database,
  performance: TabletSmartphone,
};

export const SCREENSHOT_SRCS: Record<string, string> = {
  loginPage: "/screenshots/login-page.png",
  movieMarker: "/screenshots/movie-marker.png",
  moviePage: "/screenshots/movie-page.png",
  profilePage: "/screenshots/profile.png",
  gamePage: "/screenshots/game-page.png",
  gameSet: "/screenshots/game-set.png",
  quizPage: "/screenshots/quiz-page.png",
  leaderboardPage: "/screenshots/leaderboard.png",
  settings: "/screenshots/settings.png",
};
