import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type TrendingHashtag = {
  id: string;
  tag: string;
  views: number;
  category: string;
};

type SearchResult = {
  id: string;
  thumbnail: string;
  author: string;
  avatar: string;
  title: string;
  views: number;
};

type Creator = {
  id: string;
  username: string;
  name: string;
  avatar: string;
  followers: number;
  isVerified: boolean;
};

const trendingHashtags: TrendingHashtag[] = [
  { id: '1', tag: 'природа', views: 45200000, category: 'Путешествия' },
  { id: '2', tag: 'танцы', views: 38900000, category: 'Развлечения' },
  { id: '3', tag: 'рецепты', views: 32100000, category: 'Еда' },
  { id: '4', tag: 'спорт', views: 28500000, category: 'Спорт' },
  { id: '5', tag: 'юмор', views: 25300000, category: 'Развлечения' },
  { id: '6', tag: 'мода', views: 22700000, category: 'Стиль' },
  { id: '7', tag: 'технологии', views: 19400000, category: 'Технологии' },
  { id: '8', tag: 'животные', views: 17800000, category: 'Животные' },
];

const searchResults: SearchResult[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    author: '@alexandrov',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    title: 'Рассвет на Байкале',
    views: 15420,
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    author: '@maria_dance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    title: 'Новый танец',
    views: 28934,
  },
  {
    id: '3',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400',
    author: '@cooking_pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef',
    title: 'Паста карбонара',
    views: 45120,
  },
];

const creators: Creator[] = [
  {
    id: '1',
    username: '@alexandrov',
    name: 'Александр Петров',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    followers: 45200,
    isVerified: true,
  },
  {
    id: '2',
    username: '@maria_dance',
    name: 'Мария Танцовщица',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    followers: 128000,
    isVerified: true,
  },
  {
    id: '3',
    username: '@cooking_pro',
    name: 'Кулинарный Pro',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef',
    followers: 89000,
    isVerified: false,
  },
];

const categories = [
  { name: 'Все', icon: 'Grid3x3' },
  { name: 'Путешествия', icon: 'Plane' },
  { name: 'Еда', icon: 'UtensilsCrossed' },
  { name: 'Спорт', icon: 'Dumbbell' },
  { name: 'Музыка', icon: 'Music' },
  { name: 'Технологии', icon: 'Laptop' },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/')}
            >
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="relative flex-1">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск видео, авторов, хештегов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 bg-secondary border-0"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={18} />
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.name}
                variant={selectedCategory === cat.name ? 'default' : 'outline'}
                size="sm"
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={() => setSelectedCategory(cat.name)}
              >
                <Icon name={cat.icon as any} size={16} />
                <span>{cat.name}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="w-full grid grid-cols-3 mx-auto max-w-md">
          <TabsTrigger value="trending">Тренды</TabsTrigger>
          <TabsTrigger value="videos">Видео</TabsTrigger>
          <TabsTrigger value="creators">Авторы</TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-4 px-4">
          <div className="space-y-3">
            {trendingHashtags.map((hashtag, index) => (
              <div
                key={hashtag.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-accent cursor-pointer transition-colors group"
                onClick={() => navigate('/')}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">#{hashtag.tag}</span>
                    {index < 3 && (
                      <Icon name="TrendingUp" size={18} className="text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {hashtag.views > 1000000 
                      ? `${(hashtag.views / 1000000).toFixed(1)}M просмотров` 
                      : `${(hashtag.views / 1000).toFixed(0)}K просмотров`}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {hashtag.category}
                  </Badge>
                </div>
                <Icon 
                  name="ChevronRight" 
                  size={20} 
                  className="text-muted-foreground group-hover:text-foreground transition-colors"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-4">
          <div className="grid grid-cols-2 gap-2 px-2">
            {searchResults.map((video) => (
              <div
                key={video.id}
                className="rounded-xl overflow-hidden bg-card cursor-pointer group"
                onClick={() => navigate('/')}
              >
                <div className="relative aspect-[9/16]">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                    <Icon name="Play" size={12} />
                    <span>{video.views > 999 ? `${(video.views / 1000).toFixed(1)}K` : video.views}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</p>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={video.avatar} />
                      <AvatarFallback>{video.author[1]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{video.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="creators" className="mt-4 px-4">
          <div className="space-y-3">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-accent cursor-pointer transition-colors"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-14 w-14">
                  <AvatarImage src={creator.avatar} />
                  <AvatarFallback>{creator.username[1]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{creator.username}</span>
                    {creator.isVerified && (
                      <Icon name="BadgeCheck" size={16} className="text-primary" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{creator.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {creator.followers > 999 
                      ? `${(creator.followers / 1000).toFixed(1)}K подписчиков` 
                      : `${creator.followers} подписчиков`}
                  </p>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Подписаться
                </Button>
              </div>
            ))}
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
          <button className="flex flex-col items-center gap-1 text-foreground hover:text-primary transition-colors">
            <Icon name="Compass" size={24} />
            <span className="text-xs">Поиск</span>
          </button>
          <button className="relative -mt-6 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-pink-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <Icon name="Plus" size={28} className="text-white" />
            </div>
          </button>
          <button 
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
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
    </div>
  );
}
