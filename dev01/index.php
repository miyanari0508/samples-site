<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
<link rel="preload" href="https://unpkg.com/lenis@1.1.13/dist/lenis.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.13/dist/lenis.css">
</noscript>
<link rel="stylesheet" href="<?php echo h($path_js); ?>/scroll-hint/scroll-hint.css">
</head>
<!-- ____________________//head____________________ -->

<body id="pageTop">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <div id="canvas-container"></div>
    <div id="loading-screen">
      <div class="loading-content" id="loadingContent">
        <span class="line-top f-garamond">ALPHA STATES</span>
        <span class="line-sub f-garamond">FUCHU BIJUTSUKAN DORI</span>
        <div class="line-divider"></div>
        <span class="line-jp f-shippori">アルファステイツ府中美術館通り</span>
      </div>
    </div>


    <div id="smooth-wrapper">
      <div class="stage" id="smooth-content">
        <section class="sense_section sense_section--0" id="sense_section-0">
          <div class="sense_content content">
            <figure class="main-video"><img src="<?php echo h($path_img); ?>/top/scene-img01.jpg" loading="eager" width="1955" height="1393" alt=""></figure>
            <!-- <video class="main-video" autoplay loop muted playsinline>
                <source src="<?php echo h($path_img); ?>/top/video.mp4" type="video/mp4">
              </video> -->
            <p class="main-ttlJp">杜と暮らす。</p>
            <div class="main-ttlEn">SENSE of FOREST</div>
          </div>
        </section>

        <div class="parallax-section parallax-section--1">
          <div class="parallax-img">
            <img src="<?php echo h($path_img); ?>/top/scene-img02.jpg" loading="lazy" width="1955" height="1393" alt="">
            <!-- <video autoplay loop muted playsinline>
              <source src="<?php echo h($path_img); ?>/top/video.mp4" type="video/mp4">
            </video> -->
          </div>
        </div>

        <section class="sense_section sense_section--1" id="sense_section-1">
          <div class="sense_content content">
            <div class="content--left">
              <h2 class="com-ttl">
                潤いの府中と融合する、<br>
                愛着の私邸。
              </h2>
              <div class="sense_btn m_left">
                <a nohref class="com_linkMore">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-01-img02.jpg" loading="lazy" width="621" height="720" alt=""></figure>
            </div>
            <div class="content--right">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-01-img01.jpg" loading="lazy" width="1185" height="805" alt=""></figure>
              <div class="design m_fade">
                <div class="design_profile">
                  <div class="design_heading">
                    <h2 class="ttl f-garamond">DESIGN</h2>
                    <p class="sub f-garamond">デザイン監修</p>
                  </div>
                  <div class="design_person">
                    <p class="design_company f-garamond">古谷デザイン建築設計事務所<br>建築デザイナー</p>
                    <h3 class="design_nameJp f-garamond">郎太 中府</h3>
                    <span class="design_nameEn f-garamond">FUCHU TARO</span>
                  </div>
                </div>
                <figure class="design_photo"><img src="<?php echo h($path_img); ?>/top/scene-01-img03.jpg" loading="lazy" width="201" height="198" alt=""></figure>
                <p class="design_desc"> 2001年東京、大阪とマドリードを拠点に建築デザイナーがコラボレートする組織、インターデザインを設立。日本と欧州を往復する生活の中で、ヨーロッパ建築や文化様式をモチーフにした建築空間を創作し続ける一方、空間を通じて、そこに住まう人々の意識のあり方、ライフスタイルを提案し続ける。現在も多数の分譲マンション等のデザイン、企画など幅広い監修をおこなう</p>
              </div>
            </div>
          </div>
        </section>

        <section class="sense_section sense_section--2" id="sense_section-2">
          <div class="sense_content content">
            <div class="com-content">
              <h2 class="com-ttl">表情豊かな緑景に、<br class="_sp">優しく迎え入れられる日常。</h2>
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-02-img01.jpg" loading="lazy" width="1444" height="840" alt=""></figure>
              <div class="sense_btn m_left">
                <a nohref class="com_linkMore c-right">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="sense_section sense_section--3" id="sense_section-3">
          <div class="sense_content content">
            <div class="content--left">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-03-img02.jpg" loading="lazy" width="1195" height="893" alt=""></figure>
            </div>
            <div class="content--right">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-03-img01.jpg" loading="lazy" width="669" height="456" alt=""></figure>
              <h2 class="com-ttl">
                リラックスタイムも、<br>
                ワーキングタイムも。<br>
                どこにいても自然とつながる。
              </h2>
              <div class="sense_btn m_left">
                <a nohref class="com_linkMore c-right">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="sense_section sense_section--4" id="sense_section-4">
          <div class="sense_content content">
            <div class="content--left">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-04-img01.jpg" loading="lazy" width="468" height="334" alt=""></figure>
              <figure class="video m_fade"><img src="<?php echo h($path_img); ?>/top/scene-04-img03.jpg" alt=""></figure>
              <!-- <video class="video m_fade" autoplay loop muted playsinline>
                <source src="<?php echo h($path_img); ?>/top/video.mp4" type="video/mp4">
              </video> -->
              <div class="sense_btn m_left">
                <a nohref class="com_linkMore">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
            </div>
            <div class="content--right">
              <h2 class="com-ttl">
                木漏れ日とそよ風にた<br class="_sp">なびく木々のざわめき。<br>
                ゆったりと進む、杜の時間。
              </h2>
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-04-img02.jpg" loading="lazy" width="1213" height="873" alt=""></figure>
            </div>
          </div>
        </section>

        <section class="sense_section sense_section--5" id="sense_section-5">
          <div class="com-content">
            <div class="sense_content content">
              <div class="content--left">
                <figure class="m_fade"><img src="<?php echo h($path_img); ?>/top/scene-05-img01.png" loading="lazy" width="799" height="667" alt=""></figure>
              </div>
              <div class="content--right">
                <h2 class="com-ttl">
                  じぶんらしく暮らすための、<br>
                  機能と美の空間。
                </h2>
                <div class="sense_btn m_left">
                  <a nohref class="com_linkMore c-right">
                    <span class="text">詳細を見る</span>
                    <span class="arrow"></span>
                  </a>
                </div>
              </div>
              <div class="content--bottom">
                <figure class="m_fade"><img class="js-scrollable" src="<?php echo h($path_img); ?>/top/scene-05-img02.png" loading="lazy" width="1654" height="631" alt=""></figure>
              </div>
            </div>
          </div>
        </section>

        <section class="sense_section sense_section--6" id="sense_section-6">
          <div class="com-content">
            <div class="sense_content content">
              <div class="content--left m_fade">
                <h2 class="ttl">CG Movie</h2>
                <p class="sub">CG動画をご覧いただけます。</p>
              </div>
              <div class="content--right">
                <div class="video">
                  <div class="video-item m_fade">
                    <p class="video-ttl">エントランス CG動画</p>
                    <div class="video-thumb">
                      <img src="<?php echo h($path_img); ?>/top/movie_img01.jpg" loading="lazy" width="808" height="565" alt="">
                      <video src="<?php echo h($path_img); ?>/top/video01.mp4" muted playsinline preload="metadata"></video>
                      <div class="video-play"></div>
                    </div>
                  </div>
                  <div class="video-item m_fade">
                    <p class="video-ttl">中庭 CG動画</p>
                    <div class="video-thumb">
                      <img src="<?php echo h($path_img); ?>/top/movie_img02.jpg" loading="lazy" width="808" height="565" alt="">
                      <video src="<?php echo h($path_img); ?>/top/video02.mp4" muted playsinline preload="metadata"></video>
                      <div class="video-play"></div>
                    </div>
                  </div>
                  <div class="video-item m_fade">
                    <p class="video-ttl">ラウンジ CG動画</p>
                    <div class="video-thumb">
                      <img src="<?php echo h($path_img); ?>/top/movie_img03.jpg" loading="lazy" width="808" height="565" alt="">
                      <video src="<?php echo h($path_img); ?>/top/video03.mp4" muted playsinline preload="metadata"></video>
                      <div class="video-play"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="parallax-section parallax-section--2">
          <div class="parallax-img">
            <img src="<?php echo h($path_img); ?>/top/scene-img03.jpg" loading="lazy" width="1956" height="1393" alt="">
          </div>
          <div class="parallax-logo-wrap">
            <div class="sense_logo" data-gradient-bg="normal">
              <span class="logo-ttl f-garamond">ALPHA STATES</span>
              <span class="logo-sub f-garamond">FUCHU BIJUTSUKAN DORI</span>
              <div class="logo-divider"></div>
              <span class="logo-jp f-shippori">アルファステイツ府中美術館通り</span>
            </div>
          </div>
        </div>

        <section class="sense_section sense_section--7" id="sense_section-7">
          <div class="sense_content content">
            <div class="content--left">
              <h2 class="com-ttl">
                利便も穏やかさも譲らない。<br>
                暮らしの街、府中。

              </h2>
              <figure class="img img--01 m_fade"><img src="<?php echo h($path_img); ?>/top/scene-06-img02.jpg" loading="lazy" width="350" height="260" alt=""></figure>
              <figure class="img img--02 m_fade"><img src="<?php echo h($path_img); ?>/top/scene-06-img03.jpg" loading="lazy" width="350" height="260" alt=""></figure>

              <div class="sense_btn m_left">
                <a nohref class="com_linkMore">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
            </div>
            <div class="content--right">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-06-img01.jpg" loading="lazy" width="928" height="1224" alt=""></figure>
            </div>
          </div>
        </section>

        <div class="parallax-section parallax-section--3">
          <div class="parallax-img">
            <img src="<?php echo h($path_img); ?>/top/scene-img04.jpg" loading="lazy" width="1956" height="1393" alt="">
          </div>
        </div>

        <section class="sense_section sense_section--8" id="sense_section-8">
          <div class="sense_content content">
            <div class="content--left">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-07-img01.jpg" loading="lazy" width="1085" height="807" alt=""></figure>

              <div class="sense_btn m_left">
                <a nohref class="com_linkMore">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
            </div>
            <div class="content--right">
              <figure class="video m_fade"><img src="<?php echo h($path_img); ?>/top/scene-07-img02.jpg" alt=""></figure>
              <!-- <video class="video m_fade" autoplay loop muted playsinline>
                <source src="<?php echo h($path_img); ?>/top/video.mp4" type="video/mp4">
              </video> -->
              <h2 class="com-ttl">
                森を散策する。丘と水辺で遊ぶ。<br>
                四季の景を楽しむ「府中の森公園」
              </h2>
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-07-img03.jpg" loading="lazy" width="566" height="347" alt=""></figure>
            </div>
          </div>
        </section>

        <div class="parallax-section parallax-section--4">
          <div class="parallax-img">
            <img src="<?php echo h($path_img); ?>/top/scene-img05.jpg" loading="lazy" width="1956" height="1393" alt="">
          </div>
        </div>

        <section class="sense_section sense_section--9" id="sense_section-9">
          <div class="sense_content content">
            <div class="content--left">
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-08-img01.jpg" loading="lazy" width="626" height="427" alt=""></figure>
              <h2 class="com-ttl">
                府中駅前の華やぎを、<br>
                自在に使う日常。

              </h2>
              <div class="sense_btn m_left">
                <a nohref class="com_linkMore">
                  <span class="text">詳細を見る</span>
                  <span class="arrow"></span>
                </a>
              </div>
            </div>
            <div class="content--right">
              <figure class="video m_fade"><img src="<?php echo h($path_img); ?>/top/scene-08-img02.jpg" alt=""></figure>
              <!-- <video class="video m_fade" autoplay loop muted playsinline>
                <source src="<?php echo h($path_img); ?>/top/video.mp4" type="video/mp4">
              </video> -->
              <figure class="img m_fade"><img src="<?php echo h($path_img); ?>/top/scene-08-img03.jpg" loading="lazy" width="1173" height="715" alt=""></figure>
            </div>
          </div>
        </section>

        <div class="parallax-section parallax-section--5">
          <div class="parallax-img">
            <img src="<?php echo h($path_img); ?>/top/scene-img06.jpg" loading="lazy" width="1956" height="1393" alt="">
          </div>
        </div>

        <section class="sense_section sense_section--10" id="sense_section-10">
          <div class="com-content">
            <div class="sense_content content">
              <div class="content--top">
                <div class="location">
                  <div class="location-item m_fade">
                    <img src="<?php echo h($path_img); ?>/top/scene-09-img01.jpg" loading="lazy" width="489" height="497" alt="">

                    <p class="location-name">新宿</p>
                    <p class="location-time">直通<span>32</span>分</p>
                  </div>
                  <div class="location-item m_fade">
                    <img src="<?php echo h($path_img); ?>/top/scene-09-img02.jpg" loading="lazy" width="489" height="497" alt="">

                    <p class="location-name">渋谷</p>
                    <p class="location-time"><span>39</span>分</p>
                  </div>
                  <div class="location-item m_fade">
                    <img src="<?php echo h($path_img); ?>/top/scene-09-img03.jpg" loading="lazy" width="489" height="497" alt="">

                    <p class="location-name">東京</p>
                    <p class="location-time">直通<span>42</span>分</p>
                  </div>
                </div>
              </div>
              <div class="content--left">
                <figure class="map m_fade"><img src="<?php echo h($path_img); ?>/top/scene-09-map.png" loading="lazy" width="971" height="537" alt=""></figure>
              </div>
              <div class="content--right">
                <h2 class="com-ttl">
                  京王線・JR中央線2路線利用で、<br>
                  都心にダイレクト&スムーズに。
                </h2>
                <div class="sense_btn m_left">
                  <a nohref class="com_linkMore c-right">
                    <span class="text">詳細を見る</span>
                    <span class="arrow"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="sense_section sense_section--11" id="sense_section-11">
          <div class="sense_bg">
            <div class="sense_bg--left">
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img02.jpg" loading="lazy" width="491" height="464" alt=""></figure>
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img03.jpg" loading="lazy" width="491" height="464" alt=""></figure>
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img04.jpg" loading="lazy" width="491" height="464" alt=""></figure>
            </div>
            <div class="sense_bg--center">
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img01.jpg" loading="lazy" width="978" height="1393" alt=""></figure>
            </div>
            <div class="sense_bg--right">
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img05.jpg" loading="lazy" width="491" height="464" alt=""></figure>
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img06.jpg" loading="lazy" width="491" height="464" alt=""></figure>
              <figure><img src="<?php echo h($path_img); ?>/common/scene-10-img07.jpg" loading="lazy" width="491" height="464" alt=""></figure>
            </div>
          </div>
          <div class="sense_content">
            <h2 class="ttl f-garamond m_fade">杜と暮らす。</h2>
            <p class="txt m_fade">
              日々の利便は大切だけど、<br>
              家族が心地よく過ごすための<br>
              住環境の良さは譲れない。<br>
              潤いあふれる街並みと呼応する、美しい杜。<br>
              機能性を追求したゆとりの空間。<br>
              自然とふれあう、心豊かな日常を、ここに。
            </p>
            <div class="logo m_fade">
              <span class="logo-ttl f-garamond">ALPHA STATES</span>
              <span class="logo-sub f-garamond">FUCHU BIJUTSUKAN DORI</span>
              <div class="logo-divider"></div>
              <span class="logo-jp f-shippori">アルファステイツ府中美術館通り</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>

  <footer class="footer">
    <div class="com-content footer-inner">
      <figure class="footer-logo"><img src="<?php echo h($path_img); ?>/common/logo-anabuki.svg" loading="lazy" width="201" height="88" alt="ANABUKI"></figure>
      <div class="footer-ttl">資料請求受付開始</div>
      <div class="footer-linkWeb">
        <a nohref class="link" data-gradient-bg="intro">
          <span>公式サイトを見る</span>
        </a>
      </div>
      <figure class="footer-info"><img src="<?php echo h($path_img); ?>/common/content-img.png" loading="lazy" width="807" height="463" alt=""></figure>
    </div>
  </footer>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script type="text/javascript" src="<?php echo h($path_lib); ?>/gsap@3.11.3/minified/gsap.min.js"></script>
  <script type="text/javascript" src="<?php echo h($path_lib); ?>/gsap@3.11.3/minified/ScrollTrigger.min.js"></script>
  <script type="text/javascript" src="<?php echo h($path_lib); ?>/gsap@3.11.3/minified/ScrollToPlugin.min.js"></script>
  <script src="https://unpkg.com/lenis@1.1.13/dist/lenis.min.js"></script>
  <script type="text/javascript" src="<?php echo h($path_js); ?>/gradient-bg.js"></script>
  <script type="text/javascript" src="<?php echo h($path_js); ?>/top.js"></script>
  <script type="text/javascript" src="<?php echo h($path_js); ?>/scroll-hint/scroll-hint.min.js"></script>
</body>

</html>