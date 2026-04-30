import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { adicionarAoCarrinho, favoritar } from '../store/reducers/carrinho'
import { useGetProdutosQuery } from '../store/api/api'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'

import * as S from './styles'

const ProdutosComponent = () => {
  const dispatch = useDispatch()
  const { data: produtos = [] } = useGetProdutosQuery()
  const itensNoCarrinho = useSelector(
    (state: RootState) => state.carrinho.itens
  )
  const favoritos = useSelector(
    (state: RootState) => state.carrinho.favoritos
  )

  const produtoEstaNosFavoritos = (produto: ProdutoType) =>
    favoritos.some((f) => f.id === produto.id)

  function handleAdicionarAoCarrinho(produto: ProdutoType) {
    if (itensNoCarrinho.find((p) => p.id === produto.id)) {
      alert('Item já adicionado')
    } else {
      dispatch(adicionarAoCarrinho(produto))
    }
  }

  return (
    <S.Produtos>
      {produtos.map((produto) => (
        <Produto
          estaNosFavoritos={produtoEstaNosFavoritos(produto)}
          key={produto.id}
          produto={produto}
          favoritar={(p) => dispatch(favoritar(p))}
          aoComprar={handleAdicionarAoCarrinho}
        />
      ))}
    </S.Produtos>
  )
}

export default ProdutosComponent
