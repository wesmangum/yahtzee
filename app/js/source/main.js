(function () {
  'use strict';

  $(document).ready(init);

  var currentUser = 0;
  var currentRoll = 3;
  var frozen;
  var numDice;

  function init() {
    $('#add').click(add);
    $('.arrow').click(arrow);
    $('body').keydown(move);
    $('#add-score').click(addScore);
    $('#roll').click(roll);
    $('.dice').click(freeze);

    numDice = $('.dice').length;
    frozen = $('.frozen').length;
  }

  function freeze() {
    $(this).toggleClass('frozen');
  }

  function roll() {
    var $dice = $('.dice:not(.frozen)');
    var count = $dice.length;


    for( var i = 0; i < count; i++){
      var num = Math.floor(Math.random() * 6) + 1;

      $($dice[i]).attr('src', 'media/Dice-' + num + '.svg.png');
    }

  }

  function addScore(event) {
    var score = $('#score').val();
    $('.horizontal > .vertical').text(score);
    $('#score').val('');

    event.preventDefault();
  }

  function add(event) {
    var username = $('#username').val();
    var avatar = $('#avatar').val();

    createRow(username, avatar);

    $('#username').val('');
    $('#avatar').val('');

    event.preventDefault();
  }

  function move(event) {
    switch(event.keyCode){
      case 38:
        currentUser--;
        paintScreen();
        break;
      case 40:
        currentUser++;
        paintScreen();
        break;
      case 37:
        currentRoll--;
        paintScreen();
        break;
      case 39:
        currentRoll++;
        paintScreen();
      }

      if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
        event.preventDefault();
      }
  }

  function arrow() {
    switch(this.id){
      case'up':
        currentUser--;
        paintScreen();
        break;
      case'down':
        currentUser++;
        paintScreen();
        break;
      case'left':
        currentRoll--;
        paintScreen();
        break;
      case'right':
        currentRoll++;
        paintScreen();
    }
  }

  function paintScreen() {
    $('.horizontal').removeClass();
    $('.vertical').removeClass();

    var $trs = $('#game > tbody > tr');
    var tr = $trs[currentUser];
    $(tr).addClass('horizontal');

    $('#game > tbody > tr > td:nth-child(' + currentRoll + ')').addClass('vertical');
  }

  function createRow(username, avatar) {
    var $tr = $('<tr>');
    var tds = [];

    for( var i = 0; i < 16; i++){
      tds.push('<td></td>');
    }

    $tr.append(tds);
    $('#game > tbody').append($tr);

    var count = $('#game > tbody > tr').length;

    if(count === 1){
      $tr.addClass('horizontal');
    }

    var $img = $('<img>');
    $img.addClass('avatar');
    $img.attr('src', avatar);

    $tr.children('td:nth-child(1)').append($img);
    $tr.children('td:nth-child(2)').text(username);
    $tr.children('td:nth-child(3)').addClass('vertical');
  }

})();
