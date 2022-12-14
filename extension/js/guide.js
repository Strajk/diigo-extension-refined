var Guide = {
  init: function () {
    var a = this,
      b = (this.$guide = $("#guide"));
    this.$nextBtn = b.find(".next");
    this.$prevBtn = b.find(".prev");
    this.$skip = b.find(".guide-skip");
    this.$nextBtn.on("click", function () {
      a.next();
    });
    this.$prevBtn.on("click", function () {
      a.prev();
    });
    this.$skip.on("click", function () {
      a.hide();
    });
  },
  next: function () {},
  prev: function () {},
  show: function () {
    this.$guide || this.init();
    this.$guide.addClass("show");
  },
  hide: function () {
    this.$guide.removeClass("show");
  },
};
