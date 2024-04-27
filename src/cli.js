import pegaArquivo from './index.js';
//Essa é um arquivo  CLI, interface de linha de comando, criando um ponto de contato entre nossa biblioteca e o terminal de onde virão as informações.
const caminho = process.argv;

function processaTexto(caminho){
    const resultado = pegaArquivo(caminho[2]);
    console.log(resultado)
}
