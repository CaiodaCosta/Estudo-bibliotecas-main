function extraiLinks (arrLinks){
   return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
   //nessa função extraiLinks ela mesma retorna valores do arrLinks, mapeia todos os arrays do parametro
   // e retorna os conteudos de dentro das arrays, e join pega os conteudos e converte-os em strings e os junta
}
function checaStatus (listaURLs){
    //Promise.all
    const arrStatus = await Promise.all(
        
        return listaURLs.map(async (url) => {
            const response = await fetch(url);
            return response.status;
        })
    )
}
export default function listaValidada (listaDeLinks){
   const links = extraiLinks(listaDeLinks);
   const status = checaStatus(links);
   console.log(status);
   return status;
}