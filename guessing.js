// Juego para adivinar número.

// Seleccionar Aleatoriamente un número.
// Delimitar número de oportunidades que tendra el usuario para adivinar.
// Una vez el usuario gane, el juego termina y el usuario ganará, de lo contrario el juego continuará.

/* REQUISITOS:
    1. Mostrar mensaje de bienvenida una vez el juego inicie. 
    2. Seleccionar aleatoriamente un número random entero de 1 a 100. 
    3. Usuario seleccionar nivel de dificultad (fácil, medio, díficil).
    4. Usuario debe poder introducir su opción. 
    5. Si acierta el usuario, debe se mostrarsele un mensaje de felicitación con el número de intentos necesarios. 
    6. Si no acierta el usuario, se le debe indicar en un mensaje si el número es mayor o menos que el indicado por el usuario. 
    7. El juego debe terminar cuando el usuario adivina el número correcto o se le acaban las oportunidades. 
*/

// Importar el módulo readline para recibir entrada del usuario.
const readline = require("readline");

// Configuración de la interfaz de entrada desde la terminal.
const entradaUsuario = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función que muestra mensajes de bienvenida y las reglas del juego.
function mensajesBienvenida() {
  // Mensaje de bienvenida.
  console.log("======================================================");
  console.log("  🎲 ¡Bienvenido al Juego de Adivinar el Número! 🎲  ");
  console.log("======================================================");
  console.log("🔹 Estoy pensando en un número entre 1 y 100.");
  console.log("🔹 Debes adivinarlo en un número limitado de intentos.");
  console.log("🔹 Si aciertas, ¡ganas!");
  console.log("🔹 Si fallas, te diré si el número es mayor o menor.");
  console.log(
    "🔹 El juego termina cuando aciertas o te quedas sin intentos.\n"
  );
}

// Función que solicita al usuario elegir la dificultad del juego.
function seleccionarDificultad() {
  // Dificultades.
  console.log("Seleccione un nivel de dificultad.");
  console.log("1. Fácil (10 intentos)");
  console.log("2. Medio (5 intentos)");
  console.log("3. Difícil (3 intentos)");

  entradaUsuario.question(
    "Ingrese su opción (1, 2 o 3): ",
    (dificultadUsuario) => {
      // Variable que almacena los intentos.
      let intentos;

      switch (dificultadUsuario) {
        case "1":
          intentos = 10;
          break;
        case "2":
          intentos = 5;
          break;
        case "3":
          intentos = 3;
          break;
        default:
          console.log(
            "Opción no valida. Seleccionando dificultad por defecto."
          );
          intentos = 10;
      }
      console.log(`🔹 tiene ${intentos} intentos. ¡Buena suerte!\n`);
      callback(intentos);
    }
  );
}

// Función que maneja la entrada de la información del usuario desde la línea de comandos (principal)
function jugar(intentos, numeroSecreto) {
  // Condición que verifica que el número de intentos sea mayor que 0.
  if (intentos === 0) {
    console.log(`Sin intentos, El número secreto es: ${numeroSecreto}`);
    entradaUsuario.close();
    return;
  }
  entradaUsuario.question("Ingrese su número", (entradaUsuario) => {
    // Variable que almacena el número del usuario.
    let numeroUsuario = parseInt(entradaUsuario, 10);

    // Condición que verifica si la entrada del usuario por CL es un número y si es mayor o igual que 1 o menor e igual que 100.
    if (isNaN(numeroUsuario) || numeroUsuario < 1 || numeroUsuario > 100) {
      console.log("⚠️ Ingresa un número válido entre 1 y 100.");
      jugar(intentos, numeroSecreto);
      return;
    }

    // Condición que verifica si el número del usuario coincide con el número secrero elegido por la maquina.
    if (numeroUsuario === numeroSecreto) {
      console.log(
        `¡Felicidades! Adivino el número ${numeroSecreto} en ${
          10 - intentos + 1
        } intentos.`
      );
      entradaUsuario.close();
    } else {
      // Sino, decrementar en un 1, el valor de los intentos.
      intentos--;

      // Condición que verifica en el flujo del juego, si el número del usuario es MENOR o MAYOR que el elegido por la maquina.
      if (numeroUsuario > numeroSecreto) {
        console.log("📉 El número secreto es MENOR.");
      } else {
        console.log("📈 El número secreto es MAYOR.");
      }

        console.log(`🔄 Te quedan ${intentos} intentos.\n`);
        jugar(intentos, numeroSecreto);
    }
  });
}

function principal() {
  mensajesBienvenida();
  seleccionarDificultad((intentos) => {
    let numeroSecreto = Math.floor(Math.random() * 100) + 1;
    jugar(intentos, numeroSecreto);
  });
}

principal();
