document.addEventListener('DOMContentLoaded', function() {
    // URLからIDを取得
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        // IDが無い場合は一覧ページにリダイレクト
        window.location.href = '../../examples.html';
        return;
    }

    // 記事データを取得して表示
    const articleData = getArticleData(articleId);
    if (articleData) {
        renderArticleDetail(articleData);
    } else {
        window.location.href = '../../examples.html';
    }
});

// 記事データを取得する関数
function getArticleData(id) {
    // 仮の記事データ（実際のプロジェクトではAPIやJSONファイルから取得する）
    return {
        id: id,
        tag: 'タグ項目・タグ項目',
        title: `タイトル${id}がここに入ります。`.repeat(5),
        supportCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー'],
        serviceCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー'],
        // 詳細ページ用の追加情報
        content: `
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
            ここにニュースの本文が入ります。ここにニュースの本文が入ります。ここにニュースの本文が入ります。
        `,
        date: '2024.01.15',
        imageUrl: '../../images/examples-image.png'
    };
}

// 最新の記事データを生成する関数
function generateLatestArticles(currentId, count = 6) {
    const articles = [];
    for (let i = 1; i <= count + 1; i++) {
        if (i.toString() !== currentId) {
            articles.push({
                id: i,
                tag: 'タグ項目・タグ項目',
                title: `タイトル${i}がここに入ります。`.repeat(5),
                supportCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー'],
                serviceCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー']
            });
            if (articles.length === count) break;
        }
    }
    return articles;
}

// 最新記事カードのHTMLを生成する関数
function createLatestArticleCard(article) {
    return `
        <a href="example-detail.html?id=${article.id}" 
           class="example-card-link" 
           onclick="handleArticleClick(event, ${article.id})">
            <div class="example-card">
                <div class="example-card-tag">
                    <img src="../../images/tag-icon.png" alt="タグ" class="tag-icon">
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
        </a>
    `;
}

// 記事詳細を描画する関数
function renderArticleDetail(article) {
    const detailContent = document.getElementById('detail-content');
    if (!detailContent) return;

    detailContent.innerHTML = `
    <div class="article-detail-container">
        <div class="article-detail">
            <!-- メイン画像 -->
            <div class="article-image">
                <img src="${article.imageUrl}" alt="記事イメージ">
            </div>
            
            <!-- タグ -->
            <div class="article-tag">
                <img src="../../images/tag-icon.png" alt="タグ" class="tag-icon">
                <span>${article.tag}</span>
            </div>

            <!-- タイトル -->
            <h1 class="article-title">${article.title}</h1>

            <!-- カテゴリーセクション -->
            <div class="article-categories">
                <!-- 支援領域 -->
                <div class="category-section">
                    <div class="category-sien-header">
                        <h2 class="category-label">支援領域</h2>
                        <div class="category-tags">
                            ${article.supportCategories.map(category => 
                                `<span class="category-tag">${category}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>

                <!-- 提供サービス -->
                <div class="category-section">
                    <div class="category-header">
                        <h2 class="category-label">提供サービス</h2>
                        <div class="category-tags">
                            ${article.serviceCategories.map(category => 
                                `<span class="category-tag">${category}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- デコレーティブライン2 -->
            <div class="decorative-lines">
                <span class="line blue-line"></span>
                <span class="line red-line"></span>
            </div>

            <!-- 記事本文 -->
            <div class="article-content">
                ${article.content}
            </div>

            <!-- 最新の記事セクション -->
                <div class="news-articles-container">
                    <div class="news-articles-grid">
                        ${generateLatestArticles(article.id)
                            .map(latestArticle => createLatestArticleCard(latestArticle))
                            .join('')}
                    </div>
                </div>
            </div>

           <!-- 戻るボタン -->
<div class="view-all-button-container">
    <a href="../../examples.html" class="view-all-button">
        <span>一覧に戻る</span>
        <img src="../../images/itiran_yajirusi.png" alt="矢印" class="arrow-icon">
    </a>
</div>
        </div>
    </div>
    `;
}

// 記事クリック時の処理
function handleArticleClick(event, id) {
    event.preventDefault();
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/sections/examples/example-detail.html?id=${id}`;
}