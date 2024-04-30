function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
    //nessa função extraiLinks ela mesma retorna valores do arrLinks, mapeia todos os arrays do parametro
    // e retorna os conteudos de dentro das arrays, e join pega os conteudos e converte-os em strings e os junta
}
async function checaStatus(listaURLs) {

    const arrStatus = await Promise
        .all(
            listaURLs.map(async (url) => {
                const response = await fetch(url)
                return response.status;

                //Promise.all retorna uma unica promise que resolve todas as promises pendentes
                //no caso abaixo o fetch só lida com um recurso por vez
                //como estando lidando com mais de um recurso utilizamos o promise.all

            })
        )
    return arrStatus
}
export default async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    
    return status;
}