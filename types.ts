
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  location: string;
  isPro: boolean;
}

export interface Post {
  id: string;
  author: string;
  authorId: string;
  avatar: string;
  title: string;
  image: string;
  isFollowing: boolean;
  isFeatured?: boolean;
  reactions: {
    amei: number;
    preciso: number;
    farei: number;
    negocio: number;
    gostei: number;
  };
  comments: number;
  tags: string[];
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: string[];
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: Date;
  isAi: boolean;
}

export interface Negotiation {
  id: string;
  clientName: string;
  projectTitle: string;
  status: 'Pendente' | 'Ativa' | 'Concluída' | 'Cancelada';
  value: string;
  deadline: string;
}

export interface ScheduledPost {
  id: string;
  title: string;
  platform: 'Instagram' | 'LinkedIn' | 'Behance' | 'Portfólio';
  date: string;
  time: string;
  status: 'Agendado' | 'Publicado' | 'Rascunho';
}

export type View = 'feed' | 'inspiration' | 'palettes' | 'chat' | 'business' | 'login' | 'reels' | 'profile';
