function Codex() {
  this.pos = 0
  $(window).scrollTop(this.pos);
  this.color = 0
   // Add object properties like this
   // this.name = name;
   // this.gender = gender;
}

// Logging function for debugging.
Codex.prototype.checkScroll = function(e) {
  console.log("scroll and event: ", e);
  console.log($(window).scrollTop());
  console.log($(window).height());
  console.log($(document).height());
  console.log($(".row")[0]);
}

Codex.prototype.codex = function() {
  $first  = $(".row").first();
  $last   = $(".row").last();
  $scroll = $(window).scrollTop();

  // if the scroll position is beyond the height of the first
  // element (plus a small fudge factor), flipDown
  // NOTES: Also revise to flipDown if we reach the bottom of the page? (for
  // when the .rows are short)
  if ($first.height() + 2 < $scroll) {
    this.flipDown();
  }

  // if the scroll direction is up, and the position is closer
  // than 10px from the top, flipUp.
  // NOTES: Also check $last is off screen?
  if (this.pos > $scroll && $scroll < 10) {
    this.flipUp();
  }
  // if (scroll direction is Up AND scroll position is within 5 (more?) of the top)
  // if the top of the last element is below the scroll position plus the view
  // size, flipUp
  // if ($last.offset().top > $(window).scrollTop()+$(window).height()) {
  //   flipUp();
  // }
  this.pos = $(window).scrollTop();

  // Color rotator.
  // this.color += Math.floor((this.pos - $scroll) / 10);
  // this.color = this.color % 255;
  // console.log(this.color);
  // $("body").css("background-color", "rgb(" + Math.abs(this.color) + ", " + Math.abs(this.color) + ", " + Math.abs(this.color) + ")");
}

Codex.prototype.flipDown = function() {
  $first = $(".row").first();
  $last = $(".row").last();

  // move the last element to above the first element.
  $(".row").last().after($(".row").first());
  $(window).scrollTop(0);
}

Codex.prototype.flipUp = function() {
  $first = $(".row").first();
  $last = $(".row").last();
  $scroll = $(window).scrollTop();

  // move first elemet to behind the last element.
  $first.before($last);
  $(window).scrollTop($last.height()+$scroll);
}

$(document).ready(function(){
  // Possibly add scrollTop to start at top of Codex. Might need a special
  // #firstRow jQuery to handle this.
  codex = new Codex();

  setTimeout(function() {

    $(window).bind( "scroll", function() {
      codex.codex();
    });
  },1000);
});
