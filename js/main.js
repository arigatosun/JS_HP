document.addEventListener('DOMContentLoaded', function() {
    // パス調整用のヘルパー関数
    function adjustPath(basePath) {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/sections/examples/')) {
            return '../../' + basePath;
        } else if (currentPath.includes('/sections/')) {
            return '../' + basePath;
        }
        return basePath;
    }

    // ヘッダーリンクを調整する関数
    function adjustHeaderLinks() {
        const headerLinks = document.querySelectorAll('.header-nav a');
        headerLinks.forEach(link => {
            let href = link.getAttribute('href');
            if (!href.startsWith('http') && !href.startsWith('//')) {
                if (href.startsWith('/')) {
                    href = href.substring(1);
                }
                link.setAttribute('href', adjustPath(href));
            }
        });
    }

    async function loadSection(sectionName, basePath = 'sections/top/') {
        try {
            const response = await fetch(`${basePath}${sectionName}.html`);
            const html = await response.text();
            
            // 現在のパスに基づいてコンテンツを調整
            let adjustedHtml = html;
            
            // コラム詳細ページの場合のパス調整
            if (window.location.pathname.includes('column-detail.html')) {
                // ロゴ画像のパスを調整
                adjustedHtml = adjustedHtml.replace(/src="images\//g, 'src="../../images/');
                adjustedHtml = adjustedHtml.replace(/href="(?!http|\/\/|#)([^"]*)"/g, (match, p1) => {
                    return `href="../../${p1}"`;
                });
            } else {
                // 既存のパス調整ロジック
                adjustedHtml = adjustedHtml.replace(/src="images\//g, `src="${adjustPath('images/')}`);
                adjustedHtml = adjustedHtml.replace(/href="(?!http|\/\/|#)([^"]*)"/g, (match, p1) => {
                    return `href="${adjustPath(p1)}"`;
                });
            }
            
            document.getElementById(`${sectionName}-section`).innerHTML = adjustedHtml;
            
            // ヘッダーセクションの場合、追加の調整を行う
            if (sectionName === 'header') {
                adjustHeaderLinks();
            }
        } catch (error) {
            console.error(`Error loading ${sectionName} section:`, error);
        }
    }

    function initializeRellax() {
        console.log('Initializing Rellax...');
        
        try {
            const columnRellaxElements = document.querySelectorAll('.column-section .rellax');
            console.log('Column Rellax elements found:', columnRellaxElements.length);
    
            const rellax = new Rellax('.rellax', {
                center: true,
                wrapper: null,
                round: true,
                vertical: true,
                horizontal: false,
                speed: -2,
                callback: function(positions) {
                    console.log('Rellax positions:', positions);
                }
            });
            
            console.log('Rellax initialized successfully');
    
            window.addEventListener('resize', () => {
                if (rellax) {
                    rellax.refresh();
                }
            });
    
            window.addEventListener('scroll', () => {
                const rellaxElements = document.querySelectorAll('.rellax');
                console.log('Active Rellax elements:', rellaxElements.length);
            });
            
        } catch (error) {
            console.error('Error initializing Rellax:', error);
        }
    }

    function initializeBusinessDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedArea = urlParams.get('area');
    
        if (selectedArea) {
            const allDetails = document.querySelectorAll('.detail-content');
            allDetails.forEach(detail => detail.classList.remove('active'));
    
            const selectedDetail = document.querySelector(`.detail-content[data-area="${selectedArea}"]`);
            if (selectedDetail) {
                selectedDetail.classList.add('active');
                updatePageTitle(selectedArea);
            }
        }
    }

    function updatePageTitle(area) {
        const titleMap = {
            'digital': 'デジタルマーケティング領域',
            'strategy': '戦略支援領域',
            'technology': 'テクノロジー領域',
            'maker': 'メーカー領域',
            'creative': 'クリエイティブ領域',
            'hr': '人材領域',
            'ec': 'EC支援領域'
        };

        const pageTitle = document.querySelector('.main-title');
        if (pageTitle && titleMap[area]) {
            pageTitle.textContent = titleMap[area];
        }
    }

    // ページタイプを判定
    // ページタイプを判定する部分を修正
const isBusinessPage = document.querySelector('.business-main') !== null;
const isExampleDetailPage = document.querySelector('.examples-main') !== null && 
                           window.location.pathname.includes('example-detail.html');
const isColumnDetailPage = document.querySelector('.column-main') !== null && 
                          window.location.pathname.includes('column-detail.html');

if (isColumnDetailPage) {
    // コラム詳細ページの場合の処理
    Promise.all([
        loadSection('header', '../../sections/top/'),
        loadSection('footer', '../../sections/top/')
    ]).then(() => {
        initializeHamburgerMenu();
        initializeFooterToggle();
    });
} else if (isExampleDetailPage) {
    // 詳細ページの場合の処理
    loadSection('header', adjustPath('sections/top/'));
    loadSection('footer', adjustPath('sections/top/')).then(() => {
        initializeHamburgerMenu();
        initializeFooterToggle();
        initializeExampleDetail();
    });
} else if (isBusinessPage) {
        // 事業領域ページの場合の処理
        Promise.all([
            loadSection('header'),
            loadSection('footer'),
            loadSection('business-details', adjustPath('sections/business/')),
            loadSection('business-other-areas', adjustPath('sections/business/')),
            loadSection('business-works', adjustPath('sections/business/'))
        ]).then(() => {
            initializeHamburgerMenu();
            initializeFooterToggle();
            initializeBusinessDetails();
        });
    } else {
        // トップページとその他のページの処理
        Promise.all([
            loadSection('hero'),
            loadSection('business'),
            loadSection('service'),
            loadSection('examples'),
            loadSection('column')
        ]).then(() => {
            requestAnimationFrame(() => {
                initializeRellax();
            });
        });
        
        loadSection('header').then(() => {
            initializeHamburgerMenu();
        });
        
        loadSection('column').then(() => {
            initializeColumnScroll();
            initializeCustomScrollbar();
        });
        
        loadSection('information');
        
        loadSection('footer').then(() => {
            initializeFooterToggle();
        });
    }

    // 残りの関数は変更なし
    function initializeHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('.header-nav');
        const body = document.body;

        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);

        function toggleMenu() {
            hamburgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = (body.style.overflow === 'hidden' ? '' : 'hidden');
        }

        hamburgerBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        const menuLinks = nav.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburgerBtn.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 767 && hamburgerBtn.classList.contains('active')) {
                    toggleMenu();
                }
            }, 200);
        });
    }

    // ▼ コラムセクションの横スクロールを制御する関数
    function initializeColumnScroll() {
        const columnCards = document.querySelector('.column-cards');
        if (!columnCards) return;

        // --- (A) マウスホイールで横スクロール ---
        columnCards.addEventListener('wheel', function(e) {
            if (e.deltaY === 0) return;

            const scrollLeft = columnCards.scrollLeft;
            const maxScrollLeft = columnCards.scrollWidth - columnCards.clientWidth;
            const atStart = (scrollLeft <= 0 && e.deltaY < 0);
            const atEnd = (scrollLeft >= maxScrollLeft && e.deltaY > 0);

            if (atStart || atEnd) {
                return;
            }

            e.preventDefault();
            columnCards.scrollLeft += e.deltaY;
        }, { passive: false });

        // --- (B) ドラッグ操作で横スクロール ---
        let isDragging = false;
        let startX = 0;
        let scrollLeftStart = 0;

        columnCards.style.cursor = 'grab';

        columnCards.addEventListener('mousedown', (e) => {
            isDragging = true;
            columnCards.style.cursor = 'grabbing';
            startX = e.pageX - columnCards.offsetLeft;
            scrollLeftStart = columnCards.scrollLeft;
            e.preventDefault();
        });

        const endDrag = () => {
            isDragging = false;
            columnCards.style.cursor = 'grab';
        };

        columnCards.addEventListener('mouseleave', endDrag);
        columnCards.addEventListener('mouseup', endDrag);

        columnCards.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - columnCards.offsetLeft;
            const walk = (x - startX) * 2;
            columnCards.scrollLeft = scrollLeftStart - walk;
        });
    }

    // ▼ カスタムスクロールバーを制御する関数
    function initializeCustomScrollbar() {
        const columnCards = document.querySelector('.column-cards');
        const track = document.querySelector('.custom-scrollbar-track');
        const handle = document.querySelector('.custom-scrollbar-handle');
        if (!columnCards || !track || !handle) return;

        let trackWidth = 0;
        let handleWidth = 0;
        let maxScrollLeft = 0;

        function updateHandle() {
            const scrollWidth = columnCards.scrollWidth;
            const clientWidth = columnCards.clientWidth;

            if (window.innerWidth < 768) {
                return;
            }

            if (scrollWidth <= clientWidth) {
                handleWidth = trackWidth; 
                handle.style.width = handleWidth + 'px';
                handle.style.left = '0px';
                return;
            }

            const ratio = clientWidth / scrollWidth;
            handleWidth = trackWidth * ratio;
            handle.style.width = handleWidth + 'px';

            maxScrollLeft = scrollWidth - clientWidth;
            const currentLeft = columnCards.scrollLeft;
            const posRatio = currentLeft / maxScrollLeft;
            const maxHandleLeft = trackWidth - handleWidth;
            handle.style.left = (maxHandleLeft * posRatio) + 'px';
        }

        let isDraggingHandle = false;
        let dragStartX = 0;
        let startLeft = 0;

        handle.addEventListener('mousedown', (e) => {
            if (window.innerWidth < 768) return;

            isDraggingHandle = true;
            handle.style.cursor = 'grabbing';
            dragStartX = e.clientX;
            startLeft = parseFloat(window.getComputedStyle(handle).left) || 0;
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDraggingHandle) return;
            e.preventDefault();

            const deltaX = e.clientX - dragStartX;
            let newLeft = startLeft + deltaX;

            const maxHandleLeft = trackWidth - handleWidth;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxHandleLeft) newLeft = maxHandleLeft;

            handle.style.left = newLeft + 'px';

            const posRatio = newLeft / maxHandleLeft;
            columnCards.scrollLeft = maxScrollLeft * posRatio;
        });

        window.addEventListener('mouseup', () => {
            if (isDraggingHandle) {
                isDraggingHandle = false;
                handle.style.cursor = 'grab';
            }
        });

        columnCards.addEventListener('scroll', updateHandle);

        window.addEventListener('resize', onResize);

        function onResize() {
            if (window.innerWidth >= 768) {
                trackWidth = track.getBoundingClientRect().width;
            } else {
                trackWidth = 0;
            }
            updateHandle();
        }

        onResize();
    }

     // 実績実例詳細ページの初期化関数
     function initializeExampleDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        if (!articleId) {
            // IDが無い場合は一覧ページにリダイレクト
            window.location.href = '../../examples.html';
            return;
        }

        // 記事データを取得して表示する処理
        loadExampleDetail(articleId);
    }

    // 記事詳細を読み込む関数
    async function loadExampleDetail(id) {
        try {
            // ここで記事データを取得する処理を実装
            const articleData = await getArticleData(id);
            if (!articleData) {
                window.location.href = '../../examples.html';
                return;
            }
            renderArticleDetail(articleData);
        } catch (error) {
            console.error('Error loading article detail:', error);
            window.location.href = '../../examples.html';
        }
    }

    // 記事データを取得する関数（仮実装）
    async function getArticleData(id) {
        // この部分は後で実際のデータ取得方法に応じて実装
        return {
            id: id,
            tag: 'タグ項目・タグ項目',
            title: `タイトル${id}がここに入ります。`,
            supportCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー'],
            serviceCategories: ['カテゴリー', 'カテゴリー', 'カテゴリー']
        };
    }

    // 記事詳細を描画する関数（仮実装）
    function renderArticleDetail(article) {
        const mainContent = document.querySelector('.example-detail-main');
        if (!mainContent) return;

        // ここで詳細ページのコンテンツを描画
        // 実際のデザインに応じて実装
        mainContent.innerHTML = `
            <div class="detail-container">
                <h1>${article.title}</h1>
                <div class="article-tag">${article.tag}</div>
                <!-- 他の記事詳細情報を表示 -->
            </div>
        `;
    }
});