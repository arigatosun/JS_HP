// js/column/category-accordion.js

document.addEventListener('DOMContentLoaded', () => {
    const searchArea = document.querySelector('.search-area');
    const categoryContainer = document.querySelector('.category-container.category-detail');

   
    const wrapper = document.createElement('div');
    wrapper.className = 'search-category-wrapper';
    
    // 既存の検索エリアをラッパーで包む
    searchArea.parentNode.insertBefore(wrapper, searchArea);
    wrapper.appendChild(searchArea);
    
    // アコーディオン要素の作成
    const createAccordion = () => {
        const accordion = document.createElement('div');
        accordion.className = 'category-accordion';
        
        const button = document.createElement('button');
        button.className = 'category-select-button';
        button.innerHTML = '<span class="category-select-text">▼カテゴリを選択▼</span>';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'category-dropdown';
        
        // 既存のカテゴリーボタンをクローンしてドロップダウンに追加
        const existingButtons = categoryContainer.querySelectorAll('.category-button');
        existingButtons.forEach(btn => {
            const newBtn = btn.cloneNode(true);
            newBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.remove('show');
                // ここにカテゴリー選択時の処理を追加
            });
            dropdown.appendChild(newBtn);
        });
        
        accordion.appendChild(button);
        accordion.appendChild(dropdown);
        
        // ボタンクリックイベントの追加
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('show');
        });
        
        // ドロップダウン以外をクリックした時に閉じる
        document.addEventListener('click', () => {
            dropdown.classList.remove('show');
        });
        
        return accordion;
    };
    
    // アコーディオンを検索エリアの後に追加 (ここを修正)
    const accordion = createAccordion();
    searchArea.after(accordion); // appendChild から after に変更
});