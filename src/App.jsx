import { useEffect, useState } from 'react'
import CartaoPerfil from './components/ProfileCard.jsx'
import ModalPerfil from './components/ProfileModal.jsx'
import Filtros from './components/Filters.jsx'
import BotaoTema from './components/DarkModeToggle.jsx'

function App() {
  const [profissionais, definirProfissionais] = useState([])
  const [carregando, definirCarregando] = useState(true)
  const [erro, definirErro] = useState(null)
  const [filtros, definirFiltros] = useState({ busca: '', area: null, cidade: null, tecnologia: null })
  const [selecionado, definirSelecionado] = useState(null)

  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch('/data/profissionais.json')
        const dados = await resposta.json()
        const nomesFicticios = [
          'Ana Souza','Bruno Ferreira','Carla Mendes','Daniel Rocha','Eduardo Santos','Fernanda Lima','Gabriel Almeida','Helena Martins','Igor Oliveira','Julia Ribeiro',
          'Karina Duarte','Lucas Carvalho','Mariana Araujo','Nicolas Barros','Olivia Teixeira','Paulo Moreira','Quésia Nunes','Rafael Costa','Sofia Pires','Thiago Rezende',
          'Ursula Monteiro','Vinicius Tavares','Wesley Batista','Xavier Campos','Yasmin Figueiredo','Zélia Cardoso','Alice Antunes','Bernardo Assis','Camila Pacheco','Diego Nogueira',
          'Elias Macedo','Flavia Neves','Gustavo Silveira','Heloisa Amorim','Isabela Correia','João Victor','Kaio Viana','Larissa Torres','Marcelo Navarro','Natália Guedes',
          'Otávio Cunha','Patrícia Moraes','Renan Prado','Sérgio Barcellos','Tamires Aguiar','Vera Lacerda','Wellington Braga','Yuri Avelar','Allan Farias','Bianca Sampaio',
          'Catarina Paiva','Davi Portela','Elisa Matos','Felipe Andrade','Giovana Freitas','Hugo Borges','Iara Brito','Jéssica Santana','Keila Monteiro','Leandro Queiroz'
        ]
        const lista = Array.isArray(dados) ? dados.map((p, i) => ({ ...p, nome: nomesFicticios[i % nomesFicticios.length] })) : []
        definirProfissionais(lista)
      } catch {
        definirErro('Falha ao carregar dados')
      } finally {
        definirCarregando(false)
      }
    }
    carregarDados()
  }, [])

  const areas = [...new Set(profissionais.map((p) => p.area))].sort()
  const cidades = [...new Set(profissionais.map((p) => p.localizacao))].sort()
  const tecnologias = [...new Set(profissionais.flatMap((p) => p.habilidadesTecnicas || []))].sort()

  const filtrados = profissionais.filter((p) => {
    const termo = (filtros.busca || '').toLowerCase()
    const textoOk = !termo || p.nome.toLowerCase().includes(termo) || (p.cargo || '').toLowerCase().includes(termo) || (p.habilidadesTecnicas || []).some((h) => h.toLowerCase().includes(termo))
    const areaOk = !filtros.area || p.area === filtros.area
    const cidadeOk = !filtros.cidade || p.localizacao === filtros.cidade
    const tecnologiaOk = !filtros.tecnologia || (p.habilidadesTecnicas || []).includes(filtros.tecnologia)
    return textoOk && areaOk && cidadeOk && tecnologiaOk
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Conectando Talentos</h1>
            <p className="text-slate-600 dark:text-slate-300">Explore perfis, competências e propósitos</p>
          </div>
          <BotaoTema />
        </header>

        <div className="mt-6">
          <Filtros
            filtros={filtros}
            definirFiltros={definirFiltros}
            areas={areas}
            cidades={cidades}
            tecnologias={tecnologias}
          />
        </div>

        {carregando && <div className="mt-10 text-slate-700 dark:text-slate-200">Carregando...</div>}
        {erro && <div className="mt-10 text-red-700">{erro}</div>}

        {!carregando && !erro && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtrados.map((p) => (
              <CartaoPerfil key={p.id} perfil={p} aoClicar={definirSelecionado} />
            ))}
          </div>
        )}

        {selecionado && (
          <ModalPerfil perfil={selecionado} fechar={() => definirSelecionado(null)} />
        )}
      </div>
    </div>
  )
}

export default App
