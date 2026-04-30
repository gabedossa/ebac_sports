import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type CarrinhoState = {
  itens: Produto[]
  favoritos: Produto[]
}

const initialState: CarrinhoState = {
  itens: [],
  favoritos: []
}

const carrinhoSlice = createSlice({
  name: 'carrinho',
  initialState,
  reducers: {
    adicionarAoCarrinho: (state, action: PayloadAction<Produto>) => {
      const jaExiste = state.itens.find((p) => p.id === action.payload.id)
      if (!jaExiste) {
        state.itens.push(action.payload)
      }
    },
    favoritar: (state, action: PayloadAction<Produto>) => {
      const index = state.favoritos.findIndex((p) => p.id === action.payload.id)
      if (index >= 0) {
        state.favoritos.splice(index, 1)
      } else {
        state.favoritos.push(action.payload)
      }
    }
  }
})

export const { adicionarAoCarrinho, favoritar } = carrinhoSlice.actions
export default carrinhoSlice.reducer
