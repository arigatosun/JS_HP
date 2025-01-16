/**************************************************
 * コラム記事データの生成・操作
 **************************************************/

// （A）人気の記事データ生成用
function generatePopularArticles() {
    // 必要な数だけデータを生成する (例：3件)
    const popularArticles = [];
    for (let i = 1; i <= 3; i++) {
        popularArticles.push({
            id: i,
            category: 'カテゴリー',
            title: `人気コラムのタイトル${i}がここに入ります。`,
            date: '2024.10.10',
            image: 'images/column_js_image.png'
        });
    }
    return popularArticles;
}

// （B）最新の記事データ生成用
function generateLatestArticles(count) {
    // 大量の記事を想定し、ページネーション用に生成
    const latestArticles = [];
    for (let i = 1; i <= count; i++) {
        latestArticles.push({
            id: i,
            category: 'カテゴリー',
            title: `最新コラムのタイトル${i}がここに入ります。`.repeat(2),
            date: '2024.10.10',
            image: 'images/column_js_image.png'
        });
    }
    return latestArticles;
}

// （C）関連記事データ生成用（新規追加）
function generateRelatedArticles(currentId) {
    const relatedArticles = [];
    // 3件の関連記事を生成
    for (let i = 1; i <= 3; i++) {
        relatedArticles.push({
            id: currentId + i + 100, // 重複を避けるためIDは現在の記事ID + 100からスタート
            category: 'カテゴリー',
            title: `関連コラムのタイトル${i}がここに入ります。`,
            date: '2024.10.10',
            image: 'images/column_js_image.png'
        });
    }
    return relatedArticles;
}

/**************************************************
 * 記事カードのHTML生成（人気/最新/関連 共通）
 **************************************************/
function createColumnCard(article, isDetailPage = false) {
    // 詳細ページかどうかでパスを調整
    const imagePath = isDetailPage ? `../../${article.image}` : article.image;
    
    return `
        <article class="column-card" onclick="handleColumnClick(event, ${article.id})">
            <div class="card-thumbnail">
                <img src="${imagePath}" alt="コラムサムネイル">
            </div>
            <div class="card-content">
                <div class="card-title">${article.title}</div>
                <div class="card-meta">
                    <span class="card-category">${article.category}</span>
                    <time class="card-date">${article.date}</time>
                </div>
            </div>
        </article>
    `;
}

// 記事クリック時の詳細ページ遷移処理
function handleColumnClick(event, id) {
    event.preventDefault();
    const baseUrl = window.location.origin;
    // パスの構築を現在のページの場所に基づいて調整
    const isDetailPage = window.location.pathname.includes('column-detail.html');
    const columnPath = isDetailPage ? '../../sections/column/column-detail.html' : 'sections/column/column-detail.html';
    window.location.href = `${baseUrl}/${columnPath}?id=${id}`;
}

/**************************************************
 * ページネーション生成
 **************************************************/
function createPagination(currentPage, totalPages) {
    const progressPercentage = (currentPage / totalPages) * 100;

    return `
        <div class="pagination">
            <div class="pagination-controls">
                <!-- 前ページボタン -->
                <button class="nav-button" data-page="${currentPage - 1}" ${currentPage <= 1 ? 'disabled' : ''}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" 
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19L8 12L15 5" 
                              stroke="#333333" stroke-width="2" 
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>

                <!-- プログレスバー -->
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-indicator" style="width: ${progressPercentage}%"></div>
                    </div>
                    <div class="page-indicator">${currentPage} / ${totalPages}</div>
                </div>

                <!-- 次ページボタン -->
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
    // 詳細ページかどうかを判定
    const isDetailPage = window.location.pathname.includes('column-detail.html');

    /********** 1) 人気の記事を表示 **********/
    const popularContainer = document.querySelector('.popular-cards');
    const popularArticles = generatePopularArticles();
    if (popularContainer) {
        popularContainer.innerHTML = popularArticles
            .map(article => createColumnCard(article, isDetailPage))
            .join('');
    }

    /********** 2) 最新の記事を表示（ページネーション付き） **********/
    const articlesPerPage = 6;    // 1ページあたりの記事数
    const totalArticles = 30;    // 総記事数（必要に応じて変更）
    const latestArticlesData = generateLatestArticles(totalArticles);

    let currentPage = 1;
    const latestContainer = document.querySelector('.latest-cards');

    function displayLatestArticles(page) {
        const start = (page - 1) * articlesPerPage;
        const end = start + articlesPerPage;
        const displayed = latestArticlesData.slice(start, end);
    
        // コンテナの構造を再構築
        const latestContainer = document.querySelector('.latest-cards');
        latestContainer.innerHTML = `
            <div class="articles-wrapper">
                ${displayed.map(article => createColumnCard(article, isDetailPage)).join('')}
            </div>
        `;
    
        // ページネーションを別途追加
        const totalPages = Math.ceil(totalArticles / articlesPerPage);
        const paginationHtml = createPagination(page, totalPages);
        latestContainer.insertAdjacentHTML('beforeend', paginationHtml);
    
        // ページネーションのボタンにイベント付与
        const navButtons = latestContainer.querySelectorAll('.nav-button:not([disabled])');
        navButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const newPage = parseInt(this.dataset.page);
                currentPage = newPage;
                displayLatestArticles(currentPage);
    
                // ページ遷移後に画面を最新記事セクションまでスクロール
                const scrollOffset = window.innerWidth <= 767 ? 80 : 100;
                window.scrollTo({
                    top: latestContainer.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
            });
        });
    }

    // 初期表示
    if (latestContainer) {
        displayLatestArticles(currentPage);
    }

    /********** 3) 関連記事を表示（詳細ページの場合） **********/
    const relatedContainer = document.querySelector('.related-articles .articles-wrapper');
    if (relatedContainer && isDetailPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentId = parseInt(urlParams.get('id')) || 0;

        // 関連記事用のダミーデータを生成
        const relatedArticles = generateRelatedArticles(currentId);

        relatedContainer.innerHTML = relatedArticles
            .map(article => createColumnCard(article, true))
            .join('');
    }
});