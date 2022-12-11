## UYGULAMADAKI SORUNLAR
- Clean code yazılmadı. 
- Redux kullanılmadı.

## UYGULAMAYA EKLENEBİLİR ÖZELLİKLER
- Müşteri geçmiş randevulardan iptal butonu kaldır ve gri renkte yap.Eğer istenirse farklı bir sayfada gösterilebilir.
- berber randevu geçmişi gösterilmesin. Eğer istenirse farklı bir sayfada gösterilebilir.
- tek günlük randevu sisteminden çıkıp saatlik sisteme geçilebilir.





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
