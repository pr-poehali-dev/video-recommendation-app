import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

type Video = {
  id: string;
  author: string;
  avatar: string;
  description: string;
  videoUrl: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
};

const mockVideos: Video[] = [
  {
    id: '1',
    author: '@alexandrov',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    description: 'Рассвет на Байкале 🌅 #природа #путешествия',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 15420,
    comments: 342,
    shares: 89,
    isLiked: false,
  },
  {
    id: '2',
    author: '@maria_dance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    description: 'Новый танец! Кто повторит? 💃 #dance #viral',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 28934,
    comments: 1203,
    shares: 456,
    isLiked: false,
  },
  {
    id: '3',
    author: '@cooking_pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef',
    description: 'Секрет идеальной пасты карбонара 🍝 #рецепты #кулинария',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    likes: 45120,
    comments: 892,
    shares: 234,
    isLiked: false,
  },
];

export default function Index() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'feed' | 'subscriptions' | 'trending'>('feed');
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleLike = (videoId: string) => {
    setVideos(videos.map(v => 
      v.id === videoId 
        ? { ...v, isLiked: !v.isLiked, likes: v.isLiked ? v.likes - 1 : v.likes + 1 }
        : v
    ));
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="h-screen w-full bg-background overflow-hidden relative">
      <div className="relative h-full w-full flex items-center justify-center">
        <video
          key={currentVideo.id}
          className="h-full w-full object-cover"
          src={currentVideo.videoUrl}
          loop
          autoPlay
          muted
          playsInline
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('feed')}
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'feed' 
                  ? 'text-white bg-white/20 backdrop-blur-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Рекомендации
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'subscriptions' 
                  ? 'text-white bg-white/20 backdrop-blur-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Подписки
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'trending' 
                  ? 'text-white bg-white/20 backdrop-blur-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Трендовое
            </button>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/search')}
          >
            <Icon name="Search" size={20} />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 pb-20 z-10 space-y-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={currentVideo.avatar} />
              <AvatarFallback>{currentVideo.author[1]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">{currentVideo.author}</p>
            </div>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              Подписаться
            </Button>
          </div>
          
          <p className="text-white text-sm">{currentVideo.description}</p>
        </div>

        <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-10">
          <button
            onClick={() => handleLike(currentVideo.id)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`p-3 rounded-full transition-all ${
              currentVideo.isLiked 
                ? 'bg-primary text-white animate-pulse-like' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}>
              <Icon name={currentVideo.isLiked ? "Heart" : "Heart"} size={24} fill={currentVideo.isLiked ? "currentColor" : "none"} />
            </div>
            <span className="text-white text-xs font-semibold">
              {currentVideo.likes > 999 ? `${(currentVideo.likes / 1000).toFixed(1)}K` : currentVideo.likes}
            </span>
          </button>

          <button
            onClick={() => setShowComments(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all">
              <Icon name="MessageCircle" size={24} />
            </div>
            <span className="text-white text-xs font-semibold">{currentVideo.comments}</span>
          </button>

          <button className="flex flex-col items-center gap-1 group">
            <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all">
              <Icon name="Share2" size={24} />
            </div>
            <span className="text-white text-xs font-semibold">{currentVideo.shares}</span>
          </button>
        </div>

        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-full cursor-pointer z-[5]"
          onClick={() => setCurrentVideoIndex(prev => prev > 0 ? prev - 1 : videos.length - 1)}
        />
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full cursor-pointer z-[5]"
          onClick={() => setCurrentVideoIndex(prev => prev < videos.length - 1 ? prev + 1 : 0)}
        />
      </div>

      <nav className="absolute bottom-0 left-0 right-0 bg-card border-t border-border z-20">
        <div className="flex items-center justify-around px-6 py-3">
          <button className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors">
            <Icon name="Home" size={24} />
            <span className="text-xs">Главная</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate('/search')}
          >
            <Icon name="Compass" size={24} />
            <span className="text-xs">Поиск</span>
          </button>
          <button className="relative -mt-6 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Icon name="Plus" size={28} className="text-white" />
            </div>
          </button>
          <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
            <Icon name="Bell" size={24} />
            <span className="text-xs">Уведомления</span>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate('/profile')}
          >
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </nav>

      <Sheet open={showComments} onOpenChange={setShowComments}>
        <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-center">{currentVideo.comments} комментариев</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full mt-4 pb-20">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">@user{i + 1}</span>
                      <span className="text-xs text-muted-foreground">{i + 1}ч назад</span>
                    </div>
                    <p className="text-sm mt-1">Отличное видео! 🔥</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                        <Icon name="Heart" size={14} />
                        <span>{Math.floor(Math.random() * 100)}</span>
                      </button>
                      <button className="text-xs text-muted-foreground hover:text-foreground">
                        Ответить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border">
            <div className="flex gap-2">
              <Input placeholder="Добавить комментарий..." className="flex-1" />
              <Button size="icon" className="bg-primary hover:bg-primary/90">
                <Icon name="Send" size={18} />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}