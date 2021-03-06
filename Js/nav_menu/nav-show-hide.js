/**
 * @description Show Hide Nav Menu Metrnoic theme 8 - Scrollabel Nav Menu Effect
 * @version 1.0
 * @author Muhammad Wildan Jaffar Rahmatullah
 * @date 20201118
 */

var w_container = 0;
var $kt_header_menu = $('#kt_header_menu');
var li_elem = $kt_header_menu.find('ul.menu-nav.list-menu').find('li.item-nav');
var show_li = [];
var last_idx = li_elem.length - 1;
var $bnext = $('.btn-next-tab');
var $bprev = $('.btn-prev-tab');
var fl_left = "menu-submenu-left";
var fl_right = "menu-submenu-right";
var menu_classic = "div.menu-submenu-classic";
var $elem_menu_classic = "";
var len = 0;
var w_win = 0;

function gen_tab() {
    var width_li = 0;
    w_container = $kt_header_menu.parent().width() - 115;
    show_li = [];

    $(li_elem).hide();
    $.each(li_elem, function (idx, item) {
        var li_width = $(this).width();
        if ((li_width + width_li) < w_container) {
            show_li.push(idx);
            width_li += li_width;
            $(this).show();
            $elem_menu_classic = $(this).find(menu_classic).first();
            $elem_menu_classic.removeClass(fl_left).removeClass(fl_right).addClass(fl_left);
        } else {
            return false;
        }
    });

    $bprev.prop("disabled", true);
    $bnext.prop("disabled", show_li[show_li.length - 1] == last_idx);

    len = show_li.length;
    len = len > 4 ? (len - 3) : (len - 2);
    for (var i = show_li.length; i > len; i--) {
        var el = $(li_elem)[show_li[i - 1]];
        $(el).find(menu_classic).first().removeClass(fl_left).addClass(fl_right);
    }
}

function on_resize(e) {
    $bprev.hide();
    $bnext.hide();
    w_win = $(e).width();

    if (w_win > 992) {
        gen_tab();
        $bprev.show();
        $bnext.show();
    }
}

function next_prev_tab(type) {
    if (!type) return;

    var temp_show_li = [];
    var is_show = true;
    var width_li = 0;
    $(li_elem).hide();

    var fl_left = "menu-submenu-left";
    var fl_right = "menu-submenu-right";

    $.each(li_elem, function (idx, item) {
        var li_width = $(this).width();
        var temp_width = li_width + width_li;
        var condition_prev = false;
        var condition_next = false;

        if (type == "prev") {
            condition_prev = temp_width < w_container && (show_li[0] - 1) <= idx;
        } else {
            condition_next = temp_width < w_container && show_li[1] <= idx;
        }

        if ((condition_prev || condition_next) && is_show) {
            if (temp_show_li.length > 0) {
                if (!(temp_show_li[temp_show_li.length - 1] == (idx - 1))) {
                    return false;
                }
            }

            temp_show_li.push(idx);
            width_li += li_width;
            $(this).show();

            $elem_menu_classic = $(this).find(menu_classic).first();
            $elem_menu_classic.removeClass(fl_left).removeClass(fl_right).addClass(fl_left);
        } else {
            if (idx > show_li[0] && type == "next") {
                return false;
            } else if (idx > show_li[show_li.length] && type == "prev") {
                return false;
            }
        }
    });

    show_li = temp_show_li;
    $bprev.prop("disabled", show_li[0] == 0);
    $bnext.prop("disabled", show_li[show_li.length - 1] == last_idx);

    len = show_li.length;
    len = len > 4 ? (len - 3) : (len - 2);
    for (var i = show_li.length; i > len; i--) {
        var el = $(li_elem)[show_li[i - 1]];
        $(el).find(menu_classic).first().removeClass(fl_left).addClass(fl_right);
    }
}

$(window).on('resize', function () { on_resize(this) });

$kt_header_menu.find('ul.menu-nav.list-menu').removeAttr('style');
on_resize(window);