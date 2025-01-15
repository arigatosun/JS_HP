document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.category-btn');

    // リップルエフェクトの作成関数
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        ripple.style.top = `${event.clientY - button.offsetTop - radius}px`;

        button.appendChild(ripple);

        // アニメーション終了後に要素を削除
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }

    // ボタンクリックの処理
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 現在のアクティブボタンからクラスを削除
            const currentActive = document.querySelector('.category-btn.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // クリックされたボタンをアクティブに
            this.classList.add('active');

            // リップルエフェクトを作成
            createRipple(e);
        });
    });
});