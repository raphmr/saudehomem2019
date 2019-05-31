export const getImageFromHTML = (item) => {

  // procura um link de imagem
  let imageRegex = /\bhttps?:[^)''"]+\.(?:jpg|jpeg|gif|png)(?![a-z/])/;

  for (let prop in item) {
      // skip loop if the property is from prototype
      if(!item.hasOwnProperty(prop)) continue;

      // se tiver a propriedade image ou img retorna ela dentro de um aray
      if ((prop == 'image' || prop == 'img') && item[prop]) return [item[prop]];

      // se não tiver uma imagem, procura um link pra uma imagem dentro das propriedades content e description
      // cai aqui quando o item é um xml parseado
      if((prop == 'content' || prop == 'description')
      && item[prop].match(imageRegex)) {
        return item[prop].match(imageRegex);
      }
  }
};
