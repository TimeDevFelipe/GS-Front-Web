import { useState } from 'react'

function BotaoTema() {
  const [temaEscuro, definirTemaEscuro] = useState(() => {
    const salvo = localStorage.getItem('tema')
    const ativo = salvo === 'escuro'
    if (ativo) document.documentElement.classList.add('dark')
    return ativo
  })

  function alternarTema() {
    const proximo = !temaEscuro
    definirTemaEscuro(proximo)
    if (proximo) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('tema', 'escuro')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('tema', 'claro')
    }
  }

  return (
    <button
      type="button"
      onClick={alternarTema}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
      aria-label="Alternar tema"
    >
      <span className="size-4 inline-block rounded-full bg-slate-900 dark:bg-yellow-400"></span>
      {temaEscuro ? 'Escuro' : 'Claro'}
    </button>
  )
}

export default BotaoTema