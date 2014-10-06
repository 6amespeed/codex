function Codex() {
  this.pos = 0
  $(window).scrollTop(this.pos);
  this.color = 0
   // Add object properties like this
   // this.name = name;
   // this.gender = gender;
}

Codex.prototype.checkScroll = function(e) {
  console.log("scroll and event: ", e);
  // console.log($(window).scrollTop());
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
  // NODES: Also revise to flipDown if we reach the bottom of the page? (for
  // when the .rows are short)
  if ($first.height() + 2 < $scroll) {
    this.flipDown();
  }

  // if the scroll direction is up, and the position is closer
  // than 10px from the top, flipUp.
  // NOTES: Also check $last is off screen?
  console.log("direct -- - - - - -- - - - ", this.pos,  " vvss ", $(window).scrollTop());
  if (this.pos > $scroll && $scroll < 10) {
    this.flipUp();
  }
  // if (scroll direction is Up AND scroll position is within 5 (more?) of the top)
  // if the top of the last element is below the scroll position plus the view
  // size, flipUp
  // if ($last.offset().top > $(window).scrollTop()+$(window).height()) {
  //   flipUp();
  // }
  console.log($scroll);
  console.log(this.pos);
  this.color += Math.floor((this.pos - $scroll) / 10);
  this.color = this.color % 255;
  console.log(this.color);
  this.pos = $(window).scrollTop();
  $("body").css("background-color", "rgb(" + Math.abs(this.color) + ", " + Math.abs(this.color) + ", " + Math.abs(this.color) + ")");
}

Codex.prototype.flipDown = function() {
  // console.log($(".row").first());
  // console.log($(".row").last());
  console.log("flip Down");

  $first = $(".row").first();
  $last = $(".row").last();

  // move the last element to above the first element.
  $(".row").last().after($(".row").first());
  $(window).scrollTop(0);
}

Codex.prototype.flipUp = function() {
  // console.log($(".row").first());
  // console.log($(".row").last());
  console.log("flip Up");

  $first = $(".row").first();
  $last = $(".row").last();
  $scroll = $(window).scrollTop();

  // move first elemet to behind the last element.
  $first.before($last);
  $(window).scrollTop($last.height()+$scroll);
}

$(document).ready(function(){
  // console.log($(".carson"));
  // $($(".carson")[1]).html("This is Hello World by JQuery");
  // };
  // Possibly add scrollTop to start at top of Codex. Might need a special
  // #firstRow jQuery to handle this.
  codex = new Codex();
  console.log("init: ", codex.pos);

  setTimeout(function() {

    // $(window).scroll(function(e){
    //   // checkScroll(e);
    //   codex();
    // });

    $(window).bind( "scroll", function() {
      // $first = $(".row").first();
      // $last = $(".row").last();
      // console.log("update!");
      // console.log($last);
      // console.log($last.offset().top);
      // console.log($(window).scrollTop());
      // console.log($(window).height());
      // if ($last.offset().top > $(window).scrollTop()+$(window).height()) {
      //   flipUp();
      // }
      // console.log("scrolltop: ", $(window).scrollTop());

      codex.codex();
    });
  },1000);
});
