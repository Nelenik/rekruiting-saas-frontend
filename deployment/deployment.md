# Развертывание RekrutAI Frontend на Ubuntu Server

Данная документация описывает процесс развертывания Next.js приложения RekrutAI на Ubuntu сервере с использованием Docker.

## Предварительные требования

- Ubuntu Server 20.04 или выше
- Docker и Docker Compose
- Nginx (установлен на хост-машине)
- Минимум 2GB RAM
- Минимум 10GB свободного места на диске

## Установка Docker и Docker Compose

### 1. Обновление системы

```bash
sudo apt update
sudo apt upgrade -y
```

### 2. Установка Docker

```bash
# Удаление старых версий Docker (если есть)
sudo apt remove docker docker-engine docker.io containerd runc

# Установка необходимых пакетов
sudo apt install apt-transport-https ca-certificates curl gnupg lsb-release

# Добавление GPG ключа Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавление репозитория Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Установка Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io

# Добавление пользователя в группу docker
sudo usermod -aG docker $USER

# Автозапуск Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### 3. Установка Docker Compose Plugin

Docker Compose v2 устанавливается как плагин для Docker CLI и обычно идет в комплекте с современными версиями Docker:

```bash
# Установка Docker Compose plugin (если не установлен автоматически)
sudo apt install docker-compose-plugin

# Альтернативно, установка вручную:
# DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
# mkdir -p $DOCKER_CONFIG/cli-plugins
# curl -SL https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
# chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
```

### 4. Проверка установки

```bash
docker --version
docker compose version  # Обратите внимание: без дефиса!
```

## Подготовка проекта

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd rekrutai-fe
```

### 2. Настройка переменных окружения

Создайте файл `.env.local`:

```bash
cp .env.local.sample .env.local
```

Отредактируйте `.env.local` и установите необходимые переменные:

```bash
API_URL=http://your-api-server:port
NEXT_PUBLIC_API_URL=http://your-api-server:port
# Добавьте другие необходимые переменные
```

## Настройка Nginx на хост-машине

### 1. Установка Nginx

```bash
sudo apt update
sudo apt install nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 2. Создание конфигурации для приложения

Создайте файл конфигурации для приложения:

```bash
sudo nano /etc/nginx/sites-available/rekrutai-fe
```

Содержимое файла (базовая конфигурация):

```nginx
server {
    listen 80;
    server_name your-domain.com;

    access_log /var/log/nginx/rekrutai-fe.access.log;
    error_log /var/log/nginx/rekrutai-fe.error.log;

    # Путь к статическим файлам из Docker контейнера
    root /path/to/rekrutai-fe/public;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_cache_bypass $http_upgrade;
    }

    # Проксирование API запросов (если используется)
    # location /api/v1 {
    #     proxy_pass_request_headers on;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade $http_upgrade;
    #     proxy_set_header Connection "upgrade";
    #     proxy_set_header Host $host;
    #     proxy_set_header X-Real-IP $remote_addr;
    #     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #     proxy_set_header X-Forwarded-Proto $scheme;
    #     proxy_set_header X-Forwarded-Host $host;
    #     proxy_set_header X-Forwarded-Port $server_port;
    #     proxy_pass http://localhost:4600;
    # }
}
```

**Примечание**: В конфигурации указан `root /path/to/rekrutai-fe/public;`, но Next.js в standalone режиме сам отдает статические файлы. Эта директива может быть полезна для оптимизации, но не является обязательной. Если вы хотите, чтобы Nginx напрямую отдавал статику, убедитесь что путь указан правильно.

### 3. Активация конфигурации

```bash
# Создание символической ссылки
sudo ln -s /etc/nginx/sites-available/rekrutai-fe /etc/nginx/sites-enabled/

# Проверка конфигурации
sudo nginx -t

# Перезагрузка Nginx
sudo systemctl reload nginx
```

### 4. Оптимизация: прямая отдача статики через Nginx (опционально)

Для улучшения производительности можно настроить Nginx на прямую отдачу статических файлов, минуя Node.js:

**Вариант А: Использование примонтированного каталога public**

Docker Compose уже настроен на монтирование `./public` в контейнер. Nginx может использовать этот же каталог:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    access_log /var/log/nginx/rekrutai-fe.access.log;
    error_log /var/log/nginx/rekrutai-fe.error.log;

    # Статические файлы напрямую из public каталога
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        root /path/to/rekrutai-fe/public;
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri @nextjs;
    }

    # Fallback на Next.js если файл не найден
    location @nextjs {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }

    # Все остальные запросы
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }
}
```

**Вариант Б: Простая конфигурация (рекомендуется)**

В большинстве случаев достаточно простого проксирования - Next.js эффективно отдает статику сам:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    access_log /var/log/nginx/rekrutai-fe.access.log;
    error_log /var/log/nginx/rekrutai-fe.error.log;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
    }
}
```

## Сборка и запуск приложения

### 1. Сборка образа

```bash
docker compose build
```

### 2. Запуск приложения

```bash
# Запуск frontend приложения
docker compose up -d
```

### 3. Проверка работы

```bash
# Проверка статуса контейнеров
docker compose ps

# Просмотр логов
docker compose logs -f rekrutai-fe

# Проверка доступности приложения напрямую
curl http://localhost:3000

# Проверка через Nginx
curl http://localhost
```

## Управление приложением

### Остановка приложения

```bash
docker compose down
```

### Перезапуск приложения

```bash
docker compose restart
```

### Обновление приложения

```bash
# Остановка контейнеров
docker compose down

# Получение последних изменений
git pull

# Пересборка и запуск
docker compose build
docker compose up -d
```

### Просмотр логов

```bash
# Логи всех сервисов
docker compose logs -f

# Логи конкретного сервиса
docker compose logs -f rekrutai-fe
```

## Настройка файрвола (UFW)

```bash
# Включение UFW
sudo ufw enable

# Разрешение SSH
sudo ufw allow ssh

# Разрешение HTTP и HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Проверка статуса
sudo ufw status
```

## Настройка автозапуска

Создайте systemd сервис для автозапуска приложения:

```bash
sudo nano /etc/systemd/system/rekrutai-fe.service
```

Содержимое файла:

```ini
[Unit]
Description=RekrutAI Frontend
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/path/to/rekrutai-fe
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
```

Активация сервиса:

```bash
sudo systemctl enable rekrutai-fe.service
sudo systemctl start rekrutai-fe.service
```

## Мониторинг и диагностика

### Проверка использования ресурсов

```bash
# Использование ресурсов контейнерами
docker stats

# Информация о контейнерах
docker ps -a
```

### Очистка системы

```bash
# Удаление неиспользуемых образов
docker image prune

# Удаление неиспользуемых контейнеров
docker container prune

# Полная очистка (осторожно!)
docker system prune -a
```

## SSL сертификат (Let's Encrypt)

Для настройки HTTPS с Let's Encrypt на хост-машине:

```bash
# Установка Certbot для Nginx
sudo apt install certbot python3-certbot-nginx

# Получение сертификата (Certbot автоматически обновит конфигурацию Nginx)
sudo certbot --nginx -d your-domain.com

# Проверка автоматического продления
sudo certbot renew --dry-run

# Автоматическое продление уже настроено через systemd timer
# Проверить статус можно командой:
sudo systemctl status certbot.timer
```

После установки SSL сертификата Certbot автоматически обновит файл `/etc/nginx/sites-available/rekrutai-fe`, добавив:
- Редирект с HTTP на HTTPS
- SSL сертификаты
- Оптимизированные SSL настройки

## Резервное копирование

Создайте скрипт для резервного копирования:

```bash
#!/bin/bash
BACKUP_DIR="/backup/rekrutai-fe"
PROJECT_DIR="/path/to/rekrutai-fe"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Создание архива проекта
tar -czf $BACKUP_DIR/rekrutai-fe_$DATE.tar.gz -C $PROJECT_DIR .

# Удаление старых бэкапов (старше 30 дней)
find $BACKUP_DIR -name "rekrutai-fe_*.tar.gz" -mtime +30 -delete
```

## Устранение проблем

### Проблемы с памятью

Если контейнер завершается из-за нехватки памяти:

```bash
# Увеличьте swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Проблемы с правами доступа

```bash
# Исправление прав доступа к проекту
sudo chown -R $USER:$USER /path/to/rekrutai-fe
```

### Контейнер не запускается

```bash
# Проверка конфигурации
docker compose config

# Принудительная пересборка
docker compose build --no-cache

# Просмотр подробных логов
docker compose logs --no-color rekrutai-fe > debug.log
```

## Полезные команды

```bash
# Вход в контейнер
docker exec -it rekrutai-frontend /bin/sh

# Копирование файлов из контейнера
docker cp rekrutai-frontend:/app/file.txt ./

# Обновление образа без потери данных
docker compose pull
docker compose up -d --no-deps rekrutai-fe
```

## Поддержка и обслуживание

1. Регулярно обновляйте Docker и Docker Compose
2. Мониторьте использование ресурсов
3. Создавайте регулярные резервные копии
4. Следите за логами приложения
5. Обновляйте приложение при выходе новых версий