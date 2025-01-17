// js/contact/contact-type.js
document.addEventListener('DOMContentLoaded', function() {
    const contactTypeInputs = document.querySelectorAll('.contact-type-checkbox input');
    let currentSelected = null;

    contactTypeInputs.forEach(input => {
        input.addEventListener('click', function(e) {
            // クリックイベントを即座にキャンセルしない
            if (currentSelected === this && this.checked) {
                // setTimeout を使用して非同期で状態を更新
                setTimeout(() => {
                    this.checked = false;
                    currentSelected = null;
                }, 0);
            } else {
                currentSelected = this;
            }
        });

        // ホバーエフェクト用のイベントリスナー
        const label = input.closest('.contact-type-checkbox');
        label.addEventListener('mouseenter', function() {
            if (!input.checked) {
                this.classList.add('hover');
            }
        });

        label.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // フォーム送信時の処理を追加
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const selectedType = document.querySelector('.contact-type-checkbox input:checked');
            if (!selectedType) {
                e.preventDefault();
                alert('お問い合わせの項目を選択してください。');
                return;
            }
            // 選択された項目の値をフォームに反映
            const inquiryTypeSelect = document.getElementById('inquiryType');
            if (inquiryTypeSelect) {
                inquiryTypeSelect.value = selectedType.value;
            }
        });
    }
});