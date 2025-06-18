import { useState } from "react";
import { Article } from "@/types/knowledge-base";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ContentAreaProps {
  article: Article | null;
  onToggleFavorite: (articleId: string) => void;
  className?: string;
}

const ContentArea = ({
  article,
  onToggleFavorite,
  className,
}: ContentAreaProps) => {
  const [showComments, setShowComments] = useState(false);

  if (!article) {
    return (
      <div className={cn("flex-1 p-8", className)}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <Icon name="BookOpen" size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Добро пожаловать в базу знаний
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Выберите раздел в боковом меню или воспользуйтесь поиском для
              начала работы
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-3">🌐</div>
                <h3 className="font-semibold mb-2">Интернет</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ADSL, Ethernet, GPON технологии
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-3">📺</div>
                <h3 className="font-semibold mb-2">Телевидение</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  IPTV и кабельное телевидение
                </p>
              </div>
              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-semibold mb-2">Телефония</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  SIP и традиционная телефония
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const renderContent = (content: string) => {
    // Простая обработка markdown для демонстрации
    return content.split("\n").map((line, index) => {
      if (line.startsWith("# ")) {
        return (
          <h1
            key={index}
            className="text-3xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white"
          >
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold mb-3 mt-6 text-gray-900 dark:text-white"
          >
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith("```")) {
        return (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm my-4"
          >
            {line}
          </div>
        );
      }
      if (line.trim() === "") {
        return <div key={index} className="h-4"></div>;
      }
      return (
        <p
          key={index}
          className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed"
        >
          {line}
        </p>
      );
    });
  };

  return (
    <div className={cn("flex-1 bg-white dark:bg-gray-900", className)}>
      <div className="max-w-4xl mx-auto p-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {article.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Автор: {article.author}</span>
                <span>•</span>
                <span>Обновлено: {formatDate(article.updatedAt)}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Icon name="Eye" size={14} />
                  <span>{article.views} просмотров</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(article.id)}
                className={cn(
                  "transition-colors",
                  article.isFavorite
                    ? "text-yellow-600 hover:text-yellow-700"
                    : "text-gray-400 hover:text-gray-600",
                )}
              >
                <Icon name={article.isFavorite ? "Star" : "Star"} size={18} />
              </Button>

              <Button variant="ghost" size="sm">
                <Icon name="Share2" size={18} />
              </Button>

              <Button variant="ghost" size="sm">
                <Icon name="MoreHorizontal" size={18} />
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />
        </div>

        {/* Article Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {renderContent(article.content)}
        </div>

        {/* Article Actions */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Icon name="Edit3" size={16} className="mr-2" />
                Редактировать
              </Button>

              <Button variant="outline" size="sm">
                <Icon name="History" size={16} className="mr-2" />
                История изменений
              </Button>

              <Button variant="outline" size="sm">
                <Icon name="Copy" size={16} className="mr-2" />
                Копировать ссылку
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
            >
              <Icon name="MessageCircle" size={16} className="mr-2" />
              Комментарии (3)
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6">Комментарии</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    МИ
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">Мария Иванова</span>
                      <span className="text-xs text-gray-500">2 дня назад</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Отличная статья! Очень помогла при настройке оборудования.
                      Может стоит добавить раздел про диагностику проблем?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentArea;
