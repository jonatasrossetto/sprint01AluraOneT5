let btnEncode = document.getElementById('btnEncode');
let btnDecode = document.getElementById('btnDecode');
let inputTexto = document.getElementById('inputTexto');
let displayTexto = document.getElementById('displayTexto');
let funcao = document.getElementById('funcao');
let keys = [
  { k: 'a', v: 'ai' },
  { k: 'e', v: 'enter' },
  { k: 'i', v: 'imes' },
  { k: 'o', v: 'ober' },
  { k: 'u', v: 'ufat' },
];

btnEncode.addEventListener('click', (e) => {
  e.preventDefault();
  funcao.innerText = 'Encoded Text';
  displayTexto.innerText = encode(inputTexto.value);
  navigator.clipboard.writeText(displayTexto.innerText); //copia para o clipboard
});

btnDecode.addEventListener('click', (e) => {
  e.preventDefault();
  funcao.innerText = 'Decoded Text';
  displayTexto.innerText = decode(inputTexto.value);
  navigator.clipboard.writeText(displayTexto.innerText); //copia para o clipboard
});

function encode(texto) {
  let encoded = '';
  if (texto != '') {
    for (let index = 0; index < texto.length; index++) {
      let aux = '';
      switch (texto[index]) {
        case 'a':
          aux = 'ai';
          break;
        case 'e':
          aux = 'enter';
          break;
        case 'i':
          aux = 'imes';
          break;
        case 'o':
          aux = 'ober';
          break;
        case 'u':
          aux = 'ufat';
          break;
        default:
          aux = texto[index];
          break;
      }
      encoded = encoded + aux;
    }
  } else {
    encoded = 'texto vazio';
  }
  return encoded;
}

function decode(texto) {
  let antes = '';
  //separa todas as ocorrências de todas as partículas codificadas
  //isso corrige a decodificação do texto codificado de palavras como caindo e ainda
  //corrige também a decodificação de palavras codificadas mais de uma vez
  for (let i = 0; i < keys.length; i++) {
    antes = '';
    while (antes != texto) {
      antes = texto;
      texto = texto.replace(keys[i].v, keys[i].k + '*');
    }
  }
  //procura o código e realiza a troca pelo texto correto
  for (let i = 0; i < keys.length; i++) {
    antes = '';
    while (antes != texto) {
      antes = texto;
      texto = texto.replace(keys[i].v, keys[i].k);
    }
  }
  antes = '';
  //remove o caracter separador *
  while (antes != texto) {
    antes = texto;
    texto = texto.replace('*', '');
  }
  return texto;
}