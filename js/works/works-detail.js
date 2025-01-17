/**************************************************
 * 最新情報の詳細ページ用スクリプト
 **************************************************/
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
        window.location.href = '../../works.html';
        return;
    }

    const articleData = getNewsArticleData(articleId);
    if (!articleData) {
        window.location.href = '../../works.html';
        return;
    }

    renderNewsDetail(articleData);
});

function getNewsArticleData(id) {
    return {
        id: id,
        categories: ['カテゴリー名', 'カテゴリー名', 'カテゴリー名'],
        title: `ニュースのタイトル${id}がここに入ります`,
        date: '2024.10.10',
        imageUrl: '../../images/news-image-icon.png',
        content: `ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。ここにニュース本文が入ります。`
    };
}

function renderNewsDetail(article) {
    const detailContainer = document.getElementById('detail-content');
    if (!detailContainer) return;

    detailContainer.innerHTML = `
        <div class="article-detail">
            <div class="detail-article-image">
                <img src="${article.imageUrl}" alt="記事イメージ">
            </div>
            
            <time class="article-date">${article.date}</time>
            
            <h1 class="article-title">${article.title}</h1>

            <div class="category-labels">
                ${article.categories.map(category => `
                    <div class="category-label">#${category}</div>
                `).join('')}
            </div>

            <div class="decorative-lines">
                <span class="line blue-line"></span>
                <span class="line red-line"></span>
            </div>

            <div class="article-content">
                ${article.content.split('\n').map(paragraph => 
                    paragraph.trim() ? `<p>${paragraph.trim()}</p>` : ''
                ).join('')}
            </div>
        </div>
    `;
}