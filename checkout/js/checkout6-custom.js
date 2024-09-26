// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.

window.addEventListener('popstate', function () {
  if (window.location.hash.indexOf('#/shipping') != -1) {
    const entregas = document.querySelectorAll(
      '.shp-option-text-label.vtex-omnishipping-1-x-leanShippingTextLabel'
    )

    entregas.forEach(entrega => {
      if (isCombinarEntrega(entrega.innerText)) {
        entrega.parentElement.parentElement.lastChild.innerText = 'A combinar'
      }
    })
  }
})

// Função para verificar se o texto é "combinar entrega" de forma case insensitive
function isCombinarEntrega(text) {
  return text.trim().toLowerCase() === 'combinar entrega'
}

function escondeCombinarEntrega() {
  // Página do cart
  if (window.location.hash.indexOf('#/cart') != -1) {
    let temCombinacao = false

    document.querySelectorAll('tbody tr.product-item').forEach(prod => {
      let slaNameElement = prod.querySelector('.sla-name small')
      let shippingEstimateDateElement = prod.querySelector(
        '.shipping-date .shipping-estimate-date'
      )

      if (slaNameElement != null && shippingEstimateDateElement != null) {
        if (isCombinarEntrega(slaNameElement.innerText)) {
          temCombinacao = true
          sessionStorage.setItem('temCombinacao', 'true')

          // Troca nome da estratégia
          shippingEstimateDateElement.textContent = 'Combinar entrega'

          // Retira todos os prazos do dropdown
          if (
            document.querySelector(
              '.srp-shipping-current-single__description .srp-shipping-current-single__price'
            ) != null
          ) {
            // Prazos variados
            if (
              isCombinarEntrega(
                document.querySelector(
                  '.srp-shipping-current-single__description .srp-shipping-current-single__sla.gray'
                ).textContent
              )
            ) {
              document
                .querySelectorAll(
                  '.srp-shipping-current-single__description .srp-shipping-current-single__price, .srp-result p.srp-packages'
                )
                .forEach(item => item.setAttribute('style', 'display: none;'))
            }
          }

          setTimeout(() => {
            // Prazo único
            let deliveryCurrentManyName = document.querySelector(
              '.srp-delivery-current-many__description .srp-delivery-current-many__name'
            )
            if (
              deliveryCurrentManyName != null &&
              isCombinarEntrega(deliveryCurrentManyName.textContent)
            ) {
              document
                .querySelectorAll(
                  '.srp-delivery-current-many__description .srp-delivery-current-many__sla, .srp-delivery-current-many__description .srp-delivery-current-many__price'
                )
                .forEach(item => item.setAttribute('style', 'display: none;'))
            }

            document.querySelectorAll('option').forEach(item => {
              if (isCombinarEntrega(item.value)) {
                item.textContent = 'Prazos e valores a combinar'
              }
            })
          }, 2000)

          if (
            document.querySelector(
              'tbody.totalizers-list .srp-summary-result .monetary'
            ) != null &&
            document.querySelector(
              'tbody.totalizers-list .srp-summary-result .monetary'
            ).textContent == 'Grátis'
          ) {
            document.querySelector(
              'tbody.totalizers-list .srp-summary-result .monetary'
            ).textContent = 'Vamos calcular o frete e entrar em contato.'
          }
        }

        shippingEstimateDateElement.classList.add('loaded')
      }
    })

    // Se o item da combinação for removido
    if (!temCombinacao && sessionStorage.getItem('temCombinacao') === 'true') {
      sessionStorage.setItem('temCombinacao', 'false')
      location.reload()
    }
  } else {
    if (sessionStorage.getItem('temCombinacao') === 'true') {
      document
        .querySelectorAll(
          '.shipping-data .vtex-omnishipping-1-x-SummaryItemPrice, .shipping-data .shp-summary-group-info .shp-summary-package'
        )
        .forEach(item => item.setAttribute('style', 'display: none;'))

      setTimeout(() => {
        document
          .querySelectorAll(
            '.summary-cart-template-holder li.hproduct span.shipping-date'
          )
          .forEach(item => {
            if (isCombinarEntrega(item.textContent)) {
              item.textContent = 'A combinar'
            }
          })
      }, 500)
    }
  }
}

function escondeRetirada(URLchange) {
  if (
    window.location.hash.indexOf('#/shipping') != -1 ||
    window.location.hash.indexOf('#/cart') != -1 ||
    window.location.hash.indexOf('#/payment') != -1 ||
    window.location.hash.indexOf('#/profile') != -1
  ) {
    let timer = setInterval(() => {
      if (document.querySelector('.srp-delivery-select') != null) {
        if (
          document.querySelector('.srp-delivery-select').value ==
          'Retirada em Bauru'
        ) {
          document
            .querySelector('.srp-result .srp-delivery-header')
            .setAttribute('style', 'display: none;')

          //Esconde o prazo na tela de pagamento
          if (document.querySelector('.shp-summary-package-time') != null) {
            document
              .querySelector('.shp-summary-package-time')
              .setAttribute('style', 'display: none;')
          }
        } else {
          if (
            document.querySelector('.srp-result .srp-delivery-header').style
              .display == 'none'
          ) {
            document
              .querySelector('.srp-result .srp-delivery-header')
              .setAttribute('style', 'display: block;')
          }

          if (
            document.querySelector('.shp-summary-package-time') != null &&
            document.querySelector('.shp-summary-package-time').style.display ==
              'none'
          ) {
            document
              .querySelector('.shp-summary-package-time')
              .setAttribute('style', 'display: block;')
          }
        }

        if (
          document.querySelector(
            'label.shp-lean-option[id="Retirada em Bauru"]'
          ) != null
        ) {
          document
            .querySelector(
              'label.shp-lean-option[id="Retirada em Bauru"] .shp-option-text-package'
            )
            .setAttribute('style', 'display: none;')
        }

        clearInterval(timer)
      }
    }, 100)

    let timer1 = setInterval(() => {
      if (
        document.querySelector(
          '.srp-delivery-current-many__description .srp-delivery-current-many__name'
        ) != null
      ) {
        if (
          document.querySelector(
            '.srp-delivery-current-many__description .srp-delivery-current-many__name'
          ).textContent == 'Retirada em Bauru'
        ) {
          document
            .querySelectorAll(
              '.srp-delivery-current-many__description .srp-delivery-current-many__sla'
            )
            .forEach(item => item.setAttribute('style', 'display: none;'))

          setTimeout(() => {
            document
              .querySelectorAll('.hproduct .shipping-date')
              .forEach(item => item.setAttribute('style', 'display: none;'))
          }, 1000)
        } else if (
          document
            .querySelector(
              '.srp-delivery-current-many__description .srp-delivery-current-many__name'
            )
            .textContent.toLowerCase() != 'combinar entrega'
        ) {
          document
            .querySelectorAll(
              '.srp-delivery-current-many__description .srp-delivery-current-many__sla'
            )
            .forEach(item => item.setAttribute('style', 'display: block;'))

          setTimeout(() => {
            document
              .querySelectorAll('.hproduct .shipping-date')
              .forEach(item => item.setAttribute('style', 'display: block;'))
          }, 1000)
        }

        document
          .querySelectorAll('option[value="Retirada em Bauru"]')
          .forEach(item => (item.textContent = 'Grátis'))

        document.querySelectorAll('tbody tr.product-item').forEach(prod => {
          if (
            prod.querySelector('.sla-name small').innerText ==
            'Retirada em Bauru'
          ) {
            //Troca nome da estratégia
            prod.querySelector(
              '.shipping-date .shipping-estimate-date'
            ).textContent = 'Indefinido'
          }
        })

        clearInterval(timer1)
      }
    }, 100)
  }
}

function iniciarObservacao() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(() => {
      escondeCombinarEntrega()
      escondeRetirada()
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  })
}
window.addEventListener('load', iniciarObservacao)

window.addEventListener('load', () => {
  setTimeout(() => {
    escondeCombinarEntrega()
    escondeRetirada()

    const intervalId = setInterval(() => {
      const element = document.querySelector('#shipping-preview-container')

      // Se o elemento for encontrado, executa o callback e limpa o intervalo
      if (element) {
        element.addEventListener('change', function () {
          escondeCombinarEntrega()
          escondeRetirada()
          window.location.reload()
        })
        clearInterval(intervalId)
      }
    }, 250)
  }, 400)
})

window.addEventListener('hashchange', function () {
  setTimeout(() => {
    escondeCombinarEntrega()
    escondeRetirada(true)
  }, 500)

  const intervalId = setInterval(() => {
    const element = document.querySelector('#delivery-packages-options')

    // Se o elemento for encontrado, executa o callback e limpa o intervalo
    if (element) {
      element.addEventListener('change', function () {
        escondeCombinarEntrega()
        escondeRetirada()
      })
      clearInterval(intervalId)
    }
  }, 250)
})

window.addEventListener('load', () => {
  ;(function () {
    'use strict'
    var oldXHR, stateChangeHandler, prop

    oldXHR = window.XMLHttpRequest

    stateChangeHandler = function (evt) {
      switch (this.readyState) {
        case oldXHR.OPENED:
          //console.log('Request was made', this, evt);
          break
        case oldXHR.DONE:
          //console.log(this.responseURL);
          if (this.responseURL.indexOf('/items/update/') != -1) {
            setTimeout(() => {
              escondeCombinarEntrega()
              escondeRetirada()
            }, 1500)
          } else if (
            this.responseURL.indexOf('/attachments/shippingData') != -1
          ) {
            escondeRetirada()
          }
          break
      }
    }

    function newXHR() {
      var xhr = new oldXHR()
      xhr.addEventListener('readystatechange', stateChangeHandler)
      return xhr
    }

    // Copy original states and toString
    for (prop in oldXHR) newXHR[prop] = oldXHR[prop]

    window.XMLHttpRequest = newXHR
  })()
})

//Adiciona o campo de data de nascimento no checkout
const checkoutField = {
  documentCustomer: '',

  birthdateField: async function () {
    const res = await fetch(`/api/checkout/pub/orderForm/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    //Caso o cliente já tenha inserido o e-mail
    if (data.clientProfileData != null) {
      this.documentCustomer = data.clientProfileData.document

      this.createElement(true)
    } else {
      this.createElement(false)
    }
  },

  createElement: function (hasAccount) {
    if (
      document.querySelector('body.body-order-form') != null &&
      document.querySelector('.box-client-info-pf p.birthdate') == null
    ) {
      const p = document.createElement('p')
      p.classList.add('birthdate', 'input', 'pull-left', 'text', 'mask')
      p.innerHTML = `
      <label for="birthDate" data-bind="text: documentLabel">Data de nascimento</label><input type="date" id="birthDate" class="input-small" data-bind="required: true">
        `

      const birthdateInput = p.querySelector('input')

      birthdateInput.addEventListener('change', () => {
        birthdateInput.value != ''
          ? birthdateInput.classList.add('success')
          : birthdateInput.classList.remove('success')
      })

      document.querySelector('.box-client-info-pf').append(p)

      document
        .querySelector('form.form-step.box-edit')
        .addEventListener('submit', e => {
          let birthdate = document.querySelector('#birthDate').value
          let email = document.querySelector('.client-profile-email span')
            .textContent
          let firstName = document.querySelector('input#client-first-name')
            .value
          let lastName = document.querySelector('input#client-last-name').value
          let phone = document.querySelector('input#client-phone').value
          let documentCustomer = document
            .querySelector('input#client-document')
            .value.replaceAll('-', '')

          documentCustomer = documentCustomer.replaceAll('.', '')

          if (hasAccount) {
            //Confere se o cliente está usando o seu CPF, questão de segurança
            if (this.documentCustomer == documentCustomer) {
              if (birthdate != '') {
                const customer = {
                  email: email,
                  firstName: firstName,
                  lastName: lastName,
                  phone: phone,
                  birthDate: birthdate,
                }
                this.sendBirthdate(customer)
              }
            }
          } else {
            if (birthdate != '') {
              const customer = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                birthDate: birthdate,
              }
              this.sendBirthdate(customer)
            }
          }
        })
    }
  },

  sendBirthdate: async function (customer) {
    let { birthDate } = customer

    birthDate = birthDate + 'T00:00:00Z'

    customer.birthDate = birthDate

    //console.log(customer);

    const res = await fetch('https://tecfag.simplesinovacao.com/add-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    const resUrl = await res.url
    const data = await res
  },

  init: function () {
    this.birthdateField()
  },
}

window.addEventListener('load', () => {
  checkoutField.init()
})

window.addEventListener('hashchange', function () {
  checkoutField.init()
})

// função para retirar mensagem de frete gratis em entrega a combinar
function intervalTime(selector, callback, interval = 250) {
  // Configura o intervalo para verificar a presença do elemento
  const intervalId = setInterval(() => {
    const element = document.querySelector(selector)

    // Se o elemento for encontrado, executa o callback e limpa o intervalo
    if (element) {
      callback(element)
      clearInterval(intervalId)
    }
  }, interval)

  // Retorna o ID do intervalo caso precise ser referenciado ou limpo manualmente
  return intervalId
}

// Uso da função:
// Define um seletor para o elemento HTML desejado
const selector = '.srp-delivery-current-many'

// Define uma função de callback para ser executada quando o elemento for encontrado
function meuCallback(element) {
  // Aqui você pode adicionar qualquer outra lógica que deseja executar quando o elemento for encontrado
  escondeCombinarEntrega()
  escondeRetirada(true)

  document.querySelectorAll('option').forEach(item => {
    if (isCombinarEntrega(item.value)) {
      item.textContent = 'Prazos e valores a combinar'
    }
  })
}

// Chama a função intervalTime
intervalTime(selector, meuCallback)
