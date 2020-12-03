var cnt = 0;
var is_focus = false;
var is_prompt = false;
var url = "";
function still_alive(url_server) {
    if (is_focus && cnt > 1) return false;

    if (url_server) {
        url = url_server;
    } else if (url && !url_server) {
        url_server = url;
    }

    is_focus = true;
    // cek koneksi
    $.ajax({
        type: "POST",
        data: {},
        url: url_server,
        success: function (data, textStatus, jqXHR) {
            data = JSON.parse(data);

            if (!data.still_alive) {
                if (!is_prompt) {
                    is_prompt = true;
                    toastr.warning(data.message, "Info", {
                        progressBar: true,
                        positionClass: "toast-top-right alert-system",
                        timeOut: "0",
                        extendedTimeOut: "0",
                        showEasing: "swing",
                        hideEasing: "linear",
                        showMethod: "fadeIn",
                        hideMethod: "fadeOut",
                        onHidden: function () {
                            is_prompt = false;
                        }
                    });
                    console.log(data.message);
                }
            } else {
                is_prompt = false;
                $('.toast-top-right.alert-system .toast').click();
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        },
    });
}

window.onfocus = function () {
    still_alive();
    cnt++;
}

window.onblur = function () {
    is_focus = false;
}