# WorldCup 2026 — Product Documentation
**Versiyon:** 1.1  
**Tarih:** Mart 2026  
**Durum:** Living Document — Her sprint sonunda güncellenir  
**Değişiklik:** Progressive Auth (Soft Gate) kararı eklendi — mvp_scope + acceptance_criteria güncellendi

Bu döküman, projenin tüm teknik ve ürün kararlarını tek bir referans noktasında birleştirir.

---

## İçindekiler

1. [Product Requirements (PRD)](#1-product-requirements-prd)
2. [MVP Scope](#2-mvp-scope)
3. [System Design Blueprint](#3-system-design-blueprint)
4. [Tech Stack Reference](#4-tech-stack-reference)
5. [Acceptance Criteria](#5-acceptance-criteria)

---

---

# 1. Product Requirements (PRD)

**Version:** 1.0  
**Date:** March 2026  
**Status:** Draft — Discovery Phase  
**Owner:** Senior Product Manager

---

## Executive Summary

WorldCup 2026, tek bir uygulamada fantezi futbol, maç tahmini, bracket yarışması ve sosyal rekabeti bir araya getiren çok dilli (TR/EN/ES) bir turnuva platformudur. Temel rekabet avantajı: rakiplerin ayrı ayrı sunduğu özellikleri gerçek zamanlı veriyle birleştirerek All-in-One deneyim sunmaktır.

**Lansman Hedefi:** FIFA Dünya Kupası 2026 başlangıcından önce (Haziran 2026)  
**Platform:** Web + Mobile (eş zamanlı)  
**Diller:** Türkçe, İngilizce, İspanyolca

---

## 1. User Personas

### 🎯 Persona 1 — "The Passionate Fan" (Ateşli Taraftar)
| Alan | Detay |
|------|-------|
| **Yaş** | 22–35 |
| **Profil** | Maçları takip eder, arkadaşlarıyla bahis/tahmin konuşur, sosyal medyada aktif |
| **Motivasyon** | Arkadaşlarını yenmek, tahminlerinin doğruluğunu kanıtlamak |
| **Acı Noktası** | Farklı uygulamalar arasında geçiş yapmak zorunda kalıyor |
| **Kullanım Sıklığı** | Maç günleri yoğun, turnuva boyunca aktif |
| **Dil** | TR / EN / ES |

### 🧠 Persona 2 — "The Fantasy Strategist" (Fantezi Stratejisti)
| Alan | Detay |
|------|-------|
| **Yaş** | 25–40 |
| **Profil** | Oyuncu istatistiklerini analiz eder, optimal kadro kurar |
| **Motivasyon** | Leaderboard'da üst sıralara çıkmak, puan optimizasyonu |
| **Acı Noktası** | Gerçek zamanlı oyuncu verisi eksikliği, puan sistemi şeffaflığı |
| **Kullanım Sıklığı** | Her gün — oyuncu takibi, kadro değişikliği |
| **Dil** | EN / TR |

### 🌍 Persona 3 — "The Casual Global Fan" (Casual Global Taraftar)
| Alan | Detay |
|------|-------|
| **Yaş** | 18–50 |
| **Profil** | Dünya Kupasını takip eder ama derin istatistik bilgisi yoktur |
| **Motivasyon** | Bracket'ini doldurmak, sosyal medyada paylaşmak |
| **Acı Noktası** | Karmaşık arayüzler, dil bariyeri |
| **Kullanım Sıklığı** | Haftalık — özellikle eleme aşamalarında |
| **Dil** | ES / EN |

### 👔 Persona 4 — "The Group Organizer" (Grup Organizatörü)
| Alan | Detay |
|------|-------|
| **Yaş** | 28–45 |
| **Profil** | Arkadaş/iş grubu için mini lig kurar, rekabeti yönetir |
| **Motivasyon** | Sosyal bağ, grup içi rekabet |
| **Acı Noktası** | Kolay davet/paylaşım mekanizması yok, leaderboard karmaşıklığı |
| **Kullanım Sıklığı** | Turnuva başında yoğun, sonra izleyici |
| **Dil** | TR / EN / ES |

---

## 2. Functional Requirements

### 2.1 — Kimlik & Hesap Yönetimi
- FR-01: Kullanıcı e-posta veya sosyal (Google / Apple) ile kayıt olabilmeli
- FR-02: Çok dilli kayıt ve onboarding akışı (TR / EN / ES)
- FR-03: Kullanıcı profili: fotoğraf, kullanıcı adı, favori takım, dil tercihi
- FR-04: Profil sayfasında fantezi 11'i, tahminler ve bracket görüntülenebilmeli (gizlilik ayarına bağlı)

### 2.2 — Fantezi Futbol Modülü
- FR-05: Kullanıcı turnuvaya katılan takımlardan 11 oyuncudan oluşan kadro kurar
- FR-06: **Kural:** Her ülkeden maksimum 2 oyuncu seçilebilir
- FR-07: Standart kadro formasyonu zorunlu (1 GK, 4 DEF, 3 MID, 3 FWD gibi yapılandırılabilir)
- FR-08: Oyuncu puanları API'den çekilerek gerçek zamanlı güncellenir
- FR-09: Puan kriterleri şeffaf biçimde açıklanmalı (gol, asist, sarı kart, temiz sayfa vb.)
- FR-10: Maç öncesinde kadro değişikliğine izin verilmeli (lock süresi: maç başlangıcı)
- FR-11: Kaptan seçimi (x2 puan çarpanı)

### 2.3 — Maç Tahmini Modülü
- FR-12: Her maç için skor tahmini yapılabilmeli (örn. Türkiye 2–1 Brezilya)
- FR-13: Tahmin lock: maç başlamadan belirli süre önce kapanır
- FR-14: Puan sistemi:
  - Kazanan doğru: +3 puan
  - Skor tam doğru: +7 puan
  - Beraberlik tahmini doğru: +4 puan
- FR-15: Geçmiş tahminler ve doğruluk oranı profil sayfasında görüntülenebilmeli

### 2.4 — Bracket Tahmini Modülü
- FR-16: CS:GO turnuva bracket'ı gibi aşamalı seçim: Grup aşaması → Son 16 → Çeyrek Final → Yarı Final → Final
- FR-17: Grup aşamasında her gruptan kaç takım ilerleyeceği seçilebilmeli
- FR-18: Bracket bir kez oluşturulduğunda sadece ilerleyen aşama güncellenebilir (geriye dönük kilitleme)
- FR-19: Bracket sosyal medyada görsel olarak paylaşılabilmeli (Instagram / Twitter / X)
- FR-20: Bracket puanlaması: Her doğru ilerleme kademeli artan puanla ödüllendirilmeli

### 2.5 — Canlı Maç & İçerik Modülü
- FR-21: Canlı maç skorları ekranda görüntülenmeli (API entegrasyonu)
- FR-22: Her maçın altında yorum bölümü bulunmalı
- FR-23: Yorumlar gerçek zamanlı güncellenmeli; moderasyon sistemi olmalı
- FR-24: Maç istatistikleri: top istatistiği, korner, sarı/kırmızı kart, goller

### 2.6 — Leaderboard Modülü
- FR-25: Üç zaman diliminde leaderboard: Günlük / Haftalık / Tüm Turnuva
- FR-26: Global leaderboard herkese açık olmalı
- FR-27: Bir kullanıcının profiline tıklandığında fantezi kadrosu, tahminleri ve bracket'i görüntülenebilmeli
- FR-28: Leaderboard filtresi: Ülkeye göre, dile göre

### 2.7 — Sosyal & Paylaşım Modülü
- FR-29: Bracket ve fantezi kadrosu görsel olarak paylaşılabilmeli (Instagram Stories formatı dahil)
- FR-30: Arkadaşa "challenge" gönderilebilmeli (VS modu: iki kullanıcının puanları karşılaştırılır)
- FR-31: Davet linki ile yeni kullanıcılar platforma çekilebilmeli
- FR-32: Deep link desteği: Paylaşılan içerik uygulamaya veya web'e yönlendirmeli

### 2.8 — Puan Ağırlık Sistemi
- FR-33: Genel sıralama skoru aşağıdaki ağırlıklı ortalamaya göre hesaplanmalı:
  - Fantezi Futbol Puanı: %40
  - Maç Tahmini Puanı: %35
  - Bracket Tahmini Puanı: %25
- FR-34: Kullanıcı katılmadığı modül için sıfır puan alır (katılım zorunlu değil)
- FR-35: Ağırlık formülü platform içinde şeffaf biçimde açıklanmalı

### 2.9 — Veri & API Entegrasyonu
- FR-36: Katılan 48 takım ve kadrolar API'den çekilmeli
- FR-37: Maç sonuçları, canlı skorlar ve oyuncu istatistikleri otomatik güncellenmeli
- FR-38: Kritik veriler (takımlar, oyuncular, maç takvimi) veritabanına yazılmalı
- FR-39: API başarısız olursa son geçerli veri gösterilmeli (cache stratejisi)

---

## 3. Non-Functional Requirements

### 3.1 Performans
- NFR-01: Sayfa yüklenme süresi < 2 saniye (LCP — mobil ve web)
- NFR-02: Canlı skor güncellemesi gecikme süresi < 5 saniye
- NFR-03: Leaderboard hesaplama < 1 saniye (önbellek destekli)
- NFR-04: Eş zamanlı 50.000+ kullanıcıyı destekleyebilmeli (maç saatleri pik trafiği)
- NFR-05: API entegrasyon başarı oranı > %99.5 uptime

### 3.2 Güvenlik
- NFR-06: Kullanıcı verisi GDPR / KVKK uyumlu şekilde saklanmalı
- NFR-07: Kimlik doğrulama: JWT + refresh token mimarisi
- NFR-08: Rate limiting: Bot koruması, aşırı istek engelleme
- NFR-09: Puan manipülasyonu önleme: Tüm tahmin ve puan değişiklikleri sunucu tarafında doğrulanmalı
- NFR-10: Yorum moderasyonu: Küfür filtreleme ve ihbar mekanizması

### 3.3 Kullanılabilirlik
- NFR-11: WCAG 2.1 AA erişilebilirlik standardı
- NFR-12: Mobil responsive tasarım (iOS 15+ / Android 10+)
- NFR-13: Düşük bant genişliğinde çalışabilir olmalı (3G uyumlu kritik sayfalarda)
- NFR-14: Onboarding: Yeni kullanıcı ilk 3 dakikada temel özelliği deneyimleyebilmeli
- NFR-15: Hata mesajları kullanıcının diline göre gösterilmeli

### 3.4 Lokalizasyon
- NFR-16: UI, bildirimler ve yardım metinleri TR / EN / ES dillerinde olmalı
- NFR-17: Tarih/saat formatları kullanıcının saat dilimine göre otomatik ayarlanmalı
- NFR-18: Dil değişikliği gerçek zamanlı, sayfa yenilenmeden çalışmalı

### 3.5 Ölçeklenebilirlik
- NFR-19: Turnuva sonrası veriler arşivlenmeli (gelecek kupalar için altyapı)
- NFR-20: Modüler yapı: Yeni özellik eklenmesi mevcut sistemi etkilememeli

---

## 4. Success Metrics (KPI'lar)

### Büyüme Metrikleri
| Metrik | Hedef (Turnuva Sonu) |
|--------|----------------------|
| Toplam kayıtlı kullanıcı | 100.000+ |
| Günlük Aktif Kullanıcı (DAU) | 30.000+ (maç günleri) |
| Aylık Aktif Kullanıcı (MAU) | 60.000+ |
| Organik büyüme oranı (referral) | %25+ |

### Bağlılık Metrikleri
| Metrik | Hedef |
|--------|-------|
| Ortalama oturum süresi (maç günü) | 12+ dakika |
| Fantezi kadro oluşturma oranı | Kayıtlı kullanıcıların %60'ı |
| Bracket doldurma oranı | Kayıtlı kullanıcıların %50'si |
| Paylaşım oranı (sosyal medya) | Aktif kullanıcıların %30'u |
| D7 Retention | %40+ |

### Kalite Metrikleri
| Metrik | Hedef |
|--------|-------|
| Uygulama mağaza puanı | 4.2+ / 5 |
| API veri doğruluğu | %99+ |
| Canlı skor gecikme oranı | < 5 saniye ortalaması |
| Kritik hata (crash) oranı | < %0.5 |

---

## 5. Kapsam Dışı (Out of Scope — v1.0)

- Gerçek para bahsi / kumarhane mekanikleri
- Özel mini ligler / şirket turnuvaları (v2 için planlandı)
- Push bildirimleri gelişmiş kişiselleştirme
- Yapay zeka destekli kadro önerisi
- Podcast / video içerik entegrasyonu
- İş modeli kararı (Freemium / Reklam) — Ayrı bir Revenue Sprint ile belirlenecek

---

## 6. Açık Riskler & Kararlar

| Risk | Etki | Aksiyon |
|------|------|---------|
| API veri sağlayıcısı seçimi (SportRadar, API-Football vb.) | Yüksek | Tech spike: Veri kalitesi ve maliyet karşılaştırması |
| Web + Mobile eş zamanlı lansman → kaynak yükü | Yüksek | MVP'de PWA değerlendirilebilir |
| İş modeli belirsizliği | Orta | Revenue Workshop: Lansmandan önce kararlaştırılmalı |
| Çok dilli içerik yönetimi operasyonel yükü | Orta | i18n kütüphanesi + profesyonel çeviri süreci |
| Turnuva dışında kullanıcı tutma | Düşük | Sezon arası içerik stratejisi (v2 kapsamı) |

---

*Bu döküman projenin yaşayan anayasasıdır. Her sprint sonunda güncellenmesi önerilir.*


---

# 2. MVP Scope

**Version:** 1.0  
**Tarih:** Mart 2026  
**Yöntem:** MoSCoW Analizi + Teknik Risk Değerlendirmesi  
**Hedef Lansman:** Haziran 2026 (FIFA WC 2026 öncesi)

---

## ⚡ MVP Manifestosu

> "Bir kullanıcı maç öncesi tahminini yapabilmeli, fantezi kadrosunu kurabilmeli, bracket'ini doldurabilmeli ve maç sonrası leaderboard'da kaçıncı olduğunu görebilmeli."
> 
> **Bu döngü çalışıyorsa MVP tamamdır. Geri kalan her şey bu döngüye ya hizmet eder ya da erteler.**

**MVP'de tek dil: İngilizce (EN)**  
Türkçe ve İspanyolca — v1.1 (Sprint 5+)

---

## 🔓 Kimlik Doğrulama Stratejisi: Progressive Auth (Soft Gate)

> **Karar Tarihi:** Mart 2026  
> Uygulama açılışında login sayfası gösterilmez. Kullanıcı önce değeri keşfeder; yalnızca yazma aksiyonu gerektiren bir işlem yapmaya çalıştığında auth gate tetiklenir.

### Herkes Görebilir (Auth Gerektirmez)
- Canlı maç skorları
- Maç takvimi
- Global leaderboard
- Başka kullanıcıların public profili (kadro, bracket, tahminler)

### Auth Gate Tetikleyen Aksiyonlar
- Fantezi kadro kaydetme
- Maç tahmini girme
- Bracket seçimi yapma
- Davet linki oluşturma

### UX Davranışı
- Auth gate; tam sayfa yönlendirme değil, **bottom sheet** olarak açılır
- Kullanıcının arkasındaki içerik görünür (dimmed overlay)
- Başlık dinamik değişir: "Save Your Squad" / "Make Your Prediction" / "Lock In Your Bracket"
- Sheet kapanınca kullanıcı kaldığı yere döner, işlemini tamamlayabilir

### Neden Bu Karar?
Kullanıcı önce değeri görür, sonra taahhüt eder. "Önce kayıt ol" engeliyle karşılaşan kullanıcılar dönmeden gider. Auth gate sonrası dönüşüm oranı 3-5x daha yüksektir (ESPN, Sofascore, Google vb. bu modeli kullanır).

---

## 🎯 MoSCoW Kategorileri

### ✅ MUST HAVE — MVP Çekirdeği

| Öncelik | Özellik | Kaynak | Teknik Risk | Tahmini Efor |
|---------|---------|--------|-------------|--------------|
| P0 | API entegrasyonu + veritabanı yazma + cache | FR-36/37/38/39 | 🔴 Yüksek | 2 hafta |
| P0 | Fantezi kadro kurma (max 2/ülke kuralı) | FR-05/06/07/08 | 🟡 Orta | 1.5 hafta |
| P0 | Maç skoru tahmini + puan sistemi | FR-12/13/14 | 🟢 Düşük | 1 hafta |
| P0 | Bracket aşamalı seçim + kilitleme | FR-16/17/18/20 | 🟡 Orta | 1.5 hafta |
| P0 | Canlı maç skorları (polling/websocket) | FR-21 | 🟡 Orta | 0.5 hafta |
| P1 | Ağırlıklı puan formülü (%40/%35/%25) | FR-33/34/35 | 🟢 Düşük | 0.5 hafta |
| P1 | Tüm turnuva leaderboard (global, herkese açık) | FR-25/26 | 🟢 Düşük | 0.5 hafta |
| P1 | Davet linki + deep link | FR-31/32 | 🟢 Düşük | 0.5 hafta |

**Toplam tahmini efor: ~8 hafta**

---

### 🔵 SHOULD HAVE — v1.1 (Sprint 3–4, Turnuva başladıktan sonra)

| Özellik | Kaynak | Gerekçe |
|---------|--------|---------|
| E-posta + sosyal login (Google/Apple) | FR-01/02 | MVP'de basit e-posta yeterli; sosyal login sonradan |
| Kullanıcı profili (fotoğraf, takım tercihi) | FR-03 | Fonksiyon değil, deneyim; sonra eklenebilir |
| Profil'de kadro/tahmin/bracket görüntüleme | FR-04/27 | Sosyal katman v1.1 ile anlam kazanır |
| Kadro değişikliği (maç lock öncesi) | FR-10 | İlk sprint'te basit "bir kez kur" yeterli |
| Tahmin geçmişi + doğruluk oranı | FR-15 | Retention özelliği, acquisition değil |
| Maç detay istatistikleri | FR-24 | Canlı skor yeterli MVP için |
| Şeffaf puan kriterleri sayfası | FR-09 | Statik sayfa, hızlı yapılır — ama kritik değil |

---

### 🟡 COULD HAVE — v2.0 (Turnuva bitmeden, data varsa)

| Özellik | Kaynak | Gerekçe |
|---------|--------|---------|
| Kaptan seçimi (x2 puan çarpanı) | FR-11 | Retention + strateji derinliği; önce core |
| Leaderboard filtresi (ülke/dil) | FR-28 | Anlamlı olması için kullanıcı kitlesi gerekir |
| Görsel paylaşım (Instagram Stories formatı) | FR-29 | Link paylaşımı MVP için yeterli |
| Challenge / VS modu | FR-30 | Güçlü viral mekanik — ama önce ürünün çalışması şart |
| Günlük + Haftalık leaderboard | FR-25 ek | Tüm turnuva leaderboard MVP'de yeterli |

---

### ❌ WON'T HAVE MVP'de — Acımasızca Kesilen Lüksler

| Özellik | Kaynak | Neden Kesildi |
|---------|--------|---------------|
| TR + ES dil desteği | NFR-16 | 3 dil eş zamanlı = 3-4 hafta kayıp. EN ile lan, sonra büyü. |
| Canlı yorumlar + moderasyon | FR-22/23 | WebSocket + moderasyon sistemi başlı başına bir ürün |
| WCAG 2.1 AA tam uyum | NFR-11 | Temel erişilebilirlik yeterli; audit sonradan |
| 50K+ eş zamanlı kapasite (ilk hedef) | NFR-04 | 5K'dan başla, ölçekle. Over-engineering MVP katilidir. |
| Veri arşivleme (2030 için) | NFR-19 | Turnuva bitmeden 2030'u düşünme |
| Profil gizlilik ayarları | FR-04 | MVP'de tüm profiller public — basit ve yeterli |
| 3G optimizasyonu | NFR-13 | Hedef kitle mobil data kullanıcısı; 4G+ varsay |
| LCP < 2 saniye (MVP hedefi: <3sn) | NFR-01 | 3 saniye makul, performans optimizasyonu sonra |

---

## 🏗️ Sprint Planı (Önerilen)

### Sprint 1 — Altyapı & Veri Temeli (Hafta 1–2)
**Odak: API seçimi, veritabanı ve cache mimarisi**

- [ ] API sağlayıcısı seçimi ve sözleşme (SportRadar / API-Football karşılaştırması)
- [ ] 48 takım, kadro, maç takvimi çekme ve DB'ye yazma
- [ ] Cache stratejisi: API hata durumunda son geçerli veri
- [ ] Temel auth (e-posta kayıt/giriş, JWT)
- [ ] Canlı skor altyapısı (polling her 30sn)

**Çıkış kriteri:** Maç verisi canlı çekiliyor, DB'ye yazılıyor.

---

### Sprint 2 — Core Game Loop (Hafta 3–5)
**Odak: Üç tahmin modülü**

- [ ] Fantezi kadro kurma UI + backend (max 2/ülke kural motoru)
- [ ] Maç skoru tahmini akışı + lock mekanizması
- [ ] Bracket aşamalı seçim UI + state yönetimi
- [ ] Puan hesaplama motoru (3 modül, ağırlıklı formül)
- [ ] Temel leaderboard (tüm turnuva, global)

**Çıkış kriteri:** Bir kullanıcı tüm üç modülü doldurabilir ve puanı hesaplanabilir.

---

### Sprint 3 — Sosyal & Büyüme (Hafta 6–7)
**Odak: Viral döngü ve paylaşım**

- [ ] Davet linki oluşturma + deep link yönlendirme
- [ ] Basit link paylaşımı (Twitter/WhatsApp)
- [ ] Profil sayfası (kadro + bracket + toplam puan)
- [ ] Puan kriterleri sayfası

**Çıkış kriteri:** Bir kullanıcı arkadaşını davet edip leaderboard'da karşılaştırabilir.

---

### Sprint 4 — Stabilizasyon & Lansman (Hafta 8)
**Odak: Hata düzeltme, performans, test**

- [ ] Güvenlik: rate limiting, puan manipülasyon koruması
- [ ] GDPR/KVKK uyumlu veri saklama
- [ ] Yük testi: 5K eş zamanlı kullanıcı
- [ ] Onboarding akışı: 3 dakikada ilk tahmin
- [ ] App Store / Play Store başvurusu (mobile için)

**Çıkış kriteri:** Lansman. Gerçek kullanıcı girişi.

---

## 📊 MVP Başarı Kriterleri (4 Hafta Sonrası)

| Metrik | MVP Hedefi |
|--------|-----------|
| Kayıtlı kullanıcı | 5.000+ |
| Fantezi kadro oluşturma oranı | Kayıtlıların %50'si |
| Bracket doldurma oranı | Kayıtlıların %40'ı |
| D7 Retention | %30+ |
| API veri doğruluğu | %99+ |
| Kritik hata oranı | < %1 |

*Not: Requirements.md'deki 100K kullanıcı hedefi turnuva sonu içindir. MVP metrikleri ilk 4 hafta için belirlenmiştir.*

---

## ⚠️ Kritik Riskler & Acil Kararlar

| Risk | Aciliyet | Aksiyon |
|------|----------|---------|
| API sağlayıcısı seçilmedi | 🔴 HEMEN | Sprint 1 öncesi SportRadar vs API-Football tech spike |
| Web + Mobile eş zamanlı | 🔴 HEMEN | MVP'de sadece web (PWA). Native app v1.1. |
| İş modeli hâlâ belirsiz | 🟡 Sprint 2 | MVP reklamsız çalışır; Revenue Workshop Sprint 2'de |

---

*Bu döküman requirements.md'nin MVP versiyonudur. Kapsam değişikliklerinde her ikisi birlikte güncellenmeli.*


---

# 3. System Design Blueprint

**Version:** 1.0  
**Tarih:** Mart 2026  
**Rol:** Senior System Architect  
**Referans:** mvp_scope.md v1.0  
**Teknoloji Durumu:** Agnostic — Framework ve DB seçimi yapılmadı

---

## Önemli Mimari Karar: Fantezi Puanları Maç Sonrası Hesaplanır

> Canlı maç sırasında hiçbir puan hesaplaması tetiklenmez. Puanlar, maç `status = FT` (Full Time) olduktan sonra asenkron bir batch job ile hesaplanır. Bu karar sistemin karmaşıklığını dramatik biçimde düşürür ve WebSocket gibi stateful bağlantı altyapısı ihtiyacını MVP'den kaldırır.

---

## 1. Sistem Genel Mimarisi

### 1.1 Katman Haritası

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│   Web PWA              │           Mobile App           │
│   (Browser)            │        (iOS + Android)         │
└───────────────┬─────────────────┬───────────────────────┘
                │   Platform Adapter Layer                 
                │   (Translates core output to native UI)  
┌───────────────▼─────────────────▼───────────────────────┐
│              SHARED BUSINESS LOGIC CORE                 │
│   Scoring Rules │ Validation Rules │ State Machine      │
│   (Platform-agnostic — no platform import allowed)      │
└───────────────────────────┬─────────────────────────────┘
                            │   Data Interface Boundary
┌───────────────────────────▼─────────────────────────────┐
│                    API GATEWAY                          │
│         Auth · Rate-Limit · Routing · Versioning        │
└──┬──────────┬──────────┬──────────┬──────────┬──────────┘
   │          │          │          │          │
   ▼          ▼          ▼          ▼          ▼
 Auth      Game       Score    Leaderboard  Fixtures
Service   Service    Engine     Service    Service
   │          │          │          │          │
   └──────────┴──────────┴──────────┴──────────┘
                          │
              ┌───────────▼───────────┐
              │      DATA LAYER       │
              │  Primary DB │ Cache   │
              │  Object Storage       │
              └───────────────────────┘
                          ▲
              ┌───────────┴───────────┐
              │   INGESTION LAYER     │
              │  Ingestion Worker     │
              │  Match Status Watcher │
              └───────────┬───────────┘
                          │
              ┌───────────▼───────────┐
              │  SPORTS DATA API      │
              │  (External Provider)  │
              └───────────────────────┘
```

---

## 2. Cross-Platform Stratejisi: Headless Core

### 2.1 Temel Prensip

Dependency yönü **tek yönlüdür ve yukarıdan aşağıya akar:**

```
UI Layer  →  Platform Adapter  →  Business Logic Core  →  Data Interface
```

- UI katmanı Core'u import eder
- Core hiçbir zaman UI katmanını import etmez
- Core'un tek bir satırı bile "bu iOS mu, browser mı?" diye sormamalı

### 2.2 Shared Business Logic Core — İçeriği

Core katmanı şu bileşenleri barındırır:

**Scoring Rules (Puanlama Kuralları)**
- Ağırlıklı formül: Fantasy %40, Tip %35, Bracket %25
- Maç tahmini puan tablosu: Kazanan +3, Tam skor +7, Beraberlik +4
- Bracket puanlama eşiği katsayıları (Son 16, Çeyrek, Yarı, Final)

**Validation Rules (Doğrulama Kuralları)**
- Max 2 oyuncu aynı ülkeden kural motoru
- Kadro formasyonu zorunlulukları (1 GK, min DEF/MID/FWD)
- Tahmin lock süresi: maç başlangıcından X dakika önce
- Bracket lock: geçmiş aşamalar düzenlenemez

**State Machine (Durum Makinesi)**
- Bracket phase yönetimi: Group → R16 → QF → SF → Final
- Her fazın geçiş koşulları

### 2.3 Platform Adapter Sorumluluğu

Platform Adapter, Core'un ürettiği saf veriyi platforma özgü UI primitive'lerine çevirir:
- Core: `{isValid: false, reason: "MAX_COUNTRY_EXCEEDED"}` üretir
- Web Adapter: Bunu browser-native alert veya inline error component'e dönüştürür
- Mobile Adapter: Bunu native toast veya validation label'a dönüştürür

---

## 3. API & Backend İletişim Mimarisi

### 3.1 Karar: Hibrit Model

| Senaryo | Mekanizma | Gerekçe |
|---------|-----------|---------|
| Kullanıcı aksiyonları (kadro, tahmin, bracket) | REST request-response | Kritik yazma işlemi, senkron onay gerekli |
| Sayfa yüklemeleri (takımlar, takvim, leaderboard) | REST request-response | Standart GET, cache-friendly |
| Canlı maç skoru gösterimi | Short polling (30s) | Görüntüleme amaçlı, hesaplama tetiklemez |
| Maç bitti tespiti | Short polling (30s) | Status watcher FT'yi yakalar |
| Puan hesaplama | Async job (post-FT) | Non-blocking, batch, idempotent |
| Kullanıcı daveti / deep link | REST | Stateless, basit |

**WebSocket MVP'de kullanılmaz.** Canlı yorum v2'ye ertelendiğinden stateful bağlantı ihtiyacı doğmamaktadır.

### 3.2 API Gateway Sorumlulukları

- **Kimlik doğrulama:** JWT token doğrulama, her request için
- **Rate limiting:** IP ve kullanıcı bazında istek sınırlama (bot koruması)
- **Routing:** İsteği doğru servise yönlendirme
- **API versioning:** `/v1/` prefix ile geriye dönük uyumluluk
- **Request/Response logging:** Hata ayıklama ve audit trail

### 3.3 Caching Stratejisi

| Veri | Cache Süresi | Gerekçe |
|------|-------------|---------|
| Takım kadroları | 24 saat | Nadiren değişir |
| Maç takvimi | 1 saat | Sabit, ara sıra güncellenir |
| Canlı maç skoru | 25 saniye | Polling interval'ı destekler |
| Leaderboard (tüm turnuva) | Maç sonrası invalidate | Batch job sonrası temizlenir |
| Kullanıcı profili | 5 dakika | Orta değişkenlik |

**Cache invalidation kuralı:** Score engine job tamamlandığında ilgili leaderboard cache anahtarları silinir. Sonraki istek DB'den taze veriyi çeker ve tekrar cache'ler.

---

## 4. Servis Bileşenleri

### 4.1 Auth Service

**Sorumluluklar:**
- Kullanıcı kaydı (e-posta + şifre hash)
- JWT access token (kısa ömürlü: 15 dakika)
- Refresh token (uzun ömürlü: 30 gün, rotate-on-use)
- Token revocation (logout, şifre değişikliği)

**Veri:** `users`, `sessions`, `refresh_tokens` tabloları

### 4.2 Game Service

**Sorumluluklar:**
- Fantasy kadro kaydetme (Shared BL Core kurallarıyla validasyon)
- Maç tahmini kaydetme + lock kontrolü
- Bracket seçimi kaydetme + phase lock kontrolü
- Davet linki oluşturma ve kaydetme

**Kritik kural:** Game Service hiçbir puan hesaplaması yapmaz. Sadece kullanıcı intentini kaydeder.

**Veri:** `squads`, `squad_players`, `tips`, `brackets`, `bracket_picks`, `invites` tabloları

### 4.3 Score Engine

**Sorumluluklar:**
- Job queue'dan tetiklenir (maç FT olduktan sonra)
- İlgili maçtaki oyuncuların istatistiklerini okur
- Fantasy puanlarını hesaplar (Scoring Rules Core'dan)
- Tip puanlarını hesaplar
- Bracket puanlarını hesaplar
- Sonuçları DB'ye toplu yazar
- Leaderboard cache'i invalidate eder

**Idempotency:** Her `matchId` için job sadece bir kez çalışır. Duplicate job'lar "already processed" kontrolü ile reddedilir.

**Veri:** `match_player_stats`, `user_match_scores`, `user_total_scores` tabloları

### 4.4 Leaderboard Service

**Sorumluluklar:**
- Tüm turnuva sıralamasını döner (cache'den)
- Score engine tetiklendiğinde cache yenilenir
- Bir kullanıcının profiline tıklandığında o kullanıcının detayını döner

**Performans hedefi:** Cache'den okuma < 50ms

**Veri:** Cache katmanında saklanan precomputed ranking listesi

### 4.5 Fixtures Service

**Sorumluluklar:**
- 48 takım ve kadro bilgilerini döner
- Maç takvimini döner
- Canlı skor endpoint'ini döner (cache'den)

**Veri:** `teams`, `players`, `matches`, `match_scores` tabloları

### 4.6 Ingestion Layer

**Ingestion Worker:**
- Dış Sports API'den periyodik veri çeker
- Takım, oyuncu, maç, istatistik verilerini normalize eder
- Primary DB'ye yazar, cache'i günceller
- API erişilemez olursa son geçerli veriyi döner (stale-while-revalidate pattern)

**Match Status Watcher:**
- Her 30 saniyede aktif maçların statusunu kontrol eder
- `status = FT` tespit edildiğinde Score Engine job'ını kuyruğa ekler
- Aynı maç için duplicate job'ı önler (idempotency key: `matchId`)

---

## 5. Veri Akış Diyagramları

### 5.1 Fantasy Kadro Kaydetme Akışı

```
Client
  │
  ├─ [1] POST /v1/squads (kadro verisi)
  │
API Gateway
  ├─ [2] JWT doğrula
  ├─ [3] Rate limit kontrol
  │
Game Service
  ├─ [4] Shared BL Core: Validasyon
  │       ├─ Max 2 oyuncu/ülke kontrolü
  │       ├─ Formasyon kontrolü
  │       └─ Lock süresi kontrolü (maç başladı mı?)
  ├─ [5] Validasyon geçtiyse DB'ye kaydet
  └─ [6] 201 Created dön
  
Client
  └─ [7] Başarı göster
```

### 5.2 Maç Sonu Puan Hesaplama Akışı

```
Match Status Watcher
  │
  ├─ [1] Her 30s: GET /matches/{id}/status (dış API)
  ├─ [2] status == "FT" tespit edildi
  ├─ [3] Job Queue'ya ekle: {jobType: "RECALC", matchId, idempotencyKey}
  │
Job Queue
  ├─ [4] Score Engine worker'ına iş dağıt
  │
Score Engine
  ├─ [5] matchId için oyuncu istatistiklerini DB'den çek
  ├─ [6] Bu maçta bu oyuncuları seçmiş tüm kullanıcıları bul
  ├─ [7] Her kullanıcı için fantasy puanı hesapla (Core formülüyle)
  ├─ [8] Bu maç için tip tahminlerini bul
  ├─ [9] Her kullanıcı için tip puanı hesapla
  ├─ [10] Bu maç bracket'ı etkiliyor mu? → Bracket puanı hesapla
  ├─ [11] user_match_scores tablosuna toplu yaz
  ├─ [12] user_total_scores tablosunu güncelle (ağırlıklı toplam)
  └─ [13] Leaderboard cache'ini invalidate et
  
Kullanıcı (sonraki açışta)
  └─ [14] GET /v1/leaderboard → taze sıralama
```

### 5.3 Bracket Tahmini Akışı

```
Client
  ├─ [1] Grup aşaması seçimleri yap
  ├─ [2] POST /v1/brackets (group picks)
  │        └─ Game Service: Lock = false (turnuva başlamadı), kaydet
  │
  ├─ [3] Grup aşaması maçları oynanır → kazananlar belirlenir
  │
  ├─ [4] Son 16 picks yap (Backend: grup pick'ler artık kilitli)
  ├─ [5] PATCH /v1/brackets/{id}/r16 (r16 picks)
  │        └─ Game Service: Phase lock kontrolü, kaydet
  │
  [Aynı pattern: QF → SF → Final]
```

---

## 6. Veri Modeli (Agnostik — Mantıksal Şema)

### Temel Varlıklar

```
USERS
  id, email, password_hash, username, preferred_lang
  created_at, updated_at

TEAMS
  id, name, country_code, group_id, api_external_id

PLAYERS
  id, team_id, name, position, api_external_id

MATCHES
  id, home_team_id, away_team_id, scheduled_at
  status (SCHEDULED | LIVE | FT), stage
  home_score, away_score, api_external_id

SQUADS (Fantasy kadro)
  id, user_id, is_locked
  created_at, locked_at

SQUAD_PLAYERS
  squad_id, player_id, is_captain

TIPS (Maç tahminleri)
  id, user_id, match_id
  predicted_home, predicted_away
  is_locked, created_at

BRACKETS
  id, user_id, is_group_locked, is_r16_locked, ...

BRACKET_PICKS
  bracket_id, stage, match_position, team_id

MATCH_PLAYER_STATS (Maç sonu, ingestion worker doldurur)
  match_id, player_id
  goals, assists, yellow_cards, red_cards, clean_sheet, minutes_played

USER_MATCH_SCORES (Score engine doldurur)
  user_id, match_id
  fantasy_points, tip_points, bracket_points

USER_TOTAL_SCORES (Score engine günceller)
  user_id
  total_fantasy, total_tip, total_bracket, weighted_total
  last_calculated_at

INVITES
  id, inviter_user_id, invite_code (unique), used_count, created_at
```

---

## 7. Teknik Kısıtlar ve Mimari Kurallar

### 7.1 Kesin Kurallar (Değiştirilemez)

| # | Kural | Gerekçe |
|---|-------|---------|
| K-01 | Business Logic Core platforma özel kod import edemez | Cross-platform tutarlılık |
| K-02 | Puan hesaplaması sadece Score Engine'de yapılır | Tek kaynak gerçeği |
| K-03 | Her kullanıcı işlemi önce BL Core validasyonundan geçer | Güvenlik, tutarlılık |
| K-04 | Maç FT olduktan sonra tip ve kadro kilitleme uygulanır | Adalet |
| K-05 | Score Engine job'ları idempotent olmalı | Güvenilir batch processing |
| K-06 | Dış API başarısız olursa son geçerli veri döner | Resilience |
| K-07 | Leaderboard sadece cache invalidation sonrası DB'den okunur | Performans |

### 7.2 Performans Hedefleri (MVP)

| Metrik | Hedef |
|--------|-------|
| API yanıt süresi (P95) | < 500ms |
| Leaderboard okuma (cache'den) | < 50ms |
| Canlı skor güncellemesi (polling) | Her 30s |
| Score Engine tamamlanma süresi | < 5 dakika (maç FT sonrası) |
| Eş zamanlı kullanıcı kapasitesi (MVP) | 5.000 |

### 7.3 Güvenlik Kısıtları

- Tüm yazma işlemleri sunucu tarafında BL Core ile doğrulanır (client-side validation sadece UX amaçlı)
- JWT token süresi: access 15 dakika, refresh 30 gün (rotate-on-use)
- Rate limiting: IP başına 100 istek/dakika, authenticated kullanıcı 300 istek/dakika
- Score manipülasyon koruması: Puan hesaplaması client'tan asla tetiklenemez

### 7.4 Ölçeklenme Yolu (MVP → Sonrası)

| Bileşen | MVP | v2 |
|---------|-----|-----|
| Kullanıcı kapasitesi | 5K concurrent | 50K+ (yatay ölçekleme) |
| Leaderboard | Cache + DB | Precomputed sorted set |
| Canlı skorlar | 30s polling | WebSocket (v2 yorum özelliğiyle birlikte) |
| Score engine | Sync batch | Paralel işçi havuzu |
| Diller | EN | TR + ES (i18n altyapısı sonradan) |

---

## 8. Mimari Riskler ve Azaltma Stratejileri

| Risk | Olasılık | Etki | Azaltma |
|------|----------|------|---------|
| Dış API kesintisi | Orta | Yüksek | Stale cache + graceful degradation |
| Score Engine çift çalışma | Düşük | Yüksek | matchId idempotency key |
| Cache / DB tutarsızlığı | Düşük | Orta | Write-through + invalidation |
| BL Core platform'a sızması | Düşük | Yüksek | Code review kuralı: Core'da platform import = blocker |
| Leaderboard hesaplama gecikmesi | Orta | Düşük | 5dk hedef, SLA değil; kullanıcı "güncelleniyor" görür |

---

## 9. API'lerin Projeye Entegrasyonu Hakkında Not

> Mimari tamamen API olmadan çalışabilecek biçimde tasarlandı. UI katmanı önce mock/static veriyle inşa edilir. Dış Sports API entegrasyonu Ingestion Worker aracılığıyla sonradan eklenir. Bu yaklaşım "deneme-yanılma" sürecini izole eder: API sağlayıcısı değişirse sadece Ingestion Worker güncellenir, servisler ve UI dokunulmaz.

---

*Bu döküman mvp_scope.md ile birlikte güncel tutulmalıdır. Teknoloji stack kararları alındıkça bu blueprint'e framework-specific implementation notları eklenir.*


---

# 4. Tech Stack Reference

**Version:** 1.0  
**Tarih:** Mart 2026  
**Rol:** CTO  
**Referans:** requirements.md · mvp_scope.md · system_design.md  
**Durum:** KESİNLEŞTİ — Bu döküman teknik tartışmaların referans noktasıdır

---

## Neden Bu Stack?

Üç kriter sırayla uygulandı:

1. **Mimari uyum** — `system_design.md`'deki Headless Core prensibi hangi stack'te en temiz uygulanır?
2. **Geliştirme hızı** — 8 haftalık MVP penceresinde en az sürtünme nerede?
3. **Geliştirici uzmanlığı** — Öğrenme eğrisi olmayan seçenek hangisi?

Sonuç: **React Native (Expo) + Supabase + Turborepo monorepo**

Flutter güçlü bir alternatifti ancak 8 haftalık MVP için Dart/Flutter öğrenme eğrisi kabul edilemez bir risk. Next.js web için mükemmel ama iki ayrı codebase yönetimi gereksiz yük. Supabase'in JS-first ekosistemi, Expo'nun tek codebase ile PWA + App Store dağıtımı ve senin mevcut uzmanlığın bu seçimi netleştirdi.

---

## Stack Özeti — Tek Bakışta

| Katman | Teknoloji | Sürüm | Rol |
|--------|-----------|-------|-----|
| Mobile + Web | Expo (React Native) | SDK 51+ | Tek codebase, çoklu platform |
| Navigation | Expo Router | v3 | File-based, deep link hazır |
| Styling | NativeWind | v4 | Tailwind syntax, web+native aynı |
| State (client) | Zustand | v4 | Minimal, TS dostu |
| State (server) | TanStack Query | v5 | Cache, polling, stale-while-revalidate |
| Business Logic | @wc2026/core (Pure TS) | internal | Platform-agnostic, paylaşılan |
| Validation | Zod | v3 | Squad kuralları, tip güvenliği |
| Database | Supabase PostgreSQL | latest | Primary DB, RLS ile güvenli |
| Auth | Supabase Auth | latest | Email + Google + Apple OAuth |
| Backend Logic | Supabase Edge Functions | Deno | Score engine, ingestion worker |
| Scheduler | pg_cron (Supabase) | built-in | 30s polling job |
| Storage | Supabase Storage | built-in | Görseller, avatarlar |
| Monorepo | Turborepo | v2 | Paketler arası bağımlılık yönetimi |
| Build | EAS Build | latest | iOS + Android CI/CD |
| Web Deploy | Vercel | latest | PWA, edge CDN |
| Testing | Vitest | v1 | Core unit testleri |
| Type Safety | TypeScript | v5 | End-to-end tip güvenliği |

---

## 1. Monorepo Yapısı (Turborepo)

```
wc2026/                          ← Git repo kökü
│
├── packages/
│   └── core/                    ← @wc2026/core
│       ├── src/
│       │   ├── scoring/
│       │   │   ├── fantasyScore.ts      ← %40 ağırlık, oyuncu stat formülü
│       │   │   ├── tipScore.ts          ← +3 kazanan / +7 tam skor / +4 beraberlik
│       │   │   ├── bracketScore.ts      ← Kademeli katsayılar (R16→F)
│       │   │   └── weightedTotal.ts     ← %40 + %35 + %25 ağırlıklı toplam
│       │   ├── validation/
│       │   │   ├── squadRules.ts        ← Max 2 oyuncu/ülke, Zod schema
│       │   │   ├── formationRules.ts    ← 1 GK zorunlu, formasyon kısıtları
│       │   │   └── lockRules.ts         ← Maç lock, bracket phase lock
│       │   ├── stateMachine/
│       │   │   └── bracketPhases.ts     ← Group→R16→QF→SF→Final geçiş mantığı
│       │   └── types/
│       │       └── index.ts             ← Squad, Tip, Bracket, Player tipleri
│       ├── package.json
│       └── tsconfig.json
│
├── apps/
│   └── mobile/                  ← Expo uygulaması (web + iOS + Android)
│       ├── app/                 ← Expo Router sayfaları
│       │   ├── (auth)/
│       │   │   ├── login.tsx
│       │   │   └── register.tsx
│       │   ├── (tabs)/
│       │   │   ├── index.tsx            ← Ana sayfa / canlı skorlar
│       │   │   ├── squad.tsx            ← Fantezi kadro
│       │   │   ├── tips.tsx             ← Maç tahminleri
│       │   │   ├── bracket.tsx          ← Bracket seçimi
│       │   │   └── leaderboard.tsx      ← Sıralama
│       │   └── profile/[id].tsx         ← Kullanıcı profili
│       ├── components/
│       │   ├── SquadBuilder.tsx         ← @wc2026/core'u import eder [PAYLAŞILAN]
│       │   ├── BracketView.tsx          ← [PAYLAŞILAN]
│       │   ├── MatchCard.tsx            ← [PAYLAŞILAN]
│       │   ├── LeaderboardRow.tsx       ← [PAYLAŞILAN]
│       │   ├── ShareCard.web.tsx        ← Web: Canvas API [WEB ONLY]
│       │   └── ShareCard.native.tsx     ← Native: expo-sharing [NATIVE ONLY]
│       ├── store/
│       │   ├── authStore.ts             ← Zustand: oturum durumu
│       │   ├── squadStore.ts            ← Zustand: kadro seçimi UI state
│       │   └── bracketStore.ts          ← Zustand: bracket UI state
│       ├── lib/
│       │   ├── supabase.ts              ← Supabase client (tek örnek)
│       │   └── queryClient.ts           ← TanStack Query yapılandırması
│       └── package.json
│
├── supabase/
│   ├── functions/
│   │   ├── score-engine/
│   │   │   └── index.ts                ← @wc2026/core import eder — aynı formül
│   │   ├── ingest-fixtures/
│   │   │   └── index.ts                ← Dış Sports API → PostgreSQL
│   │   └── match-status-watcher/
│   │       └── index.ts                ← 30s FT tespiti → score-engine tetikle
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_rls_policies.sql
│   │   └── 003_indexes.sql
│   └── config.toml
│
├── turbo.json                   ← Turborepo pipeline tanımı
├── package.json                 ← Root workspace
└── tsconfig.base.json           ← Paylaşılan TypeScript config
```

---

## 2. Headless Core — Altın Kural

```
❌ YASAK: packages/core içinde hiçbir zaman şu import'lar olamaz:
   import { View } from 'react-native'
   import { createClient } from '@supabase/supabase-js'
   import React from 'react'
   import { Platform } from 'expo'

✅ ZORUNLU: core sadece şunları import edebilir:
   import { z } from 'zod'
   import { differenceInMinutes } from 'date-fns'
   import type { Squad, Player, Match } from './types'
```

Bu kuralın pratikte anlamı: `score-engine` Edge Function ve `SquadBuilder.tsx` bileşeni aynı `fantasyScore.ts` fonksiyonunu kullanır. Client ile sunucu **asla farklı sonuç üretemez.**

---

## 3. Supabase Veritabanı Şeması

### Tablo Yapısı

```sql
-- Kullanıcılar (Supabase Auth ile senkron)
users (
  id          uuid PRIMARY KEY references auth.users,
  username    text UNIQUE NOT NULL,
  email       text,
  lang        text DEFAULT 'en',
  created_at  timestamptz DEFAULT now()
)

-- Takımlar ve Oyuncular (ingestion worker doldurur)
teams   (id, name, country_code, group_id, api_external_id)
players (id, team_id, name, position, api_external_id)

-- Maçlar
matches (
  id              uuid PRIMARY KEY,
  home_team_id    uuid references teams,
  away_team_id    uuid references teams,
  scheduled_at    timestamptz,
  status          text CHECK (status IN ('SCHEDULED','LIVE','FT')),
  stage           text,
  home_score      int,
  away_score      int,
  api_external_id text UNIQUE
)

-- Fantezi Kadro
squads (id, user_id, is_locked, created_at, locked_at)
squad_players (
  squad_id   uuid references squads,
  player_id  uuid references players,
  is_captain boolean DEFAULT false,
  PRIMARY KEY (squad_id, player_id)
)

-- Maç Tahminleri
tips (
  id               uuid PRIMARY KEY,
  user_id          uuid references users,
  match_id         uuid references matches,
  predicted_home   int NOT NULL,
  predicted_away   int NOT NULL,
  is_locked        boolean DEFAULT false,
  UNIQUE (user_id, match_id)
)

-- Bracket
brackets (id, user_id, is_group_locked, is_r16_locked,
          is_qf_locked, is_sf_locked, created_at)
bracket_picks (bracket_id, stage, position, team_id)

-- Score Engine çıktıları
match_player_stats (
  match_id, player_id,
  goals, assists, yellow_cards, red_cards,
  clean_sheet, minutes_played
)
user_match_scores (
  user_id, match_id,
  fantasy_points, tip_points, bracket_points
)
user_total_scores (
  user_id PRIMARY KEY,
  total_fantasy, total_tip, total_bracket,
  weighted_total,              -- (%40 + %35 + %25)
  last_calculated_at
)

-- Davet linkleri
invites (id, inviter_id, code text UNIQUE, used_count, created_at)
```

### Row Level Security (RLS) Politikaları

```sql
-- Kullanıcı yalnızca kendi verisini yazar
CREATE POLICY "users_own_squad" ON squads
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "users_own_tips" ON tips
  FOR ALL USING (auth.uid() = user_id);

-- Leaderboard herkese açık — okuma
CREATE POLICY "leaderboard_public_read" ON user_total_scores
  FOR SELECT USING (true);

-- Maç verileri herkese açık
CREATE POLICY "matches_public_read" ON matches
  FOR SELECT USING (true);

-- Score engine (service role) tüm tabloları yazabilir
-- Edge Functions SERVICE_ROLE key ile çalışır, RLS bypass
```

---

## 4. Edge Functions — Sorumluluk Sınırları

### score-engine

**Tetiklenme:** `match-status-watcher`'dan POST isteği, `matchId` ile  
**Idempotency:** Her `matchId` için işleme kontrolü — duplicate çalışma engeli

```typescript
// supabase/functions/score-engine/index.ts
import { fantasyScore, tipScore, bracketScore, weightedTotal }
  from '@wc2026/core/scoring'   // ← Aynı formül, client ile aynı

// 1. matchId için oyuncu istatistiklerini çek
// 2. Bu oyuncuları seçen tüm kullanıcıları bul
// 3. Her kullanıcı için fantasy puan hesapla
// 4. Bu maç için tüm tipleri çek, puan hesapla
// 5. Bracket etkisini hesapla
// 6. user_match_scores'a toplu yaz (upsert)
// 7. user_total_scores'u güncelle
// 8. Supabase Cache-Control header'ı tetikle (leaderboard invalidation)
```

### ingest-fixtures

**Tetiklenme:** pg_cron job — maç günleri her 5 dakika, normal günler 1 saatte bir  
**Sorumluluk:** Dış Sports API → normalize → `teams`, `players`, `matches`, `match_player_stats` tablolarına yaz

### match-status-watcher

**Tetiklenme:** pg_cron — aktif maç varsa her 30 saniye  
**Sorumluluk:** `status = LIVE` olan maçları izle → `FT` tespitinde `score-engine`'i tetikle  
**Idempotency:** `processed_matches` tablosu ile çift tetiklemeyi engelle

---

## 5. Client-Side Mimari

### TanStack Query Polling

```typescript
// Canlı skorlar — 30 saniyede bir güncellenir
const { data: liveMatches } = useQuery({
  queryKey: ['matches', 'live'],
  queryFn: () => supabase
    .from('matches')
    .select('*, home_team:teams!home(*), away_team:teams!away(*)')
    .in('status', ['LIVE', 'SCHEDULED']),
  refetchInterval: 30_000,   // 30 saniye
  staleTime: 25_000,         // 25 saniyeden eski veri stale sayılır
})

// Leaderboard — maç bitmeden önce cache'de kalır
const { data: leaderboard } = useQuery({
  queryKey: ['leaderboard'],
  queryFn: () => supabase
    .from('user_total_scores')
    .select('*, user:users(username)')
    .order('weighted_total', { ascending: false })
    .limit(100),
  staleTime: 5 * 60_000,    // 5 dakika — skor engine çalışana kadar taze
})
```

### Zustand Store Yapısı

```typescript
// Kadro seçimi — sunucuya kaydetmeden önce local state
interface SquadStore {
  selectedPlayers: Player[]
  addPlayer: (player: Player) => void   // core.validateSquad() çağırır
  removePlayer: (playerId: string) => void
  submitSquad: () => Promise<void>       // API'ye yazar, store'u temizler
}

// Validation her addPlayer'da core'dan gelir:
addPlayer: (player) => {
  const result = validateSquad([...state.selectedPlayers, player])
  if (!result.isValid) throw new Error(result.reason) // 'MAX_COUNTRY_EXCEEDED'
  set({ selectedPlayers: [...state.selectedPlayers, player] })
}
```

### Platform-Specific Dosya Pattern

```
ShareCard.web.tsx    → Web build'de otomatik seçilir (Canvas API)
ShareCard.native.tsx → Native build'de otomatik seçilir (expo-sharing)

// Import şekli her iki platformda aynı:
import ShareCard from '@/components/ShareCard'
// Expo hangi dosyayı kullanacağını build sırasında belirler
```

---

## 6. Authentication Akışı

```
Kullanıcı → Email + Şifre giriş
         → Supabase Auth → JWT access token (15 dk) + refresh token (30 gün)
         → Supabase client token'ı otomatik yönetir (SecureStore native / localStorage web)
         → Refresh token rotate-on-use
         → RLS politikaları JWT'deki auth.uid() ile çalışır
```

**Sosyal Login (v1.1 — Should Have):**
```
Google OAuth  → Supabase Auth Google Provider
Apple Sign In → Supabase Auth Apple Provider (App Store zorunluluğu)
```

---

## 7. Deployment Pipeline

### Web (PWA)
```
git push main
  → Vercel otomatik deploy
  → Edge CDN (global)
  → URL: wc2026.app (veya subdomain)
```

### Mobile (EAS Build)
```
eas build --platform all
  → iOS: .ipa → TestFlight → App Store Review (1-3 gün)
  → Android: .aab → Play Store Internal → Production
```

### Supabase
```
supabase db push           ← Migration'ları çalıştır
supabase functions deploy  ← Edge Functions deploy
```

### Ortam Değişkenleri
```
EXPO_PUBLIC_SUPABASE_URL        ← Supabase proje URL'i
EXPO_PUBLIC_SUPABASE_ANON_KEY   ← Public key (client için)
SUPABASE_SERVICE_ROLE_KEY       ← Sadece Edge Functions (RLS bypass)
SPORTS_API_KEY                  ← Dış veri sağlayıcısı (ingestion worker)
SPORTS_API_BASE_URL             ← Dış API endpoint
```

---

## 8. Teknik Kısıtlar ve Kurallar

| # | Kural | Neden |
|---|-------|-------|
| T-01 | `packages/core` React/RN/Supabase import edemez | Headless Core prensibi |
| T-02 | Score Engine sadece Edge Function'da çalışır | Tek kaynak gerçeği |
| T-03 | Client validation + Server validation aynı core fonksiyonu kullanır | Tutarsızlık önleme |
| T-04 | Supabase Realtime MVP'de kullanılmaz | WebSocket complexity ertelendi |
| T-05 | RLS tüm user tablolarında aktif olmalı | Veri güvenliği |
| T-06 | Service Role key asla client'a expose edilmez | Güvenlik |
| T-07 | Migration'lar `supabase/migrations/` klasöründe versiyonlanır | DB şema kontrolü |
| T-08 | TanStack Query polling `staleTime < refetchInterval` olmalı | Cache tutarlılığı |

---

## 9. Geliştirme Ortamı — Kurulum Sırası

```bash
# 1. Monorepo bootstrap
git clone wc2026
cd wc2026
pnpm install          # tüm workspace paketlerini kur

# 2. Supabase local
supabase start        # local PostgreSQL + Auth + Storage başlatır
supabase db push      # migration'ları uygula

# 3. Core paketi build
pnpm --filter @wc2026/core build

# 4. Expo uygulaması başlat
pnpm --filter mobile start
# → Expo Go ile telefonda test
# → 'w' tuşu ile web preview

# 5. Edge Functions local test
supabase functions serve score-engine --env-file .env.local
```

---

## 10. v2 Yol Haritası — Stack Değişikliği Gerektirmeyen Eklemeler

| Özellik | Mevcut Stack'te Nasıl Eklenir |
|---------|-------------------------------|
| TR + ES dil desteği | `i18next` + Expo Localization, core type'ları değişmez |
| Canlı yorumlar | Supabase Realtime aktif edilir, WebSocket yeni endpoint |
| Push bildirimler | Expo Notifications — EAS push credentials |
| Kaptan seçimi (x2) | `squad_players.is_captain` zaten şemada mevcut |
| VS challenge modu | Yeni tablo + Edge Function, core formülü aynı |
| Apple Sign In | Supabase Auth Apple Provider, App Store zorunlu olduğunda |

---

*Bu döküman requirements.md, mvp_scope.md ve system_design.md ile birlikte güncel tutulmalıdır. Stack değişikliği kararları bu dökümanın güncellemesiyle resmileşir.*


---

# 5. Acceptance Criteria

**Version:** 1.0  
**Tarih:** Mart 2026  
**Rol:** Senior QA Engineer  
**Referans:** requirements.md · mvp_scope.md · system_design.md · tech_stack.md  
**Kullanım:** Her özellik "Bitti" statüsüne geçmeden önce bu listedeki tüm kriterler karşılanmış olmalıdır.

---

## Etiket Açıklamaları

| Etiket | Anlamı |
|--------|--------|
| `[BLOCKER]` | Bu kriter geçilmeden feature deploy edilemez |
| `[SEC]` | Güvenlik kriteri — mutlaka test edilmeli |
| `[WEB]` | Yalnızca web platformuna özgü test |
| `[NATIVE]` | Yalnızca iOS/Android'e özgü test |
| `[CROSS]` | Her iki platformda eşit davranış zorunlu |
| `[PERF]` | Performans kriteri |
| `[EDGE]` | Uç durum testi |

---

## Mimari Karar: Progressive Authentication (Soft Gate)

> Uygulama açılışında login ekranı gösterilmez. Auth gate yalnızca kullanıcı bir **yazma aksiyonu** yapmaya çalıştığında bottom sheet olarak tetiklenir. Bu karar tüm F-01–F-08 özelliklerini etkiler: her birinin "kullanıcı giriş yapmamışsa" durumu için ayrı bir accepted state tanımlanmıştır.

**Serbest erişim (auth yok):** Canlı skorlar · Leaderboard · Maç takvimi · Public profil görüntüleme  
**Gate tetikleyenler:** Kadro kaydetme · Tahmin girme · Bracket seçimi · Davet linki alma

---

## F-01 · Fantezi Kadro (FR-05/06/07/08) — Öncelik: P0

> Tüm sistem bu özelliğin doğruluğuna bağlı. `@wc2026/core` `validateSquad()` hem client hem Edge Function'da aynı sonucu üretmek zorunda.

### Fonksiyonel Kriterler

- [ ] Kullanıcı 11 oyuncudan oluşan kadro kurabilmeli: zorunlu formasyon 1 GK, min 3 DEF, min 2 MID, min 1 FWD
- [ ] **[BLOCKER]** Aynı ülkeden 3. oyuncu seçilmeye çalışıldığında sistem bloklayıp kullanıcıya ülke sınırı hakkında açıklayıcı hata mesajı göstermeli
- [ ] 11 oyuncu tamamlanmadan "Kadroyu Kaydet" butonu disabled durumda kalmalı; aktif değil görünmeli
- [ ] Kadro başarıyla kaydedildiğinde veritabanında `squads` + `squad_players` kayıtları oluşmalı ve `is_locked: false` olmalı
- [ ] Maç başladığında (lock zamanı geçince) kadro düzenleme UI'da tamamen devre dışı kalmalı — tüm input'lar read-only
- [ ] **[SEC]** Kilitlenmiş kadro için API'ye PATCH/PUT isteği gönderildiğinde 403 Forbidden dönmeli; client-side bypass mümkün olmamalı

### Cross-Platform Tutarlılık

- [ ] **[BLOCKER][CROSS]** `@wc2026/core` `validateSquad()` fonksiyonu; Vitest unit testi ile kanıtlanmış aynı girdi için web ve native'de aynı çıktıyı üretmeli
- [ ] **[CROSS]** 3. ülke oyuncusu engeli: web'de ve native'de aynı hata mesajı metni, aynı davranış
- [ ] **[CROSS]** Kadro web'de kurulup native'de görüntülendiğinde oyuncu listesi ve formasyonda tutarsızlık olmamalı

### Edge Cases

- [ ] **[EDGE]** Bir oyuncu turnuvadan çekilirse (injured/withdrawal) kadrodaki oyuncunun üzerinde görsel uyarı gösterilmeli; kadro geçerliliği korunmalı
- [ ] **[EDGE]** Aynı kullanıcı iki sekmeden eş zamanlı kaydetmeye çalışırsa last-write-wins uygulanmalı; veri bozulmamalı
- [ ] **[EDGE]** Kaydetme sırasında network kesilirse kullanıcıya retry seçeneği sunulmalı; kadro yarım kaydedilmemeli (atomik yazma)
- [ ] **[EDGE]** 48 takımın tamamındaki oyuncular listede görünmeli; eksik takım verisi varsa kullanıcıya bildirilmeli

### Non-Functional

- [ ] **[PERF]** Kadro kaydetme API isteği P95 < 500ms içinde yanıt vermeli
- [ ] Oyuncu listesi (≈1.100 oyuncu) scroll ve arama ile kullanılabilir olmalı; tam liste yüklenene kadar skeleton loader gösterilmeli

---

## F-02 · Maç Tahmini (FR-12/13/14) — Öncelik: P0

### Fonksiyonel Kriterler

- [ ] Her maç için home/away skor tahmini girilebilmeli; kabul edilen değer aralığı 0–20 arası tam sayı
- [ ] Maç başlangıcından önce belirlenen sürede tahmin lock uygulanmalı; kilitli maçlar read-only görünmeli, buton devre dışı
- [ ] Puan dağılımı doğru hesaplanmalı:
  - Kazanan taraf doğru → **+3 puan**
  - Tam skor doğru → **+7 puan**
  - Beraberlik tahmini doğru → **+4 puan**
  - Yanlış tahmin → **0 puan**
- [ ] Aynı maç için kullanıcı yalnızca 1 tahmin girebilmeli; lock öncesi güncelleme mümkün, lock sonrası imkânsız
- [ ] Maç FT olduktan ve score engine çalıştıktan sonra kullanıcı tahmin sayfasında kazandığı puanı ve gerçek skoru görebilmeli

### Cross-Platform Tutarlılık

- [ ] **[CROSS]** Lock durumu web ve native'de eş zamanlı yansımalı — biri kilitliyse diğeri de kilitli göstermeli
- [ ] **[CROSS]** Puan hesaplama sonucu: web profil sayfası = native profil sayfası = leaderboard değeri — üçü eşit olmalı

### Edge Cases

- [ ] **[EDGE]** Negatif skor girişi (örn. -1) form validasyonu tarafından reddedilmeli
- [ ] **[EDGE]** Maç ertelenirse lock süresi yeni tarihe göre güncellenmeli; eski lock uygulanmamalı
- [ ] **[EDGE][SEC]** Lock anında race condition: kullanıcı tam lock zamanında tahmin gönderirse API sunucu tarafında lock kontrolü yapıp 403 dönmeli
- [ ] **[EDGE]** Tahmin girilmemiş maçlar için kullanıcı **0** puan almalı; `null` değil — formül bozulmamalı

---

## F-03 · Bracket Tahmini (FR-16/17/18/20) — Öncelik: P0

### Fonksiyonel Kriterler

- [ ] Grup aşamasında her gruptan ilerleyecek 2 takım seçilebilmeli (8 grup × 2 = 16 seçim)
- [ ] **[BLOCKER]** Grup aşaması kilitlenince R16 seçimleri açılmalı; kilitli fazın seçimleri hiçbir şekilde değiştirilemez olmalı
- [ ] Faz sırası korunmalı: R16 → QF → SF → Final; ileri faz önceki fazın tamamlanmasını gerektirmeli
- [ ] Her doğru aşama geçişi puanlanmalı; Final doğrusu en yüksek puan katsayısını almalı
- [ ] Bracket paylaşım linki (deep link) çalışmalı; link açıldığında paylaşan kullanıcının bracket'i görüntülenmeli

### Cross-Platform Tutarlılık

- [ ] **[CROSS]** Hangi fazın kilitli olduğu web ve native'de görsel olarak aynı şekilde ifade edilmeli (renk, ikon, disabled state)
- [ ] **[CROSS]** Deep link web'de açılırsa tarayıcıda, native'de açılırsa uygulamada doğru bracket görüntülenmeli

### Edge Cases

- [ ] **[SEC]** API manipülasyonuyla geçmiş faz güncellenmeye çalışılırsa Edge Function 403 dönmeli; `is_group_locked` DB'den kontrol edilmeli
- [ ] **[EDGE]** Turnuva grubu tamamlanmamışken R16 seçim alanı disabled görünmeli
- [ ] **[EDGE]** Bracket hiç doldurulmamışsa toplam puanda bracket katkısı 0 olmalı; `null` propagation olmamalı

---

## F-04 · Canlı Maç Skorları (FR-21) — Öncelik: P0

### Fonksiyonel Kriterler

- [ ] Aktif maç skoru en fazla 30 saniye gecikmeli güncellenebilmeli (polling interval = 30s)
- [ ] Maç durumu görsel olarak ayrımlanabilir: `SCHEDULED` (gri) · `LIVE` (yeşil/aktif) · `FT` (tamamlandı)
- [ ] Dış API yanıt vermediğinde son geçerli cache skoru gösterilmeli; "veri geçici olarak güncellenmeyebilir" bildirimi kullanıcıya iletilmeli
- [ ] FT durumuna geçen maç için score engine job'ı 60 saniye içinde kuyruğa alınmalı

### Cross-Platform Tutarlılık

- [ ] **[WEB]** Web sekmesi arka plana alınıp öne çekildiğinde skor güncel görünmeli (Visibility API entegrasyonu)
- [ ] **[NATIVE]** Native uygulama arka plandan geri döndüğünde anlık refetch yapmalı; 30 saniye beklemeden güncellenmeli

### Edge Cases

- [ ] **[EDGE]** Aynı anda 3+ maç oynanırken (grup aşaması) tüm maçlar listede görünmeli; performans düşmemeli
- [ ] **[EDGE]** Maç iptal edilirse (CANCELLED durumu) kullanıcı bilgilendirilmeli; o maç için puan hesaplaması yapılmamalı
- [ ] **[PERF]** Arka plan sekmesi polling'i yavaşlatılmalı (Visibility API); aktif olmayan sekme gereksiz yük oluşturmamalı

---

## F-05 · Leaderboard (FR-25/26) — Öncelik: P1

### Fonksiyonel Kriterler

- [ ] Tüm turnuva leaderboard'u `weighted_total`'a göre azalan sırada listelenmeli
- [ ] Oturum açmamış kullanıcı da leaderboard'u görüntüleyebilmeli (public read — RLS politikası)
- [ ] Maç FT olup score engine tamamlandıktan sonra leaderboard ≤ 5 dakika içinde güncellenmiş görünmeli
- [ ] **[PERF]** Cache'den leaderboard okuma < 50ms; score engine sonrası cache invalidation otomatik tetiklenmeli
- [ ] Leaderboard satırına tıklanınca o kullanıcının profil sayfası açılabilmeli (kadro + bracket + puanlar)

### Edge Cases

- [ ] **[EDGE]** İki kullanıcı aynı `weighted_total` puanına sahipse sıralama belirleyici ikincil kriter ile çözülmeli (örn. kayıt tarihi ASC)
- [ ] **[BLOCKER][EDGE]** Score engine duplicate job çalışırsa leaderboard puanı iki kez eklenmemeli — idempotency garantisi test edilmeli
- [ ] **[EDGE]** Henüz hiç maç oynamamış / tahmin yapmamış kullanıcılar için leaderboard davranışı netleştirilmeli ve tutarlı uygulanmalı

---

## F-06 · Authentication & Hesap (FR-01) — Öncelik: P0

### Fonksiyonel Kriterler

- [ ] E-posta + şifre ile kayıt ve giriş başarıyla tamamlanabilmeli
- [ ] Zayıf şifre (< 8 karakter, sadece harf veya sadece rakam) kayıt sırasında reddedilmeli
- [ ] JWT access token 15 dakika, refresh token 30 gün geçerli olmalı; refresh rotate-on-use uygulanmalı
- [ ] **[SEC]** Oturum kapatıldığında token revoke edilmeli; revoke sonrası eski token ile istek 401 dönmeli
- [ ] **[BLOCKER][SEC]** Başka kullanıcının verisine RLS sayesinde erişim denendiğinde 403 veya boş sonuç dönmeli — veri sızıntısı olmamalı
- [ ] **[SEC]** Supabase Service Role key hiçbir client response veya bundle'da expose edilmemeli

### Edge Cases

- [ ] **[EDGE]** Aynı e-posta ile ikinci kayıt denemesi anlamlı "already exists" hatası göstermeli
- [ ] **[SEC]** 5 başarısız giriş denemesi sonrası geçici kilit (rate limiting) uygulanmalı
- [ ] **[NATIVE][SEC]** Native'de auth token `SecureStore`'da saklanmalı; `AsyncStorage` veya `localStorage`'da saklanmamalı

---

## F-07 · Davet Linki & Paylaşım (FR-31/32) — Öncelik: P1

### Fonksiyonel Kriterler

- [ ] Her kullanıcıya benzersiz davet kodu üretilmeli ve kopyalanabilir link oluşturulmalı
- [ ] Davet linki web'de açılırsa tarayıcıya, native'de açılırsa uygulamaya yönlendirmeli (Universal Links / App Links)
- [ ] Bracket paylaşım linki; paylaşılan bracket'i read-only modda göstermeli — düzenleme yapılamamalı
- [ ] **[NATIVE]** Native'de "Paylaş" butonu sistem share sheet'ini açmalı (expo-sharing)

### Edge Cases

- [ ] **[EDGE]** Geçersiz veya süresi dolmuş davet kodu kullanıldığında anlamlı hata sayfası gösterilmeli
- [ ] **[EDGE]** Uygulama yüklü değilken native deep link açılırsa App Store / Play Store'a yönlendirmeli

---

## F-08 · Puan Motoru & Score Engine (FR-33/34/35) — Öncelik: P0

### Fonksiyonel Kriterler

- [ ] Weighted total formülü: `(fantasy × 0.40) + (tip × 0.35) + (bracket × 0.25)` — unit test ile kanıtlanmış
- [ ] **[BLOCKER]** `@wc2026/core` formülü ile Edge Function hesabı: aynı input → aynı output (deterministik)
- [ ] Bir modüle katılmayan kullanıcı o modülden 0 puan almalı; weighted total buna göre hesaplanmalı
- [ ] **[BLOCKER]** Score engine aynı `matchId` için iki kez çalışırsa ikinci çalışma erken çıkmalı (`processed_matches` kontrolü); puan iki kez eklenmemeli
- [ ] Score engine tamamlandıktan sonra `user_total_scores.last_calculated_at` güncellenmeli (audit trail)

### Edge Cases

- [ ] **[PERF]** 10.000 kullanıcılık score engine çalışması 5 dakikayı aşmamalı
- [ ] **[EDGE]** Oyuncu istatistiği eksik gelirse o oyuncu → 0 puan; diğer oyuncular etkilenmemeli
- [ ] **[EDGE]** Score engine başarısız olursa job queue retry mekanizması devreye girmeli (max 3 deneme, exponential backoff)

---

## Non-Functional Acceptance Criteria (Tüm Özellikler İçin)

### Performans

- [ ] **[PERF]** Tüm API endpoint'leri P95 < 500ms yanıt vermeli (yük testi: 5.000 eş zamanlı kullanıcı)
- [ ] **[PERF]** Mobil first-load LCP (Largest Contentful Paint) < 3 saniye (Wi-Fi koşullarında)
- [ ] **[PERF]** Leaderboard cache okuma < 50ms
- [ ] **[PERF]** Score engine 10K kullanıcı için < 5 dakika

### Güvenlik

- [ ] **[SEC]** Tüm yazma endpoint'leri sunucu tarafında `@wc2026/core` validasyonundan geçmeli; client-side bypass mümkün olmamalı
- [ ] **[SEC]** Rate limiting: IP başına 100 istek/dakika, authenticated kullanıcı 300 istek/dakika
- [ ] **[SEC]** Tüm iletişim HTTPS üzerinden; HTTP'ye erişim redirect'lenmeli
- [ ] **[SEC]** GDPR uyumu: kullanıcı verisi açık rıza olmadan üçüncü taraflarla paylaşılmamalı

### Cross-Platform

- [ ] **[CROSS]** Aynı kullanıcı hesabıyla web ve native'de oturum açıldığında veriler senkron görünmeli
- [ ] **[CROSS]** NativeWind bileşenleri web'de ve native'de görsel tutarsızlık olmaksızın render edilmeli
- [ ] **[CROSS]** Expo Router deep link'leri web URL'leri ve native Universal Links olarak ikisi de çalışmalı

### UI/UX

- [ ] Tüm hata mesajları kullanıcı aksiyonu için yol gösterici olmalı; "Unknown error" gibi teknik mesajlar son kullanıcıya gösterilmemeli
- [ ] Form validasyonu anlık (on-change) geri bildirim vermeli; kullanıcı submit etmeden önce hatayı görebilmeli
- [ ] Yükleme durumları skeleton loader veya spinner ile gösterilmeli; boş sayfa kullanıcıya sunulmamalı
- [ ] Tüm interactive element'ler klavye ile erişilebilir olmalı (temel a11y)

---

## F-09 · Progressive Auth Gate (Soft Gate) — Öncelik: P0

> Uygulama açılışında hiçbir kullanıcıya login ekranı gösterilmez. Auth gate yalnızca yazma aksiyonu tetiklendiğinde bottom sheet olarak açılır.

### Fonksiyonel Kriterler

- [ ] **[BLOCKER]** Uygulama ilk açıldığında Home Screen doğrudan görünmeli; login/signup ekranı yönlendirmesi olmamalı
- [ ] **[BLOCKER]** Canlı skorlar, leaderboard, maç takvimi ve public profil sayfaları oturum açmadan tam olarak kullanılabilmeli
- [ ] Auth gate aşağıdaki aksiyonlarda tetiklenmeli — bunların dışında hiçbir yerde çıkmamalı:
  - Fantezi kadro kaydetme
  - Maç tahmini girme
  - Bracket seçimi yapma
  - Davet linki oluşturma
- [ ] Auth gate tam sayfa yönlendirme değil, **bottom sheet** olarak açılmalı; arka plan içerik görünür (dimmed) kalmalı
- [ ] Bottom sheet başlığı tetikleyen aksiyona göre dinamik değişmeli:
  - Kadro → "Save Your Squad"
  - Tahmin → "Make Your Prediction"
  - Bracket → "Lock In Your Bracket"
  - Davet → "Invite Your Friends"
- [ ] Sheet kapatıldığında kullanıcı kaldığı sayfaya/içeriğe geri dönmeli; navigasyon sıfırlanmamalı
- [ ] Kullanıcı başarıyla kayıt/giriş yaptıktan sonra tetikleyen aksiyonu kaldığı yerden tamamlayabilmeli

### Cross-Platform Tutarlılık

- [ ] **[CROSS]** Bottom sheet davranışı web (modal overlay) ve native (bottom sheet) platformlarda tutarlı UX sunmalı
- [ ] **[CROSS]** Giriş yapıldıktan sonra her iki platformda kullanıcı aynı noktaya dönmeli

### Edge Cases

- [ ] **[EDGE]** Kullanıcı sheet'i kapatıp giriş yapmadan devam ederse uygulama çökmemeli; read-only içerik görünmeye devam etmeli
- [ ] **[EDGE]** Deep link ile direkt Squad/Bracket/Tips sayfasına gidilirse: sayfa açılmalı, write aksiyon denendiğinde gate tetiklenmeli — sayfa load'unda tetiklenmemeli
- [ ] **[SEC]** Giriş yapılmamış kullanıcının API'ye yazma isteği gönderme girişimi (auth bypass) sunucu tarafında 401 ile reddedilmeli; yalnızca client-side engel yeterli değil

### Non-Functional

- [ ] Auth gate bottom sheet animasyonu 300ms veya altında açılmalı; kullanıcı gecikmesi hissettirmemeli
- [ ] Sheet arka plan içeriği blur/dim efekti ile render edilmeli; içerik tamamen gizlenmemeli

---

## Definition of Done (DoD) — Checklist

Bir özellik aşağıdaki koşulların **tamamını** sağlamadan "Bitti" sayılmaz:

- [ ] Bu dokümandaki ilgili özelliğin tüm kriterleri geçildi
- [ ] `[BLOCKER]` etiketli hiçbir kriter açık değil
- [ ] `[SEC]` etiketli tüm kriterler manuel olarak test edildi ve geçildi
- [ ] `[CROSS]` etiketli kriterler hem web (Chrome) hem native (iOS Simulator + Android Emulator) üzerinde test edildi
- [ ] Unit testler (Vitest) `@wc2026/core` için yazıldı ve geçiyor
- [ ] Edge Function'lar Supabase local'de test edildi
- [ ] PR review tamamlandı; `packages/core`'da platform import yok (kural T-01)
- [ ] Staging ortamında smoke test geçildi

---

*Bu döküman her sprint review'ında güncellenmeli; yeni edge case'ler keşfedildikçe buraya eklenmeli.*
