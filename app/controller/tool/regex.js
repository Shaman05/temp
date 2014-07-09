/**
 * Created with JetBrains PhpStorm.
 * User: Chen Chao
 * Date: 14-7-8
 * Time: 上午11:15
 */

(function(){
  'use strict';

  var $regexSource = $('#regexSource');
  var $optionGlobal = $("#optionGlobal");
  var $optionIgnoreCase = $("#optionIgnoreCase");
  var $textSource = $('#textSource');
  var $textResult = $('#textResult');
  var $errorText = $('#errorText');
  var $textReplaceSource = $('#textReplaceSource');
  var $textReplaceResult = $('#textReplaceResult');
  var regexPage = {
    selectRegEx: function(){
      $regexSource.val($(this).attr('data-regex'));
      $('.dropdown-toggle').dropdown('toggle');
      regexPage.applyTest();
    },
    applyTest: function(){
      if(!isValidRegExInput())return false;
      var regex = buildRegex();
      $textResult.val('');
      onMatch(regex);
    },
    applyReplace: function(){
      if(!isValidRegExInput())return false;
      var regex = buildRegex();
      $textReplaceResult.val('');
      onReplace(regex);
    },
    reset: function(){
      $textSource.val('');
      $regexSource.val('');
      $optionGlobal[0].checked = true;
      $optionIgnoreCase[0].checked = false;
      $textResult.val('');
      $textReplaceSource.val('');
      $textReplaceResult.val('');
    }
  };
  util.eventInit(regexPage);

  //创建正则对象
  function buildRegex() {
    var op = "";
    if ($optionGlobal[0].checked)op = "g";
    if ($optionIgnoreCase[0].checked)op = op + "i";
    try{
      return new RegExp($regexSource.val(), op);
    }catch (e){
      if(e){
        $errorText.text('正则表达式语法错误！');
        $('#errorModel').modal();
      }
    }
  }

  //验证正则测试的输入
  function isValidRegExInput(){
    if(!$.trim($textSource.val())){
      $errorText.text('请输入待匹配文本！');
      $('#errorModel').modal();
      return false;
    }
    if(!$.trim($regexSource.val())){
      $errorText.text('请输入正则表达式！');
      $('#errorModel').modal();
      return false;
    }
    return true;
  }

  //正则测试
  function onMatch(regex){
    var result = $textSource.val().match(regex);
    if( null == result || 0 == result.length) {
      $textResult.val('');
      return false;
    }
    if($optionGlobal[0].checked) {
      var strResult = "共找到 " + result.length + " 处匹配：\r\n";
      for (var i = 0; i < result.length; ++i)strResult = strResult + result[i] + "\r\n";
      $textResult.val(strResult);
    }else{
      $textResult.val("匹配位置：" + regex.lastIndex + "\r\n匹配结果：" + result[0]);
    }
    return true;
  }

  //替换
  function onReplace(regex) {
    var str = $textSource.val();
    $textReplaceResult.val(str.replace(regex, $textReplaceSource.val()));
  }

})();