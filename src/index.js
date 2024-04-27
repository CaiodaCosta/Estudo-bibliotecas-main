import fs from 'fs';
import chalk from 'chalk';
function extraiLinks(texto){
        const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
        const capturas = [...texto.matchAll(regex)]; //lê o texto e busca as informações de acordo com a expressao regular
        const resultados = capturas.map(captura => ({[captura[1]] : captura[2]}));
        return resultados;
                    }
 

function trataErro(erro){
    console.log(erro)
    throw new Error (chalk.red(erro.code, 'não há arquivo no diretorio'));
}

//função assincrona com async/await

async function pegaArquivo(caminhoDoArquivo){
    try {
    const encoding = 'utf-8';
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
   return (texto);
    } catch(erro) {
    trataErro(erro)
}
}

pegaArquivo('./arquivos/texto.md')

export default pegaArquivo;

//função assincrona promise com then VVVV
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.promises.readFile(caminhoDoArquivo, encoding)
//         .then((texto) => console.log(chalk.green(texto)))
//         .catch((trataErro))
// }


//função sem promise
// function pegaArquivo(caminhoDoArquivo){
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto)=>{
//         if (erro){
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// };

// pegaArquivo('./arquivos/texto.md')
// pegaArquivo('./arquivos/')

//  \[[^[\]]*?\]

// \(https?:\/\/[^\s?#.].[^\s]*\) Aula https://cursos.alura.com.br/course/nodejs-criando-primeira-biblioteca/task/112714
