// ▼ カードごとのデータ定義（title, description, detailHtmlなど）
export const solutionCards = {
    '運用型広告': {
      image: 'images/advertising-image.png',
      title: '運用型広告',
      description:
        '運用型広告は、ターゲット層に対して効率的にリーチし、費用対効果を最大化するための重要な施策です。しかし、広告運用の成功には、プラットフォームの特性を理解した戦略設計と、継続的な最適化が不可欠です。当社では、各広告プラットフォームの強みを活かし、戦略立案から運用、効果測定までをトータルでサポートします。',
      // ▼ 運用型広告のみ detailHtml のサンプルを定義
      detailHtml: `
        <div class="solution-detail">
          <!-- 見出し -->
          <h3 class="detail-heading">【運用型広告の特長】</h3>
  
          
          <p class="detail-subtitle">▼精密なターゲティング</p>
          <p class="detail-text">
            性別、年齢、興味関心、行動履歴など、多彩なターゲティング設定を活用し、広告が最適なユーザーに届くよう設計します。
          </p>
  
         
          <p class="detail-subtitle">▼データドリブンな改善</p>
          <p class="detail-text">
            リアルタイムでのデータ分析により、広告配信状況を常にモニタリング。効果の高いクリエイティブや配信条件を見極め、最適化を繰り返します。
          </p>

          <h3 class="detail-heading">【サービス内容】</h3>
  
          
          <p class="detail-subtitle">▼広告戦略の立案</p>
          <p class="detail-text">
            商材や目標に応じて、最適な広告プラットフォームや配信方法を選定。ターゲットに最も響くメッセージとクリエイティブを設計し、具体的な広告プランを策定します。
          </p>
  

          <p class="detail-subtitle">▼クリエイティブ制作と最適化</p>
          <p class="detail-text">
            広告効果を最大化するためのバナー、動画、LPなどのクリエイティブ制作をサポート。テスト運用を通じて、パフォーマンスの高い素材を特定し、改善を繰り返します。
          </p>

          <p class="detail-subtitle">▼配信管理と運用最適化</p>
          <p class="detail-text">
配信スケジュールや予算を細かく管理し、広告が最も効果的に機能する状態を維持します。クリック率、コンバージョン率などのデータをもとに、即時的な運用改善を実施します。          </p>

          <p class="detail-subtitle">▼メディアミックス戦略の提案</p>
          <p class="detail-text">
            運用型広告に加え、他の広告チャネルやマーケティング施策と組み合わせた統合的な戦略を提案します。オフライン施策やSNSコンテンツとの連携により、広告効果をさらに高めます。
          </p>

          <p class="detail-subtitle">▼効果測定とレポート作成</p>
          <p class="detail-text">
           配信結果を定量的に測定し、具体的な成果をレポートにまとめます。成果の背景を分析し、次回以降の施策に活かす改善提案を行います。
          </p>


  
          <!-- 画像 + 白背景ボックスを横並び -->
          <div class="detail-flex">
            <!-- 左側の画像 -->
            <img
              src="images/human_image.png"
              alt="ヒューマンイメージ"
              class="detail-image"
            >
  
            <!-- 右側の白背景コンテナ -->
            <div class="detail-whitebox">
              <p class="detail-whitebox-text">
                当社は、広告運用のプロフェッショナルチームが商材や目標に応じた柔軟なプランを提供します。データ分析に基づいた改善提案や、各プラットフォームの最新トレンドを反映した戦略設計により、運用型広告の成果を最大化します。<br>
                また、クリエイティブ制作やランディングページの最適化も含め、広告主様のゴール達成を包括的にサポートします。              
                運用型広告は、単なる出稿ではなく、継続的な改善と調整が鍵です。当社が提供する高度な運用技術と専門知識を活用し、広告活動での効果最大化に向けて伴走致します。
              </p>
            </div>
           
          </div>
           <p class="detail-subtitle">【対応可能な広告プラットフォーム】</p>
          <p class="detail-text">
▶︎Google広告（リスティング・ディスプレイ・YouTube広告）<br>
▶︎Yahoo!広告（リスティング・DSP）<br>
▶︎SNS広告（Instagram・Facebook・TikTok・TwitterX)）<br>
▶︎その他（LINE広告・SmartNews広告・Amazon広告・楽天広告・Q100広告など）          </p>
        </div>
      `
    },
  
    '成果報酬型広告': {
      image: 'images/performance-advertising-image.png',
      title: '成果報酬型広告',
      description:
        '成果報酬型広告は、広告主様が得たい成果に応じた費用を支払う仕組みを活用し、効率的かつ効果的なマーケティングを実現するサービスです。当社では、運用型広告、検索エンジン、インフルエンサーなど、多種多様な媒体とリンクするアフィリエイトサービスプロバイダーを運営し、広告主様とメディア様の双方にとって最大の成果を引き出します。',
        detailHtml: `
        <div class="solution-detail">
          <!-- 見出し -->
          <h3 class="detail-heading">【成果報酬型広告の特長】</h3>
  
          
          <p class="detail-subtitle">▼多様な媒体への対応</p>
          <p class="detail-text">
            デジタル広告全般をカバーし、ターゲットに応じた最適な媒体や広告枠を選定。SNS、検索エンジン、インフルエンサー施策など、目的に応じた柔軟な広告展開が可能です。
          </p>
  
         
          <p class="detail-subtitle">▼リスクを抑えた成果報酬モデル</p>
          <p class="detail-text">
            広告主様は、コンバージョン、売上などの成果に基づいて費用を支払うため、予算を効率的に活用できます。ROIを重視する企業に最適です。
          </p>

          <p class="detail-subtitle">▼パフォーマンス最大化のサポート</p>
          <p class="detail-text">
            当社の運営するプラットフォームは、成果報酬型広告の特性を活かし、メディア様と広告主様の双方にとって利益を最大化する仕組みを提供します。データ分析と最適化を通じて、高いパフォーマンスを実現します。
          </p>
  

          <p class="detail-subtitle">▼柔軟な目標設定</p>
          <p class="detail-text">
            広告主様の目標や業界に合わせて、成果指標（KPI）をカスタマイズ可能。新規顧客獲得からリテンションまで、多様な目的に対応します。
          </p>

  
          <!-- 画像 + 白背景ボックスを横並び -->
          <div class="detail-flex">
            <!-- 左側の画像 -->
            <img
              src="images/human_image.png"
              alt="ヒューマンイメージ"
              class="detail-image"
            >
  
            <!-- 右側の白背景コンテナ -->
             <div class="detail-whitebox">
              <div style="text-align: center;">
                <p style="color: #333; font-family: 'BIZ UDGothic'; font-size: 16px; font-weight: 700; line-height: 28px; letter-spacing: 1.6px; margin-bottom: 16px;">
                  ▶︎このような課題をお持ちの企業に最適！
                </p>
                
                <p style="color: #333; font-family: 'BIZ UDGothic'; font-size: 12px; font-weight: 700; line-height: 28px; letter-spacing: 1.2px; margin-bottom: 20px;">
                  ・初期投資を抑えて広告効果を試したい<br>
                  ・多様な媒体を活用して広告成果を最大化したい<br>
                  ・ROIを重視した広告運用を行いたい<br>
                  ・新規顧客獲得やコンバージョン率向上を目指したい
                </p>
                
                <p style="color: #333; font-family: 'BIZ UDGothic'; font-size: 14px; font-weight: 700; line-height: 28px; letter-spacing: 1.4px;">
                  成果報酬型広告は、費用対効果を最大化しながら、広告主様とメディア様がWin-Winの関係を築ける広告モデルです。
                </p>
              </div>
            </div>
           
          
      `
    },
  
    'インフルエンサーマーケティング': {
      image: 'images/influencer-marketing-image.png',
      title: 'インフルエンサーマーケティング',
      description:
        'SNSが普及し、多くの消費者がインフルエンサーの発信内容を参考にする現代、インフルエンサーマーケティングは、ブランド認知や販売促進において非常に効果的な施策です。当社では、SNSプラットフォームの特性を活かし、インフルエンサーを通じた広告展開を企画・実施します。戦略的なキャスティングとデータ分析に基づく提案で、最大の成果を引き出します。',
        detailHtml: `
        <div class="solution-detail">
          <!-- 見出し -->
          <h3 class="detail-heading">【インフルエンサーマーケティングの特長】</h3>
  
          
          <p class="detail-subtitle">▼信頼性と共感を活用したブランド発信</p>
          <p class="detail-text">
           インフルエンサーは、フォロワーにとって信頼できる情報源であり、その発信内容は共感を生みやすい特長があります。当社は、ブランドのメッセージを自然に伝えるストーリー設計で、消費者の心を動かす施策を展開します。
          </p>
  
         
          <p class="detail-subtitle">▼プラットフォーム特性を活かした最適化</p>
          <p class="detail-text">
            Instagram、Twitter(X)、TikTok、YouTubeなど、SNSごとに異なるユーザー行動や特性を理解し、最適なプラットフォームとインフルエンサーを組み合わせて、効果的なプロモーションを実現します。
          </p>

          <p class="detail-subtitle">▼広がりを生むバイラル効果の設計</p>
          <p class="detail-text">
            プロモーションの目的に合わせ単発の投稿に終わらせるのではなく、ユーザー間で自然にシェアされ、広がりを生む仕組みの採用も。フォロワー外へのリーチも視野に入れた設計で、プロモーション効果の最大化を図ります。
          </p>

          <h3 class="detail-heading">【サービス内容】</h3>
  
          
          <p class="detail-subtitle">▼インフルエンサーの選定とキャスティング</p>
          <p class="detail-text">
            各プラットフォームの特性と商材に最適なインフルエンサーを選定します。当社のネットワークを活用し、一般にはアプローチが難しいインフルエンサーのキャスティングも実現します。

          </p>
  

          <p class="detail-subtitle">▼プロモーション企画の設計</p>
          <p class="detail-text">
            インフルエンサーが発信する内容の方向性やストーリーを設計し、商材の魅力を最大限に引き出すプロモーションプランを作成します。フォロワーのエンゲージメントを促進する施策も併せて企画します。
          </p>

          <p class="detail-subtitle">▼投稿内容の制作サポート</p>
          <p class="detail-text">
            プロモーション効果を最大化させるために、そのインフルエンサーの良さを潰さない形でインフルエンサーの投稿に使用する画像や動画、テキストの方向性を提案し、投稿内容がプロモーションコンセプトに一致するよう調整します。場合によっては、クリエイティブ制作もサポートします。          </p>

          <p class="detail-subtitle">▼効果測定とデータ分析</p>
          <p class="detail-text">
            投稿のリーチ数やエンゲージメント率、コンバージョンデータを詳細に分析し、プロモーションの効果を可視化します。次の施策に活かせる具体的な改善提案も行います。
          </p>

          <p class="detail-subtitle">▼インフルエンサーとの関係構築と管理</p>
          <p class="detail-text">
           インフルエンサーとの契約管理やコミュニケーションを代行し、円滑なプロモーション進行をサポートします。インフルエンサーとの長期的な関係構築も視野に入れた運営を行います。
          </p>

          <p class="detail-subtitle">▼成果を最大化するアプローチ</p>
          <p class="detail-text">
           当社は、インフルエンサーマーケティングにおける膨大な実績データを基に、「成功するプロモーション」のパターンを明確化しています。これにより、クライアント企業ごとの商材や目標に最適なプランを提供します。また、SNS広告やバイラルプロモーションとの連携を図り、統合的なマーケティング戦略を実現します。
          </p>


  
          <!-- 画像 + 白背景ボックスを横並び -->
          <div class="detail-flex">
            <!-- 左側の画像 -->
            <img
              src="images/human_image.png"
              alt="ヒューマンイメージ"
              class="detail-image"
            >
  
            <!-- 右側の白背景コンテナ -->
            <div class="detail-whitebox">
              <p class="marketing-detail-whitebox-text">
                インフルエンサーマーケティングは、単なる広告ではなく、ブランドと消費者を感情的に結びつける重要な施策です。当社の専門チームが、貴社のブランド価値を最大限に引き出し、期待を超える成果を提供します。
              </p>
            </div>
           
          </div>
      `
    },
  
    'バイラルプロモーション': {
      image: 'images/viral-promotion-image.png',
      title: 'バイラルプロモーション',
      description:
        '近年、SNSが普及する中で、情報の拡散力を活かした「バイラルプロモーション」は、多くの企業にとって欠かせないマーケティング手法となっています。当社では、SNSやデジタルメディアを活用し、ターゲット層に自然な形でメッセージを広げ、ブランド認知や販売促進を飛躍的に向上させる施策を企画・実施します。',
        detailHtml: `
        <div class="solution-detail">
          <!-- 見出し -->
          <h3 class="detail-heading">【バイラルプロモーションの特長】</h3>
  
          
          <p class="detail-subtitle">▼ターゲットの共感を引き出すストーリー設計</p>
          <p class="detail-text">
           バイラルを成功させる鍵は「共感」を生むコンテンツ。当社では、ターゲット層の感情や関心に寄り添い、ユーザーが思わず反応したくなるエンゲージメントを高めるクリエイティブやメッセージを設計します。
          </p>
  
         
          <p class="detail-subtitle">▼多様なSNSの特性を活用</p>
          <p class="detail-text">
            情報が自然に流通するロジックを持つSNS（例：TikTok、Twitter(X)など）を活用し、従来のフォロワー依存型ではない広がりを目指します。また、InstagramやYouTubeなど、コンテンツ重視のSNSでも効果的な拡散施策を展開します。
          </p>

          <p class="detail-subtitle">▼インフルエンサーマーケティングとの連携</p>
          <p class="detail-text">
            SNSで影響力を持つインフルエンサーを活用し、ターゲット層へのリーチを加速。ブランドのメッセージを自然な形で伝えることで、さらなるバイラル効果を生み出します。
          </p>

          <h3 class="detail-heading">【サービス内容】</h3>
  
          
          <p class="detail-subtitle">▼バイラルコンテンツ企画</p>
          <p class="detail-text">
            ユーザーのエンゲージメントを獲得できる可能性が高いアイデアやストーリーを設計し、コンテンツを制作します。動画や画像、テキスト投稿など、SNSごとに最適化された形式で提供します。

          </p>
  

          <p class="detail-subtitle">▼SNSキャンペーン設計・実施</p>
          <p class="detail-text">
            キャンペーンの目的に応じた企画立案から運用までをサポートします。ハッシュタグ施策やチャレンジ企画、プレゼントキャンペーンなども場合によって併用し、ユーザーの参加意欲を引き出す仕掛けなども構築します。
          </p>

          <p class="detail-subtitle">▼データ分析と改善提案</p>
          <p class="detail-text">
            プロモーションの拡散状況やエンゲージメントデータを詳細に分析し、キャンペーン終了後も次の施策に活かせる改善案を提供します。</p>

          <p class="detail-subtitle">▼広告運用との統合</p>
          <p class="detail-text">
            バイラルプロモーションを運用型広告と組み合わせることで、SNS内での拡散効果を最大化。オーガニックとペイドの両面で成果を追求します。
          </p>

          <p class="detail-subtitle">▼成果を最大化するためのアプローチ</p>
          <p class="detail-text">
           インフルエンサーとの契約管理やコミュニケーションを代行し、円滑なプロモーション進行をサポートします。インフルエンサーとの長期的な関係構築も視野に入れた運営を行います。
          </p>


  
          <!-- 画像 + 白背景ボックスを横並び -->
          <div class="detail-flex">
            <!-- 左側の画像 -->
            <img
              src="images/human_image.png"
              alt="ヒューマンイメージ"
              class="detail-image"
            >
  
            <!-- 右側の白背景コンテナ -->
            <div class="detail-whitebox">
              <p class="marketing-detail-whitebox-text">
                バイラルプロモーションは、単なる広告以上に顧客との感情的なつながりを構築し、持続的なブランド価値を創出します。当社の専門チームが、貴社のプロモーション活動を次のレベルへと引き上げます。
              </p>
            </div>
           
          </div>
      `
    },
  
    'SNSメディア運用代行': {
      image: 'images/sns-management-image.png',
      title: 'SNSメディア運用代行',
      description:
        'SNSが企業のマーケティング活動において重要な役割を担う中、効果的な運用を行うには、各プラットフォームの特性を理解し、戦略的なコンテンツ発信が欠かせません。当社では、企業のブランドイメージやターゲットに合わせたSNS運用をトータルで代行し、エンゲージメントの向上と成果創出を実現します。',
        detailHtml: `
        <div class="solution-detail">
          <!-- 見出し -->
          <h3 class="detail-heading">【SNSメディア運用代行の特長】</h3>
  
          
          <p class="detail-subtitle">▼プラットフォーム戦略設計</p>
          <p class="detail-text">
           Instagram、Twitter(X)、TikTok、LINEなど、各プラットフォームの特性に応じた運用方針を策定します。ターゲット層や競合分析を踏まえ、最適なプラットフォームを選定し、企業のSNS施策を成功に導きます。
          </p>
  
         
          <p class="detail-subtitle">▼コンテンツ企画・制作</p>
          <p class="detail-text">
            SNSで注目を集めるためのクリエイティブなコンテンツを企画・制作します。画像や動画、テキスト投稿に加え、トレンドに合わせたキャンペーンなどの戦略も提案し、フォロワーの関心を引き付けます。
          </p>

          <p class="detail-subtitle">▼運用代行</p>
          <p class="detail-text">
            投稿スケジュールの管理、コメントやメッセージへの対応、ファンコミュニティの活性化を含む日々のSNS運用を代行。企業の代わりに一貫性のあるブランディングを実施します。
          </p>
          
          <p class="detail-subtitle">▼データ分析と改善提案</p>
          <p class="detail-text">
            投稿パフォーマンスやフォロワーの反応を定期的に分析し、次のアクションにつながる改善提案を実施。効果的なPDCAサイクルを回し、継続的な成長を支援します。

          </p>
  

          <p class="detail-subtitle">▼広告運用との連携</p>
          <p class="detail-text">
            SNS内での広告運用と連動した施策を提案し、オーガニック投稿と広告施策を統合的に活用することで、さらなる成果を目指します。
          </p>

  
          <!-- 画像 + 白背景ボックスを横並び -->
          <div class="detail-flex">
            <!-- 左側の画像 -->
            <img
              src="images/human_image.png"
              alt="ヒューマンイメージ"
              class="detail-image"
            >
  
            <!-- 右側の白背景コンテナ -->
            <div class="sns-detail-whitebox">
              <p class="sns-detail-whitebox-text">
                当社は、各プラットフォームの特性を活かした戦略設計から、クリエイティブ制作、運用、分析までをワンストップで提供します。さらに、独自のデータ分析に基づいた改善提案を通じて、SNS運用のパフォーマンスを最大化します。また、SNS運用だけでなく、広告運用やインフルエンサー活用とのシナジーを生み出し、包括的なデジタルマーケティング支援を行います。
              </p>
            </div>
           
          </div>
           <p class="detail-subtitle">【対応可能な広告プラットフォーム】</p>
          <p class="detail-text">
Instagram / Twitter(X) / TikTok / LINE         </p>
      `
    
    }
  };