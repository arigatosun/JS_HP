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
    const progressPercentage = (currentPage / totalPages) * 100;
    
    return `
        <div class="pagination">
            <div class="pagination-controls">
                <button class="nav-button" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-indicator" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="page-indicator">${currentPage} / ${totalPages}</div>
                </div>
                <button class="nav-button" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// メインの処理
document.addEventListener('DOMContentLoaded', function() {
    const articlesPerPage = 9; // 1ページあたりの記事数
    const totalArticles = 30; // 合計記事数
    const articles = generateArticleData(totalArticles);
    let currentPage = 1;
    
    const gridContainer = document.querySelector('.news-articles-grid');
    const containerDiv = document.querySelector('.news-articles-container');
    
    function displayArticles(page) {
        const start = (page - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        const displayedArticles = articles.slice(start, end);
        
        // 記事カードの更新
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
        const navButtons = containerDiv.querySelectorAll('.nav-button:not([disabled])');
        navButtons.forEach(button => {
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