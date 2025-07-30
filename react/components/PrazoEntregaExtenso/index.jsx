import React, { useEffect, useRef } from 'react'

/**
 * Componente que transforma "Em até X dias úteis" em
 * "Entrega entre {primeiraData} e {ultimaData}".
 *
 * Funciona em:
 *  - .vtex-omnishipping-1-x-summaryPackage .shp-summary-package-time span
 *  - .srp-shipping-current-single__sla
 *  - .vtex-store-components-3-x-shippingTableCellDeliveryEstimate  (tabela do simulador de frete)
 */
const PrazoEntregaExtenso = () => {
  const observerRef = useRef(null)
  const debounceRef = useRef(null)

  // Soma dias úteis a partir de "amanhã", ignorando sábados (6) e domingos (0)
  const adicionarDiasUteis = (dias) => {
    const datas = []
    let data = new Date()

    while (datas.length < dias + 1) {
      data.setDate(data.getDate() + 1)
      const dia = data.getDay()
      if (dia !== 0 && dia !== 6) {
        datas.push(new Date(data))
      }
    }

    return {
      primeiraData: datas[0],
      ultimaData: datas[datas.length - 1],
    }
  }

  const formatarDataExtenso = (data) => {
    return data.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  const atualizarPrazosPorExtenso = () => {
    const seletores = [
      '.vtex-omnishipping-1-x-summaryPackage .shp-summary-package-time span',
      '.srp-shipping-current-single__sla',
      '.vtex-store-components-3-x-shippingTableCellDeliveryEstimate', // <td> da tabela de simulação
    ]

    const regexLista = [
      /Em até\s+(\d+)\s+dia[s]?\s+úteis?/i,
      /Até\s+(\d+)\s+dia[s]?\s+úteis?/i,
      /em\s+até\s+(\d+)\s+dia[s]?\s+úteis?/i,
    ]

    seletores.forEach((seletor) => {
      document.querySelectorAll(seletor).forEach((el) => {
        // Evita processar duas vezes
        if (el.dataset.extensoAplicado === '1') return

        const texto = (el.textContent || '').trim()
        let match = null

        for (const rx of regexLista) {
          const m = texto.match(rx)
          if (m) {
            match = m
            break
          }
        }

        if (match) {
          const diasUteis = parseInt(match[1], 10)
          if (!Number.isNaN(diasUteis) && diasUteis >= 1) {
            const { primeiraData, ultimaData } = adicionarDiasUteis(diasUteis)
            const primeira = formatarDataExtenso(primeiraData)
            const ultima = formatarDataExtenso(ultimaData)

            el.textContent = `Entrega entre ${primeira} e ${ultima}`
            el.dataset.extensoAplicado = '1'
          }
        }
      })
    })
  }

  useEffect(() => {
    // Rodar ao montar
    atualizarPrazosPorExtenso()

    // Observar mudanças dinâmicas (checkout, simulação de frete, etc.)
    const debounceRun = () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        atualizarPrazosPorExtenso()
      }, 120)
    }

    const obs = new MutationObserver(debounceRun)
    obs.observe(document.body, { childList: true, subtree: true })
    observerRef.current = obs

    return () => {
      if (observerRef.current) observerRef.current.disconnect()
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return null
}

export default PrazoEntregaExtenso
