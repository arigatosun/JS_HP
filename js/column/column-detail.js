/**************************************************
 * コラムの詳細ページ用スクリプト
 **************************************************/

document.addEventListener('DOMContentLoaded', function() {
    // URLパラメータから id を取得
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        window.location.href = '../../column.html';
        return;
    }

    // 記事データを取得
    const articleData = getColumnArticleData(articleId);
    if (!articleData) {
        window.location.href = '../../column.html';
        return;
    }

    // 詳細ページに描画
    renderColumnDetail(articleData);

    // サイドバーの人気記事を表示
    renderPopularArticles();
});

// 人気記事を表示する関数
function renderPopularArticles() {
    const popularListContainer = document.querySelector('.popular-list');
    if (!popularListContainer) return;

    // articles.js から人気記事データを生成
    const popularArticles = generatePopularArticles();
    
    // サイドバー用のカード生成関数
    function createSidebarCard(article) {
        return `
            <article class="sidebar-card" onclick="handleColumnClick(event, ${article.id})">
                <div class="card-thumbnail">
                    <img src="../../${article.image}" alt="コラムサムネイル">
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

    popularListContainer.innerHTML = popularArticles
        .map(article => createSidebarCard(article))
        .join('');
}


/**************************************************
 * ダミーの記事データ取得関数（実際はAPIやJSONなどから取得）
 **************************************************/
function getColumnArticleData(id) {
    // ここでは例として単純にIDを元に擬似的な記事を返す
    // 実際のプロジェクトではサーバーやJSONからデータを取る想定
    return {
        id: id,
        category: '#カテゴリー',
        title: `コラムのタイトル${id}がここに入ります。`,
        date: '2024.10.10',
        imageUrl: '../../images/column_js_image.png',
        content: `
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
             ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            ここにコラムの本文が入ります。ここにコラムの本文が入ります。
            
            
            
        `,
    };
}


/**************************************************
 * 記事詳細を描画する関数
 **************************************************/
function renderColumnDetail(article) {
    const detailContainer = document.getElementById('detail-content');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
    <div class="article-detail-container">
        <div class="article-detail">
            <!-- メイン画像 -->
            <div class="article-image">
                <img src="${article.imageUrl}" alt="記事イメージ">
            </div>
            
            <!-- 日付表示 -->
            <div class="article-meta">
                <time class="article-date">${article.date}</time>
            </div>

            <!-- タイトル -->
            <h1 class="article-title">${article.title}</h1>

             <!-- カテゴリ -->
            <div class="article-tag">
                <span>${article.category}</span>
            </div>

            <!-- デコレーティブライン -->
            <div class="decorative-lines">
                <span class="line blue-line"></span>
                <span class="line red-line"></span>
            </div>

           

            <!-- 本文 -->
            <div class="article-content">
                ${article.content}
            </div>

            <!-- 一覧ページに戻るボタン -->
            <div class="view-all-button-container">
                <a href="../../column.html" class="view-all-button">
                    <span>一覧に戻る</span>
                    <img src="../../images/itiran_yajirusi.png" alt="矢印" class="arrow-icon">
                </a>
            </div>
        </div>
    </div>
    `;
}
