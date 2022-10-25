aula 3: 

    * Estado para a mensagem
    * Estado para a listaDeMensagens
    * handleNovaMensagem no on keyPress passando como argumento a mensagem setada no onChange
    * handleNovaMensagem  criamos um objeto de mensagem tendo como propriedades (texto: novaMensagem(a que recebemos), id: listadeMensagens.length + 1, de: 'hardCode')
    * setamos a lista de mensagens passando a mensagem que criamos (objeto) mais o spread de lista de mensagens
    * na hora de renderizar MessageList passamos como props mensagens={listaDeMensagens} que contem todas as nossas mensagens


aula 4:

    * Explicação do Supabase
    * Criação da tabela no Supabase
    * Criando tres variáveis, duas com os dois valores e key que precisaremos pra conectar ao DB e uma com o createCLient passando como argumento as duas variaveis key
    * Conectando ao DB com createClient do @supabase/supabase-js
    * Setando a listaDeMensagens com o data vindo do supabaseClient
    * Fazendo o função handleNovaMensagem funcionar, usando o metodo insert do supabaseClient inserindo a mensagem no supabase
    * Ainda na mesma função, além de inserir no supabase, nós damos o setListaDeMensagens passando o spread de lista + o que veio desse insert(data[0]), que são as propriedades e valores do objeto mensagem