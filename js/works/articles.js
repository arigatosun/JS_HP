/**************************************************
 * 最新情報記事データの生成・操作
 **************************************************/

// メイン記事データ生成
function generateMainArticles() {
    const mainArticles = [];
    for (let i = 1; i <= 3; i++) {
        mainArticles.push({
            id: i,
            date: '2024.10.10',
            title: `ニュースのタイトル${i}がここに入ります`,
            content: `ここにニュース本文の一部が入ります。ここにニュース本文の一部が入ります。
                     ここにニュース本文の一部が入ります。ここにニュース本文の一部が入ります。
                     ここにニュース本文の一部が入ります。ここにニュース本文の一部が入ります。`,
            categories: ['カテゴリー名', 'カテゴリー名', 'カテゴリー名'],
            image: 'images/news-image-icon.png'
        });
    }
    return mainArticles;
}

// サブ記事データ生成
function generateSubArticles(count) {
    const subArticles = [];
    for (let i = 1; i <= count; i++) {
        subArticles.push({
            id: i + 3, // メイン記事の後の ID から開始
            date: '2024.10.10',
            title: `ニュースのタイトル${i}がここに入ります`,
            content: `ここにニュース本文の一部が入ります。`,
            categories: ['カテゴリー名'],
        });
    }
    return subArticles;
}

// 記事クリック時の詳細ページ遷移処理
function handleNewsClick(event, id) {
    event.preventDefault();
    const baseUrl = window.location.origin;
    const isDetailPage = window.location.pathname.includes('works-detail.html');
    const detailPath = isDetailPage ? '../../sections/works/works-detail.html' : 'sections/works/works-detail.html';
    window.location.href = `${baseUrl}/${detailPath}?id=${id}`;
}

// メイン記事のHTMLを生成
function createMainArticle(article, isDetailPage = false) {
    const imagePath = isDetailPage ? `../../${article.image}` : article.image;
    return `
        <div class="main-article" onclick="handleNewsClick(event, ${article.id})">
            <div class="article-image">
                <img src="${imagePath}" alt="ニュース画像">
            </div>
            <div class="article-content">
                <time class="article-date">${article.date}</time>
                <div class="article-title">${article.title}</div>
                <div class="article-divider"></div>
                <p class="article-excerpt">${article.content}</p>
                <div class="category-labels">
                    ${article.categories.map(category => `
                        <div class="category-label">#${category}</div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// サブ記事のHTMLを生成
function createSubArticle(article) {
    return `
        <div class="sub-article" onclick="handleNewsClick(event, ${article.id})">
            <time class="sub-article-date">${article.date}</time>
            <div class="sub-article-title">${article.title}</div>
        </div>
    `;
}

// ページネーション生成
function createPagination(currentPage, totalPages) {
    const progressPercentage = (currentPage / totalPages) * 100;

    return `
        <div class="pagination">
            <div class="pagination-controls">
                <button class="nav-button" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" 
                              stroke="#333333" stroke-width="2" 
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-indicator" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="page-indicator">${currentPage} / ${totalPages}</div>
                </div>

                <button class="nav-button" data-page="${currentPage + 1}" ${currentPage >= totalPages ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L16 12L9 19" 
                              stroke="#333333" stroke-width="2" 
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

/**************************************************
 * メイン処理：DOM読み込み後に実行
 **************************************************/
document.addEventListener('DOMContentLoaded', function() {
    const isDetailPage = window.location.pathname.includes('works-detail.html');

    // メイン記事の表示
    const mainArticlesContainer = document.querySelector('.information-main');
    if (mainArticlesContainer) {
        const mainArticles = generateMainArticles();
        mainArticlesContainer.innerHTML = mainArticles
            .map(article => createMainArticle(article, isDetailPage))
            .join('');
    }

    // サブ記事の表示（ページネーション付き）
    const subArticlesPerPage = 6; // 1ページあたりの記事数
    const totalSubArticles = 30;  // 総記事数
    const subArticlesData = generateSubArticles(totalSubArticles);

    let currentPage = 1;
    const subArticlesContainer = document.querySelector('.sub-articles-grid');

    function displaySubArticles(page) {
        const start = (page - 1) * subArticlesPerPage;
        const end = start + subArticlesPerPage;
        const displayed = subArticlesData.slice(start, end);

        if (subArticlesContainer) {
            subArticlesContainer.innerHTML = displayed
                .map(article => createSubArticle(article))
                .join('');

            // ページネーションを追加
            const totalPages = Math.ceil(totalSubArticles / subArticlesPerPage);
            const paginationHtml = createPagination(page, totalPages);
            subArticlesContainer.insertAdjacentHTML('afterend', paginationHtml);

            // ページネーションのボタンにイベント付与
            const navButtons = document.querySelectorAll('.nav-button:not([disabled])');
            navButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const newPage = parseInt(this.dataset.page);
                    currentPage = newPage;
                    
                    // 既存のページネーションを削除
                    const existingPagination = document.querySelector('.pagination');
                    if (existingPagination) {
                        existingPagination.remove();
                    }
                    
                    displaySubArticles(currentPage);

                    // スクロール処理
                    const scrollOffset = window.innerWidth <= 767 ? 80 : 100;
                    window.scrollTo({
                        top: subArticlesContainer.offsetTop - scrollOffset,
                        behavior: 'smooth'
                    });
                });
            });
        }
    }

    // 初期表示
    if (subArticlesContainer) {
        displaySubArticles(currentPage);
    }
});