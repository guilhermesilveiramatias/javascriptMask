// NÃO ESQUECER DE FAZER UMA VERSÃO MINIMIZADA DO SCRIPT.
var maskObjects = []; //  array of objects of type "mask"

maskObjects.push(createMaskObj("cpf", "999.999.999-99"));
maskObjects.push(createMaskObj("cep", "99999-999"));
maskObjects.push(createMaskObj("cnpj", "99.999.999/9999-99"));
maskObjects.push(createMaskObj("ddd", "999"));
maskObjects.push(createMaskObj("telefone", "9999-9999"));
maskObjects.push(createMaskObj("celular", "9.9999-9999"));
maskObjects.push(createMaskObj("numero", "9"));
// PARA CRIAR FORMATOS NOVOS BASTA ADICIONAR UM NOVO ITEM AO ARRAY AQUI. O PADRÃO É "nome" E "formato". 
// ATUALMENTE EU UTILIZO O DIGITO 9 PARA ESTIPULAR ONDE ESTARÃO OS NÚMEROS, PORÉM, POSTERIORMENTE VAMOS PADRONIZAR 
// MUDANDO PARA #


// Cria um objeto mask (mascara) contendo nome e formato.
function createMaskObj(maskName, maskFormato) {
    return {
        nome: maskName,
        formato: maskFormato
    };    
}


//var htmlFields = document.querySelectorAll('[cpf], [cep], [cnpj], [ddd], [telefone], [celular], [numero]');
var htmlFields = document.querySelectorAll(getStringMaskObj(maskObjects));

for (var i = 0; i < htmlFields.length; i++) {
    htmlFields[i].addEventListener('input', inputFormatter);
    // atribuindo a propriedade "placeholder" para exibir a máscara.
    if (!htmlFields[i].hasAttribute("placeholder")) {
        let maskObj = getMaskObj(htmlFields[i]);
        if (maskObj != null)
            htmlFields[i].placeholder = replaceAll(maskObj.formato, '9', '  ');
    }
}

// Função que retorna uma string contendo o nome de todas as máscaras disponíveis. 
// "[cpf], [cep]"
function getStringMaskObj(maskObjects) {
    var returnString = ""
    maskObjects.forEach(function (maskObj) {
        returnString = returnString + "[" + maskObj.nome + "] ";
    })

    return replaceAll(returnString.trim(), " ", ", ");
}

// Recupera o objeto máscara do controle.
function getMaskObj(control) {
    var returnObject = null;
    maskObjects.forEach(function (maskObj) {
        if (control.hasAttribute(maskObj.nome))
            returnObject = maskObj;
    });
    
    return returnObject;
}

// Esta função é disparada pelos elementos html no momento de aplicar a máscara.
// Ela identificará a máscara que deverá ser aplicada e então chamará funçaõ responsável por aplicar a formatação.
function inputFormatter() {    
    applyFormat(event.srcElement, getMaskObj(event.srcElement));
}

// Esta função é responsável por efetivamente formatar um campo. Ela é chamada pela função "inputFormatter" e recebe
// o campo que será formatado e a máscara (formato) que deverá ser aplicado
function applyFormat(control, maskObj) {
    if (maskObj != null) {
        if (maskObj.formato == '9')
            control.value = getOnlyNumbers(control.value);
        else
            control.value = formatValue(getOnlyNumbers(control.value), maskObj.formato);        
    }
}


function formatValue(valor, mascara) {
    var valorNumerico = getOnlyNumbers(valor);
    var textoFormatado = "";
    var tamanhoTextoParaAnalisar = mascara.length > valorNumerico.length ? valorNumerico.length : mascara.length;
    var m = 0;

    for (var i = 0; i < tamanhoTextoParaAnalisar; i++) {
        if (isNumeric(valorNumerico[i])) {
            if (isNumeric(mascara[m])) {
                textoFormatado = textoFormatado + valorNumerico[i];
            } else {
                textoFormatado = textoFormatado + ((m < mascara.length) ? mascara[m] + valorNumerico[i] : '');
                m++;
            }
            m++;
        }
    }
    return textoFormatado;
}


// Funções auxiliares.
function getOnlyNumbers(valor) {
    var retorno = '';
    for (var i = 0; i < valor.length; i++) {
        if (isNumeric(valor[i]))
            retorno = retorno + valor[i];
    }
    return retorno;
}


// Função para determinar se o campo é numérico ou não.
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function replaceAll(valor, searchChar, replaceChar) {
    var retorno = "";
    for (var i = 0; i < valor.length; i++) {
        retorno = retorno + (valor[i] == searchChar ? replaceChar : valor[i]);
    }
    return retorno;
}
