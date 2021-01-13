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
        // console.log('Slider Top Nav development')
        // console.log('------------------------------------------------------------------------------ Start')
        var defaults = {
            scroll: 300,
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
        var set_margin = 0;
        var minus = 0;

        var $ul = '';
        var content = '';
        function calculate() {
            $('#' + elem_id).addClass(settings.class_wrapper);
            $('#' + elem_id + '> ul').addClass(settings.class_content);

            $ul = $('.' + settings.class_content);
            setTimeout(function () {
                // get elem width and its children
                wrapper = $('#' + elem_id).outerWidth();
                wrapper2 = wrapper / 2;
                var $li = $ul.children('li');
                content = $.map($li, function (e) {
                    return $(e).outerWidth();
                }).reduce(function (a, b) { return a + b; }, 0);
                // content += wrapper < content ? 50 : 0;

                var width_parent = $('#' + elem_id).parent().outerWidth();
                if (content > width_parent) {
                    $('#' + elem_id).css({ width: '90%' });
                    var btn_prev = $('.' + settings.class_wrapper).parent().find('.' + settings.class_btn_prev);
                    if (btn_prev.length == 0) {
                        $('.' + settings.class_wrapper).parent().prepend(`<a class="btn mr-2 mt-1 btn-transparent-white ` + settings.class_btn_prev + `">` + settings.icon_btn_prev + `</a>`);
                        $('.' + settings.class_wrapper).parent().append(`<a class="btn mr-2 mt-1 btn-transparent-white ` + settings.class_btn_next + `">` + settings.icon_btn_next + `</a>`);
                        $('.' + settings.class_btn_prev).click(function () { next_prev_tab('prev'); });
                        $('.' + settings.class_btn_next).click(function () { next_prev_tab('next'); });
                    } else {
                        $('#' + elem_id).parent().children('.' + settings.class_btn_prev).show();
                        $('#' + elem_id).parent().children('.' + settings.class_btn_next).show();
                    }
                } else {
                    $('#' + elem_id).css({ width: '100%' });
                    $('#' + elem_id).parent().children('.' + settings.class_btn_prev).hide();
                    $('#' + elem_id).parent().children('.' + settings.class_btn_next).hide();
                }

                // enable button prev & next
                enable_btn();

                if (minus == 0) {
                    var postition_first_li = $('.' + settings.class_content).children().offset();
                    minus = postition_first_li.left;
                    minus = minus < 0 ? minus * -1 : minus;
                }
            }, 500);
        }

        function on_resize(e) {
            if ($(e).width() >= 992) {
                // something like initialize
                calculate();
            } else {
                // something like uninitialize
                $('.' + settings.class_content + ' > li').removeClass('menu-item-open-dropdown').removeClass('menu-item-hover');
                $('#' + elem_id + '> ul').removeAttr('style');
                $('#' + elem_id).parent().children('.' + settings.class_btn_prev).hide();
                $('#' + elem_id).parent().children('.' + settings.class_btn_next).hide();
                $('#' + elem_id).css({ width: '100%' });
                $('#' + elem_id).removeClass(settings.class_wrapper);
                $('#' + elem_id + '> ul').removeClass(settings.class_content);
            }
        }

        function next_prev_tab(type) {
            var $scroll_nav = $('.' + settings.class_content);
            var scrollLeft = $scroll_nav.scrollLeft();
            if (type == 'next') {
                $scroll_nav.animate({ scrollLeft: scrollLeft + settings.scroll }, 300);
            } else {
                $scroll_nav.animate({ scrollLeft: scrollLeft - settings.scroll }, 300);
            }

            enable_btn();
        }

        function calculate_margin(type) {
            var temp = 0;
            if (type == 'next') {
                if (-current_margin + wrapper < content) {
                    temp = -settings.scroll - -current_margin;
                } else {
                    temp = -settings.scroll - -current_margin;
                    if (-temp + wrapper > content && -(content - (-current_margin + wrapper)) <= 100) {
                        temp = -(settings.scroll / 2) - -current_margin;
                    } else {
                        temp = current_margin;
                    }
                }
            } else {
                if (current_margin < 0) {
                    if (settings.scroll - -current_margin > 0) {
                        temp = 0;
                    } else {
                        temp = settings.scroll - -current_margin;
                    }
                } else {
                    temp = 0;
                }
            }

            // console.log("-current_margin: " + -current_margin)
            // console.log("wrapper: " + wrapper)
            // console.log("content: " + content)
            // console.log("temp: " + temp)

            return temp;
        }

        function enable_btn() {
            var $scroll_nav = $('.' + settings.class_content);
            var scrollLeft = Math.ceil($scroll_nav.scrollLeft());
            var scroll = $scroll_nav.get(0);
            var maxScrollLeft = scroll.scrollWidth - scroll.clientWidth;
            var enable_prev = scrollLeft > 0;
            var enable_next = scrollLeft < maxScrollLeft;

            $('.' + settings.class_btn_prev + ', .' + settings.class_btn_next).addClass('disabled');
            if (enable_prev) {
                $('.' + settings.class_btn_prev).removeClass('disabled');
            }

            if (enable_next) {
                $('.' + settings.class_btn_next).removeClass('disabled');
            }
        }

        $(window).on('resize', function () { on_resize(this) });
        on_resize(window);

        $('.' + settings.class_content + ' > li').click(function () {
            // set children position
            var position = $(this).offset(); // get position our li
            var position_parent = $('#' + elem_id).offset(); // get position our grandpa
            var width = $(this).outerWidth(); // get width our li
            var $ch = $(this).children('div'); // our child elem

            var width_parent = $('.' + settings.class_wrapper).parent().width(); // get width our parent
            var width_child = $ch.outerWidth(); // get width our child

            position.left = position.left;
            position.right = $(window).width() - (position.left + width);

            // width_child == 230 (basic width)
            // wrapper2 > position.left ( divide our wrapper, and check our position is in range of wrapper2 )
            // (width_child + position.left) < width_parent ( sum our width child with position li, and is in range of width_parent )
            // $ch.removeAttr('style');
            if (wrapper2 > position.left && position.left > 0 && (width_child + position.left) < width_parent && position.left >= (position_parent.left - 50)) {
                // console.log(position)
                $ch.css({ left: position.left - minus, right: '0', margin: '0' });
            } else if (width_child + position.right < width_parent) {
                $ch.css({ left: 'auto', right: position.right - minus, margin: '0' });
            } else {
                $ch.css({ margin: '0 auto', left: 0, right: 0 });
            }
        });

        $('.' + settings.class_content).on('scroll', function () {
            enable_btn();
        });

        // console.log('------------------------------------------------------------------------------ End')
    }
})(jQuery);