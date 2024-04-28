import fs from 'fs';
import chalk from 'chalk';
function extraiLinks(texto){
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        const capturas = [...texto.matchAll(regex)]; //lê o texto e busca as informações de acordo com a expressao regular
        const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
        return resultados.length !== 0 ? resultados : "não há links no arquivo"
                    }
 

function trataErro(erro){
    console.log(erro)
    throw new Error (chalk.red(erro.code, 'não há arquivo no diretorio'));
}

//função assincrona com async/await

async function pegaArquivo(caminhoDoArquivo){
    try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
   return extraiLinks(texto);
    } catch(erro) {
    trataErro(erro)
}
}

export default pegaArquivo;

 // Aula https://cursos.alura.com.br/course/nodejs-criando-primeira-biblioteca/task/112714
