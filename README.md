# Velora Coffee

موقع تعريفي عربي (RTL) لعلامة قهوة فاخرة، أنشأته كتمرين على بناء صفحة هبوط كاملة بـ HTML وCSS وJavaScript وBootstrap.

> **Velora علامة وهمية.** المنتجات والأسعار والآراء والأرقام وبيانات التواصل كلها محتوى تجريبي للعرض فقط، ومكتوب ذلك داخل الصفحة. لا يوجد متجر أو سلة أو نشرة بريدية فعلية.

**العرض المباشر:** https://medokalel.github.io/velora-coffee/

## ما الذي يعمل فعلاً

- تصميم RTL عربي متجاوب (Bootstrap 5 + CSS مخصص).
- Navbar ثابت يتغير شكله عند التمرير، وقائمة موبايل تُغلق بعد اختيار قسم.
- Scroll spy بـ IntersectionObserver يحدد القسم الحالي في القائمة.
- ظهور الأقسام تدريجياً عند التمرير، وعدّاد الأرقام، ويتوقفان تلقائياً مع `prefers-reduced-motion`.
- سلايدر آراء بـ Swiper (محلي بدون CDN) بتشغيل تلقائي يتوقف عند المرور بالماوس.
- Skip link، وتركيز واضح بلوحة المفاتيح، وأسماء لكل الأزرار والحقول.
- أزرار «أضف إلى السلة» ونموذج النشرة تعرض رسالة أنها تجريبية ولا ترسل شيئاً.

## تشغيل المشروع محلياً

لا يحتاج بناء. افتح `index.html` أو شغّل أي سيرفر ثابت:

```bash
python -m http.server 8000
```

## التقنيات

HTML5 · CSS3 · Bootstrap 5 · JavaScript · Swiper 12 · Font Awesome · خط Cairo (Google Fonts)

## الهيكل

```
index.html
css/   style.css + مكتبات (bootstrap, font awesome, swiper)
js/    script.js + مكتبات
webfonts/
favicon.svg
```

تصميم وتطوير [محمد خليل](https://github.com/medokalel).
