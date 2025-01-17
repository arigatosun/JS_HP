// contact/form.js

document.addEventListener('DOMContentLoaded', function() {
    // フォーム要素の取得
    const contactForm = document.getElementById('contactForm');
    const contactTypeSection = document.querySelector('.contact-type-container');
    const formSection = document.querySelector('.contact-form-section');
    const contactInfo = document.querySelector('.contact-info');

    // 完了メッセージのHTML
    const completionMessageHTML = `
        <div class="completion-message" style="
            max-width: 900px;
            margin: 60px auto;
            padding: 60px 20px;
            border-radius: 20px;
            text-align: center;
        ">
            <h2 style="
                color: #333;
                text-align: center;
                font-family: 'BIZ UDGothic';
                font-size: 32px;
                font-style: normal;
                font-weight: 700;
                line-height: 50px;
                letter-spacing: 4.48px;
                margin-bottom: 20px;
            ">お問い合わせを承りました！</h2>
            <p style="
                color: #333;
                text-align: center;
                font-family: 'BIZ UDGothic';
                font-size: 28px;
                font-style: normal;
                font-weight: 700;
                line-height: 50px;
                letter-spacing: 3.92px;
            ">担当者が確認後、内容を応じて折り返しご連絡いたします。</p>
        </div>
    `;

    // フォーム送信時の処理
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // デフォルトの送信をキャンセル

        // フォームデータの収集
        const formData = new FormData(contactForm);
        const formDataObj = {};
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });

        try {
            // WordPress移行後にこちらのコメントを外して使用
            /*
            const response = await fetch('/wp-json/contact-form/v1/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObj)
            });

            if (!response.ok) {
                throw new Error('送信に失敗しました');
            }
            */

            // 開発環境用の送信完了シミュレーション
            await new Promise(resolve => setTimeout(resolve, 1000));

            // UIの切り替え
            // 問い合わせフォームと種類選択セクション、案内テキストを非表示
            contactTypeSection.style.display = 'none';
            formSection.style.display = 'none';
            contactInfo.style.display = 'none';

            // 完了メッセージの挿入
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = completionMessageHTML;
            formSection.parentNode.insertBefore(tempDiv.firstElementChild, formSection);

            // フォームのリセット
            contactForm.reset();

            // ページトップにスクロール
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        } catch (error) {
            console.error('Error:', error);
            alert('申し訳ございません。送信に失敗しました。もう一度お試しください。');
        }
    });
});