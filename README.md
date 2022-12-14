## UYGULAMADAKI SORUNLAR
- berber ve müşteri profil güncelleme ekranlarında state management eksik query kullanılmalı ama localstorage kullanıldı 


## UYGULAMAYA EKLENEBİLİR ÖZELLİKLER
- Müşteri geçmiş randevulardan iptal butonu kaldır ve gri renkte yap.Eğer istenirse farklı bir sayfada gösterilebilir.
- berber randevu geçmişi gösterilmesin. Eğer istenirse farklı bir sayfada gösterilebilir.
- tek günlük randevu sisteminden çıkıp saatlik sisteme geçilebilir.BerberRandevular getUserName fonksiyonu





## Cözülen Sorunlar
- uygulamada berber ekranından randevu silince randevularım tablosundan silemiyor.✅
-  context api veri bağlamları tam kurulmadı . ✅
- berber ekranından randevu silinmeyebiliyor. ✅
- filtreleme özelliği eklenmedi ✅
- arama özelliği eklenmedi ✅
- uygulama sıfırdan yüklendiğinde filtreleme yaparken undefined sorunu✅
- Her gün her berberde bulunan 3 boolean gün verisinin bir bir sola kayması ✅
```
today:true,tomorrow:true,nextDay:false  >> bugün ise
today:true,tomorrow:false,nextDay:false >> yarın boyle olmalı
```
