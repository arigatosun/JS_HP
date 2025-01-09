document.addEventListener('DOMContentLoaded', function() {
    // ▼ セクションを読み込む関数（既存コード）
    async function loadSection(sectionName) {
        try {
            const response = await fetch(`sections/top/${sectionName}.html`);
            const html = await response.text();
            document.getElementById(`${sectionName}-section`).innerHTML = html;
        } catch (error) {
            console.error(`Error loading ${sectionName} section:`, error);
        }
    }

    // ▼ 各セクションを読み込み（上から順に読み込むように配置） -- 既存コード
    loadSection('hero');
    loadSection('header').then(() => {
        initializeHamburgerMenu();  // ヘッダー読み込み後にハンバーガーメニューを初期化
    });
    loadSection('business');
    loadSection('service');
    loadSection('examples');

    // ▼ コラムセクション読み込み後にスクロール関連の制御を初期化
    loadSection('column').then(() => {
        initializeColumnScroll();       // 横スクロール(ホイール/ドラッグ)の制御
        initializeCustomScrollbar();    // カスタムスクロールバーの制御
    });

    // ▼ 追加で読み込んでいるセクションがあるならそのまま
    loadSection('information');
     // ▼ フッターを読み込み後にフッターの開閉メニューを初期化
     loadSection('footer').then(() => {
        initializeFooterToggle();
    });
    // ▼ ハンバーガーメニューの制御を追加 -- 既存コード
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
        if (!columnCards) return; // まだDOMに無い場合は何もしない

        // --- (A) マウスホイールで横スクロール ---
        columnCards.addEventListener('wheel', function(e) {
            // 方向量を取得 (deltaYが0なら処理しない)
            if (e.deltaY === 0) return;

            const scrollLeft = columnCards.scrollLeft;
            const maxScrollLeft = columnCards.scrollWidth - columnCards.clientWidth;
            const atStart = (scrollLeft <= 0 && e.deltaY < 0);
            const atEnd = (scrollLeft >= maxScrollLeft && e.deltaY > 0);

            // 先頭 or 末尾であれば通常の縦スクロールを有効にする
            if (atStart || atEnd) {
                return;
            }

            // それ以外の場合は横スクロールを行う
            e.preventDefault();
            columnCards.scrollLeft += e.deltaY;
        }, { passive: false });

        // --- (B) ドラッグ操作で横スクロール ---
        let isDragging = false;
        let startX = 0;         // マウス押し始めた位置
        let scrollLeftStart = 0; // 押し始めたときの scrollLeft

        // カーソルを「grab」にする
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
            const walk = (x - startX) * 2; // ドラッグ距離×係数
            columnCards.scrollLeft = scrollLeftStart - walk;
        });
    }

    // ▼ カスタムスクロールバーを制御する関数
    function initializeCustomScrollbar() {
        const columnCards = document.querySelector('.column-cards');
        const track = document.querySelector('.custom-scrollbar-track');
        const handle = document.querySelector('.custom-scrollbar-handle');
        if (!columnCards || !track || !handle) return;

        let trackWidth = 0;    // トラックの幅
        let handleWidth = 0;   // ハンドルの幅
        let maxScrollLeft = 0; // columnCardsの最大スクロール量

        // (1) スクロールやリサイズのたびにハンドルを更新
        function updateHandle() {
            const scrollWidth = columnCards.scrollWidth;
            const clientWidth = columnCards.clientWidth;

            // trackWidth は画面サイズに応じて変化するため計算が必要
            // ただし 768px 未満で display: none の場合は 0 になる
            if (window.innerWidth < 768) {
                // 非表示なのでとりあえず何もしない
                return;
            }

            // スクロール可能領域がない場合
            if (scrollWidth <= clientWidth) {
                handleWidth = trackWidth; 
                handle.style.width = handleWidth + 'px';
                handle.style.left = '0px';
                return;
            }

            // ハンドル幅を計算
            const ratio = clientWidth / scrollWidth; // 表示領域/全体幅
            handleWidth = trackWidth * ratio;
            handle.style.width = handleWidth + 'px';

            // ハンドル位置を更新
            maxScrollLeft = scrollWidth - clientWidth;
            const currentLeft = columnCards.scrollLeft;
            const posRatio = currentLeft / maxScrollLeft;
            const maxHandleLeft = trackWidth - handleWidth;
            handle.style.left = (maxHandleLeft * posRatio) + 'px';
        }

        // (2) track, handle のドラッグ操作
        let isDraggingHandle = false;
        let dragStartX = 0;  // ハンドル掴んだマウス位置
        let startLeft = 0;   // ハンドルの left 初期値

        // ハンドルをマウスダウン → ドラッグ開始
        handle.addEventListener('mousedown', (e) => {
            if (window.innerWidth < 768) return; // 小さい画面ではバー非表示なのでドラッグ不要

            isDraggingHandle = true;
            handle.style.cursor = 'grabbing';
            dragStartX = e.clientX;
            startLeft = parseFloat(window.getComputedStyle(handle).left) || 0;
            e.preventDefault();
        });

        // マウス移動
        window.addEventListener('mousemove', (e) => {
            if (!isDraggingHandle) return;
            e.preventDefault();

            const deltaX = e.clientX - dragStartX;
            let newLeft = startLeft + deltaX;

            // はみ出し防止
            const maxHandleLeft = trackWidth - handleWidth;
            if (newLeft < 0) newLeft = 0;
            if (newLeft > maxHandleLeft) newLeft = maxHandleLeft;

            // ハンドルの位置を更新
            handle.style.left = newLeft + 'px';

            // ハンドル位置に応じて columnCards のスクロール位置も更新
            const posRatio = newLeft / maxHandleLeft;
            columnCards.scrollLeft = maxScrollLeft * posRatio;
        });

        // マウスアップでドラッグ終了
        window.addEventListener('mouseup', () => {
            if (isDraggingHandle) {
                isDraggingHandle = false;
                handle.style.cursor = 'grab';
            }
        });

        // (3) columnCards のスクロールイベントでハンドル更新
        columnCards.addEventListener('scroll', updateHandle);

        // (4) リサイズ時にトラック幅を再取得してハンドル更新
        window.addEventListener('resize', onResize);

        function onResize() {
            if (window.innerWidth >= 768) {
                // トラックの実際の幅を再取得
                trackWidth = track.getBoundingClientRect().width;
            } else {
                trackWidth = 0; // 非表示扱い
            }
            updateHandle();
        }

        // 初期化
        onResize();
    }
    
});
