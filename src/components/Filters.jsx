import React from 'react'

function Selecionar({ rotulo, valor, aoMudar, opcoes, placeholder }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-slate-700 dark:text-slate-300">{rotulo}</span>
      <select
        value={valor || ''}
        onChange={(e) => aoMudar(e.target.value || null)}
        className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
      >
        <option value="">{placeholder}</option>
        {opcoes.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    </label>
  )
}

function Filtros({ filtros, definirFiltros, areas, cidades, tecnologias }) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:items-end">
      <label className="flex-1 flex flex-col gap-1 text-sm">
        <span className="text-slate-700 dark:text-slate-300">Busca</span>
        <input
          type="text"
          value={filtros.busca}
          onChange={(e) => definirFiltros({ ...filtros, busca: e.target.value })}
          placeholder="Nome, cargo, tecnologia..."
          className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2 w-full"
        />
      </label>
      <Selecionar
        rotulo="Área"
        valor={filtros.area}
        aoMudar={(v) => definirFiltros({ ...filtros, area: v || null })}
        opcoes={areas}
        placeholder="Todas"
      />
      <Selecionar
        rotulo="Cidade"
        valor={filtros.cidade}
        aoMudar={(v) => definirFiltros({ ...filtros, cidade: v || null })}
        opcoes={cidades}
        placeholder="Todas"
      />
      <Selecionar
        rotulo="Tecnologia"
        valor={filtros.tecnologia}
        aoMudar={(v) => definirFiltros({ ...filtros, tecnologia: v || null })}
        opcoes={tecnologias}
        placeholder="Todas"
      />
      <button
        type="button"
        onClick={() => definirFiltros({ busca: '', area: null, cidade: null, tecnologia: null })}
        className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
      >
        Limpar
      </button>
    </div>
  )
}

export default Filtros