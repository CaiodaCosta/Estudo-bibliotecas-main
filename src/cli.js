import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
//Essa é um arquivo  CLI, interface de linha de comando, criando um ponto de contato entre nossa biblioteca e o terminal de onde virão as informações.
const caminho = process.argv;
function imprimeLista(resultado, identificador = ''){
    console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
    
}
//Fs.lstatsync retorna informações do link que está sendo usado
async function processaTexto(argumentos){
    const caminho = argumentos[2];

    try {
        fs.lstatSync(caminho);
    } catch(erro){
        if (erro.code === 'ENOENT') {
            console.log('arquivo ou diretório não existe');
            return;
        }
    }
    
    //if utilizado para retornar um caminho direto para uma posta ou um diretorio
    //if verifica se o caminho é um arquivo e um diretorio e caso seja qualquer um dos dois retorna uma promessa
    if (fs.lstatSync(caminho).isFile()){
        const resultado = await pegaArquivo(argumentos);
    } else if (fs.lstatSync(caminho).isDirectory){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(lista, nomeDeArquivo)
        })
       
    }
}

processaTexto(caminho);