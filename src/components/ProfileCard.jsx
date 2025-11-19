function CartaoPerfil({ perfil, aoClicar }) {
  return (
    <button
      type="button"
      onClick={() => aoClicar(perfil)}
      className="group text-left bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition p-4 flex gap-4 w-full"
    >
      <img
        src={perfil.foto}
        alt={perfil.nome}
        className="size-16 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-slate-900 dark:text-slate-100 font-semibold text-lg">
            {perfil.nome}
          </h3>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
            {perfil.area}
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-0.5">
          {perfil.cargo}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(perfil.habilidadesTecnicas || []).slice(0, 3).map((habilidade) => (
            <span
              key={habilidade}
              className="text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
            >
              {habilidade}
            </span>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          {perfil.localizacao}
        </div>
      </div>
    </button>
  )
}

export default CartaoPerfil