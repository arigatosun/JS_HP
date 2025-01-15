// 記事データを生成する関数
function generateArticleData(count) {
    const articles = [];
    for (let i = 1; i <= count; i++) {
        articles.push({
            id: i,
            tag: 'タグ項目・タグ項目',
            title: `タイトル${i}がここに入ります。`.repeat(5),
            supportCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー'],
            serviceCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー']
        });
    }
    return articles;
}

// 記事カードのHTMLを生成する関数
function createArticleCard(article) {
    return `
        <div class="example-card">
            <div class="example-card-tag">
                <img src="images/tag-icon.png" alt="タグ" class="tag-icon">
                <span>${article.tag}</span>
            </div>
            <h4 class="example-card-title">
                ${article.title}
            </h4>
            <div class="card-divider"></div>
            <div class="example-card-categories">
                <span class="category-label">支援領域</span>
                <div class="category-tags">
                    ${article.supportCategories.map(category => 
                        `<span class="category-tag">${category}</span>`
                    ).join('')}
                </div>
            </div>
            <div class="example-card-services">
                <span class="category-label">提供サービス</span>
                <div class="category-tags">
                    ${article.serviceCategories.map(category => 
                        `<span class="category-tag">${category}</span>`
                    ).join('')}
                </div>
            </div>
        </div>
    `;
}

// ページネーション用のHTMLを生成する関数
function createPagination(currentPage, totalPages) {
    let paginationHtml = '<div class="pagination">';
    
    // 前のページへのリンク
    if (currentPage > 1) {
        paginationHtml += `<button class="page-btn" data-page="${currentPage - 1}">前へ</button>`;
    }
    
    // ページ番号
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <button class="page-btn ${currentPage === i ? 'active' : ''}" 
                    data-page="${i}">${i}</button>
        `;
    }
    
    // 次のページへのリンク
    if (currentPage < totalPages) {
        paginationHtml += `<button class="page-btn" data-page="${currentPage + 1}">次へ</button>`;
    }
    
    paginationHtml += '</div>';
    return paginationHtml;
}

// メインの処理
document.addEventListener('DOMContentLoaded', function() {
    const articlesPerPage = 9; // 1ページあたりの記事数
    const totalArticles = 15; // 合計記事数
    const articles = generateArticleData(totalArticles);
    let currentPage = 1;
    
    const gridContainer = document.querySelector('.news-articles-grid');
    const containerDiv = document.querySelector('.news-articles-container');
    
    function displayArticles(page) {
        const start = (page - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        const displayedArticles = articles.slice(start, end);
        
        gridContainer.innerHTML = displayedArticles.map(article => 
            createArticleCard(article)
        ).join('');
        
        // ページネーションの更新
        const totalPages = Math.ceil(totalArticles / articlesPerPage);
        const paginationHtml = createPagination(page, totalPages);
        
        // 既存のページネーションを削除して新しいものを追加
        const existingPagination = containerDiv.querySelector('.pagination');
        if (existingPagination) {
            existingPagination.remove();
        }
        containerDiv.insertAdjacentHTML('beforeend', paginationHtml);
        
        // ページネーションボタンのイベントリスナーを設定
        const pageButtons = containerDiv.querySelectorAll('.page-btn');
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const newPage = parseInt(this.dataset.page);
                currentPage = newPage;
                displayArticles(currentPage);
                window.scrollTo(0, containerDiv.offsetTop - 100);
            });
        });
    }
    
    // 初期表示
    displayArticles(currentPage);
});