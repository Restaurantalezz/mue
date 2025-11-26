// عناصر DOM
const categoryButtons = document.querySelectorAll('.category-btn');
const menuSections = document.querySelectorAll('.menu-section');
const menuItems = document.querySelectorAll('.menu-item');
const body = document.body;
const iceEffect = document.getElementById('iceEffect');
const fireEffect = document.getElementById('fireEffect');
const iceSound = document.getElementById('iceSound');
const grillSound = document.getElementById('grillSound');

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة - جاهز للتأثيرات');
    initMenu();
});

// تهيئة المنيو
function initMenu() {
    console.log('تهيئة المنيو...');
    
    // إضافة مستمعي الأحداث لأزرار الفئات
    categoryButtons.forEach(button => {
        button.addEventListener('click', handleCategoryClick);
    });
    
    // إضافة مستمعي الأحداث لعناصر القائمة
    menuItems.forEach(item => {
        item.addEventListener('click', handleMenuItemClick);
    });
    
    // اختبار الأصوات
    testAudio();
}

// اختبار الأصوات
function testAudio() {
    console.log('اختبار توفر ملفات الصوت...');
    console.log('صوت الثلج:', iceSound.src);
    console.log('صوت الشواء:', grillSound.src);
}

// التعامل مع النقر على فئة
function handleCategoryClick(event) {
    const button = event.currentTarget;
    const category = button.getAttribute('data-category');
    
    // إزالة النشاط من جميع الأزرار والأقسام
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    menuSections.forEach(section => section.classList.remove('active'));
    
    // إضافة النشاط للزر والقسم المحدد
    button.classList.add('active');
    document.getElementById(category).classList.add('active');
    
    // تغيير لون الخلفية حسب الفئة
    updateBackground(category);
}

// تحديث خلفية الصفحة حسب الفئة
function updateBackground(category) {
    body.className = '';
    if (category === 'cold-drinks') {
        body.classList.add('cold-drinks');
    } else if (category === 'grills') {
        body.classList.add('grills');
    }
}

// التعامل مع النقر على عنصر القائمة
function handleMenuItemClick(event) {
    const item = event.currentTarget;
    const soundType = item.getAttribute('data-sound');
    
    console.log('تم النقر على عنصر:', item.querySelector('.item-name span').textContent);
    console.log('نوع الصوت:', soundType);
    
    if (soundType === 'ice') {
        activateIceEffects();
    } else if (soundType === 'grill') {
        activateGrillEffects();
    }
}

// تفعيل تأثيرات الثلج
function activateIceEffects() {
    console.log('تفعيل تأثيرات الثلج...');
    
    // تشغيل صوت الثلج
    playSound(iceSound);
    
    // تفعيل تأثير الثلج البصري
    activateIceVisualEffect();
}

// تفعيل تأثيرات الشواء
function activateGrillEffects() {
    console.log('تفعيل تأثيرات الشواء...');
    
    // تشغيل صوت الشواء
    playSound(grillSound);
    
    // تفعيل تأثير النار البصري
    activateFireVisualEffect();
}

// تشغيل الصوت
function playSound(audioElement) {
    audioElement.currentTime = 0;
    audioElement.play().catch(error => {
        console.log('تعذر تشغيل الصوت:', error);
    });
}

// تفعيل تأثير الثلج البصري
function activateIceVisualEffect() {
    console.log('تفعيل التأثير البصري للثلج...');
    
    iceEffect.classList.add('active');
    
    // إنشاء قطرات مياه
    createWaterDroplets(15);
    
    // إزالة التأثير بعد 3 ثوان
    setTimeout(() => {
        iceEffect.classList.remove('active');
        removeAllWaterDroplets();
    }, 3000);
}

// إنشاء قطرات مياه عشوائية
function createWaterDroplets(count) {
    for (let i = 0; i < count; i++) {
        createWaterDroplet();
    }
}

// إنشاء قطرة ماء فردية
function createWaterDroplet() {
    const droplet = document.createElement('div');
    droplet.classList.add('water-droplet');
    
    // وضع عشوائي
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = 2 + Math.random() * 3;
    
    droplet.style.left = `${left}%`;
    droplet.style.animationDelay = `${delay}s`;
    droplet.style.animationDuration = `${duration}s`;
    
    iceEffect.appendChild(droplet);
    
    // إزالة القطرة بعد انتهاء الرسوم المتحركة
    setTimeout(() => {
        if (droplet.parentNode) {
            droplet.remove();
        }
    }, (delay + duration) * 1000);
}

// إزالة جميع قطرات الماء
function removeAllWaterDroplets() {
    const droplets = document.querySelectorAll('.water-droplet');
    droplets.forEach(droplet => droplet.remove());
}

// تفعيل تأثير النار البصري
function activateFireVisualEffect() {
    console.log('تفعيل التأثير البصري للنار...');
    
    fireEffect.classList.add('active');
    
    // إنشاء لهب عشوائي
    createFlames(12);
    
    // إزالة التأثير بعد 3 ثوان
    setTimeout(() => {
        fireEffect.classList.remove('active');
        removeAllFlames();
    }, 3000);
}

// إنشاء لهب عشوائي
function createFlames(count) {
    for (let i = 0; i < count; i++) {
        createFlame();
    }
}

// إنشاء لهب فردي
function createFlame() {
    const flame = document.createElement('div');
    flame.classList.add('flame');
    
    // وضع عشوائي
    const left = Math.random() * 100;
    const width = 20 + Math.random() * 40;
    const height = 40 + Math.random() * 60;
    
    flame.style.left = `${left}%`;
    flame.style.width = `${width}px`;
    flame.style.height = `${height}px`;
    
    fireEffect.appendChild(flame);
}

// إزالة جميع اللهب
function removeAllFlames() {
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => flame.remove());
}
