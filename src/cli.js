import chalk from 'chalk';
import fs from 'fs';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

//Essa é um arquivo  CLI, interface de linha de comando, criando um ponto de contato entre nossa biblioteca e o terminal de onde virão as informações.
const caminho = process.argv;

async function imprimeLista(valida, resultado, identificador = ''){
    if (valida){
        console.log(
            chalk.yellow('lista validada'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else{
    console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
    }
}
//Fs.lstatsync retorna informações do link que está sendo usado
async function processaTexto(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === '--valida';

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
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista (valida, resultado)
    } else if (fs.lstatSync(caminho).isDirectory){
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo)
        })
       
    }
}

processaTexto(caminho);