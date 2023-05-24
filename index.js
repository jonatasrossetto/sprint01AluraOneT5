let btnEncode = document.getElementById('btnEncode');
let btnDecode = document.getElementById('btnDecode');
let btnCopiar = document.getElementById('btnCopiar');
let inputTexto = document.getElementById('inputTexto');
let displayTexto = document.getElementById('displayTexto');
//guarda um dicionário de chaves e valores para substituição
let keys = [
  { k: 'a', v: 'ai' },
  { k: 'e', v: 'enter' },
  { k: 'i', v: 'imes' },
  { k: 'o', v: 'ober' },
  { k: 'u', v: 'ufat' },
];

btnEncode.addEventListener('click', (e) => {
  e.preventDefault();
  displayTexto.innerText = encode2(inputTexto.value);
});

btnDecode.addEventListener('click', (e) => {
  e.preventDefault();
  displayTexto.innerText = decode(inputTexto.value);
});

btnCopiar.addEventListener('click', (e) => {
  navigator.clipboard.writeText(displayTexto.innerText); //copia para o clipboard
});

function encode2(texto) {
  let encoded = '';
  if (texto != '') {
    for (let index = 0; index < texto.length; index++) {
      let aux = texto[index];
      for (let i = 0; i < keys.length; i++) {
        if (texto[index] == keys[i].k) {
          aux = keys[i].v;
        }
      }
      encoded = encoded + aux;
    }
  } else {
    encoded = 'texto vazio';
  }
  return encoded;
}

function decode(texto) {
  if (texto != '') {
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
  } else {
    texto = 'texto vazio';
  }

  return texto;
}
