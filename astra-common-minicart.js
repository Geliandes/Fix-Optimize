(function() {
	function r(e, n, t) {
		function o(i, f) {
			if (!n[i]) {
				if (!e[i]) {
					var c = "function" == typeof require && require;
					if (!f && c) return c(i, !0);
					if (u) return u(i, !0);
					var a = new Error("Cannot find module '" + i + "'");
					throw a.code = "MODULE_NOT_FOUND", a
				}
				var p = n[i] = {
					exports: {}
				};
				e[i][0].call(p.exports, function(r) {
					var n = e[i][1][r];
					return o(n || r)
				}, p, p.exports, r, e, n, t)
			}
			return n[i].exports
		}
		for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
		return o
	}
	return r
})()({
		1: [function(require, module, exports) {


'use strict';
// O ! antes da função faz com que ele seja tratado como uma expressão, para que possamos chamá-lo:
!function () {
  /**
   * @param {?} props
   * @return {?}
   */
  var exports = function exports(props) {

    // .extend serve para mesclar o conteúdo de um ou mais objetos no primeiro objeto --jQuery.extend( target, object1 [, objectN ]) --
    // dentro desse objeto estão declaradas algumas classes do html do carrinho e também algumas rotas de alguns botões juntamente com os textos do mesmo
    var options = jQuery.extend({
      container: ".e-minicart__products",
      items: ".amount-items",
      list: ".product-list",
      price_label: "R$ ",
      total_price_currency: "",
      total_price_container: "",
      total_price_label: "",
      cart_conclude: null,
      remove_btn: false,
      finish_order_btn: ".finish-order-btn",
      finish_order_btn_link: "/Site/Carrinho.aspx",
      finish_order_btn_text: "Finalizar compra",
      empty_cart_message: "Carrinho vazio",
      items_text: ["nenhum item", "", ""],
      hover: ".tpl-cart",
      callback: null,
      cart_empty_cb: null,
      quantity: true,
      total_price_class: "leowps-sub",
      total_price_label_class: ".total-price-label",
      dropdown: true,
      show_images: true
    }, props);

    // Objeto com informações sobre a API orderForm da VTEX e declaração de alguns parametros 
    var o = {
      checkoutURL: "/api/checkout/pub/orderForm/",
      temp: null,
      total_itens: 0,
      total: "0,00",
      empty_cart: null,
      itens: 0,
      data: null,
      init: function init(data) {
        o.get.cart.update(data);
      },

      //checkoutUpdateURL é uma função que retorna o objeto 'o' com o caminho da API da VTEX (/api/checkout/pub/orderForm/)
      checkoutUpdateURL: function checkoutUpdateURL() {
        // /api/checkout/pub/orderForm/{idsku}/items/update/ 
        return o.checkoutURL + o.orderFormId + "/items/update/";
      },
      get: {
        cart: {
          update: function update(manifest) {
            var swf_url;
            var n = {
              expectedOrderFormSections: ["items", "paymentData", "totalizers"]
            };
            if (manifest) {
              $.extend(n, manifest);
              swf_url = o.checkoutUpdateURL();
            } else {
              /** @type {string} */
              swf_url = o.checkoutURL;
            }
            //$.ajax executa uma solicitação HTTP (Ajax) assíncrona --jQuery.ajax([configurações])--

            /* Modelo sendo enviado neste exemplo
            url: "/api/checkout/pub/orderForm/{idsku}/items/update/",
            data: '{"expectedOrderFormSections":["items","paymentData","totalizers"]}',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            type: 'POST',

            -- Caso haja sucesso na solicitação, o sucess será executado --

            success: function success(action) {
              o.total_itens = action.items.lenght; (aqui está atribuindo a quantidade de itens dentro de total_itens do objeto "o");
              $(".menu-entrar .item .qty").text(action.items.length); (aqui ele está inserindo a quantidade de itens dentro dos elementos com as classes "menu-entrar", "item" e "qty")

              -- Verificando se a quantidade de itens é maior que 0, caso seja será executado o seguinte --
              if(o.total_itens > 0){
                o.orderFormId = action.orderFormId;
                o.data = action.items;
                o.set.cart.items(); -- aqui vai executar a função items() dentro do objeto set.cart
                o.total = _.intAsCurrency(action.value); --atribuindo o valor total dentro de "total" no objeto "o" e deixando no formato de moeda
                $(".menu-entrar .valor .vl").text(_.intAsCurrency(action.value)); -- pega o valor dos elementos com as classes declaradas e insere o preço com formato de moeda (R$) --
                o.set.cart.total(); -- Executa a função total() do objeto "set.cart"

                -- Verifica se options.dropdown é verdadeiro, se for ele executa a função "dropdown()"" do objeto mount.cart --
                if (options.dropdown) {
                    o.mount.cart.dropdown();
                }

              }
              -- Verificando se a quantidade de itens é igual ou menor que 0, caso seja será executado a função "empty()" do objeto set.cart --

              else {
                o.set.cart.empty();
              }
              -- executa a função "updateValueMinicart()" que serve para adicionar  a classe "e-active" no elemento com a classe ."x-group-cart" caso o total de itens seja maior que 0, caso contrário a classe "e-active" será removida --

              updateValueMinicart(o.total_itens);
            }
          });
            
            */

            $.ajax({
              url: swf_url,
              data: JSON.stringify(n),
              dataType: "json",
              contentType: "application/json; charset=utf-8",
              type: "POST",
              success: function success(action) {
                o.total_itens = action.items.length;
                $(".menu-entrar .item .qty").text(action.items.length);
                if (o.total_itens > 0) {
                  o.orderFormId = action.orderFormId;
                  o.data = action.items;
                  o.set.cart.items();
                  o.total = _.intAsCurrency(action.value);
                  $(".menu-entrar .valor .vl").text(_.intAsCurrency(action.value));
                  o.set.cart.total();
                  if (options.dropdown) {
                    o.mount.cart.dropdown();
                  }
                } else {
                  o.set.cart.empty();
                }
                updateValueMinicart(o.total_itens);
              }
            });
          },

          // -- Função text() --
          text: function text() {
            /** @type {number} */
            var i = options.items_text.length - 1;
            /** @type {number} */
            var j = options.items_text.length - 1 == 2 ? 1 : 0;
            /** @type {string} */
            var status = "undefined" == typeof options.items_text[i] ? "" : " ";
            /** @type {string} */
            var path = "undefined" == typeof options.items_text[j] ? "" : " ";
            var fnText = parseInt(o.total_itens) > 1 ? o.total_itens + status + options.items_text[i] : 0 == o.total_itens ? options.items_text[0] : o.total_itens + path + options.items_text[j];
            return fnText;
          }

        }
      },

      
      // Montagem da estrutura HTML do minicart

      mount: {
        cart: {
          dropdown: function dropdown() {
            var node;
            var a;
            var ocontainer;
            var cmd;
            var bcontainer;
            /** @type {number} */
            var index = 0;
            var dom = options.list.split(".")[1] || "";
            var table = jQuery("<ul/>").addClass(dom);
            var i;
            for (i in o.data) {
              if ("function" == typeof o.data[i]) {
                break;
              }
              var _span_img = '';
              var _span_product = '';
              var _remove_btn = '';
              var guid = o.data[i].productId;
              node = jQuery("<li>").addClass("row").addClass("row-" + index).attr("sku", guid);
              a = jQuery("<div>").addClass("col").addClass("col-0");
              _span_img = jQuery("<div>").addClass("_qc-img").addClass("_qc-img-" + index).attr("sku", guid);
              _span_product = jQuery("<div>").addClass("_qc-product").addClass("_qc-product-" + index);
              jQuery(_span_product).text(o.data[i].name);
              jQuery(a).append(_span_img.html('<img src="' + o.data[i].imageUrl.replace("55-55", "300-300") + '" />'));
              if (options.show_images) {
                jQuery(a).append(_span_product);
              }
              ocontainer = jQuery("<div>").addClass("col").addClass("col-1");
              var quantity = o.data[i].quantity;
              var $label = jQuery('<input type="text" value="' + quantity + '" maxlength="2" />').attr("ndx", index).addClass("_qty").addClass("_qty-" + index).attr("sku", guid);
              var photoText = jQuery("<a>", {
                ndx: index
              }).addClass("_add").addClass("_add-" + index).text("+");
              var n = jQuery("<a>", {
                ndx: index
              }).addClass("_remove").addClass("_remove-" + index).text("-");
              jQuery(ocontainer).append(n).append($label).append(photoText);
              /** @type {string} */
              var extension = (o.data[i].sellingPrice / 100).toFixed(2).toString().replace(/\./, ",");
              /** @type {string} */
              var filename = options.price_label + mformatCurrency(o.data[i].sellingPrice);



              cmd = jQuery("<div>").addClass("col").addClass("col-2").html(filename);
              var value = o.data[i].id;
              _remove_btn = jQuery("<a>").addClass("remove-link").addClass("remove-link-" + index).attr({
                sku: value,
                index: index
              }).html("Remover");
              bcontainer = jQuery("<div>").addClass("col").addClass("col-3");
              jQuery(bcontainer).append(_remove_btn);
              jQuery(node).append(a).append(ocontainer).append(cmd).append(bcontainer);
              jQuery(table).append(node);
              index++;
            }
            jQuery(options.container).html(table);
            o.set.events();
            o.set.cart.conclusion();
            o.set.cart.active();
            options.show_images;
          }
        }
      },
      set: {
        cart: {
          items: function items() {
            var formattedChosenQuestion = o.get.cart.text();
            jQuery(options.items).html(formattedChosenQuestion);
          },
          total: function total() {
            var formattedChosenQuestion = options.total_price_currency + o.total;
            jQuery(options.total_price_container).html(formattedChosenQuestion);
          },
          empty: function empty() {
            jQuery(options.hover).unbind().removeClass("active").addClass("empty");
            var unnecessaryRequire = o.get.cart.text();
            o.set.cart.items(unnecessaryRequire);
            if (jQuery(options.container).length > 0) {
              jQuery(options.container).html("");
            }
            if ("function" == typeof options.cart_empty_cb) {
              options.cart_empty_cb();
            }
          },
          conclusion: function conclusion() {
            var solutionarea = jQuery("<div/>").addClass("cart_conclude");
            if (jQuery(options.cart_conclude).length > 0) {
              solutionarea = jQuery(options.cart_conclude);
            }
            var fixedClass = options.finish_order_btn.substring(1) || "";
            var photoText = jQuery("<a/>").addClass(fixedClass).attr("href", options.finish_order_btn_link).html(options.finish_order_btn_text);
            jQuery(solutionarea).append(photoText);
            var i = options.total_price_currency + o.total;
            $('<div class="e-finish"><div class="e-total"><div class="e-valorTotal">' + i + '</div><div class="e-actions"><div class="e-tocart"><a href="/checkout/#/cart">Finalizar compra</a></div></div></div></div>').appendTo("#quickCartDropdown");
          },
          active: function active() {
            jQuery(options.hover).removeClass("empty").addClass("available");
            if ("function" == typeof options.callback) {
              options.callback();
            }
          }
        },
        events: function events() {
          /**
           * @return {undefined}
           */
          var init = function init() {
            jQuery(options.hover).hover(function () {
              jQuery(this).addClass("active");
            }, function () {
              jQuery(options.hover).removeClass("active");
            });
          };
          /**
           * @param {string} res
           * @return {undefined}
           */
          var validate = function validate(res) {
            o.init({
              orderItems: [{
                index: res,
                quantity: 0
              }]
            });
          };
          /**
           * @return {undefined}
           */
          var bind = function bind() {
            jQuery(options.container).find(".remove-link").click(function () {
              validate($(this).attr("index"));
            });
          };
          /**
           * @param {string} start
           * @param {number} quantity
           * @return {undefined}
           */
          var get = function get(start, quantity) {
            jQuery(options.container).find("._qty,._add,._remove").removeClass("active").removeClass("keydown_binding");
            jQuery(options.container).find("._qty").attr("readonly", true);
            o.init({
              orderItems: [{
                index: start,
                quantity: quantity
              }]
            });
          };
          /**
           * @return {undefined}
           */
          var makeProblem = function makeProblem() {
            jQuery(options.container).find('._qty:not(".keydown_binding")').addClass("keydown_binding").keydown(function (event) {
              var e = event.charCode || event.keyCode || 0;
              return 8 == e || 9 == e || 46 == e || e >= 37 && 40 >= e || e >= 48 && 57 >= e || e >= 96 && 105 >= e;
            });
          };
          /**
           * @return {undefined}
           */
          var bindEvents = function bindEvents() {
            jQuery(options.container).find('._add:not(".active")').addClass("active").click(function () {
              _ndx = jQuery(this).attr("ndx");
              /** @type {number} */
              _val = parseInt(jQuery("._qty-" + _ndx).val());
              /** @type {number} */
              _val = _val >= 99 ? 99 : _val + 1;
              jQuery("._qty-" + _ndx).val(_val).change();
            });
            jQuery(options.container).find('._remove:not(".active")').addClass("active").click(function () {
              _ndx = jQuery(this).attr("ndx");
              /** @type {number} */
              _val = parseInt(jQuery("._qty-" + _ndx).val());
              /** @type {number} */
              _val = 1 >= _val ? 1 : _val - 1;
              jQuery("._qty-" + _ndx).val(_val).change();
            });
            jQuery(options.container).find('._qty:not(".active")').addClass("active").keyup(function () {
              if (jQuery(this).val() < 1) {
                jQuery(this).val(1);
              } else {
                if (jQuery(this).val() > 99) {
                  jQuery(this).val(99);
                }
              }
            }).change(function () {
              get(jQuery(this).attr("ndx"), jQuery(this).val());
            });
          };
          init();
          bind();
          makeProblem();
          bindEvents();
        }
      },
      refresh: function refresh() {
        o.init();
      }
    };
    o.init();
    /**
     * @return {?}
     */
    var stylesheet = function stylesheet() {
      return {
        refresh: o.refresh
      };
    };
    return stylesheet();
  };
  /**
   * @param {?} app
   * @return {?}
   */
  jQuery.vtex_quick_cart = function (app) {
    return new exports(app);
  };
}(jQuery);
window.optionsMiniCart = {
  items_text: ['<em class="amount-items-em">0</em>', "", ""],
  callback: function callback() {
    vtexjs.checkout.getOrderForm().done(function (references2) {
      var clojIsReversed = references2.items[0].quantity;
      updateValueMinicart(clojIsReversed);
    });
  }
};
jQuery.vtex_quick_cart(optionsMiniCart);
/**
 * @param {number} isSlidingUp
 * @return {undefined}
 */
function updateValueMinicart(isSlidingUp) {
  if (isSlidingUp > 0) {
    $(".x-group-cart").addClass("e-active");
  } else {
    $(".x-group-cart").removeClass("e-active");
  }
}
function mformatCurrency (int)
  {
    var tmp = int+'';
    var neg = false;
    if(tmp.indexOf("-") == 0){
      neg = true;
      tmp = tmp.replace("-","");
    }
    if(tmp.length == 1) tmp = "0"+tmp
      tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6)
      tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    if( tmp.length > 9)
      tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");
    if( tmp.length > 12)
      tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");
    if(tmp.indexOf(".") == 0) tmp = tmp.replace(".","");
    if(tmp.indexOf(",") == 0) tmp = tmp.replace(",","0,");
    return (neg ? '-'+tmp : tmp);
  }

;

},{}]},{},[1]);
