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
- [ ] Имя отправителя POSLE — нужно зарегистрировать в sms.ru (раздел «Отправители»)
- [ ] Пополнить баланс sms.ru для отправки SMS

## Bug Fixes
- [x] Home.tsx: исправлены 4 TS ошибки — PLACEHOLDER_* заменены на PAIRS array с выбором пары через табы
- [x] Results.tsx: заменены Unsplash placeholder-фото на реальные CDN фото (5 пар до/после)
