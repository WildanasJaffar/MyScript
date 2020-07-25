<template>
    <!-- 
        Basic Grid, created by Asep
            * Basic Column & Header
            * Searching
            * Paging

        Add some Features, created by Wildan
             * Caption Grid
             * Dynamic Column & Header
             * Custom Parameter
             * Custom Formatter Column
             * Multi Selection Rows (with checkbox, you can disabled [Select All])
             * Multiple Pkey
             * Limit Records per Page, you can set it
             * Permission
             * Dynamic Button Actions (Required Permission, you can manage it in IBSS User Management)
                - Button in grid
                - Button out grid, you can Minify it
             * You can do something when grid loaded
             * Option for LOV, action at first, opsi BLANK Button
             * You can show / hide Search, Custom Search, Loading Display, Limit Records per Page
             * Height Grid
             * Grid can get data from url_grid when created, you can enable disable this fitur
             [ ***** On Develop *****]
                * Tree Grid
                * Custom Search
                * Dynamic Reload when Parameter changed
    -->
    <div :id="id">
        <div class="row" v-if="caption != ''">
            <div class="col-md-12">
                <h4>{{ caption }}</h4>
                <hr>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9" v-if="custom_search">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-default dropdown-toggle waves-effect waves-themed" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Rows per Page">{{ limit_records + ' ' }}</button>
                            <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: top, left; top: 37px; left: 0px;">
                                <a v-for="limit in rownumlist" :class="'dropdown-item ' + (limit_records == limit ? ' active' : '')" href="javascript:;" aria-expanded="true" v-on:click="set_limit_records(limit); loadGrid();">{{ limit }}</a>
                                <div role="separator" class="dropdown-divider"></div>
                                <a class="dropdown-item disabled" href="javascript:;" aria-expanded="true">Rows per Page</a>
                            </div>
                        </div>
                        <input type="text" class="form-control" placeholder="Search..." v-on:keyup.enter="loadGrid" v-model="search.searchString">
                        <div class="input-group-append">
                            <button type="button" class="btn btn-primary waves-effect waves-themed" v-on:click="loadGrid"><i class="fal fa-search"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3" v-if="!custom_search && searchable">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-default dropdown-toggle waves-effect waves-themed" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Rows per Page">{{ limit_records + ' ' }}</button>
                            <div class="dropdown-menu" x-placement="bottom-start" style="position: absolute; will-change: top, left; top: 37px; left: 0px;">
                                <a v-for="limit in rownumlist" :class="'dropdown-item ' + (limit_records == limit ? ' active' : '')" href="javascript:;" aria-expanded="true" v-on:click="set_limit_records(limit); loadGrid();">{{ limit }}</a>
                                <div role="separator" class="dropdown-divider"></div>
                                <a class="dropdown-item disabled" href="javascript:;" aria-expanded="true">Rows per Page</a>
                            </div>
                        </div>
                        <select class="form-control" v-model="search.searchField">
                            <option v-for="header in column" :value="header.value" v-if="header.search || header.search === undefined">{{ header.name }}</option>
                        </select>
                    </div>

                </div>
            </div>
            <div class="col-md-3" v-if="!custom_search && searchable">
                <div class="form-group">
                    <select class="form-control" v-model="search.searchOper">
                        <option value="eq" selected="selected">equal (=)</option>
                        <option value="ne">not equal (<>)</option>
                        <option value="bw">begins with (text%)</option>
                        <option value="ew">ends with (%text)</option>
                        <option value="cn">contains (%text%)</option>
                        <option value="gt">is greater than (>)</option>
                        <option value="ge">is greater than or equal to (>=)</option>
                        <option value="lt">is less than (<)</option>
                        <option value="le">is less than or equal to (<=)</option>
                    </select>
                </div>
            </div>
            <div class="col-md-3" v-if="!custom_search && searchable">
                <div class="form-group">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search..." v-model="search.searchString" v-on:keyup.enter="filter">
                        <div class="input-group-append">
                            <span class="input-group-text cursor-pointer" v-on:click="filter">
                                <i class="fal fa-search"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="btn-group btn-block" role="group" v-if="button_out_grid.length >= 3 || minified_button_action">
                    <button type="button" class="btn btn-block btn-light dropdown-toggle" data-toggle="dropdown">Action</button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="javascript:;" v-on:click="reload()"> <i class="fal fa-repeat-alt mr-3"></i> Reload Grid</a>

                        <a v-for="button in button_out_grid" v-if="permission[button.permission]" class="dropdown-item" href="javascript:;" v-on:click="on_click(button.onclick)" :title="button.title"> <i :class="button.icon + ' mr-3'"></i> {{ button.label == '' ? button.title : button.label }} </a>
                    </div>
                </div>
                <div v-else class="form-group">
                    <button type="button" class="btn btn-light float-right" style="margin-left: 5px;" v-on:click="reload()" title="Refresh"><i class="fal fa-repeat-alt"></i></button>

                    <button v-if="button_out_grid.length > 0" v-for="button in button_out_grid" type="button" :class="button.class" :style="button.style" v-on:click="on_click(button.onclick)" :disabled="!permission[button.permission]" :title="button.title"><i :class="button.icon"></i> {{ button.label }} </button>
                </div>
            </div>
        </div>
        <p style="margin-bottom: 10px;"></p>
        <div class="row" v-show="showGrid">
            <!-- <div class="col-md-12">&nbsp;&nbsp;</div> -->
            <div class="col-md-12">
                <div class="table-responsive text-nowrap" :style="parseInt(height) > 0 ? 'height: ' + height + 'px; overflow: scroll;' : (tree_grid ? 'height: ' + (parseInt(height) == 0 ? 290 : parseInt(height)) + 'px; overflow: scroll;' : '')">
                    <table class="table table-bordered m-0">
                        <thead class="bg-primary-400">
                            <tr>
                                <th :class="parseInt(height) > 0 || tree_grid ? 'fix-head' : ''" v-if="checkable" width="30px">
                                    <input type="checkbox" class="control-input" v-model="checked_all_item" @click="on_check_all_item(); get_checked_item();" :disabled="disable_check_all">
                                </th>
                                <th :class="parseInt(height) > 0 || tree_grid ? 'fix-head' : ''" v-if="button_in_grid.length > 0 && action_at_first" :style="width_column_actions > 0 ? ('width: ' + width_column_actions + 'px' ) : ''">
                                    <center v-if="!is_lov || (is_lov && !btn_blank)">Action</center>
                                    <center v-if="is_lov && btn_blank">
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-themed" v-on:click="blank_opt()">Blank</button>
                                    </center>
                                </th>
                                <th :class="parseInt(height) > 0 || tree_grid ? 'fix-head' : ''" v-for="header in column" v-if="(!header.hidden || header.hidden === undefined)">{{ header.name }}</th>
                                <th :class="parseInt(height) > 0 || tree_grid  ? 'fix-head' : ''" v-if="button_in_grid.length > 0 && !action_at_first" :style="width_column_actions > 0 ? ('width: ' + width_column_actions + 'px' ) : ''">
                                    <center v-if="!is_lov || (is_lov && !btn_blank)">Action</center>
                                    <center v-if="is_lov && btn_blank">
                                        <button type="button" class="btn btn-danger btn-xs waves-effect waves-themed" v-on:click="blank_opt()">Blank</button>
                                    </center>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in items" v-on:click="activeTr(item)" :class="{ 'bg-warning-200' : active_tr == gen_id(item) }" v-show="hide_children(item)">
                                <td v-if="checkable">
                                    <input type="checkbox" :disabled="attr_checkbox && attr_checkbox.disabled ? attr_checkbox.disabled(item, index) : false" class="control-input" v-model="checked_item" :value="gen_id(item)" @change="get_checked_item">
                                </td>
                                <td v-if="button_in_grid.length > 0 && action_at_first">
                                    <center>
                                        <a v-if="button_in_grid.length > 0 && button.in_grid" v-for="button in button_in_grid" href="javascript:;"  v-on:click.stop="on_click(button.onclick, item);" :class="( !permission[button.permission] ? 'disabled ' : '')  + button.class + (button.type == 'custom-button' && button.custom && button.custom.class ? button.custom.class(item, index) : '')" :style="button.style" :title="button.title">
                                            <i :class="button.icon"></i> {{ button.label }}
                                        </a>
                                    </center>
                                </td>

                                <td v-for="header in column" :style="{'text-align': (header.align == undefined ? 'left' : header.align)}" v-if="(!header.hidden || header.hidden === undefined)">
                                    <div v-if="header.type && header.type == 'custom-text'">
                                        <span v-if="tree_grid && is_parent(items, item[header.value])">
                                            <i class="fal fa-caret-right"></i>
                                        </span>
                                        <span :class="header.custom && header.custom.class ? header.custom.class(item, item[header.value], index) : ''">
                                            {{ 
                                              header.custom && header.custom.text ? 
                                                header.custom.text(item, item[header.value], index) 
                                              : item[header.value] 
                                            }}
                                        </span>
                                    </div>
                                    <div v-else-if="header.type && header.type == 'custom-image'">
                                        <img :src="header.custom && header.custom.src ? header.custom.src(item, item[header.value], index) : ''" :width="header.custom && header.custom.width ? header.custom.width : 120" :height="header.custom && header.custom.heigth ? header.custom.heigth : 80">
                                        {{ 
                                          header.custom && header.custom.text ? 
                                            header.custom.text(item, item[header.value], index) 
                                          : item[header.value] 
                                        }}
                                    </div>
                                    <div v-else>
                                        <span v-if="tree_grid && is_parent(items, item[header.value]) && header.value == pkey">
                                            <i :class="(!item.expand_parent ? 'fal fa-caret-right' : 'fal fa-caret-down') + ' cursor-pointer'" :style="'padding-left: ' + item.parent_class + 'px;' " v-on:click="show_children(item[header.value])"></i>
                                            <span v-show="!item.expand_parent" style="margin-right: 3.5px;"></span>
                                        </span>
                                        <span :style="tree_grid && header.value == pkey && !item.parent_class ? 'padding-left: ' + item.child_class + 'px;margin-left: ' + item.child_class + 'px' : ''">
                                            {{ 
                                              typeof header.formatter === "function" ? 
                                                header.formatter(item[header.value]) 
                                              : item[header.value] 
                                            }}
                                        </span>
                                    </div>
                                </td>
                                <td v-if="button_in_grid.length > 0 && !action_at_first">
                                    <center>
                                        <a v-if="button_in_grid.length > 0 && button.in_grid" v-for="button in button_in_grid" href="javascript:;"  v-on:click.stop="on_click(button.onclick, item);" :class="( !permission[button.permission] ? 'disabled ' : '')  + button.class + (button.type == 'custom-button' && button.custom && button.custom.class ? button.custom.class(item, index) : '')" :style="button.style" :title="button.title">
                                            <i :class="button.icon"></i> {{ button.label }}
                                        </a>
                                    </center>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <p style="margin-bottom: 10px;"></p>
        <div class="row" v-show="showGrid">
            <div class="col-md-6">Page {{ current_page }} of {{ total_page }} ( {{ total }} records ) 
                <span v-if="show_limit && false">| 
                    <select v-model="limit_records" @change="reload">
                        <option v-for="limit in rownumlist" :value="limit">{{ limit }}</option>
                    </select> / records per page
                </span>
            </div>
            <div class="col-md-6">
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-end">
                    <li class="page-item" v-bind:class="{ disabled: !isbtnPagePrev }">
                        <a class="page-link" href="javascript:;" tabindex="-1" v-on:click="prevPage()">Previous</a>
                    </li>
                    <li class="page-item"><input type="text" v-on:keyup.enter="gotopage($event.target.value)" v-on:keypress="keypress_page($event)" class="form-control form-control-sm text-center" v-model="page" size="2"></li>
                    <li class="page-item" v-bind:class="{ disabled: !isbtnPageNext }">
                        <a class="page-link" href="javascript:;" v-on:click="nextPage()">Next</a>
                    </li>
                </ul>
            </nav>
            </div>                        
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        props: {
            is_lov: { // opsi jika grid dipakai utk lov
                type: Boolean,
                default: false
            },
            btn_blank: { // opsi btn blank
                type: Boolean,
                default: false
            },
            id: { // id div
                type: String,
                default: 'grid-table'
            },
            auto_load: { // define apakah grid akan otomatis load data saat url grid berubah , false kan jika menggunakan param_string
                type: Boolean,
                default: true
            },
            is_load:{ // define apakah grid memang sudah waktunya utk diload, berguna utk grid detail
                type: Boolean,
                default: true  
            },
            pkey: { // pkey dari table
                type: Array,
                default: []
            },
            url_grid: { // url read ke database
                type: String,
                default: '' 
            },
            column_grid: {
                type: Array,
                default: () => ([])
            },
            buttons: {
                type: Array,
                default: () => ([])
            },
            param_string: { // define parameter get
                type: Object,
                default: () => ({})
            },
            searchable: { // enable / disable fitur search
                type: Boolean,
                default: true
            },
            custom_search: { // enable / disable fitur custom search
                type: Boolean,
                default: false
            },
            permission: { // set permission 
                type: Object,
                default: () => ({
                    submit_process: 0,
                    cancel_process: 0,
                    create: 0,
                    update: 0,
                    delete: 0
                })
            },
            caption: { // caption dari table
                type: String,
                default: ''
            },
            rownumlist: { // list rownum yg akan ditampilkan per page
                type: Array,
                default: () => ([ 5, 20, 50 ])
            },
            limit: { // limit record per page
                type: String,
                default: "5"
            },
            checkable: { // opsi utk membuat grid yg dpt di check
                type: Boolean,
                default: false
            },
            disable_check_all: { // opsi utk membuat grid yg dpt di check
                type: Boolean,
                default: false
            },
            show_limit: { // opsi utk menampilkan rownumlist
                type: Boolean,
                default: true
            },
            action_at_first: { // opsi utk membuat column action berada di awal
                type: Boolean,
                default: false
            },
            height: { // opsi utk membuat grid memiliki height tertentu { 5 rows: 290, 10 rows: 520 }
                type: String,
                default: "0"
            },
            after_load: { // opsi utk memanggil function sesudah load grid
                type: Function,
                default: () => {}
            },
            tree_grid: {
                type: Boolean,
                default: false
            },
            minified_button_action: {
                type: Boolean,
                default: false
            },
            show_loading: {
                type: Boolean,
                default: true
            },
            load_when_created: {
                type: Boolean,
                default: false
            },
            show_grid: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                first_load: true,
                column: [],
                items: [],
                checked_item: [],
                checked_all_item: false,
                current_page: 1,
                page: 1,
                records: 0,
                total: 0,
                total_page: 0,
                limit_records: "",
                search: { searchField: '', searchOper: '', searchString: '' },
                is_valid: { searchField: true },
                isbtnPageNext: false,
                isbtnPagePrev: false,
                active_tr: 0,
                width_column_actions: 0,
                button_actions: [],
                button_in_grid: [],
                button_out_grid: [],
                attr_checkbox: {},
                showGrid: true
            }
        },
        created(){
            this.limit_records = this.limit;
            this.showGrid = this.show_grid;
            if (this.column_grid){
                this.column = this.column_grid;
            }

            if (this.buttons){
                this.set_button_actions(this.buttons);
            }

            if (this.load_when_created){
                this.loadGrid();
            }
        },
        watch: {
            url_grid: {
                handler(val){
                    if (this.auto_load){
                        this.reload();   
                    }
                },
                deep: true
            },
            param_string: {
                handler(val){
                    if (!this.auto_load && this.is_load){
                        this.reload();
                    } else if (!this.first_load){
                        this.reload();
                    }
                },
                deep: true  
            }
        },
        methods: {
            set_limit_records(limit){
                this.limit_records = limit;
            },
            set_column(column){ // set column grid
                this.column = column;
            },
            set_button_actions(button){ // set button action spt button CRUD
                let temp_button_in_grid = [];
                let temp_button_out_grid = [];

                button.forEach(function(value, index){
                    if (value.in_grid){
                        temp_button_in_grid.push(value);
                    } else {
                        temp_button_out_grid.push(value);
                    }
                });

                this.button_actions = button;
                this.button_in_grid = temp_button_in_grid; // button action yg berada di dalam grid
                this.button_out_grid = temp_button_out_grid; // button action yg berada di luar grid
            },
            blank_opt(){
                var obj = {};
                this.column.forEach(function(value, index){
                    obj[value.value] = '';
                });
                this.selectItems(obj);
                this.on_click("choose");
            },
            on_click(methods, item){ // method utk memulai aksi di button CRUD
                this.$emit(methods, item);
            },
            on_check_all_item(){
                this.checked_item = [];
                if (!this.checked_all_item) {
                    let self = this;
                    this.items.forEach(function(value, index){
                        var disabled = false;
                        if (self.attr_checkbox && self.attr_checkbox.disabled){
                            disabled = self.attr_checkbox.disabled(value, index);
                        }

                        if (!disabled){
                            self.checked_item.push(self.gen_id(value));
                        }
                    });
                }
            },
            get_checked_item(){
                var temp = [];
                this.checked_item.forEach(function(value, index){
                    temp.push(value);
                });
                this.$emit("onchecked_item", temp);
            },
            gen_id(item){ // men generate pkey jika di set lebih dari 1
                let ret = '';
                this.pkey.forEach(function(value, index){
                    ret += ret != "" ? "_" : "";
                    ret += item[value];
                });

                return ret;
            },
            set_width_column_actions(width){
                this.width_column_actions = width;
            },
            filter() {
                this.page = 1;
                this.loadGrid();
            },
            reload() {
                this.page = 1;
                this.isbtnPageNext = false;
                this.isbtnPagePrev = false;
                this.search.searchString = '';
                this.loadGrid();
                this.active_tr = 0;
            },
            reload_current_page() {
                this.isbtnPageNext = false;
                this.isbtnPagePrev = false;
                this.loadGrid();
                this.active_tr = 0;
            },
            gotopage(to_page){
                if (to_page && this.total_page > 0 && to_page > 0 && to_page <= this.total_page){
                    this.page = to_page;
                    this.loadGrid();
                } else if (!to_page){
                    this.$swal("Information", "Page is required", "info");
                    return false;
                } else {
                    this.$swal("Information", "Page "+to_page+" not found!", "info");
                    return false;
                }
            },
            loadGrid() {
                let self = this;
                setTimeout(function(){
                    self.active_tr = 0;
                    self.items = [];
                    self.showGrid = true;
                    // self.checked_item = [];
                    // self.checked_all_item = false;

                    if (self.tree_grid){
                        self.limit_records = 99999999999999;
                    }

                    
                    let query_param = {
                        'token': self.$store.state.token,
                        'page': self.page,
                        'limit': self.limit_records,
                        'searchField': self.search.searchField,
                        'searchOper': self.search.searchOper,
                        'searchString': self.search.searchString
                    };

                    if (self.custom_search){
                        query_param.custom_search = self.search.searchString;
                    }

                    for (var key in self.param_string) {
                        // skip loop if the property is from prototype
                        if (!self.param_string.hasOwnProperty(key)) continue;

                        var val = self.param_string[key];
                        if (val === undefined){
                            return false;
                        } else {
                            query_param[key] = val;
                        }
                    }

                    if (self.show_loading){
                        self.$loading(true);   
                    }
                    axios({
                        method: 'get',
                        url: self.url_grid + '?' + self.queryString(query_param)
                    }).then((res) => {

                        if(res.data.invalid_token){
                            self.logout();
                        }

                        if (self.tree_grid){
                            let temp_item = res.data.rows;
                            let item = [];
                            let i = 0;
                            temp_item.forEach(function(value, index){
                                if (!value.parent_id){
                                    value.expand_parent = false;
                                    value.is_parent = true;
                                    item.push(temp_item[index]);
                                    self.get_child(temp_item, value[self.pkey], item);
                                } else {

                                }
                            });

                            // if (temp_item.length > 0){
                            //     self.get_child(temp_item, temp_item[0][self.pkey], item);
                            // }

                            self.items = item;
                            console.log(item);
                        } else {
                            self.items = res.data.rows;    
                        }

                        
                        self.records = res.data.records;
                        self.total = res.data.total;
                        self.total_page = res.data.total_page;
                        self.isbtnPageNext = self.total_page > 0 && self.total_page > self.page;
                        self.isbtnPagePrev = self.page > 1;
                        self.current_page = self.page;

                        self.$loading(false);
                        self.after_load(res.data);

                    }, (error) => {
                        self.$loading(false);
                        self.$swal("Information", self.get_error_txt(error), "info");
                    }).catch(error => {
                        self.$loading(false);
                        self.$swal("Information", self.get_error_txt(error), "info");
                    });
                }, 100);
            },
            get_child(items, val, item){
                let self = this;
                let item_child = [];
                var padding = 7.5;
                for (var i = 0; i < items.length; i++){
                    if (val == items[i].parent_id){
                        item_child.push(items[i]);

                        let is_parent = this.is_parent(items, items[i][self.pkey]);

                        if (is_parent){
                            items[i].is_parent = true;
                            items[i].expand_parent = false;
                            items[i].parent_class = padding * parseInt(items[i].level);
                        }

                        
                        items[i].child_class = padding * parseInt(items[i].level);
                        items[i].show_child = false;
                        item.push(items[i]);
                    }
                }

                if (item_child.length != 0){
                    item_child.forEach(function(value, index){
                        self.get_child(items, value[self.pkey], item);
                    });
                }
            },
            is_parent(items, val){
                let is_parent = false;
                for (var i = 0; i < items.length; i++){
                    if (val == items[i].parent_id){
                        is_parent = true;
                        i = items.length;
                    }
                }

                return is_parent;
            },
            show_children(val, item){
                let self = this;
                let item_child = [];
                let temp_item = !item ? this.items : item;

                temp_item.forEach(function(value, index){
                    if (value.parent_id == val){
                        value.show_child = !value.show_child;
                    } else if (value[self.pkey] == val){
                        value.expand_parent = !value.expand_parent;
                    } else if (value.parent_id){
                        item_child.push(value);
                    }
                })

                // console.log(item_child);
            },
            hide_children(item){
                return item.show_child == false ? false : true;
            },
            nextPage() {
                let page = this.page ? (parseInt(this.page)+1) : (parseInt(this.current_page)+1);
                this.gotopage(page);
            },
            prevPage() {
                let page = this.page ? (parseInt(this.page)-1) : (parseInt(this.current_page)-1);
                this.gotopage(page);
            },
            keypress_page(e){
                if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
                    e.preventDefault();
                 }
            },
            selectItems(item) {
                item.row_click = false;
                this.$emit("get_selected_item", item);
            },
            activeTr(item){
                item.row_click = true;
                this.active_tr = this.gen_id(item);
                this.$emit("get_selected_item", item);
            },
            set_selected_item(pkey){
                let self = this;
                this.items.forEach(function(value, index){
                    if (self.gen_id(value) == pkey){
                        self.activeTr(value);
                    }
                });
            },
            set_checkbox(attr_checkbox){
                this.attr_checkbox = attr_checkbox;
            },
            clear_checked(){
                this.checked_item = [];        
            }
        }
    };
</script>
<style>
.fix-head {
    background-color: #967bbd;
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
}

.hidden {
    display: none;
}
</style>