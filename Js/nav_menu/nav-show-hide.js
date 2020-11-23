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
        } else {
            return false;
        }
    });

    $bprev.prop("disabled", true);
    $bnext.prop("disabled", show_li[show_li.length - 1] == last_idx);
}

function on_resize(e) {
    $bprev.hide();
    $bnext.hide();

    if ($(e).width() > 977) {
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
            temp_show_li.push(idx);
            width_li += li_width;
            $(this).show();
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
}

$(window).on('resize', function () { on_resize(this) });

$kt_header_menu.find('ul.menu-nav.list-menu').removeAttr('style');
on_resize(window);