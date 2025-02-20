var Slide = function($element) {
  this.$element = $element;
  this.behaviors = [];

  if (/directory/.test(this.meta('template'))) {
    this.addBehavior('autoscrollable', {
      container:       '.ui-slide-collection',
      items:           '.ui-member',
      visible_rows:    4,
      items_per_row:   4,
      rows_per_scroll: 2,
      scroll_interval: 8000
    });
  } else if (/schedule/.test(this.meta('template'))) {
    this.addBehavior('autoscrollable', {
      container:       '.ui-slide-collection',
      items:           '.ui-event',
      visible_rows:    4,
      items_per_row:   1,
      rows_per_scroll: 1,
      scroll_interval: 10000
    });
  } else if (/standard/.test(this.meta('template'))) {
    this.addBehavior('video', {});
  }
  var self = this;
  $.each(this.behaviors, function(i, behavior) { behavior.initialize(self); });
};

Slide.prototype.play = function() {
  $.each(this.behaviors, function(i, behavior) {
    behavior.play();
  });
};

Slide.prototype.stop = function() {
  $.each(this.behaviors, function(i, behavior) {
    behavior.stop();
  });
};

Slide.prototype.meta = function(key) {
  return this.$element.find('.js-slide-meta').data(key);
};

Slide.prototype.addBehavior = function(name, options) {
  this.behaviors.push($.extend({}, SlideBehaviors[name], options));
}