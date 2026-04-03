<!DOCTYPE html>
<html lang="ja" prefix="og: https://ogp.me/ns#">

<head>
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
  <meta name="viewport" content="width=device-width,user-scalable=yes,maximum-scale=1,user-scalable=no" />
  <meta charset="utf-8">
  <title><?php echo h($title); ?>JS sample</title>

  <meta name="description" content="<?php echo h($description); ?>">
  <meta name="keywords" content="<?php echo h($keywords); ?>">
  <meta name="robots" content="index, follow" />
  <meta http-equiv="Content-Style-Type" content="text/css">
  <meta http-equiv="Content-Script-Type" content="text/javascript">
  <meta name="format-detection" content="telephone=no">


  <link rel="stylesheet" type="text/css" href="<?php echo h($path_css); ?>/style.css?<?= rand() ?>">