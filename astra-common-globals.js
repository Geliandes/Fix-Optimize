(function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
        'use strict';

        var _login2 = require('./config/globals/__login');

        var _login3 = _interopRequireDefault(_login2);

        var _newsletter = require('../../common/js/config/master-data/__newsletter');

        var _newsletter2 = _interopRequireDefault(_newsletter);

        var _wishlist = require('../../common/js/config/master-data/__wishlist');

        var _wishlist2 = _interopRequireDefault(_wishlist);

        var _shelfBuy = require('../../common/js/config/shelf/__shelf-buy');

        var _shelfBuy2 = _interopRequireDefault(_shelfBuy);

        var _shelfShopByLook = require('../../common/js/config/shelf/__shelf-shop-by-look');

        var _shelfShopByLook2 = _interopRequireDefault(_shelfShopByLook);

        var _floatToCurrency = require('../../common/js/config/globals/__float-to-currency');

        var _floatToCurrency2 = _interopRequireDefault(_floatToCurrency);

        var _cookieCreate = require('../../common/js/config/globals/__cookie-create');

        var _cookieCreate2 = _interopRequireDefault(_cookieCreate);

        var _cookieRead = require('../../common/js/config/globals/__cookie-read');

        var _cookieRead2 = _interopRequireDefault(_cookieRead);

        var _shelfColors = require('./config/globals/_shelfColors');

        var _shelfColors2 = _interopRequireDefault(_shelfColors);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var _itemIndex = 0;

        var checkOrderForm = function checkOrderForm() {
            vtexjs.checkout.getOrderForm().done(function (_orderform) {
                _itemIndex = _orderform.items.length;
            });
        };

        var removeHelper = function removeHelper() {
            $('.helperComplement').remove();
        };

        var setLogin = function setLogin(ev) {
            var _login = '.js--login, .js--open-login';
            var _url = '/account#/profile';
            $(_login).on('click', function (ev) {
                ev.preventDefault();
                (0, _login3.default)(_url);
            });
        };

        var checkLogin = function checkLogin(ev) {
            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                if (orderForm.loggedIn == true && orderForm.clientProfileData != null) {
                    var _name = orderForm.clientProfileData.firstName;
                    var _lastName = orderForm.clientProfileData.lastName;
                    var _email = orderForm.clientProfileData.email;
                    if (_name == null) {
                        $('.js--login-label').text(_email);
                    } else {
                        $('.js--login-label').text(_name + ' ' + _lastName);
                    };
                }
            });
        };

        var setNewsletter = function setNewsletter(ev) {
            $('.js--newsletter').on('submit', function (ev) {
                ev.preventDefault();
                var _json = {
                    'email': $('#newsletter-email').val(),
                    'firstName': $('#newsletter-name').val(),
                    'isNewsletterOptIn': true
                };
                (0, _newsletter2.default)(_json);
            });
        };

        var scrollToTop = function scrollToTop(ev) {
            var _button = $('.js--back-top');
            var _stopPoint = $('body');
            _button.click(function (event) {
                $('html, body').animate({
                    scrollTop: _stopPoint.offset().top
                }, 1300);
            });
        };
        var headerSearchSubmit = function headerSearchSubmit(ev) {
            if ($(window).width() <= 767) {
                $('.e-header.is--mobile .e-header__search-form').on('submit', function () {
                    var _search = $('.e-header.is--mobile #header-search').val();
                    if (_search != '' && _search != null) {
                        _search = encodeURIComponent(_search);
                        if (_search === "a") {
                            //fix letter A bug
                            window.location.href = "/Sistema/buscavazia?ft=a";
                            return;
                        }
                        window.location.href = "/" + _search.replace('+', '');
                    };
                    return false;
                });
            } else {
                $('.e-header.is--desktop .e-header__search-form').on('submit', function (e) {
                    e.preventDefault();
                    var _search = $('.e-header.is--desktop #header-search').val();
                    if (_search != '' && _search != null) {
                        _search = encodeURIComponent(_search);
                        if (_search === "a") {
                            //fix letter A bug
                            window.location.href = "/Sistema/buscavazia?ft=a";
                            return;
                        }
                        window.location.href = "/" + _search.replace('+', '');
                    };
                    return false;
                });
            }
        };

        var headerSearchButton = function headerSearchButton(ev) {
            if ($(window).width() <= 767) {
                $('.e-header.is--mobile .e-header__search-form--submit').click(function () {
                    $('.e-header.is--mobile .e-header__search-form').submit();
                    return false;
                });
            } else {
                $('.e-header.is--desktop .e-header__search-form--submit').click(function () {
                    $('.e-header.is--desktop .e-header__search-form').submit();
                    return false;
                });
            }
        };

        //ao clicar no icone do carrinho, a classe "is--active" é adicionada e o carrinho e a div com a classe "e-minicart" também recebe a mesma classe e fica visível (por conta do CSS)
        var minicartActions = function minicartActions(ev) {
            $('.e-header__info--item-minicart').click(function () {
                $(this).toggleClass('is--active');
                $('.e-minicart').toggleClass('is--active');
            });
        };


        //Observadores do carrinho
        var minicartWatcher = function minicartWatcher(ev) {
            // variavel que conta a quantidade de itens existentes no carrinho
            var _items = $('.amount-items-in-cart .amount-items .amount-items-em').eq(0).text();

            // imprime quantos itens tem na sacola (1 iten(s) na Sacola)
            $('.e-header.is--desktop .e-minicart .js--minicart-items, .e-header.is--mobile .e-minicart .js--minicart-items').text(_items + " Iten(s)");

            // insere o numero de produtos no carrinho dentro do icone de carrinho 
            $('.e-header.is--desktop .e-header__info--item-minicart-items.js--minicart-items, .e-header.is--mobile .e-header__info--item-minicart-items.js--minicart-items').text(_items);

            // se não houver itens no carrinho a div dos produtos e footer(atualmente mostra o botão "Fechar Pedido") serão ocultados e a div de carrinho vazinho será exibida (essa div possui a msg de sacola vazia) 
            if (_items < 1) {
                $('.e-minicart__products').hide();
                $('.e-minicart__footer').hide();
                $('.e-minicart__empty').show();
            
                // se houver produtos no carrinhoa div dos produtos e footer(atualmente mostra o botão "Fechar Pedido") serão exibidas e a div de carrinho vazinho será oculta (essa div possui a msg de sacola vazia) 
            } else {
                $('.e-minicart__products').show();
                $('.e-minicart__footer').show();
                $('.e-minicart__empty').hide();
            }
        };

        var mobileActions = function mobileActions(ev) {

            if ($(window).width() <= 767) {
                var _dash = '.e-header__dash';
                var _login = '.e-header__info--item-user';
                var _loginDrop = '.e-header__info--item-user-dropdown';
                var _navigation = '.e-header__navigation';
                var _active = 'is--active';
                var _close = '.js--close--menu';

                $(_dash).click(function () {
                    $(this).toggleClass(_active);
                    $(_navigation).slideToggle();
                    $("body").toggleClass("sem-scroll");
                });

                $(_login).click(function () {
                    $(this).toggleClass(_active);
                    $(_loginDrop).toggleClass(_active);
                });
                $(_close).click(function () {
                    $(this).closest('div').slideUp();
                    $(this).closest('.has-sub').find('.is--active').removeClass('is--active');
                });

                var _sub = '.e-header__menu--item.has-sub > a';
                var _container = '.e-header__menu--item-dropdown';

                $(_sub).click(function () {
                    var _element = $(this);
                    var _accordeon = _element.next('div');
                    $(_container).slideUp();
                    $(_container).removeClass(_active);
                    $(_sub).removeClass(_active);
                    if (_accordeon.is(":visible")) {
                        _accordeon.slideUp();
                        _element.removeClass(_active);
                    } else {
                        _accordeon.slideDown();
                        _element.addClass(_active);
                    };
                    return false;
                });
            }
        };
//executando as funções
        $(function () {
            checkOrderForm();
            removeHelper();
            setLogin();
            checkLogin();
            setNewsletter();
            headerSearchSubmit();
            headerSearchButton();
            minicartActions();
            minicartWatcher();
            (0, _wishlist2.default)();
            scrollToTop();

            mobileActions();
            _shelfColors2.default.Methods.shelfColors();
            _shelfColors2.default.Methods.shelfColorsAction();
        });

        $(document).ready(function () {
            //shelfColors.Methods.shelfSkuLink()
        });
        $(document).ajaxStop(function () {
            removeHelper();
            minicartWatcher();
        });

        $(window).on("load", function () { });

    }, { "../../common/js/config/globals/__cookie-create": 2, "../../common/js/config/globals/__cookie-read": 3, "../../common/js/config/globals/__float-to-currency": 4, "../../common/js/config/master-data/__newsletter": 9, "../../common/js/config/master-data/__wishlist": 10, "../../common/js/config/shelf/__shelf-buy": 11, "../../common/js/config/shelf/__shelf-shop-by-look": 12, "./config/globals/__login": 6, "./config/globals/_shelfColors": 8 }], 2: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = cookieCreate;
        function cookieCreate(_name, _value, _days) {
            var d = new Date();
            d.setTime(d.getTime() + _days * 1000 * 60 * 60 * 24);
            var expires = "expires=" + d.toGMTString();
            window.document.cookie = _name + "=" + _value + "; " + expires + ";path=/";
        }

    }, {}], 3: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = cookieRed;
        function cookieRed(_name) {
            var nameEQ = _name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length, c.length);
                }
            }
            return null;
        }

    }, {}], 4: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = floatToCurrency;
        function floatToCurrency(_float) {
            var s = _float.toString().replace(',', '').split('.'),
                decimals = s[1] || '',
                integer_array = s[0].split(''),
                formatted_array = [];

            for (var i = integer_array.length, c = 0; i != 0; i--, c++) {
                if (c % 3 == 0 && c != 0) {
                    formatted_array[formatted_array.length] = '.';
                }
                formatted_array[formatted_array.length] = integer_array[i - 1];
            }

            if (decimals.length == 1) {
                decimals = decimals + '0';
            } else if (decimals.length == 0) {
                decimals = '00';
            } else if (decimals.length > 2) {
                decimals = Math.floor(parseInt(decimals, 10) / Math.pow(10, decimals.length - 2)).toString();
            }

            return '<span>R$</span> ' + formatted_array.reverse().join('') + ',' + decimals;
        }

    }, {}], 5: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var Globals = {
            /** store globals */
            storeName: 'astrasa'
        };

        exports.default = Globals;

    }, {}], 6: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = getLogin;
        function getLogin(_url) {
            $.ajax({
                url: '/no-cache/profileSystem/getProfile',
                type: 'GET',
                success: function success(data) {
                    if (data.IsUserDefined == false) {
                        vtexid.start({
                            returnUrl: '' + _url,
                            userEmail: '',
                            locale: 'pt-BR',
                            forceReload: false
                        });
                    } else {
                        window.location.href = '/logout';
                    }
                }
            });
        }

    }, {}], 7: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = removeAcentos;
        function removeAcentos(str) {
            var com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßààáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕº";
            var sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr-";
            var novastr = "";
            var i = '';
            var a = '';
            var troca = '';
            for (i = 0; i < str.length; i++) {
                troca = false;
                for (a = 0; a < com_acento.length; a++) {
                    if (str.substr(i, 1) == com_acento.substr(a, 1)) {
                        novastr += sem_acento.substr(a, 1);
                        troca = true;
                        break;
                    }
                }
                if (troca == false) {
                    novastr += str.substr(i, 1);
                }
            }
            return novastr;
        }

    }, {}], 8: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _removeAcentos = require('./__removeAcentos');

        var _removeAcentos2 = _interopRequireDefault(_removeAcentos);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        window.shelfColors = {
            Methods: {
                shelfColors: function (_shelfColors) {
                    function shelfColors() {
                        return _shelfColors.apply(this, arguments);
                    }

                    shelfColors.toString = function () {
                        return _shelfColors.toString();
                    };

                    return shelfColors;
                }(function () {
                    var _shelfItem = '.e-shelf .shelf .e-product';
                    $(_shelfItem).each(function () {
                        var _element = $(this);
                        var _colors = _element.find('.js--colors');
                        var _id = _element.find('.e-id').val();
                        if (!_element.hasClass('e-ajax-success')) {
                            _element.addClass('e-ajax-success');
                            shelfColors.Methods.shelfColorsRequest(_id, _element, _colors);
                        }
                    });
                }),
                shelfColorsRequest: async function shelfColorsRequest(_id, _element, _colors) {
                    $.ajax({
                        headers: {
                            'Accept': 'application/vnd.vtex.ds.v10+json',
                            'Content-Type': 'application/json'
                        },
                        url: '/api/catalog_system/pub/products/variations/' + _id,
                        type: 'GET',
                        success: await function success(response) {
                            var _skus = response.skus;
                            var _count = _skus.length;
                            var _count_initial = 0;
                            for (var index = 0; index < _skus.length; index++) {
                                if (_skus[index].dimensions.COR != undefined) {
                                    var _cor = (0, _removeAcentos2.default)(_skus[index].dimensions.COR).replace(' - ', '-').replace('/', '-').replace(/\s/g, '-').toLowerCase();
                                    var _url = _skus[index].image;
                                    if (!_element.find('.js--colors ul li.' + _cor).length) {
                                        _element.find('.js--colors ul').append('<li data-cor="' + _cor + '" sku="' + _skus[index].sku + '" class="' + _cor + '" data-url="' + _url + '"><span data-cor="' + _cor + '" style="background:url(/arquivos/' + _cor + '.jpg);"></span></li>');
                                    }
                                    _count_initial = _count_initial + 1;
                                    shelfColors.Methods._slickShelfColors(_count, _count_initial, _skus, _element);
                                }
                            }
                        },
                        error: function error(response) { }
                    });
                },
                shelfColorsAction: function shelfColorsAction() {
                    $('body').on('click', '.e-product__colors li', function () {
                        var _element = $(this);
                        var _attrCor = _element.attr('data-cor');
                        var _sku = _element.attr('sku');
                        var _url = _element.attr('data-url');
                        _element.closest('.e-product').find('.e-product__image img').attr({
                            'src': _url,
                            'sku': _sku,
                        });
                    });
                },
                _slickShelfColors: function _slickShelfColors(_count, _count_initial, _skus, _element) {
                    if (_count_initial == _count) {
                        _element.find('.js--colors > ul').slick({
                            slidesToShow: 5,
                            slidesToScroll: 1,
                            arrows: true,
                            dots: false
                        });
                    }
                },
                shelfSkuLink: function shelfSkuLink() {
                    $('.shelf ul li .e-product a').each(function () {
                        var _element = $(this);
                        var _skus = _element.closest('.e-product').find('.e-sku').val();
                        var _link = _element.attr('href');

                        if (_link.indexOf('idsku') == -1) {
                            _element.attr('href', _link + '?idsku=' + _skus);
                        };
                    });
                }
            }
        };

        exports.default = shelfColors;

    }, { "./__removeAcentos": 7 }], 9: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = getNewsletter;

        var _globals = require('../globals/__globals');

        var _globals2 = _interopRequireDefault(_globals);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function getNewsletter(_json) {
            $.ajax({

                data: JSON.stringify(_json),
                type: 'PATCH',
                url: 'https://astrasa.myvtex.com/_v/clients',

                success: function success(data) {
                    $('.e-footer__newsletter--form').hide();
                    $('.js--newsletter input').attr('value', '');
                    $('.e-footer__newsletter--error').fadeOut();
                    $('.e-footer__newsletter--success').fadeIn()
                    setTimeout(function () {
                        $('.e-footer__newsletter--form').fadeIn();
                        $('.e-footer__newsletter--error').fadeOut();
                        $('.e-footer__newsletter--success').fadeOut();
                    }, 4000);
                },
                error: function error(data) {
                    $('.js--newsletter input').attr('value', '');
                    $('.e-footer__newsletter--form').hide();
                    $('.e-footer__newsletter--success').fadeOut();
                    $('.e-footer__newsletter--error').fadeIn();
                    setTimeout(function () {
                        $('.e-footer__newsletter--form').fadeIn();
                        $('.e-footer__newsletter--error').fadeOut();
                        $('.e-footer__newsletter--success').fadeOut();
                    }, 4000);
                }
            });
        }

    }, { "../globals/__globals": 5 }], 10: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = wishlist;
        function wishlist() {

            var _headers = {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json'
            };
            var _storeName = 'astrasa';
            var _product_id = null;
            var _remove_product = null;

            function _loadingCreate() {
                $('body').append('<div id="e-wishlist-loader" style="background: url(https://econverse.digital/loader.gif) #0006 center no-repeat;position: fixed;width: 100%; height: 100%;z-index: 9999;background-size: 80px; top:0; left:0;"></div>');
            }

            function _loadingRemove() {
                $('#e-wishlist-loader').remove();
            }

            function start() {
                vtexjs.checkout.getOrderForm().done(function (_user_infos) {
                    if (_user_infos.loggedIn != false) {
                        var _email = _user_infos.clientProfileData.email;
                        userid(_email);
                    };
                });
            }

            function login() {
                vtexid.start({
                    returnUrl: '',
                    userEmail: '',
                    locale: 'pt-BR',
                    forceReload: false
                });
            }

            function click() {
                var _product = '.js--add--wishlist';
                var _shelf = '.js-add-wishlist';

                $(_product).click(function (event) {
                    var _element = $(this);
                    var _product_id = skuJson_0.productId;
                    if (_element.hasClass('e-selected')) {

                        $('.e-product__image--heart').addClass('e-hide');
                        _remove_product = true;
                        _element.removeClass('e-selected');
                        user(_product_id, _remove_product);
                    } else {
                        _element.addClass('e-selected');
                        $('.e-product__image--heart').removeClass('e-hide');
                        user(_product_id);
                    };

                    _loadingCreate();
                });

                $('body').on('click', _shelf, function () {
                    var _element = $(this);
                    var _product_id = _element.closest('.e-product').find('.e-id').val();

                    if (!_element.hasClass('e-selected')) {
                        _element.addClass('e-selected');
                        user(_product_id);
                    } else {
                        _element.removeClass('e-selected');
                        _remove_product = true;
                        user(_product_id, _remove_product);
                    };

                    _loadingCreate();
                });
            }

            function user(_product_id, _remove_product) {
                vtexjs.checkout.getOrderForm().done(function (_user_infos) {

                    if (_user_infos.loggedIn == false) {
                        login();
                    } else {
                        var _email = _user_infos.clientProfileData.email;
                        userid(_email, _product_id, _remove_product);
                    };
                });
            }

            function userid(_email, _product_id, _remove_product) {

                var settings = {
                    'url': `https://astrasa.myvtex.com/conect-md/search/CL/?where=(email=${_email})&fields=id&v=${Math.random()}`,
                    'method': 'GET',
                    'timeout': 0,
                };

                $.ajax(settings).done(function (data) {
                    if ($(data).length) {
                        var _user_id = data[0].id;
                        get_products_ids(_email, _user_id, _product_id, _remove_product)
                    } else {
                        createUser(_email)
                    }
                })
            }

            function get_products_ids(_email, _user_id, _product_id, _remove_product) {
                $.ajax({
                    type: 'GET',
                    url: `https://astrasa.myvtex.com/conect-md/search/CL/?where=(email=${_email})&fields=id,wishlist&v=${Math.random()}`,

                    success: function success(_wishlist) {
                        var _wishlist_products_ids = _wishlist[0].wishlist;
                        if (_wishlist_products_ids != "" && _wishlist_products_ids != null && _wishlist_products_ids != undefined) {
                            if (_product_id != null) {
                                if (_remove_product == true) {
                                    var _product_id_format = "," + _product_id;
                                    _wishlist_products_ids = _wishlist_products_ids.replace(_product_id_format, "").replace(_product_id, "");
                                    create(_user_id, _wishlist_products_ids);
                                } else {
                                    _wishlist_products_ids = _wishlist_products_ids + "," + _product_id;
                                    create(_user_id, _wishlist_products_ids);
                                };
                            } else {
                                _success(_wishlist_products_ids);
                            }
                        } else {

                            if (_product_id != null) {
                                if (_remove_product == true) {
                                    var _product_id_format = "," + _product_id;
                                    _wishlist_products_ids = _product_id.replace(_product_id_format, "").replace(_product_id, "");
                                } else {
                                    var _wishlist_products_ids = _product_id;
                                }
                                create(_user_id, _wishlist_products_ids);
                            } else {
                                create(_user_id, _wishlist_products_ids)
                            }
                        }
                    }
                });
            }

            function create(_user_id, _wishlist_products_ids) {

                if (_wishlist_products_ids != undefined && _wishlist_products_ids != null) {
                    var _json = {
                        entity: 'CL',
                        data: {
                            userId: _user_id,
                            wishlist: _wishlist_products_ids
                        }
                    };

                    $.ajax({
                        headers: _headers,
                        data: JSON.stringify(_json),
                        type: 'PATCH',
                        url: 'https://astrasa.myvtex.com/conect-md/update/',

                        success: function success(_wishlist) {
                            _success(_wishlist_products_ids);
                        }
                    });
                }
            }

            function _success(_wishlist_products_ids) {
                seleteds(_wishlist_products_ids);
                page(_wishlist_products_ids);
                _loadingRemove();
            }

            function seleteds(_wishlist_products_ids) {

                if (_wishlist_products_ids != "" && _wishlist_products_ids != null && _wishlist_products_ids != undefined) {
                    var _products = _wishlist_products_ids.split(',');
                    if ($('body').hasClass('produto')) {
                        var _button = $('.js--add--wishlist');

                        for (var i = _products.length - 1; i >= 0; i--) {
                            var _product_id = _products[i];
                            if (_product_id == skuJson_0.productId) {
                                _button.addClass('e-selected');

                                $('.e-product__image--heart').removeClass('e-hide');
                            };
                        };
                    };
                    $('.shelf .e-product').each(function (index, el) {
                        var _element = $(this);
                        var _id = _element.find('.e-id').val();

                        for (var i = _products.length - 1; i >= 0; i--) {
                            var _product_id = _products[i];

                            if (_product_id == _id) {
                                _element.find('.js-add-wishlist').addClass('e-selected');
                            };
                        };
                    });

                    if ($('body').hasClass('wishlist')) {
                        setTimeout(function () {
                            $('.shelf .e-product').each(function (index, el) {
                                var _element = $(this);
                                var _id = _element.find('.e-id').val();

                                _element.find('.js-add-wishlist').addClass('e-selected');
                            });
                        }, 1000);
                    };
                };
            }

            function page(_wishlist_products_ids) {
                if ($('body').hasClass('wishlist')) {

                    var _loading_check = 0;

                    _loadingCreate();

                    if (_wishlist_products_ids != "" && _wishlist_products_ids != null) {
                        var _product_id = _wishlist_products_ids.split(/,/g);

                        var _list_products = _product_id.filter(function (id) {
                            return $.trim(id);
                        }).map(function (id) {
                            return 'fq=productId:' + id;
                        }).join('&');

                        var _shelf_id = 'd886540c-65e5-4360-9003-b6f90136adcf';
                        $.ajax('/buscapagina?' + _list_products + '&PS=40&sl=' + _shelf_id + '&cc=100&sm=0&PageNumber=1', {
                            async: false
                        }).done(function (data) {
                            $('#x-get-products').html(data);

                            var _count_items = $('#x-get-products').find('.e-product').length;
                            if (_count_items > 1) {
                                $('.js--count').html(_count_items + ' produtos');
                            } else {
                                $('.js--count').html(_count_items + ' produto');
                            }
                            _loadingRemove();
                            _loading_check = 1;
                        }).fail(function () {
                            console.log('Ocorreu um erro!');
                            _loadingRemove();
                        });
                    } else {
                        $('#x-get-products').html('<p id="e-wishlist-empty">Não há nenhum produto em sua Wishlist!</p>');
                        _loadingRemove();
                    };
                };
            }

            function createUser(_email) {
                var _json = {
                    entity: 'CL',
                    data: {
                        email: _email
                    }
                };

                $.ajax({

                    data: JSON.stringify(_json),
                    type: 'PATCH',
                    processData: false,
                    contentType: 'application/json-patch+json',
                    url: 'https://astrasa.myvtex.com/conect-md/update/',
                    success: function (data) {
                        console.log('data', data)
                        userid("matheus.fols@codeby.com.br");
                    },
                    error: function (data) {
                        console.log('error', data)
                    }
                });
            }

            $(document).ready(function () {
                start();
                click();
                seleteds();
                page();
            });
        }

    }, {}], 11: [function (require, module, exports) {
        'use strict';

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = getShelfBuy;

        var _globals = require('../globals/__globals');

        var _globals2 = _interopRequireDefault(_globals);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function getShelfBuy(_shelfClass, _button, _this) {
            var _parents = _this.parents(_shelfClass);
            var _sku = _parents.find('.x-sku').val();
            var _quantity = _parents.find('.js--quantity-value').val();

            var product = {
                id: _sku,
                quantity: _quantity,
                seller: 1
            };

            vtexjs.checkout.getOrderForm().done(function (orderForm) {
                vtexjs.checkout.addToCart([product]).done(function (orderForm) {
                    jQuery.vtex_quick_cart(optionsMiniCart);
                    setTimeout(function () {
                        $('.x-minicart').addClass('is--active');
                    }, 1000);
                    setTimeout(function () {
                        $('.x-minicart').removeClass('is--active');
                    }, 4000);
                });
            });
        }

    }, { "../globals/__globals": 5 }], 12: [function (require, module, exports) {
        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = getShelfShopByLook;
        function getShelfShopByLook(_sku, _quantity) {
            var productsArray = new Array();
            var productsArrayFinal = '';

            productsArray.push({
                "seller": "1",
                "quantity": _quantity,
                "id": _sku
            });

            productsArrayFinal = {
                "orderItems": productsArray
            };

            vtexjs.checkout.getOrderForm().done(function (_orderform) {

                var _orderFormId = _orderform.orderFormId;
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": '/api/checkout/pub/orderForm/' + _orderFormId + '/items?sc=1',
                    "type": "POST",
                    "headers": {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Cache-Control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(productsArrayFinal)
                };

                $.ajax(settings).done(function (response) {
                    $('.x-loading').fadeOut();
                    setTimeout(function () {
                        jQuery.vtex_quick_cart(optionsMiniCart);
                        $('.x-minicart').addClass('is--active');
                    }, 3000);
                });
            });
        }

    }, {}]
}, {}, [1]);
