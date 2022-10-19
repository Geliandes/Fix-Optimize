function cartFix() {
  const cartObserved = document.querySelectorAll(".e-minicart.js--minicart");
  
  if (cartObserved[0] != null || cartObserved[1] != null) {
    const observerCart = new MutationObserver(() => {
      CardMob();
      console.log("executou")
    });
    observerCart.observe((cartObserved[0], cartObserved[1]), {attributes: true});
  }

function CardMob() {
  var home = document.querySelector(".ajax-content-loader");
  var Eminicart = document.querySelector(".e-minicart");
  home.appendChild(Eminicart);
  var EminicartGroup = document.querySelector(".e-minicart__group");
  EminicartGroup.classList.add("e-minicart__group_CardM");

  var divMobile = document.querySelector(
    "body > header.e-header.is--mobile > div > div > div.e-header__left > div.e-header__info > ul > li.e-header__info--item.e-header__info--item-minicart"
  );

  var EminicardProducts = document.querySelector(".e-minicart__products");
  var productList = document.createElement("ul");
  productList.classList.add("items-product-list");
  var divCartInfo = document.querySelector(".e-minicart__total");

  var divSubtotal = document.createElement("div");
  divSubtotal.setAttribute("class", "divSubtotal-cart");

  var divInfo = document.createElement("div");
  divInfo.setAttribute("class", "divInfo-cart");

  var divTotal = document.createElement("div");
  divTotal.setAttribute("class", "divTotal-cart");

  var pSubtotal = document.createElement("p");
  pSubtotal.innerHTML = "Subtotal: ";
  let emSubtotal = document.createElement("em");
  var strongTotal = document.createElement("strong");
  strongTotal.innerHTML = "Total: ";
  let emTotal = document.createElement("em");
  var divFrete = document.createElement("div");
  divFrete.setAttribute("class", "divFrete");
  var pFrete = document.createElement("p");
  pFrete.innerHTML = "Frete: ";
  let valueFrete = document.createElement("em");
  var divCupom = document.createElement("div");
  divCupom.setAttribute("class", "divCupom");
  var pCupom = document.createElement("p");
  pCupom.innerHTML = "Cupom: ";
  let valueCupom = document.createElement("em");
  divSubtotal.appendChild(pSubtotal);
  divSubtotal.appendChild(emSubtotal);
  divCartInfo.appendChild(divSubtotal);
  divFrete.appendChild(pFrete);
  divFrete.appendChild(valueFrete);
  divCupom.appendChild(pCupom);
  divCupom.appendChild(valueCupom);
  divInfo.appendChild(divFrete);
  divInfo.appendChild(divCupom);
  divCartInfo.appendChild(divInfo);
  divTotal.appendChild(strongTotal);
  divTotal.appendChild(emTotal);
  divCartInfo.appendChild(divTotal);
  var EminicartInfo = document.createElement("div");
  EminicartInfo.classList.add("EminicartInfo");
  var modalCupom = document.querySelector(".city-top > span");

  function addItem() {
    EminicardProducts.appendChild(productList);
    vtexjs.checkout.getOrderForm().done(function (orderForm) {
      var itemsCart = orderForm.items;
      for (let i = 0; i < itemsCart.length; i = i + 1) {
        var Price = (itemsCart[i].price / 100) * itemsCart[i].quantity;

        productList.innerHTML += `
          <li class="item item-${i}" single-price="${itemsCart[i].price / 100}">
            <div class="item-img">
              <img src="${itemsCart[i].imageUrl}" alt="image-product">
            </div>
            <div class="item-content">
  
              <p class="item-name">${itemsCart[i].name}</p>
             
              <div class="QuantItem">
                <p class="item-price">${formatCurrency(Price)}</p>
  
                <div class="item-quantity">
                  <p class="btn btn-menos">-</p>
                  <p class="quantity">${itemsCart[i].quantity}</p>
                  <p class="btn btn-mais">+</p>
                </div>
              </div>
  
            </div>
            <p class="item-close">X</p>
          </li>
          `;
        }

      var btnMais = document.querySelectorAll(".btn-mais");
      var btnMenos = document.querySelectorAll(".btn-menos");
      var btnRemove = document.querySelectorAll(".item-close");

      btnMais.forEach(function (button) {
        button.addEventListener("click", clickMais);
      });

      btnMenos.forEach(function (button) {
        button.addEventListener("click", clickMenos);
      });

      btnRemove.forEach(function (button) {
        button.addEventListener("click", removeLink);
      });
    });
  }

  function removeLink(e) {
    var itemIndex = e.path[1].className.slice(-1);
    vtexjs.checkout
      .getOrderForm()
      .then(function (orderForm) {
        var quantity = orderForm.items[itemIndex].quantity;
        var itemsToRemove = [
          {
            index: itemIndex,
            quantity: quantity,
          },
        ];
        return vtexjs.checkout.removeItems(itemsToRemove);
      })
      .done(function (orderForm) {
        /*  alert("Item removido!"); */
        productList.innerHTML = "";
        addItem();
        updateValues();
      });
  }
  function updateValues() {
    vtexjs.checkout.getOrderForm().done(function (orderForm) {
      if (orderForm.items.length < 1) {
        emSubtotal.innerHTML = 0;
        emTotal.innerHTML = 0;
        divFrete.style.display = "none";
        divCupom.style.display = "none";
        document.querySelector(".EminicartInfo").style.display = "none";
      } else {
        emSubtotal.innerHTML = formatCurrency(
          orderForm.totalizers[0].value / 100,
          /* batman */
          orderForm.items[0].formattedPrice / 100
        );
        emTotal.innerHTML = formatCurrency(orderForm.value / 100);

        let frete = 0;
        let isFrete = false;
        let cupom = 0;
        let isCupom = false;
        orderForm.totalizers.map((order) => {
          if (order.id == "Shipping") {
            frete = frete + order.value;
            isFrete = true;
          }
          if (order.id == "Discounts") {
            isCupom = true;
            cupom = cupom + order.value;
          }
        });

        if (isFrete) {
          valueFrete.innerHTML = formatCurrency(frete / 100);
          divFrete.style.display = "flex";
          /* Adiciona o cep ao localStorage*/
          document.querySelector(".inputFrete").value = localStorage.getItem("Cep");

          /*  */
          document.querySelector(".inputFrete").disabled = true;
          document.querySelector(".btnFrete").style.display = "none";
          document.querySelector(".btnFreteRemover").style.display = "block";
        } else {
          divFrete.style.display = "none";
          /* Remove o cep ao localStorage*/
          localStorage.removeItem("Cep");
          document.querySelector(".inputFrete").value =
            localStorage.getItem("Cep");

          document.querySelector(".inputFrete").disabled = false;
          document.querySelector(".btnFrete").style.display = "block";
          document.querySelector(".btnFreteRemover").style.display = "none";
        }

        if (isCupom) {
          valueCupom.innerHTML = formatCurrency(cupom / 100);
          divCupom.style.display = "flex";
          /* Adiciona o cep ao localStorage*/
          document.querySelector(".inputCupom").value =
            localStorage.getItem("Cupom");

          document.querySelector(".inputCupom").disabled = true;
          document.querySelector(".btnCupom").style.display = "none";
          document.querySelector(".btnCupomRemover").style.display = "block";
        } else {
          divCupom.style.display = "none";
          /* Remove o cep ao localStorage*/
          localStorage.removeItem("Cupom");
          document.querySelector(".inputCupom").value = localStorage.getItem("Cupom");

          document.querySelector(".inputCupom").disabled = false;
          document.querySelector(".btnCupom").style.display = "block";
          document.querySelector(".btnCupomRemover").style.display = "none";
        }

        document.querySelector(".EminicartInfo").style.display = "flex";
      }
    });
  }

  function clickMenos(e) {
    var itemIndex = e.currentTarget.closest("li").className.slice(-1);
    var Element = e.currentTarget;

    vtexjs.checkout
      .getOrderForm()
      .then(function (orderForm) {
        var quantityMenos = orderForm.items[itemIndex].quantity;
        if (quantityMenos > 1) {
          var updateItem = {
            index: itemIndex,
            quantity: quantityMenos - 1,
          };
        }
        return vtexjs.checkout.updateItems([updateItem], null, false);
      })
      .done(function (orderForm) {
        var elementQuantity = e.path[1].children[1];
        elementQuantity.innerHTML = orderForm.items[itemIndex].quantity;

        var qtn =
          Element.closest(".item-quantity").querySelector(
            "p.quantity"
          ).innerHTML;

        var singlePrice = Element.closest("li").getAttribute("single-price");

        var result = qtn * singlePrice;
        Element.closest(".QuantItem").querySelector(".item-price").innerHTML =
          formatCurrency(result);

        updateValues();
      });
  }
  function clickMais(e) {
    var itemIndex = e.currentTarget.closest("li").className.slice(-1);
    var Element = e.currentTarget;

    vtexjs.checkout
      .getOrderForm()
      .then(function (orderForm) {
        var quantityMenos = orderForm.items[itemIndex].quantity;
        var updateItem = {
          index: itemIndex,
          quantity: quantityMenos + 1,
        };
        return vtexjs.checkout.updateItems([updateItem], null, false);
      })
      .done(function (orderForm) {
        var elementQuantity = e.path[1].children[1];
        elementQuantity.innerHTML = orderForm.items[itemIndex].quantity;
        var qtn =
          Element.closest(".item-quantity").querySelector(
            "p.quantity"
          ).innerHTML;

        var singlePrice = Element.closest("li").getAttribute("single-price");

        var result = qtn * singlePrice;
        Element.closest(".QuantItem").querySelector(".item-price").innerHTML =
          formatCurrency(result);

        updateValues();
      });
  }

  function formatCurrency(value) {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
  function calculaFrete() {
    var cep = document.querySelector(".inputFrete").value;
    cep = cep.replace("-","")
    localStorage.setItem("Cep", cep);
    //Verifica se campo cep possui valor informado.
    if (cep != "") {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        $(".emTotal").val("...");

        //Consulta o webservice viacep.com.br/
        $.getJSON(
          "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
          function (dados) {
            if (!("erro" in dados)) {
              document.que;
              vtexjs.checkout
                .getOrderForm()
                .then(function (orderForm) {
                  var postalCode = cep; // também pode ser sem o hífen
                  var country = "BRA";
                  var address = {
                    postalCode: postalCode,
                    country: country,
                  };
                  return vtexjs.checkout.calculateShipping(address);
                 
                })
                .done(function (orderForm) {
                  vtexjs.checkout
                    .getOrderForm()
                    .then(function (orderForm) {
                      var postalCode = cep; // também pode ser sem o hífen
                      var country = "BRA";
                      var address = {
                        postalCode: postalCode,
                        country: country,
                      };
                      return vtexjs.checkout.calculateShipping(address);
                    })
                    .done(function (orderForm) {
                      updateValues();
                      /*  alert("Frete calculado."); */
                    });
                });
            } else {
              //CEP pesquisado não foi encontrado.
              alert("CEP não encontrado.");
              $(".inputFrete").val("");
            }
          }
        );
      } //end if.
      else {
        //cep é inválido.
        alert("Formato de CEP inválido.");
        $(".inputFrete").val("");
        $(".inputFrete").val(".");
        $(".inputFrete").val("e");
      }
    } //end if.
    else {
      $(".inputFrete").val("");
    }   
  }

  function calculaDesconto() {
    var cupom = document.querySelector(".inputCupom").value;
    localStorage.setItem("Cupom", cupom);
    //Verifica se campo cep possui valor informado.
    if (cupom != "") {
      vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm) {
          var code = cupom;
          return vtexjs.checkout.addDiscountCoupon(code);
        })
        .then(function (orderForm) {
          var isDiscounts = false;
          orderForm.totalizers.map((order) => {
            if (order.id === "Discounts") {
              isDiscounts = true;
            }
          });
          if (isDiscounts) {
            /*  alert("Cupom adicionado!"); */
            updateValues();
          } else {
            alert("Cupom não encontrado.");
            $(".inputCupom").val("");
          }
        });
    } //end if.
    else {
      $(".inputCupom").val("");
    }
  }
  function modalInfo() {
    var EminicartButton = document.createElement("button");
    EminicartButton.classList.add("EminicartButton");
    var EminicartButton__Is__active = document.createElement("button");
    EminicartButton__Is__active.classList.add("EminicartButton__Is__active");
    var EminicartInfoText = document.createElement("p");
    var EminicartCard = document.createElement("div");

    var linkCupon = document.createElement("span");
    linkCupon.classList.add("linkCupon");
    linkCupon.innerHTML = "Pegue seu Cupom de Desconto";
    linkCupon.addEventListener("click", OpenModalCupom);

    EminicartCard.classList.add("EminicartCard");

    EminicartGroup.appendChild(EminicartInfo);
    EminicartInfo.appendChild(EminicartButton);
    EminicartInfo.appendChild(EminicartButton__Is__active);

    EminicartInfo.appendChild(EminicartInfoText);
    EminicartInfoText.innerHTML = "Informações adicionais";
    EminicartButton.addEventListener("click", ClickOpenInfo);
    EminicartButton__Is__active.addEventListener("click", ClickOpenInfo);
    EminicartInfo.appendChild(EminicartCard);

    EminicartButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
          </svg>
      `;

    EminicartButton__Is__active.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
        `;

    EminicartCard.innerHTML = `
      <label for="frete">Calculo do frete</label>
         <div class="DivCardEminicart">
               <input class="InputCardEminicard inputFrete" id="inputFrete" maxlength="9" placeholder="00000-000" />
               <button class="ButtonCardEminicard btnFrete" type="submit"> Calcular </button>
               <button class="ButtonCardEminicard btnFreteRemover" type="submit"> Remover </button>
         </div>
  
         <a class="NScep" href="https://buscacepinter.correios.com.br/app/endereco/index.php?t">Não sei meu CEP 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </a>
         
         <label for="nome">Cupom de desconto</label>
         <div class="DivCardEminicart">
               <input class="InputCardEminicard inputCupom" id="inputCupom" type="text" placeholder="Código" />
               <button class="ButtonCardEminicard btnCupom" type="submit"> Calcular </button>
               <button class="ButtonCardEminicard btnCupomRemover" type="submit"> Remover </button>
         </div>
         <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.0/jquery.mask.js"></script>
     `;

    EminicartCard.appendChild(linkCupon);

    document.querySelector(".btnFrete").addEventListener("click", calculaFrete);

    document
      .querySelector(".btnCupom")
      .addEventListener("click", calculaDesconto);
    document
      .querySelector(".btnCupomRemover")
      .addEventListener("click", removeCupom);
    document
      .querySelector(".btnFreteRemover")
      .addEventListener("click", removeFrete);
    function ClickOpenInfo() {
      EminicartCard.classList.toggle("EminicartCard__Is--active");

      /* Fazer a verificação */
      EminicartButton.classList.toggle("EminicartButton__Is__active");

      if (EminicartButton.classList.contains("EminicartButton__Is__active")) {
        EminicartButton.style.display = "none";
        EminicartButton__Is__active.style.display = "block";
      } else {
        EminicartButton.style.display = "block";
        EminicartButton__Is__active.style.display = "none";
      }
    }

    /* Botão enter cep */
    var inputEle = document.querySelector("#inputFrete");
    var inputEleButton = document.querySelector(
      ".ButtonCardEminicard.btnFrete"
    );

    inputEle.addEventListener("keyup", function (e) {
      var key = e.which || e.keyCode;
      if (key == 13) {
        // codigo da tecla enter
        inputEleButton.click();
      }
    });


    /* Formatação cep */  
    inputEle.addEventListener('keypress', () => {
        let inputLength = inputEle.value.length

    // MAX LENGHT 5 cep
    if (inputLength == 5) {
        inputEle.value += '-'
      }
    })

  }
  function removeCupom() {
    vtexjs.checkout
      .getOrderForm()
      .then(function (orderForm) {
        return vtexjs.checkout.removeDiscountCoupon();
      })
      .then(function (orderForm) {
        /* alert("Cupom removido."); */
        updateValues();
      });
  }
  function removeFrete() {
    vtexjs.checkout
      .getOrderForm()
      .then(function (orderForm) {
        return vtexjs.checkout.calculateShipping();
      })
      .done(function (orderForm) {
        /* alert("Frete Removido."); */
        updateValues();
      });
  }
  function EventShadow() {
    var Eposition = document.querySelector(".Eposition_shadow");
    Eposition.classList.toggle("Eposition_shadow-is--active");
    Eminicart.classList.toggle("is--active");

    EminicartInfo.innerHTML = "";
    productList.innerHTML = "";
    addItem();
    modalInfo();
    updateValues();
  }
  function OpenModalCupom() {
    modalCupom.click();
  }

  var Eposition = document.querySelector(".e-position");
  var Eposition_shadow = document.createElement("div");
  Eposition.appendChild(Eposition_shadow);
  Eposition_shadow.classList.add("Eposition_shadow");
  var EheaderMinicartAction = document.createElement("span");
  EheaderMinicartAction.classList.add("Eheader_Minicart_Action");
  var eHeaderInfoItem = document.querySelector(
    ".e-header__info--item-minicart"
  );
  eHeaderInfoItem.appendChild(EheaderMinicartAction);
  EheaderMinicartAction.addEventListener("click", EventShadow);
  $(".e-header__info--item-minicart").off("click");
  var EheaderMinicartActionMobile = document.createElement("span");
  EheaderMinicartActionMobile.classList.add("Eheader_Minicart_Action");
  divMobile.appendChild(EheaderMinicartActionMobile);
  EheaderMinicartActionMobile.addEventListener("click", EventShadow);
  var EminicartHeader = document.querySelector(".e-minicart__header");
  EminicartHeader.innerHTML = "";
  var EminicartHeader_div = document.createElement("div");
  EminicartHeader_div.classList.add("nav-menu-barra");
  var first__Barra = document.createElement("span");
  var secord__barra = document.createElement("span");
  first__Barra.classList.add("first__Barra");
  secord__barra.classList.add("secord__barra");
  EminicartHeader_div.appendChild(first__Barra);
  EminicartHeader_div.appendChild(secord__barra);
  var EminicartTitleBox = document.createElement("div");
  EminicartTitleBox.classList.add("EminicartTitleBox");
  var EminicartTitle = document.createElement("span");
  EminicartTitle.classList.add("EminicartTitle");
  EminicartTitle.innerHTML = "Minha sacola";
  var jsMinicartItems = document.createElement("div");
  jsMinicartItems.classList.add("js--minicart-items");
  EminicartHeader.appendChild(EminicartHeader_div);
  EminicartHeader.appendChild(EminicartTitle);
  EminicartHeader.appendChild(jsMinicartItems);
  var EminicartContComp = document.createElement("div");
  EminicartContComp.classList.add("EminicartContComp");
  EminicartContComp.innerHTML = "Continuar comprando";
  EminicartGroup.appendChild(EminicartContComp);
  EminicartHeader_div.addEventListener("click", OffMinicart);
  EminicartContComp.addEventListener("click", OffMinicart);

  function OffMinicart() {
    Eminicart.classList.toggle("is--active");

    var Eposition = document.querySelector(".Eposition_shadow");
    Eposition.classList.toggle("Eposition_shadow-is--active");

    var EminicartCards = document.querySelector(".EminicartCard");
    EminicartCards.classList.add("EminicartCard__Is--active");
  }

  var alt_SubTotal = document.querySelector("#MostraTextoXml5");
  alt_SubTotal.innerHTML = "Subtotal: ";

  function quant() {
    vtexjs.checkout.getOrderForm().done(function (orderForm) {
      console.log(orderForm);
    });
  }
  quant();
  
  function addStyle(styles) {
    var css = document.createElement("style");
    css.type = "text/css";

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
  }
  var styles = `
    input[type=number]{
      -moz-appearance: textfield;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    .e-minicart {
      position: fixed;
      top: 0;
      width: 55vh;
      padding: 8px 16px 16px;
      right: 0;
      border: 1px solid #d6d6d6;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      -webkit-transition: ease-in 0.3s;
      -o-transition: ease-in 0.3s;
      transition: ease-in 0.3s;
      z-index: 9999;
      height: 100vh;
  }
  
  .e-minicart.is--active {
      opacity: 1;
      visibility: visible;
      display: flex;
      flex-direction: column;
      height: 100%;
      right: 0;
      cursor: auto;
  }
  
  .minicart__group_CardM {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  
  .e-minicart.is--active {
      opacity: 1;
      visibility: visible;
      margin: 0;
      padding: 0;
      border: none;
  }
  
  .e-minicart__group_CardM {
      height: 100vh;
      display: flex;
      flex-direction: column;
  }
  
  .blip-chat-open-iframe {
      display: none;
  }
  
  .smarthint-voice-search {
      display: none;
  }
  
  .Eposition_shadow-is--active {
      background: #000000c9;
      width: 100%;
      height: 100vh;
      top: 0;
      right: 0;
      position: fixed;
      display: block;
      cursor: auto;
  }
  
  .e-minicart__header {
      color: #606060;
      font-size: 0.8125rem;
      width: 100%;
      border-bottom: 1px solid #d6d6d6;
      text-align: center;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: #0196D3;
      padding: 20px;
      margin: 0;
  }
  
  .nav-menu-barra {
      cursor: pointer;
      right: 13px;
      position: absolute;
      display: flex;
      align-items: center;
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
  }
  
  .first__Barra {
      transform: translateY(4px) rotateZ(-45deg);
      background: white;
      border: 10px;
      position: absolute;
      width: 1.7rem;
      height: 4px;
      margin-top: -8px;
      border-radius: 10px;
  }
  
  .secord__barra {
      transform: translateY(-6px) rotate(45deg);
      background: white;
      border: 10px;
      position: absolute;
      width: 1.7rem;
      height: 4px;
      margin-top: 12px;
      border-radius: 10px;
  }
  
  .EminicartTitleBox {
      display: flex;
      flex-direction: row;
      color: white;
      font-size: 1.3rem;
      margin: 0 0 0 30px;
  }
  
  .EminicartTitle {
      font-weight: 700;
      font-size: 1.4rem;
      color: white;
  }
  
  .js--minicart-items {
      margin: 0 0 0 10px;
      color: white;
      text-decoration: none !important;
  }
  
  .e-minicart__header .js--minicart-items {
      font-weight: 700;
      font-size: 1.4rem;
  }
  
  .e-minicart__total {
      display: block;
      margin: 0 10%;
  }
  
  .amount-products,
  .amount-items,
  .amount-kits,
  #MostraTextoXml1 {
      display: none;
  }
  
  .e-minicart__buy a {
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -moz-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -moz-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      background: #00a4e3;
      -webkit-border-top-left-radius: 16px;
      border-top-left-radius: 16px;
      -webkit-border-bottom-right-radius: 16px;
      border-bottom-right-radius: 16px;
      font-weight: 700;
      font-size: 12px;
      font-size: 0.75rem;
      color: #FFFFFF;
      text-transform: uppercase;
      height: 42px;
      margin: 0 10%;
      border-radius: 5px;
  }
  
  .total-cart {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
  }
  
  .e-minicart__footer {
      order: 4;
      position: absolute;
      width: 100%;
      bottom: 5vh;
  }
  
  .EminicartButton {
      background: black;
      width: 25px;
      height: 25px;
      border-radius: 15px;
      cursor: pointer;
  }
  
  .EminicartContComp {
      order: 6;
      text-align: center;
      padding: 10px;
      text-decoration: underline;
      bottom: 0;
      position: absolute;
      width: 100%;
      cursor: pointer;
  }
  
  .blip-chat-container_is--active {
      display: none;
  }
  
  .e-minicart__empty {
      margin-top: 5vh;
  }
  
  .Eheader_Minicart_Action {
      position: absolute;
      width: 41px;
      height: 40px;
      right: -15px;
      cursor: pointer;
  }
  
  .EminicartInfo {
      order: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      box-shadow: 0 0 1rem rgb(0 0 0 / 11%);
      margin-bottom: 20px;
      background: white;
      bottom: 20vh;
      position: absolute;
      width: 100%;
  }
  
  .EminicartInfo p {
      text-shadow: 0 0 1rem #0000002e;
      font-weight: 700;
  }
  
  .EminicartInfo__Is--active {
      order: 3;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      box-shadow: 0 0 1rem rgb(0 0 0 / 11%);
      background: white;
      height: 30vh;
  }
  
  .EminicartCard {
      display: none;
  }
  
  .EminicartCard__Is--active {
      width: 90%;
      height: 20vh;
      color: black;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
  }
  
  .DivCardEminicart {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      margin-top: 8px;
  }
  
  .InputCardEminicard {
      border: 1px solid;
      color: black;
      height: 30px;
      width: 65%;
      padding: 10px;
  }
  
  .ButtonCardEminicard {
      border: 1px solid;
      color: black;
      height: 30px;
      width: 30%;
  }
  
  .EminicartButton {
      width: 30px;
      height: 29px;
      border-radius: 15px;
      cursor: pointer;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 1rem #00000042;
      margin-bottom: 10px;
  }
  
  .EminicartButton__Is__active {
      display: none;
      width: 30px;
      height: 29px;
      border-radius: 15px;
      cursor: pointer;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 1rem #00000042;
      margin-bottom: 10px;
      padding: 5px;
  }
  
  .total-cart {
      display: none;
  }
  
  .divSubtotal-cart {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0px;
  }
  
  .divTotal-cart {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      font-weight: 800;
      font-size: 16px;
  }
  
  .p-quantity {
      margin-top: 10px;
      margin-left: 70px;
  }
  
  .js--div-quantity {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 35%;
      margin-left: 70px;
      box-shadow: 0 1px 0 #c1bfbfa1;
  }
  
  .js--div-quantity p {
      margin: 0 10px;
      font-weight: bold;
  }
  
  .js--div-quantity button {
      font-size: 30px;
      padding: 0 5px;
  }
  
  .js--div-quantity button:hover {
      background-color: #e3e2e2;
  }
  
  .js--div-quantity button:active {
      font-weight: 800;
  }
  
  .e-minicart__products {
      height: 59%;
  }
  
  .product-list {
      display: none
  }
  
  .items-product-list {
      height: 100%;
      overflow-y: scroll;
      padding: 0;
  }
  
  .item {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
  }
  
  .item-img img {
      max-width: 110px;
      margin-left: 30px;
      margin-right: 20px;
  }
  
  .item-content {
      width: 80%;
  }
  
  .item-name {
      width: 90%;
      font-size: 16px;
  }
  
  .item-price {
      font-weight: bold;
      font-size: 16px;
      margin: 5px 0;
  }
  
  .text-quantity {
      font-size: 18px;
  }
  
  .item-quantity {
      width: 38%;
      height: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 0 1rem #0000001a;
      margin-left: 10px;
      padding: 5px;
      border-radius: 3px;
  }
  
  .item-quantity .quantity {
      font-weight: 800;
      font-size: 16px;
  }
  
  .item-quantity .btn {
      font-size: 30px;
      cursor: pointer;
  }
  
  .item-quantity .btn:hover {
      background-color: #e3e2e2;
  }
  
  .item-quantity .btn:active {
      font-weight: 800;
  }
  
  .item-close {
      color: black;
      margin-right: 30px;
      font-weight: bold;
      cursor: pointer;
      width: fit-content;
      height: fit-content;
      font-size: 14px;
      text-shadow: 0 1px black;
      font-weight: 400;
  }
  
  .item-close:hover {
      transform: scale(105%);
  }
  
  .item-close:active {
      text-shadow: 1px 1px black;
  }
  
  .divFrete,
  .divCupom {
      justify-content: space-between;
      font-size: 14px;
      display: none;
      color: #000;
  }
  
  
  #blip-chat-container {
      z-index: 0 !important;
  }
  
  .linkCupon {
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
      color: #0196D3;
  }
  
  .NScep {
      font-size: 13px;
      font-weight: 500;
      line-height: 1;
      padding: 0px !important;
      text-decoration: underline;
      text-transform: none;
      margin-bottom: 15px;
      color: #0196D3;
  
  }
  
  .NScep svg {
      width: 11px;
  }
  
  .QuantItem {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  .item-content {
      width: 70%;
      margin: 0 0 0 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
  }
  
  .item-0 {
      margin-top: 5px !important;
  
  }
  
  @media (max-width: 600px) {
      .EminicartCard__Is--active {
          width: 90%;
          height: 28vh;
          color: black;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
      }
  }
  
  @media (max-width: 1024px) {
      .e-minicart {
          width: 100%;
      }
  
      .item {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
      }
  }
  
  @media (max-width: 1400px) {
      .EminicartCard__Is--active {
          width: 90%;
          height: 33vh;
          color: black;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
      }
  
      .item-content {
          width: 70%;
          margin: 0 0 0 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
      }
  
      .item-0 {
          margin-top: 5px !important;
  
      }
  
      .item-img img {
          max-width: 110px;
          margin-left: 30px;
          margin-right: 20px;
          width: 60%;
      }
  
      .EminicartInfo {
          order: 3;
          margin-bottom: 11vh;
      }
  
      .EminicartContComp {
          order: 6;
          text-align: center;
          padding: 0 0 3px 0;
          text-decoration: underline;
          bottom: 0;
          position: absolute;
          width: 100%;
          cursor: pointer;
          font-size: 15px;
      }
  
      .divTotal-cart {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 16px;
          margin-top: 4px;
      }
  
      .divInfo-cart {
          font-size: 14px;
      }
  
      .divSubtotal-cart {
          font-size: 14px;
      }
  
      .divSubtotal-cart em {
          font-size: 14px;
      }
  
      .divFrete em {
          font-size: 14px;
      }
  
      .divCupom p {
          font-size: 14px;
      }
  
      .divCupom em {
          font-size: 14px;
      }
  
      .item {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
      }
  
      .item-img img {
          max-width: 110px;
          margin-left: 12px;
          margin-right: 0;
          width: 96%;
      }
  
      .item-content {
          width: 70%;
      }
  
      .item-name {
          width: 100%;
          font-size: 12px;
      }
  
      .item-price {
          font-weight: bold;
          font-size: 16px;
          margin: 5px 0;
      }
  
      .text-quantity {
          font-size: 14px;
      }
  
      .item-quantity .btn {
          font-size: 30px;
          cursor: pointer;
          /* width: 12px; */
      }
  
      .item-quantity .quantity {
          font-weight: 800;
          font-size: 16px;
      }
  
      .item-quantity .btn {
          font-size: 30px;
          cursor: pointer;
          /* width: 12px; */
      }
  
      .divTotal-cart {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-weight: 800;
          font-size: 16px;
          margin-top: 4px;
      }
  
      .EminicartTitle {
          font-weight: 700;
          font-size: 1.4rem;
          color: white;
          margin-left: 30px;
      }
  
      .e-minicart__header {
          color: #606060;
          font-size: 0.8125rem;
          width: 100%;
          border-bottom: 1px solid #d6d6d6;
          text-align: center;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          background: #0196D3;
          padding: 13px 20px;
          margin: 0;
      }
  
      .item-close {
          color: black;
          margin-right: 27px;
          margin-left: 5px;
          font-weight: bold;
          cursor: pointer;
          width: fit-content;
          height: fit-content;
          font-size: 16px;
          text-shadow: 0 1px black;
          font-weight: 400;
      }
  
      .EminicartInfo {
          order: 3;
          margin-bottom: 10vh;
      }
  
      .EminicartInfo__Is--active {
          order: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          box-shadow: 0 0 1rem rgb(0 0 0 / 11%);
          background: white;
          height: 20vh;
          margin-bottom: 10vh !important;
      }
  
      .item-content {
          width: 70%;
          margin: 0 0 0 10px;
      }
  
  
  }
      `;

  addStyle(styles);
}
}
//$(window).ready(CardMob);
/* $(document).ready(CardMob); */
 window.addEventListener("load", function () {
  cartFix();
})
