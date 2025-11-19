import React from 'react'

function Secao({ titulo, children }) {
  return (
    <section className="space-y-2">
      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wide">{titulo}</h4>
      <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1">{children}</div>
    </section>
  )
}

function ModalPerfil({ perfil, fechar }) {
  const [recomendacoes, definirRecomendacoes] = React.useState(0)
  const [mensagem, definirMensagem] = React.useState('')
  const [enviado, definirEnviado] = React.useState(false)

  React.useEffect(() => {
    const chave = `recomendacoes:${perfil.id}`
    const salvo = Number(localStorage.getItem(chave) || 0)
    definirRecomendacoes(salvo)
  }, [perfil.id])

  function recomendar() {
    const chave = `recomendacoes:${perfil.id}`
    const proximo = recomendacoes + 1
    localStorage.setItem(chave, String(proximo))
    definirRecomendacoes(proximo)
  }

  function enviarMensagem() {
    if (!mensagem.trim()) return
    const chave = `mensagens:${perfil.id}`
    const dado = { texto: mensagem.trim(), quando: new Date().toISOString() }
    const arr = JSON.parse(localStorage.getItem(chave) || '[]')
    arr.push(dado)
    localStorage.setItem(chave, JSON.stringify(arr))
    definirEnviado(true)
    definirMensagem('')
    setTimeout(() => definirEnviado(false), 2500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={fechar} />
      <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <header className="flex items-center gap-4 p-6 border-b border-slate-200 dark:border-slate-700">
          <img src={perfil.foto} alt={perfil.nome} className="size-16 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{perfil.nome}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm">{perfil.cargo} • {perfil.localizacao}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(perfil.habilidadesTecnicas || []).map((habilidade) => (
                <span key={habilidade} className="text-xs px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">{habilidade}</span>
              ))}
            </div>
          </div>
          <button onClick={fechar} className="ml-auto px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">Fechar</button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <Secao titulo="Informações pessoais e acadêmicas">
            <div>Área: <span className="font-medium">{perfil.area}</span></div>
            <div className="mt-2">
              {(perfil.formacao || []).map((f, idx) => (
                <div key={idx} className="flex items-center justify-between"> 
                  <span>{f.curso} • {f.instituicao}</span>
                  <span className="text-slate-500 dark:text-slate-400">{f.ano}</span>
                </div>
              ))}
            </div>
          </Secao>
          <Secao titulo="Experiências e habilidades técnicas">
            <ul className="space-y-2">
              {(perfil.experiencias || []).map((e, idx) => (
                <li key={idx} className="border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                  <div className="font-medium">{e.empresa} • {e.cargo}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs">{e.inicio} — {e.fim}</div>
                  <div className="text-sm">{e.descricao}</div>
                </li>
              ))}
            </ul>
          </Secao>
          <Secao titulo="Soft skills e hobbies">
            <div className="flex flex-wrap gap-2">
              {(perfil.softSkills || []).map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">{s}</span>
              ))}
              {((perfil.hobbies || perfil.areainteresses) || []).map((s) => (
                <span key={s} className="text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800">{s}</span>
              ))}
            </div>
          </Secao>
          <Secao titulo="Portfólio e certificados">
            <ul className="space-y-2">
              {(perfil.projetos || []).map((p, idx) => (
                <li key={idx}>
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-sky-700 dark:text-sky-300 hover:underline font-medium">{p.titulo}</a>
                  <div className="text-sm">{p.descricao}</div>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {(perfil.certificados || []).map((c, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded-md bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 border border-fuchsia-200 dark:border-fuchsia-800">{c.titulo}</span>
              ))}
            </div>
          </Secao>
        </div>
        <footer className="flex flex-col md:flex-row items-center gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={recomendar}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow"
          >
            Recomendar profissional ({recomendacoes})
          </button>
          <div className="flex-1 w-full md:w-auto md:flex-1 flex items-center gap-2">
            <textarea
              value={mensagem}
              onChange={(e) => definirMensagem(e.target.value)}
              placeholder="Escreva sua mensagem"
              className="flex-1 min-h-10 resize-y rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-3 py-2"
            />
            <button
              type="button"
              onClick={enviarMensagem}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow"
            >
              Enviar mensagem
            </button>
          </div>
          {enviado && <div className="text-emerald-700 dark:text-emerald-300 text-sm">Mensagem enviada!</div>}
        </footer>
      </div>
    </div>
  )
}

export default ModalPerfil