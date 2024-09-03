/**
 * verifica si todas las variables son valores numericos
 * @param {any} variables
 * @returns {boolean}
 */
function sonNumeros(...variables){
    let numeros = true;
    variables.forEach(variable => {
        if (typeof variable !== "number" || isNaN(variable)) {
            numeros = false;
        }
    });
    return numeros;
}

function sonCerosNegativos(op, ...numeros){
    let resultado = false;
    for (let i = 0; i < numeros.length; i++) {
        if (op(numeros[i], 0)) {
            resultado = true;
            break
        }
        
    }
    return resultado
}

function sonCeros(a,b){
    return sonCerosNegativos((a, b) => a === b, a, b);
}

function sonNegativos(a, b){
    return sonCerosNegativos((a, b) => a < b, a, b);
}

/**
 * Sumar o Restar un numero dependiendo de la operacion
 * @param {number} a
 * @param {number} b
 * @param {function}
 * @returns {Promise} -resultado de sumar o restar a y b
 */

function sumarRestar(a, b, op){
    return new Promise((resuelto, rechazado) => {
        if (sonNumeros(a,b)){
            if (!sonCeros(a,b)) {
                let resultado = op(a,b);
                if (resultado<0) {
                    rechazado("El resultado debe ser positivo");
                } else {
                    resuelto(resultado);
                }
            } else{
                rechazado("Operacion innecesaria. Uno de los numeros es cero");
            }
        } else {
            rechazado("Solo se puede operar con numeros");
        }
    })
}

function sumar(a, b){
    return sumarRestar(a, b, (a ,b) => a + b);
}

function restar(a, b){
    return sumarRestar(a, b, (a ,b) => a - b);
}

function multiplicacion(a,b){
    return new Promise((resuelto, rechazado) => {
        if (sonNumeros(a, b)) {
            if (!sonNegativos(a,b)) {
                resuelto(a*b)
            } else {
              rechazado("La calculadora solo puede devolver valores positivos")  ;
            }
        } else {
            rechazado("Solo se puede operar con numeros");
        }
    })
}

function division(a,b){
    return new Promise((resuelto, rechazado) => {
        if (sonNumeros(a, b)) {
            if (b === 0) {
                rechazado("Division por cero");
            } else {
              resuelto(a/b);  
            }
        } else {
            rechazado("Solo se puede operar con numeros");
        }
    })
}

//TESTING
 /*sumar(20, 1)
     .then((resultado) => console.log("RESULTADO:", resultado))
     .catch((error) => console.log("RECHAZADO:", error))

 restar(5, 10)
     .then((resultado) => console.log("RESULTADO:", resultado))
     .catch((error) => console.log("RECHAZADO:", error))

 multiplicacion(2, 10)
     .then((resultado) => console.log("RESULTADO:", resultado))
     .catch((error) => console.log("RECHAZADO:", error))

 division(12, 3)
     .then((resultado) => console.log("RESULTADO:", resultado))
     .catch((error) => console.log("RECHAZADO:", error)) 
*/
async function calculadora(params) {
    try {
        const resultadoSuma = await sumar(1,2);
        const resultadoResta = await restar(3,2);
        const resultadoMultiplicacion = await multiplicacion(1,2);
        const resultadoDivision = await division(1,2);
        console.log(resultadoSuma);
        console.log(resultadoResta);
        console.log(resultadoMultiplicacion);
        console.log(resultadoDivision);
    } catch (error) {
        console.log(error)
    }
} 

calculadora()