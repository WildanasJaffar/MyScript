/*!
 * Tabledit v1.2.3 (https://github.com/markcell/jQuery-Tabledit)
 * Copyright (c) 2015 Celso Marques
 * Licensed under MIT (https://github.com/markcell/jQuery-Tabledit/blob/master/LICENSE)
 * 
 * Edited Muhammad Wildan Jaffar Rahmatullah
 * Change Class
 * Append some Parameter on edit / delete
 * SWAL Confirm on delete
 * 2 reset button type 
 * Edit with custom input attr
 * onDrawEditCallback // call when edit is on fire
 * Parameter 'data' in function onAjax
 * input attr data-remember
 */

/**
 * @description Inline editor for HTML tables compatible with Bootstrap
 * @version 1.2.3
 * @author Celso Marques
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Tabledit requires jQuery library.');
}

(function ($) {
    'use strict';

    $.fn.Tabledit = function (options) {
        if (!this.is('table')) {
            throw new Error('Tabledit only works when applied to a table.');
        }

        var $table = this;

        var defaults = {
            url: window.location.href,
            inputClass: 'form-control input-sm',
            toolbarClass: 'btn-toolbar',
            groupClass: 'btn-group btn-group-sm',
            dangerClass: 'danger',
            warningClass: 'warning',
            mutedClass: 'text-muted',
            eventType: 'click',
            rowIdentifier: 'id',
            hideIdentifier: false,
            autoFocus: true,
            editButton: true,
            resetButton: true,
            deleteButton: true,
            saveButton: true,
            restoreButton: false,
            editParams: {},
            deleteParams: {},
            customParams: {},
            column_required: [],
            buttons: {
                edit: {
                    class: 'btn btn-sm btn-clean btn-icon text-primary',
                    html: '<span class="fas fa-pen"></span>',
                    action: 'edit'
                },
                reset: {
                    class: 'btn btn-sm btn-clean btn-icon text-info',
                    html: '<span class="fas fa-undo"></span>',
                    action: 'clear' // reset: restore all data; clear: clear all data
                },
                delete: {
                    class: 'btn btn-sm btn-clean btn-icon text-danger',
                    html: '<span class="far fa-trash-alt"></span>',
                    action: 'delete'
                },
                save: {
                    class: 'btn btn-sm btn-clean btn-icon text-success',
                    html: '<span class="fas fa-check"></span>',
                    action: 'save'
                },
                restore: {
                    class: 'btn btn-sm btn-clean btn-icon text-warning',
                    html: '<span class="fas fa-trash-restore-alt"></span>',
                    action: 'restore'
                },
                confirm: {
                    class: 'btn btn-sm btn-clean btn-icon text-danger',
                    html: 'Confirm',
                    type: "swal", // btn / swal
                    // swal option
                    title: "Apakah Yakin Ingin Dihapus?",
                    text: "Anda tidak bisa mengembalikan data yang telah dihapus!",
                    confirmButtonText: "Ya, Hapus!",
                    cancelButtonText: "Batal"
                }
            },
            onDrawEditCallback: function (type) { return; },
            onDraw: function () { return; },
            onSuccess: function () { return; },
            onFail: function () { return; },
            onAlways: function () { return; },
            onAjax: function () { return; }
        };

        var settings = $.extend(true, defaults, options);

        var $lastEditedRow = 'undefined';
        var $lastDeletedRow = 'undefined';
        var $lastRestoredRow = 'undefined';

        /**
         * Draw Tabledit structure (identifier column, editable columns, toolbar column).
         *
         * @type {object}
         */
        var Draw = {
            columns: {
                identifier_exceptable: function () {
                    if (!settings.columns.identifier_exceptable) return;

                    var $td = $table.find('tbody td:nth-child(' + (parseInt(settings.columns.identifier_exceptable[0]) + 1) + ')');

                    $td.each(function () {
                        var text = settings.columns.identifier_exceptable[1];
                        if ($.trim($(this).text()) == $.trim(text)) {
                            if (settings.columns.identifier_exceptable.length > 2) {
                                var opt_obj = settings.columns.identifier_exceptable[2];
                                var buttons = $(this).parent('tr').find('td div.custom-tabledit-column div.tabledit-action-button button');

                                for (let index = 0; index < buttons.length; index++) {
                                    if ($(buttons[index]).hasClass("tabledit-edit-button") && !opt_obj.edit) {
                                        $(buttons[index]).remove();
                                    } else if ($(buttons[index]).hasClass("tabledit-delete-button") && !opt_obj.delete) {
                                        $(buttons[index]).remove();
                                    }
                                }
                            } else if ($(this).parent('tr').find('td div.custom-tabledit-column').length === 1) {
                                $(this).parent('tr').find('td div.custom-tabledit-column').empty();
                            }
                        }
                    });
                },
                identifier: function () {
                    // Hide identifier column.
                    if (settings.hideIdentifier) {
                        $table.find('th.hide-' + settings.columns.identifier[1] + ':nth-child(' + parseInt(settings.columns.identifier[0]) + 1 + '), tbody td:nth-child(' + parseInt(settings.columns.identifier[0]) + 1 + ')').hide();
                    }

                    var $td = $table.find('tbody td:nth-child(' + (parseInt(settings.columns.identifier[0]) + 1) + ')');

                    $td.each(function () {
                        // Create hidden input with row identifier.
                        var span = '<span class="tabledit-span tabledit-identifier">' + $(this).text() + '</span>';
                        var input = '<input class="tabledit-input tabledit-identifier" type="hidden" name="' + settings.columns.identifier[1] + '" value="' + $(this).text() + '" disabled>';

                        // Add elements to table cell.
                        $(this).html(span + input);

                        // Add attribute "id" to table row.
                        $(this).parent('tr').attr(settings.rowIdentifier, $(this).text());
                    });
                },
                editable: function () {
                    for (var i = 0; i < settings.columns.editable.length; i++) {
                        var $td = $table.find('tbody td:nth-child(' + (parseInt(settings.columns.editable[i][0]) + 1) + ')');

                        $td.each(function () {
                            // Get text of this cell.
                            var text = $(this).text();
                            var name = settings.columns.editable[i][1];
                            var col = { field: name, value: text };

                            // Add pointer as cursor.
                            if (!settings.editButton) {
                                $(this).css('cursor', 'pointer');
                            }

                            // Create span element.
                            var span = '<span class="tabledit-span">' + text + '</span>';
                            var input = "";
                            var div = '<div></div>';
                            // Check if exists the third parameter of editable array.
                            // switch the third parameter to test for input type default is text

                            switch (settings.columns.editable[i][2]) {
                                case "textarea":
                                    input = '<textarea data-remember="' + text + '" ';
                                    var class2 = "";
                                    //each item in 4th object becomes attributes in select
                                    $.each(settings.columns.editable[i][3], function (index, value) {
                                        if (index == "class") {
                                            class2 = value;
                                        } else {
                                            input += index + '="' + value + '" ';
                                        }
                                    });

                                    input += 'class="tabledit-input ' + settings.inputClass + ' ' + class2 + '" name="' + settings.columns.editable[i][1] + '" style="display: none;" disabled>' + text + '</textarea>';

                                    break;
                                case "select":
                                    // Create select element.
                                    input = '<select ';
                                    var opt = "";
                                    var class2 = "";

                                    // Create options for select element.
                                    $.each(settings.columns.editable[i][3], function (index, value) {
                                        if (text === value) {
                                            input += 'data-remember="' + index + '" ';
                                            opt += '<option value="' + index + '" selected>' + value + '</option>';
                                        } else {
                                            opt += '<option value="' + index + '">' + value + '</option>';
                                        }
                                    });

                                    //each item in 5th object becomes attributes in select
                                    $.each(settings.columns.editable[i][4], function (index, value) {
                                        if (index == "class") {
                                            class2 = value;
                                        } else {
                                            input += index + '="' + value + '" ';
                                        }
                                    });

                                    input += 'class="tabledit-input ' + settings.inputClass + ' ' + class2 + '" name="' + settings.columns.editable[i][1] + '" style="display: none;" disabled>';
                                    input += opt;
                                    // Create last piece of select element.
                                    input += '</select>';

                                    break;
                                default:
                                    //customize input type
                                    var type = settings.columns.editable[i][2];
                                    type = type ? type : "text";
                                    var attr = "";
                                    var class2 = "";

                                    //each item in 4th object becomes attributes in text
                                    $.each(settings.columns.editable[i][3], function (index, value) {
                                        if (index == "class") {
                                            class2 = value;
                                        } else {
                                            attr += index + '="' + value + '" ';
                                        }
                                    });

                                    // Create text input element.
                                    input = '<input  data-remember="' + text + '" class="tabledit-input ' + settings.inputClass + ' ' + class2 + '" type="' + type + '" name="' + settings.columns.editable[i][1] + '" value="' + text + '"' + attr + ' style="display: none;" disabled>';
                                    break;
                            }

                            // Add elements and class "view" to table cell.
                            $(this).html(span + input + div);
                            $(this).addClass('tabledit-view-mode');
                        });
                    }
                },
                toolbar: function () {
                    if (settings.editButton || settings.deleteButton) {
                        var editButton = '';
                        var deleteButton = '';
                        var saveButton = '';
                        var resetButton = '';
                        var restoreButton = '';
                        var confirmButton = '';

                        // Add toolbar column header if not exists.
                        if ($table.find('th.tabledit-toolbar-column').length === 0) {
                            $table.find('tr:first').append('<th class="tabledit-toolbar-column"></th>');
                        }

                        // Create edit button.
                        if (settings.editButton) {
                            editButton = '<button type="button" class="tabledit-edit-button ' + settings.buttons.edit.class + '" title="Ubah">' + settings.buttons.edit.html + '</button>';

                            // Create reset button
                            if (settings.resetButton) {
                                resetButton = '<button type="button" class="tabledit-reset-button ' + settings.buttons.reset.class + '"  title="Reset" style="display: none; float: none;">' + settings.buttons.reset.html + '</button>';
                            }
                        }

                        // Create delete button.
                        if (settings.deleteButton) {
                            deleteButton = '<button type="button" class="tabledit-delete-button ' + settings.buttons.delete.class + '" title="Hapus">' + settings.buttons.delete.html + '</button>';

                            if (settings.buttons.confirm.type == 'btn') {
                                confirmButton = '<button type="button" class="tabledit-confirm-button ' + settings.buttons.confirm.class + '" title="Konfirmasi" style="display: none; float: none;">' + settings.buttons.confirm.html + '</button>';
                            }

                        }

                        // Create save button.
                        if (settings.editButton && settings.saveButton) {
                            saveButton = '<button type="button" class="tabledit-save-button ' + settings.buttons.save.class + '" title="Simpan" style="display: none; float: none;">' + settings.buttons.save.html + '</button>';
                        }

                        // Create restore button.
                        if (settings.deleteButton && settings.restoreButton) {
                            restoreButton = '<button type="button" class="tabledit-restore-button ' + settings.buttons.restore.class + '" title="Restore" style="display: none; float: none;">' + settings.buttons.restore.html + '</button>';
                        }

                        var toolbar = '<div class="tabledit-toolbar ' + settings.toolbarClass + '">\n\
                                            <div class="' + settings.groupClass + ' tabledit-action-button">' + editButton + deleteButton + '</div>\n\
                                            <div class="' + settings.groupClass + ' ml-2">\n\
                                                ' + resetButton + '\n\
                                                ' + saveButton + '\n\
                                                ' + confirmButton + '\n\
                                                ' + restoreButton + '\n\
                                            </div>\n\
                                        </div>';

                        // Add toolbar column cells.
                        if ($table.find('th.tabledit-toolbar-column').length === 1) {
                            $table.find('td div.custom-tabledit-column').append('<div class="sub-edit-column text-nowrap text-center">' + toolbar + '</div>');
                        } else {
                            $table.find('tbody>tr').append('<td><div class="custom-tabledit-column"><div class="sub-edit-column" style="white-space: nowrap; width: 1%;">' + toolbar + '</div></div></td>');
                        }

                    }
                }
            }
        };

        /**
         * Change to view mode or edit mode with table td element as parameter.
         *
         * @type object
         */
        var Mode = {
            view: function (td) {
                // Get table row.
                var $tr = $(td).parent('tr');
                // Disable identifier.
                $(td).parent('tr').find('.tabledit-input.tabledit-identifier').prop('disabled', true);
                // Hide and disable input element.
                $(td).find('.tabledit-input').removeClass('is-invalid').blur().hide().prop('disabled', true);
                $(td).find('div').empty();
                // Show span element.
                $(td).find('.tabledit-span').show();
                // Add "view" class and remove "edit" class in td element.
                $(td).addClass('tabledit-view-mode').removeClass('tabledit-edit-mode');
                // Update toolbar buttons.
                if (settings.editButton) {
                    $tr.find('button.tabledit-save-button').hide();
                    $tr.find('button.tabledit-edit-button').removeClass('active').blur();

                    if (settings.resetButton) {
                        $tr.find('button.tabledit-reset-button').hide();
                    }
                }
            },
            edit: function (td, obj_data = {}) {
                Delete.reset(td);
                // Get table row.
                var $tr = $(td).parent('tr');
                // Enable identifier.
                $tr.find('.tabledit-input.tabledit-identifier').prop('disabled', false);
                // Hide span element.
                $(td).find('.tabledit-span').hide();
                // Get input element.
                var $input = $(td).find('.tabledit-input');
                // Enable and show input element.
                $input.prop('disabled', false).show();
                // Focus on input element.
                if (settings.autoFocus) {
                    $input.focus();
                }
                // Add "edit" class and remove "view" class in td element.
                $(td).addClass('tabledit-edit-mode').removeClass('tabledit-view-mode');
                // Update toolbar buttons.
                if (settings.editButton) {
                    $tr.find('button.tabledit-edit-button').addClass('active');
                    $tr.find('button.tabledit-save-button').show();

                    if (settings.resetButton) {
                        $tr.find('button.tabledit-reset-button').show();
                    }

                    // generate obj data row
                    obj_data[$input.attr('name')] = $input.val();
                }

                // when param obj_data isn't empty object, then return it
                if (!jQuery.isEmptyObject(obj_data)) {
                    return obj_data;
                }
            }
        };

        /**
         * Available actions for edit function, with table td element as parameter or set of td elements.
         *
         * @type object
         */
        var Edit = {
            reset: function (td) {
                $(td).each(function () {
                    // Get input element.
                    var $input = $(this).find('.tabledit-input');
                    // Get span text.
                    var text = $(this).find('.tabledit-span').text();
                    // Set input/select value with span text.
                    if ($input.is('select')) {
                        $input.find('option').filter(function () {
                            return $.trim($(this).text()) === text;
                        }).attr('selected', true);
                    } else {
                        $input.val(text);
                    }
                    // Change to view mode.
                    Mode.view(this);
                });
            },
            submit: function (td) {
                // Send AJAX request to server.
                var ajaxResult = ajax(settings.buttons.edit.action);

                if (ajaxResult === false) {
                    return;
                }

                $(td).each(function () {
                    // Get input element.
                    var $input = $(this).find('.tabledit-input');
                    // Set span text with input/select new value.
                    if ($input.is('select')) {
                        $(this).find('.tabledit-span').text($input.find('option:selected').text());
                    } else {
                        $(this).find('.tabledit-span').text($input.val());
                    }
                    // Change to view mode.
                    Mode.view(this);
                });

                // Set last edited column and row.
                $lastEditedRow = $(td).parent('tr');
            }
        };

        /**
         * Available actions for delete function, with button as parameter.
         *
         * @type object
         */
        var Delete = {
            reset: function (td) {
                // Reset delete button to initial status.
                $table.find('.tabledit-confirm-button').hide();
                // Remove "active" class in delete button.
                $table.find('.tabledit-delete-button').removeClass('active').blur();
            },
            submit: function (td) {
                Delete.reset(td);
                // Enable identifier hidden input.
                $(td).parent('tr').find('input.tabledit-identifier').attr('disabled', false);
                // Send AJAX request to server.
                var ajaxResult = ajax(settings.buttons.delete.action);
                // Disable identifier hidden input.
                $(td).parents('tr').find('input.tabledit-identifier').attr('disabled', true);

                if (ajaxResult === false) {
                    return;
                }

                // Add class "deleted" to row.
                $(td).parent('tr').addClass('tabledit-deleted-row');
                // Hide table row.
                $(td).parent('tr').addClass(settings.mutedClass).find('.tabledit-toolbar button:not(.tabledit-restore-button)').attr('disabled', true);
                // Show restore button.
                $(td).find('.tabledit-restore-button').show();
                // Set last deleted row.
                $lastDeletedRow = $(td).parent('tr');
            },
            confirm: function (td) {
                // Reset all cells in edit mode.
                $table.find('td.tabledit-edit-mode').each(function () {
                    Edit.reset(this);
                });
                // Add "active" class in delete button.
                $(td).find('.tabledit-delete-button').addClass('active');
                // Show confirm button.
                $(td).find('.tabledit-confirm-button').show();
            },
            restore: function (td) {
                // Enable identifier hidden input.
                $(td).parent('tr').find('input.tabledit-identifier').attr('disabled', false);
                // Send AJAX request to server.
                var ajaxResult = ajax(settings.buttons.restore.action);
                // Disable identifier hidden input.
                $(td).parents('tr').find('input.tabledit-identifier').attr('disabled', true);

                if (ajaxResult === false) {
                    return;
                }

                // Remove class "deleted" to row.
                $(td).parent('tr').removeClass('tabledit-deleted-row');
                // Hide table row.
                $(td).parent('tr').removeClass(settings.mutedClass).find('.tabledit-toolbar button').attr('disabled', false);
                // Hide restore button.
                $(td).find('.tabledit-restore-button').hide();
                // Set last restored row.
                $lastRestoredRow = $(td).parent('tr');
            }
        };

        /**
         * Send AJAX request to server.
         *
         * @param {string} action
         */
        function ajax(action) {
            var dataparams = "";
            var params = settings.customParams;
            var keys = Object.keys(params);
            for (var key of keys) {
                dataparams += dataparams ? "&" : "";
                dataparams += key + "=";

                var isFunc = jQuery.isFunction(params[key]);
                if (isFunc) {
                    dataparams += params[key]();
                } else {
                    dataparams += params[key];
                }
            }

            if (action == "edit") {
                params = settings.editParams;
                keys = Object.keys(params);
            } else if (action == "delete") {
                params = settings.deleteParams;
                keys = Object.keys(params);
            }

            for (var key of keys) {
                dataparams += dataparams ? "&" : "";
                dataparams += key + "=";

                var isFunc = jQuery.isFunction(params[key]);
                if (isFunc) {
                    dataparams += params[key]();
                } else {
                    dataparams += params[key];
                }
            }

            var data_form = $table.find('.tabledit-input').not('input[name^="temp_"]');
            var arr_serialize = $(data_form).serializeArray();
            var serialize = $(data_form).serialize() + '&action=' + action + (dataparams ? "&" + dataparams : "");
            var data = {};
            var is_valid = true;

            arr_serialize.forEach(function (obj, idx) {
                var pkey = settings.columns.identifier[1];
                for (let i = 0; i < settings.column_required.length && action == "edit" && is_valid; i++) {
                    var col = settings.column_required[i];
                    $('.tabledit-edit-mode input[name=' + obj.name + ']').removeClass('is-invalid');
                    $('.tabledit-edit-mode div').removeClass('invalid-feedback').empty();

                    if (obj.name != pkey && obj.name == col && !obj.value) {
                        is_valid = false;
                        $('.tabledit-edit-mode input[name=' + obj.name + ']').addClass('is-invalid');
                        $('.tabledit-edit-mode div').addClass('invalid-feedback').html('Inputan ini tidak boleh kosong.');
                        return false;
                    }

                }

                if (!is_valid) return false;

                data[obj.name] = obj.value;
            });

            if (!is_valid) return false;

            var result = settings.onAjax(action, serialize, data);
            if (result === false) return false;

            var jqXHR = $.post(settings.url, serialize, function (data, textStatus, jqXHR) {
                if (action === settings.buttons.edit.action) {
                    $lastEditedRow.removeClass(settings.dangerClass).addClass(settings.warningClass);
                    setTimeout(function () {
                        //$lastEditedRow.removeClass(settings.warningClass);
                        $table.find('tr.' + settings.warningClass).removeClass(settings.warningClass);
                    }, 1400);
                }

                settings.onSuccess(data, textStatus, jqXHR);
            }, 'json');

            jqXHR.fail(function (jqXHR, textStatus, errorThrown) {
                if (action === settings.buttons.delete.action) {
                    $lastDeletedRow.removeClass(settings.mutedClass).addClass(settings.dangerClass);
                    $lastDeletedRow.find('.tabledit-toolbar button').attr('disabled', false);
                    $lastDeletedRow.find('.tabledit-toolbar .tabledit-restore-button').hide();
                } else if (action === settings.buttons.edit.action) {
                    $lastEditedRow.addClass(settings.dangerClass);
                }

                settings.onFail(jqXHR, textStatus, errorThrown);
            });

            jqXHR.always(function () {
                settings.onAlways();
            });

            return jqXHR;
        }

        Draw.columns.identifier();
        Draw.columns.editable();
        Draw.columns.toolbar();
        Draw.columns.identifier_exceptable();

        settings.onDraw();

        if (settings.deleteButton) {
            /**
             * Delete one row.
             *
             * @param {object} event
             */
            $table.on('click', 'button.tabledit-delete-button', function (event) {
                if (event.handled !== true) {
                    event.preventDefault();

                    // Get current state before reset to view mode.
                    var activated = $(this).hasClass('active');

                    var $td = $(this).parents('td');

                    Delete.reset($td);

                    if (!activated) {
                        if (settings.buttons.confirm.type == 'btn') {
                            Delete.confirm($td);
                        } else {
                            $table.find('td.tabledit-edit-mode').each(function () {
                                Edit.reset(this);
                            });

                            Swal.fire({
                                title: settings.buttons.confirm.title,
                                text: settings.buttons.confirm.text,
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: settings.buttons.confirm.confirmButtonText,
                                cancelButtonText: settings.buttons.confirm.cancelButtonText,
                            }).then(function (result) {
                                if (result.value) {
                                    Delete.submit($td);
                                }
                            });
                        }
                    }

                    event.handled = true;
                }
            });

            /**
             * Delete one row (confirm).
             *
             * @param {object} event
             */
            $table.on('click', 'button.tabledit-confirm-button', function (event) {
                if (event.handled !== true) {
                    event.preventDefault();

                    var $td = $(this).parents('td');

                    Delete.submit($td);

                    event.handled = true;
                }
            });
        }

        if (settings.restoreButton) {
            /**
             * Restore one row.
             *
             * @param {object} event
             */
            $table.on('click', 'button.tabledit-restore-button', function (event) {
                if (event.handled !== true) {
                    event.preventDefault();

                    Delete.restore($(this).parents('td'));

                    event.handled = true;
                }
            });
        }

        if (settings.editButton) {
            /**
             * Activate edit mode on all columns.
             *
             * @param {object} event
             */
            $table.on('click', 'button.tabledit-edit-button', function (event) {
                if (event.handled !== true) {
                    event.preventDefault();

                    var $button = $(this);

                    // get data row
                    var obj_data = {};

                    // Get current state before reset to view mode.
                    var activated = $button.hasClass('active');

                    // Change to view mode columns that are in edit mode.
                    Edit.reset($table.find('td.tabledit-edit-mode'));
                    if (!activated) {
                        // Change to edit mode for all columns in reverse way.
                        $($button.parents('tr').find('td.tabledit-view-mode').get().reverse()).each(function () {
                            // get data row
                            obj_data = Mode.edit(this, obj_data);
                        });

                        // get data row identifier
                        var $identifier = $($button.parents('tr').find('td input.tabledit-input.tabledit-identifier'));
                        obj_data[$identifier.attr("name")] = $identifier.val();
                    }

                    settings.onDrawEditCallback(!activated ? 'edit' : 'view', obj_data);
                    event.handled = true;
                }
            });

            /**
             * Save edited row.
             *
             * @param {object} event
             */
            $table.on('click', 'button.tabledit-save-button', function (event) {
                if (event.handled !== true) {
                    event.preventDefault();

                    // Submit and update all columns.
                    Edit.submit($(this).parents('tr').find('td.tabledit-edit-mode'));

                    event.handled = true;
                }
            });

            if (settings.resetButton) {
                /**
                 * Delete all value edited row.
                 *
                 * @param {object} event
                 */
                $table.on('click', 'button.tabledit-reset-button', function (event) {
                    if (event.handled !== true) {
                        event.preventDefault();

                        var $button = $(this);

                        $($button.parents('tr').find('td.tabledit-edit-mode').get().reverse()).each(function (index, value) {
                            // get reset options
                            var option_reset = settings.buttons.reset.action;

                            // get element textarea
                            var text_area = {
                                elem: $(value).find('textarea'),
                                data_remember: $(value).find('textarea').attr('data-remember')
                            };

                            // get element input
                            var inpt = {
                                elem: $(value).find('input'),
                                data_remember: $(value).find('input').attr('data-remember')
                            };

                            // get element select
                            var slct_opt = {
                                elem: $(value).find('select'),
                                data_remember: $(value).find('select').attr('data-remember')
                            };

                            // set value from remember value
                            if (text_area.data_remember !== undefined) {
                                if (option_reset == 'reset') {
                                    text_area.elem.val(text_area.data_remember);
                                } else {
                                    text_area.elem.val('');
                                }

                                text_area.elem.trigger("change");
                            }

                            // set value from remember value
                            if (inpt.data_remember !== undefined) {
                                if (option_reset == 'reset') {
                                    inpt.elem.val(inpt.data_remember);
                                } else {
                                    inpt.elem.val('');
                                }

                                inpt.elem.trigger("change");
                            }

                            // set value from remember value
                            if (slct_opt.data_remember !== undefined) {
                                if (option_reset == 'reset') {
                                    slct_opt.elem.val(slct_opt.data_remember);
                                } else {
                                    slct_opt.elem.val('');
                                }

                                slct_opt.elem.trigger("change");
                            }
                        });

                        event.handled = true;
                    }
                });

            }
        } else {
            /**
             * Change to edit mode on table td element.
             *
             * @param {object} event
             */
            $table.on(settings.eventType, 'tr:not(.tabledit-deleted-row) td.tabledit-view-mode', function (event) {
                if (event.handled !== true) {
                    event.preventDefault();

                    // Reset all td's in edit mode.
                    Edit.reset($table.find('td.tabledit-edit-mode'));

                    // Change to edit mode.
                    Mode.edit(this);

                    event.handled = true;
                }
            });

            /**
             * Change event when input is a select element.
             */
            $table.on('change', 'select.tabledit-input:visible', function () {
                if (event.handled !== true) {
                    // Submit and update the column.
                    Edit.submit($(this).parent('td'));

                    event.handled = true;
                }
            });

            /**
             * Click event on document element.
             *
             * @param {object} event
             */
            $(document).on('click', function (event) {
                var $editMode = $table.find('.tabledit-edit-mode');
                // Reset visible edit mode column.
                if (!$editMode.is(event.target) && $editMode.has(event.target).length === 0) {
                    Edit.reset($table.find('.tabledit-input:visible').parent('td'));
                }
            });
        }

        /**
         * Keyup event on document element.
         *
         * @param {object} event
         */
        $(document).on('keyup', function (event) {
            // Get input element with focus or confirmation button.
            var $input = $table.find('.tabledit-input:visible');
            var $button = $table.find('.tabledit-confirm-button');

            if ($input.length > 0) {
                var $td = $input.parents('td');
            } else if ($button.length > 0) {
                var $td = $button.parents('td');
            } else {
                return;
            }

            if (event.shiftKey) return;

            // Key?
            if (!settings.editButton) {
                switch (event.keyCode) {
                    case 9:  // Tab.
                        // if (!settings.editButton) {
                        Edit.submit($td);
                        Mode.edit($td.closest('td').next());
                        // }
                        break;
                    case 13: // Enter.
                        Edit.submit($td);
                        break;
                    case 27: // Escape.
                        Edit.reset($td);
                        Delete.reset($td);
                        break;
                }
            }
        });

        return this;
    };
}(jQuery));