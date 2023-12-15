class Cliente {
    constructor(nome, endereco){
        this.nome = nome
        this.endereco = endereco
        this.pedidos = []
    }

    fazerPedido(restaurante, items){
        const pedido = new Pedido(this, restaurante, items)
        this.pedidos.push(pedido)
        restaurante.receberPedido(this, items)
        return pedido
    }

    consultarPedidos() {
        console.log("\n")
        console.log(`Pedidos de ${this.nome}:`)
        this.pedidos.forEach((pedido, index) => {
          console.log(
            `${index + 1}. Restaurante: ${pedido.restaurante.nome} \n Items: ${Object.entries(
              pedido.items
            )
              .map(([produto, quantidade]) => `${produto} - ${quantidade}`)
              .join(', \n ')} \n Status: ${pedido.status}`
          );
        });
        return this.pedidos || []
      }
}


class Restaurante {
    constructor(nome, menu) {
        this.nome = nome
        this.menu = menu 
        this.pedidos = []
    }

    receberPedido(cliente, items) {
        const pedido = new Pedido(cliente, this, items)
        this.pedidos.push(pedido)
        pedido.atualizarStatus("recebido")
        return pedido
  }

    exibirMenu() {
        console.log(`Restaurante: ${this.nome}  Menu: ${Object.keys(this.menu).join(', ')}`)
        Object.entries (this.menu).forEach(([produto, valor], index) => {
            console.log(`${index + 1}. ${produto} Valor: ${valor} \n`)
        })
    }

    consultarPedidos() {
        console.log(`Pedidos recebidos de ${this.nome}.`)
        this.pedidos.forEach((pedido, index) => {
          console.log(
            `${index + 1}.  Cliente: ${pedido.cliente.nome} - Items: ${Object.entries(
              pedido.items
            )
              .map(([produto, quantidade]) => `${produto} - ${quantidade}`)
              .join(', ')} - Status: ${pedido.status}`
          )
        })
      }
}

class Pedido {
        constructor(cliente, restaurante, items) {
          this.cliente = cliente
          this.restaurante = restaurante
          this.items = items
          this.status = 'pendente'
        }
      
        atualizarStatus(status) {
          this.status = status
        }
      }


    const cliente1 = new Cliente("João", "Rua A, 123")
    const restaurante1 = new Restaurante("Restaurante A", {
        Pizza: 15,
        Hamburguer: 10,
        Salada: 8,
    }
    )
    const restaurante2 = new Restaurante("Restaurante B", {
        Pizza: 18,
        Hamburguer: 12,
        Batata: 8,
    }
    )

restaurante1.exibirMenu()
restaurante2.exibirMenu()

cliente1.fazerPedido(restaurante1, { Pizza: 2, Hamburguer: 1 })
cliente1.consultarPedidos(restaurante1)

const pedidosCliente1 = cliente1.consultarPedidos()

if (pedidosCliente1.length > 0) {
  const primeiroPedido = pedidosCliente1[0]
  primeiroPedido.atualizarStatus("em andamento")
  console.log("\n")
  console.log(`Status do pedido: ${primeiroPedido.status}`)
  console.log(`Pedido do ${cliente1.nome} entregue!`)
  console.log('Obrigado pela preferência')
} else {
  console.log('Cliente não tem pedidos.')
}


cliente1.fazerPedido(restaurante2, { Pizza: 3, Hamburguer: 5 })
cliente1.consultarPedidos(restaurante2)

if (pedidosCliente1.length > 0) {
  const primeiroPedido = pedidosCliente1[0]
  primeiroPedido.atualizarStatus("em andamento")
  console.log("\n")
  console.log(`Status do pedido: ${primeiroPedido.status}`)
  console.log(`Pedido do ${cliente1.nome} entregue!`)
  console.log('Obrigado pela preferência')
} else {
  console.log('Cliente não tem pedidos.')
}
