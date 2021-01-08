/**
 * @description Slider Top Nav
 * @version 1.0
 * @author Muhammad Wildan Jaffar Rahmatullah
 * @date 20210107
 */

if (typeof jQuery === 'undefined') {
    alert("Slider Top Nav requires JQuery library");
    throw new Error("Slider Top Nav requires JQuery library");
}

(function ($) {
    'use strict';

    $.fn.SliderTopNav = function (opt) {
        var defaults = {
            class_wrapper: 'scroll-wrapper',
            class_content: 'scroll-nav',
            class_btn_prev: 'btn-prev-tab',
            class_btn_next: 'btn-next-tab',
            icon_btn_prev: '<i class="fas fa-angle-left"></i>',
            icon_btn_next: '<i class="fas fa-angle-right"></i>'
        };

        var settings = $.extend(true, defaults, opt);
        var elem_id = $(this).attr('id');
        var wrapper = $('#' + elem_id).outerWidth();
        var wrapper2 = 0;
        var current_margin = 0;

        var $ul = '';
        var content = '';
        function calculate() {
            $('#' + elem_id).addClass(settings.class_wrapper);
            $('#' + elem_id + '> ul').addClass(settings.class_content);

            var btn_prev = $('.' + settings.class_wrapper).parent().find('.' + settings.class_btn_prev);
            if (btn_prev.length == 0) {
                $('.' + settings.class_wrapper).parent().prepend(`<a class="btn btn-icon mr-2 mt-1 btn-transparent-white ` + settings.class_btn_prev + `">` + settings.icon_btn_prev + `</a>`);
                $('.' + settings.class_wrapper).parent().append(`<a class="btn btn-icon mr-2 mt-1 btn-transparent-white ` + settings.class_btn_next + `">` + settings.icon_btn_next + `</a>`);
            } else {
                $('#' + elem_id).parent().children('.' + settings.class_btn_prev).show();
                $('#' + elem_id).parent().children('.' + settings.class_btn_next).show();
            }

            setTimeout(function () {
                wrapper = $('#' + elem_id).outerWidth();
                wrapper2 = wrapper / 2;
                $ul = $('.' + settings.class_content).children('li');
                content = $.map($ul, function (e) {
                    return $(e).outerWidth();
                }).reduce(function (a, b) { return a + b; }, 0);
                $ul = $('.' + settings.class_content);
                content += wrapper < content ? 50 : 0;
            }, 500);
        }

        function on_resize(e) {
            if ($(e).width() > 992) {
                calculate();
            } else {
                $('.' + settings.class_content + ' > li').removeClass('menu-item-open-dropdown').removeClass('menu-item-hover');
                $('#' + elem_id + '> ul').removeAttr('style');
                $('#' + elem_id).parent().children('.' + settings.class_btn_prev).hide();
                $('#' + elem_id).parent().children('.' + settings.class_btn_next).hide();
                $('#' + elem_id).removeClass(settings.class_wrapper);
                $('#' + elem_id + '> ul').removeClass(settings.class_content);
            }
        }

        function next_prev_tab(type) {
            var set_margin = 0;
            if (type == 'next') {
                if (-current_margin + wrapper < content) {
                    set_margin = Math.max(current_margin - wrapper, -(content - wrapper));
                } else {
                    set_margin = current_margin;
                }
            } else {
                if (current_margin < 0) {
                    set_margin = Math.min(current_margin + wrapper, 0);
                } else {
                    set_margin = current_margin;
                }
            }

            $ul.css({ 'margin-left': set_margin });

            return this
        }

        $(window).on('resize', function () { on_resize(this) });
        on_resize(window);

        $('.' + settings.class_content + ' > li').click(function () {
            var position = $(this).position();
            var $ch = $(this).children('div');
            if ($ch.outerWidth() == 230 || wrapper2 > position.left) {
                $ch.css({ left: 'auto' });
            } else {
                $ch.css({ margin: '0 auto', left: 0, right: 0 });
            }
        });

        $('.' + settings.class_btn_prev).click(function () {
            next_prev_tab('prev');
        });

        $('.' + settings.class_btn_next).click(function () {
            next_prev_tab('next');
        });
    }
})(jQuery);