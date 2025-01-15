document.addEventListener('DOMContentLoaded', function() {
    // ▼ セクションを読み込む関数を修正（パスを指定可能に）
    async function loadSection(sectionName, basePath = 'sections/top/') {
        try {
            const response = await fetch(`${basePath}${sectionName}.html`);
            const html = await response.text();
            document.getElementById(`${sectionName}-section`).innerHTML = html;
        } catch (error) {
            console.error(`Error loading ${sectionName} section:`, error);
        }
    }

    // Rellaxの初期化
    function initializeRellax() {
        console.log('Initializing Rellax...');
        
        try {
            // コラムセクションのRellax要素を確認
            const columnRellaxElements = document.querySelectorAll('.column-section .rellax');
            console.log('Column Rellax elements found:', columnRellaxElements.length);
    
            // Rellaxインスタンスを作成
            const rellax = new Rellax('.rellax', {
                center: true,  // センターベースの視差効果に変更
                wrapper: null, // デフォルトのラッパーを使用
                round: true,
                vertical: true,
                horizontal: false,
                speed: -2,
                // セクションごとに異なる速度を設定
                callback: function(positions) {
                    // デバッグ用
                    console.log('Rellax positions:', positions);
                }
            });
            
            console.log('Rellax initialized successfully');
    
            // リサイズ時にRellaxを更新
            window.addEventListener('resize', () => {
                if (rellax) {
                    rellax.refresh();
                }
            });
    
            // スクロール時のデバッグ情報
            window.addEventListener('scroll', () => {
                const rellaxElements = document.querySelectorAll('.rellax');
                console.log('Active Rellax elements:', rellaxElements.length);
            });
            
        } catch (error) {
            console.error('Error initializing Rellax:', error);
        }
    }

    // ▼ 事業領域詳細の初期化処理を追加
    function initializeBusinessDetails() {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedArea = urlParams.get('area');
    
        if (selectedArea) {
            // すべての領域を非表示
            const allDetails = document.querySelectorAll('.detail-content');
            allDetails.forEach(detail => detail.classList.remove('active'));
    
            // 選択された領域を表示
            const selectedDetail = document.querySelector(`.detail-content[data-area="${selectedArea}"]`);
            if (selectedDetail) {
                selectedDetail.classList.add('active');
                updatePageTitle(selectedArea);
            }
        }
    }

    // ▼ ページタイトル更新処理
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

    // ページタイプを判定（事業領域ページかどうか）
    const isBusinessPage = document.querySelector('.business-main') !== null;

    if (isBusinessPage) {
        // 事業領域ページの場合の処理
        Promise.all([
            loadSection('header'),
            loadSection('footer'),
            loadSection('business-details', 'sections/business/'),
            loadSection('business-other-areas', 'sections/business/'),
            loadSection('business-works', 'sections/business/') // 新しいセクションを追加
        ]).then(() => {
            initializeHamburgerMenu();
            initializeFooterToggle();
            initializeBusinessDetails();
        });
    } else {
        // トップページの場合の処理（既存の実装を維持）
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

    // ▼ ハンバーガーメニューの制御
    function initializeHamburgerMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const nav = document.querySelector('.header-nav');
        const body = document.body;

        // オーバーレイ要素を作成
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        body.appendChild(overlay);

        function toggleMenu() {
            hamburgerBtn.classList.toggle('active');
            nav.classList.toggle('active');
            overlay.classList.toggle('active');
            // bodyのoverflowを切り替え（メニュー表示中はスクロール固定）
            body.style.overflow = (body.style.overflow === 'hidden' ? '' : 'hidden');
        }

        hamburgerBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // メニュー内のリンクをクリックした時にメニューを閉じる
        const menuLinks = nav.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburgerBtn.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });

        // ウィンドウリサイズ時の処理（767pxを超えたら自動的に閉じる等）
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
});