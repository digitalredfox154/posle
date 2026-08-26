# ПОСЛЕ — Todo

## Phase 1: Foundation
- [x] Global styles: Cormorant Garamond + Inter fonts, CSS variables (white/mint/#0E0E0E palette)
- [x] Database schema: clients, pets, visits, subscriptions, master_users, sms_codes
- [x] Dark Header component (#0E0E0E) with nav links
- [x] Dark Footer component (#0E0E0E) with contacts and socials
- [x] App routing: all public + private routes

## Phase 2: Public Pages
- [x] Home page: Hero, Philosophy, Before/After slider, Subscription teaser, Master bio, Booking CTA
- [x] Before/After drag slider component (mouse + touch)
- [x] About page
- [x] Results/Gallery page
- [x] Subscription page
- [x] Contacts page with Yandex Map

## Phase 3: Auth + Client Account
- [x] SMS auth flow: phone input → 6-digit code → JWT cookie
- [x] Rate limiting + brute-force protection (5 attempts → 15 min block)
- [x] Client dashboard: next appointment, subscription status, quick booking
- [x] Pet profiles: add/edit/delete, photo upload, breed, notes, allergies
- [x] Pet diary: visit timeline, before/after photos, master notes, recommendations
- [x] Subscription management: plan display, billing date, payment history, cancel

## Phase 4: Master Panel + Booking + Storage
- [x] Master daily visit list
- [x] Visit card creation: before/after photo upload, notes, publish to client diary, 24h edit window
- [x] YCLIENTS API integration: service list, available slots, booking creation
- [x] Booking flow: pet → service → date/time → SMS confirmation
- [x] SMS reminder 24h before visit
- [x] File storage: photo upload to S3, 5MB limit

## Phase 5: QA + Tests
- [x] Vitest unit tests: auth, pets RBAC, visits RBAC, subscriptions (8 tests passing)
- [x] Mobile responsiveness (mobile-first design)
- [x] Final checkpoint save
- [x] YCLIENTS vitest tests (3 tests passing)

## Pending (requires external credentials)
- [x] YCLIENTS API key — подключён, partner token + user token, 11 тестов прошли
- [x] SMS provider credentials — sms.ru подключён (ключ E39E10E8-1C01-4BD6-6D89-60D0278647CD), тестовый режим активен (SMS_RU_TEST=true)
- [x] Master visit edit page (/master/visit/:id) — masterGet procedure, WebP оптимизация, хранение key+url, 24ч окно, 5 тестов (16 всего)

## SMS Integration
- [x] Подключить sms.ru API — ключ сохранён, 2 теста прошли (18 всего)
- [x] Имя отправителя POSLE — нужно зарегистрировать в sms.ru (раздел «Отправители») [ручное действие в личном кабинете sms.ru]
- [x] Пополнить баланс sms.ru для отправки SMS [ручное действие в личном кабинете sms.ru]

## Content Sync (May 2026)
- [x] About.tsx: реальное фото мастера, кремовые фоны #F0EDE8/#F7F5F2, обновлённые тексты, 4 карточки принципов, карта вместо Unsplash-фото, CTA «Начните с знакомства»
- [x] Contacts.tsx: часы работы «Ежедневно 10:00–20:00», кремовый фон #F0EDE8, CTA «Начните с знакомства» с btn-mint/btn-outline-light
- [x] Results.tsx: кремовый фон #F0EDE8 вместо белого, добавлен CTA-блок «Начните с знакомства»

## Bug Fixes
- [x] Home.tsx: исправлены 4 TS ошибки — PLACEHOLDER_* заменены на PAIRS array с выбором пары через табы
- [x] Results.tsx: заменены Unsplash placeholder-фото на реальные CDN фото (5 пар до/после)

- [x] Установить предоставленный логотип IMG_4296.JPG как фавикон сайта
- [ ] Развернуть текущий сайт ПОСЛЕ на сервере Reg.ru без потери существующих аккаунтов и данных
- [ ] Настроить posle-grooming.ru и www.posle-grooming.ru для опубликованного приложения
- [ ] Выпустить и подключить корректный HTTPS-сертификат для обоих доменов
- [ ] Проверить на пользовательском домене клиентский вход, кабинет, администраторский вход и онлайн-запись
- [x] Подобрать и согласовать минимальный Node.js VPS в Reg.ru для полного переноса сайта
- [x] Перенести существующее приложение, базу пользователей и доступные файлы на согласованный VPS Reg.ru; три недоступных legacy-объекта выделены отдельной задачей
- [x] Экспортировать и восстановить MySQL-данные клиентов, питомцев, визитов и администраторских учётных записей на VPS
- [x] Заменить зависящие от Manus компоненты авторизации и файлового хранилища на конфигурацию для самостоятельного VPS
- [ ] Перенести переменные окружения и проверить интеграцию YClients, доставку кодов входа и загрузку фотографий
- [x] Закрепить постоянное локальное хранилище VPS для новых фото с ограниченными правами, маршрутом выдачи и резервным копированием
- [ ] Восстановить три legacy-файла, временно недоступные в исходном хранилище, когда провайдер снова выдаст доступ
- [x] Выгрузить доступные статические изображения Manus в единый архив и перенести их в постоянное хранилище VPS
- [ ] Проверить, что новые фото и файлы кабинета сохраняются только в постоянном хранилище VPS и входят в ежедневную резервную копию
- [ ] Создать отдельный SMTP-ящик для OTP, подключить его к VPS и проверить доставку кода без раскрытия пароля
- [ ] Добиться снятия ограничения исходящего SMTP на VPS через поддержку Reg.cloud и повторно проверить доставку OTP
- [x] Настроить устойчивые таймауты внешних regression-тестов YClients и sms.ru без изменения рабочих интеграций
- [x] Изменить email OTP flow: сохранять код только после успешной SMTP-доставки либо откатывать его при ошибке транспорта; покрыть transport-failure unit-тестом
- [x] Разделить публичные статические ассеты и приватные кабинетные загрузки либо добавить авторизованную выдачу приватных фото вместо общего публичного `/uploads`
- [x] Проверить положительный сценарий доступа к приватным медиа: владелец клиента и админ получают 200 для своих `visits/*` и `admin/*` файлов, чужой или неавторизованный пользователь — 403
- [x] Добавить route/integration test для `/uploads/*` с owner/admin authorization и legacy `/manus-storage/*` redirect для приватных ключей
