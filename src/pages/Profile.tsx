import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type UserVideo = {
  id: string;
  thumbnail: string;
  views: number;
  likes: number;
};

const mockUserVideos: UserVideo[] = [
  { id: '1', thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', views: 15420, likes: 1243 },
  { id: '2', thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', views: 28934, likes: 2156 },
  { id: '3', thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400', views: 45120, likes: 3892 },
  { id: '4', thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', views: 12340, likes: 987 },
  { id: '5', thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400', views: 18765, likes: 1456 },
  { id: '6', thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', views: 32456, likes: 2789 },
];

const mockLikedVideos: UserVideo[] = [
  { id: '7', thumbnail: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400', views: 54320, likes: 4521 },
  { id: '8', thumbnail: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400', views: 67890, likes: 5632 },
  { id: '9', thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400', views: 43210, likes: 3456 },
];

export default function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('videos');
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate('/')}
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Icon name="Settings" size={24} />
          </Button>
        </div>

        <div className="h-48 bg-gradient-to-br from-primary via-pink-500 to-purple-500" />
        
        <div className="px-4 -mt-16 relative z-10">
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser" />
              <AvatarFallback>ME</AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold mt-4">@alexandrov</h1>
            <p className="text-sm text-muted-foreground mt-1">Александр Петров</p>
            <p className="text-sm text-center mt-3 max-w-md">
              Путешествую по России 🇷🇺 | Фотограф | Горы и природа
            </p>

            <div className="flex gap-6 mt-6">
              <div className="text-center">
                <div className="text-xl font-bold">156</div>
                <div className="text-xs text-muted-foreground">Подписок</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">45.2K</div>
                <div className="text-xs text-muted-foreground">Подписчиков</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">1.2M</div>
                <div className="text-xs text-muted-foreground">Лайков</div>
              </div>
            </div>

            <div className="flex gap-3 mt-6 w-full max-w-md">
              <Button 
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? 'Отписаться' : 'Подписаться'}
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="UserPlus" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="w-full grid grid-cols-3 mx-auto max-w-md">
          <TabsTrigger value="videos" className="gap-2">
            <Icon name="Grid3x3" size={16} />
            <span>Видео</span>
          </TabsTrigger>
          <TabsTrigger value="liked" className="gap-2">
            <Icon name="Heart" size={16} />
            <span>Понравилось</span>
          </TabsTrigger>
          <TabsTrigger value="saved" className="gap-2">
            <Icon name="Bookmark" size={16} />
            <span>Сохранено</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-4">
          <div className="grid grid-cols-3 gap-1 px-1">
            {mockUserVideos.map((video) => (
              <div 
                key={video.id} 
                className="relative aspect-[9/16] bg-card rounded overflow-hidden cursor-pointer group"
                onClick={() => navigate('/')}
              >
                <img 
                  src={video.thumbnail} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <Icon name="Play" size={14} />
                    <span>{video.views > 999 ? `${(video.views / 1000).toFixed(1)}K` : video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} />
                    <span>{video.likes > 999 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-4">
          <div className="grid grid-cols-3 gap-1 px-1">
            {mockLikedVideos.map((video) => (
              <div 
                key={video.id} 
                className="relative aspect-[9/16] bg-card rounded overflow-hidden cursor-pointer group"
                onClick={() => navigate('/')}
              >
                <img 
                  src={video.thumbnail} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <Icon name="Play" size={14} />
                    <span>{video.views > 999 ? `${(video.views / 1000).toFixed(1)}K` : video.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Heart" size={14} fill="currentColor" />
                    <span>{video.likes > 999 ? `${(video.likes / 1000).toFixed(1)}K` : video.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon name="Bookmark" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Нет сохраненных видео</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Сохраняйте видео, которые хотите посмотреть позже
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-20">
        <div className="flex items-center justify-around px-6 py-3">
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
            onClick={() => navigate('/')}
          >
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
          <button className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors">
            <Icon name="User" size={24} />
            <span className="text-xs">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
}