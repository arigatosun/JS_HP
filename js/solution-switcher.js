// solution-switcher.js

/**************************************************************
 * 「ソリューションカード」および「詳細情報（detailHtml）」を管理
 * カードをクリックしたときに内容を切り替える機能
 **************************************************************/

import { solutionCards } from './solution-cards-data.js';
  
// 二重初期化を防ぐためのフラグ
let isSolutionSwitcherInitialized = false;

function initializeSolutionSwitcher() {
  if (isSolutionSwitcherInitialized) return;

  // ラベルやカードを取得
  const serviceLabels = document.querySelectorAll('.service-labels .service-label');
  const solutionLabels = document.querySelectorAll('.solution-labels .solution-label');
  const solutionCard = document.querySelector('.solution-card');

  if (!serviceLabels.length || !solutionLabels.length || !solutionCard) {
    console.log('Required elements not found, retrying in 100ms...');
    setTimeout(initializeSolutionSwitcher, 100);
    return;
  }

  isSolutionSwitcherInitialized = true;

  // ▼ カードを更新する関数
  function updateSolutionCard(labelText) {
    const trimmedLabel = labelText.trim();
    const cardData = solutionCards[trimmedLabel];
    if (!cardData) return;

    // フェードアウト
    solutionCard.classList.add('fade-out');
    setTimeout(() => {
      // カード内容を差し替え
      let cardHtml = `
        <img src="${cardData.image}" alt="${cardData.title}">
        <div class="solution-card-title">
          <span class="highlight">■</span><span class="normal">${cardData.title}</span>
        </div>
        <p class="solution-card-description">${cardData.description}</p>
        <div class="solution-card-button-wrapper">
          <button class="solution-card-button">▼詳細をひらく▼</button>
        </div>
      `;

      solutionCard.innerHTML = cardHtml;

      if (cardData.detailHtml) {
        const detailWrapper = document.createElement('div');
        detailWrapper.classList.add('solution-card-detail');
        detailWrapper.style.display = 'none';
        detailWrapper.innerHTML = cardData.detailHtml;
        solutionCard.appendChild(detailWrapper);
      }

      // フェードイン
      requestAnimationFrame(() => {
        solutionCard.classList.remove('fade-out');
        solutionCard.classList.add('fade-in');
      });

      // 詳細開閉ボタン
      const detailButton = solutionCard.querySelector('.solution-card-button');
      if (detailButton) {
        detailButton.addEventListener('click', () => {
          const detailSection = solutionCard.querySelector('.solution-card-detail');
          if (!detailSection) return;
          if (detailSection.style.display === 'none') {
            detailSection.style.display = 'block';
            detailButton.textContent = '▲詳細をとじる▲';
          } else {
            detailSection.style.display = 'none';
            detailButton.textContent = '▼詳細をひらく▼';
          }
        });
      }
    }, 300);
  }

  // ▼ アクティブラベル更新関数
  function updateActiveLabel(labels, activeLabelText) {
    labels.forEach((label) => {
      label.classList.remove('active');
      if (label.textContent.trim() === activeLabelText.trim()) {
        label.classList.add('active');
      }
    });
  }

  // ▼ ラベルをクリックしたときの処理
  function setupLabelClickEvents(label, labels, otherLabels) {
    label.addEventListener('click', () => {
      const labelText = label.textContent.trim();
      updateSolutionCard(labelText);
      updateActiveLabel(labels, labelText);
      updateActiveLabel(otherLabels, labelText);

      // クリックされたラベルのインデックスを currentLabelIndex に反映
      currentLabelIndex = Array.from(labels).indexOf(label);
    });
  }

  // ラベルのクリックイベント設定
  serviceLabels.forEach((label) => {
    setupLabelClickEvents(label, serviceLabels, solutionLabels);
  });
  solutionLabels.forEach((label) => {
    setupLabelClickEvents(label, solutionLabels, serviceLabels);
  });

  // 初期表示：最初のラベルをアクティブに
  let currentLabelIndex = 0;
  if (serviceLabels[0]) {
    const firstLabelText = serviceLabels[0].textContent.trim();
    updateSolutionCard(firstLabelText);
    updateActiveLabel(serviceLabels, firstLabelText);
    updateActiveLabel(solutionLabels, firstLabelText);
  }

  /**************************************************************
   * ▼ ホイールでラベルを順送り／逆送りする機能 (スローダウン対応)
   **************************************************************/
  const labelArray = Array.from(serviceLabels);
  const labelCount = labelArray.length;

  const solutionSection = document.querySelector('.solution-section') ||
    document.querySelector('#business-details-section');

  // ホイールの累積量と閾値を設定
  let wheelDeltaSum = 0;
  const WHEEL_THRESHOLD = 150; // ← この数値を大きくすると、切り替えがよりゆっくりになります

  if (solutionSection) {
    solutionSection.addEventListener(
      'wheel',
      (e) => {
        // 1) 先頭・末尾のラベルで逆方向にスクロールされた場合はページ本来のスクロールを許可
        if (
          (currentLabelIndex === 0 && e.deltaY < 0) ||
          (currentLabelIndex === labelCount - 1 && e.deltaY > 0)
        ) {
          return; // preventDefaultしない
        }

        // 2) それ以外ならソリューションセクションのスクロールを止めて切り替え
        e.preventDefault();
        wheelDeltaSum += e.deltaY;

        // 閾値を越えたら次／前のラベルへ切り替え
        if (wheelDeltaSum > WHEEL_THRESHOLD) {
          // 下スクロール（次のラベルへ）
          if (currentLabelIndex < labelCount - 1) {
            currentLabelIndex++;
            const newLabelText = labelArray[currentLabelIndex].textContent.trim();
            updateSolutionCard(newLabelText);
            updateActiveLabel(labelArray, newLabelText);
            updateActiveLabel(solutionLabels, newLabelText);
          }
          // リセット
          wheelDeltaSum = 0;
        } else if (wheelDeltaSum < -WHEEL_THRESHOLD) {
          // 上スクロール（前のラベルへ）
          if (currentLabelIndex > 0) {
            currentLabelIndex--;
            const newLabelText = labelArray[currentLabelIndex].textContent.trim();
            updateSolutionCard(newLabelText);
            updateActiveLabel(labelArray, newLabelText);
            updateActiveLabel(solutionLabels, newLabelText);
          }
          // リセット
          wheelDeltaSum = 0;
        }
      },
      { passive: false }
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const businessDetailsSection = document.getElementById('business-details-section');
  if (businessDetailsSection) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          initializeSolutionSwitcher();
        }
      });
    });
    observer.observe(businessDetailsSection, { childList: true, subtree: true });
  }

  initializeSolutionSwitcher();
});