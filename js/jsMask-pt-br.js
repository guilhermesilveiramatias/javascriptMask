
const mascaraCPF = '999.999.999-99';
const mascaraCEP = '99999-999';
const mascaraCNPJ = '99.999.999/9999-99';
const mascaraDDD = '999';
const mascaraTelefone = '9999-9999';
const mascaraCelular = '9.9999-9999';
const mascaraNum = '9';


var htmlFields = document.querySelectorAll('[cpf], [cep], [cnpj], [ddd], [telefone], [celular], [numero]');

for (var i = 0; i < htmlFields.length; i++)
    {        
        htmlFields[i].addEventListener('input', formatar);
        if (!htmlFields[i].hasAttribute("placeholder"))
        {
            htmlFields[i].placeholder = replaceAll(recuperarMascara(htmlFields[i]), '9', '  ');
        }
        
    }

function formatar(){
    aplicarMascara(event.srcElement, recuperarMascara(event.srcElement));    
}

function aplicarMascara(campo, mascara) {
        if(mascara == '9')
        {
            campo.value = removerLetras(campo.value);
        }
        else
        {
            campo.value = formatarValor(removerLetras(campo.value), recuperarMascara(campo));        
        }
    }

function recuperarMascara(campo)
{       
    if (campo.hasAttribute('cpf'))
        {
            return mascaraCPF;
        }
    if (campo.hasAttribute('cep'))
        {
            return mascaraCEP;
        }
    if (campo.hasAttribute('cnpj'))
        {
            return mascaraCNPJ;
        }
    if (campo.hasAttribute('ddd'))
        {
            return mascaraDDD;
        }
    if (campo.hasAttribute('telefone'))
        {
            return mascaraTelefone;
        }
    if (campo.hasAttribute('celular'))
        {
            return removerLetras(campo.value).length > 8? mascaraCelular: mascaraTelefone;                
        }
    else
        {
            return mascaraNum;
        }
}

function formatarValor(valor, mascara) {
    var valorNumerico = removerLetras(valor);
    var textoFormatado = "";
    var tamanhoTextoParaAnalisar = mascara.length > valorNumerico.length? valorNumerico.length: mascara.length;
    var m =0;
    
    for (var i = 0; i < tamanhoTextoParaAnalisar; i++)
    {
        if (isNumeric(valorNumerico[i]))
        {
            if (isNumeric(mascara[m])) {
                textoFormatado = textoFormatado + valorNumerico[i];                    
            }
            else {
                textoFormatado = textoFormatado + ((m < mascara.length)?mascara[m] + valorNumerico[i] : '') ;
                m++;
            }
            m++;
        }

    }
    
    return textoFormatado;
}


// Funções auxiliares.
function removerLetras(valor) {    
    var retorno = '';
    for (var i = 0; i < valor.length; i++) {
        if (isNumeric(valor[i])) {                
            retorno = retorno + valor[i];
        }
    }
    return retorno;
}


// Função para determinar se o campo é numérico ou não.
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function replaceAll(valor, searchChar, replaceChar){
    var retorno = "";
    for (var i = 0; i < valor.length; i++)
    {
        retorno = retorno + (valor[i] == searchChar? replaceChar: valor[i]);
    }
    return retorno;
}