<?php include(dirname(__FILE__) . '/config/config.php'); ?>
<?php
$title = '';
$page = '';
$og_type = 'website';
include(dirname(__FILE__) . '/inc/head.php');
?>
</head>
<!-- ____________________//head____________________ -->

<body id="pageTop">
  <!-- ______main______________//header____________________ -->
  <!-- ____________________content____________________ -->
  <main>
    <div id="canvas-container"></div>
    <div class="content">
      <h1>Satoyama Terrace</h1>
      <p>Gradient Background Effect</p>
    </div>
    <div class="controls">
      <button onclick="changeMode('intro')">Intro</button>
      <button onclick="changeMode('top')">Top</button>
      <button onclick="changeMode('normal')">Normal</button>
      <button onclick="changeMode('footer')">Footer</button>
      <button onclick="changeMode('navi')">Navi</button>
      <button onclick="triggerWave()">Wave</button>
    </div>
  </main>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script type="text/javascript" src="<?php echo h($path_js); ?>/gradient-bg.js"></script>
</body>

</html>