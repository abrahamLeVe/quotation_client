function Unidades(num: number): string {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
    default:
      return "";
  }
}

function Decenas(num: number): string {
  let decena = Math.floor(num / 10);
  let unidad = num - decena * 10;

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return unidad === 0 ? "TREINTA" : "TREINTA Y " + Unidades(unidad);
    case 4:
      return unidad === 0 ? "CUARENTA" : "CUARENTA Y " + Unidades(unidad);
    case 5:
      return unidad === 0 ? "CINCUENTA" : "CINCUENTA Y " + Unidades(unidad);
    case 6:
      return unidad === 0 ? "SESENTA" : "SESENTA Y " + Unidades(unidad);
    case 7:
      return unidad === 0 ? "SETENTA" : "SETENTA Y " + Unidades(unidad);
    case 8:
      return unidad === 0 ? "OCHENTA" : "OCHENTA Y " + Unidades(unidad);
    case 9:
      return unidad === 0 ? "NOVENTA" : "NOVENTA Y " + Unidades(unidad);
    default:
      return Unidades(unidad);
  }
}

function Centenas(num: number): string {
  const centenas = Math.floor(num / 100);
  const decenas = num - centenas * 100;

  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return decenas === 0 ? "DOSCIENTOS" : "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return decenas === 0 ? "TRESCIENTOS" : "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return decenas === 0
        ? "CUATROCIENTOS"
        : "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return decenas === 0 ? "QUINIENTOS" : "QUINIENTOS " + Decenas(decenas);
    case 6:
      return decenas === 0 ? "SEISCIENTOS" : "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return decenas === 0 ? "SETECIENTOS" : "SETECIENTOS " + Decenas(decenas);
    case 8:
      return decenas === 0 ? "OCHOCIENTOS" : "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return decenas === 0 ? "NOVECIENTOS" : "NOVECIENTOS " + Decenas(decenas);
    default:
      return Decenas(decenas);
  }
}

function Seccion(
  num: number,
  divisor: number,
  strSingular: string,
  strPlural: string
): string {
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;
  let letras = "";

  if (cientos > 0) {
    if (cientos > 1) {
      letras = Centenas(cientos) + " " + strPlural;
    } else {
      letras = strSingular;
    }
  }

  if (resto > 0) {
    letras += " ";
  }

  return letras;
}

function Miles(num: number): string {
  const divisor = 1000;
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;
  const strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  const strCentenas = Centenas(resto);

  if (strMiles === "") return strCentenas;
  return strMiles + " " + strCentenas;
}

function Millones(num: number): string {
  const divisor = 1000000;
  const cientos = Math.floor(num / divisor);
  const resto = num - cientos * divisor;
  const strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
  const strMiles = Miles(resto);

  if (strMillones === "") return strMiles;
  return strMillones + " " + strMiles;
}

export function convertirNumeroALetras(num: number): string {
  const entero = Math.floor(num);
  const decimal = Math.round((num - entero) * 100);

  const data = {
    numero: entero,
    enteros: Math.floor(entero),
    centavos: decimal,
    letrasCentavos: "",
    letrasMonedaPlural: "DÓLARES",
    letrasMonedaSingular: "DÓLAR",
    letrasMonedaCentavoPlural: "CENTAVOS",
    letrasMonedaCentavoSingular: "CENTAVO",
  };

  if (data.centavos > 0) {
    data.letrasCentavos = convertirCentavos(data.centavos);
  }

  if (data.enteros === 0) {
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  } else if (data.enteros === 1) {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaSingular +
      (data.centavos > 0 ? ` CON ${data.letrasCentavos}` : "")
    );
  } else {
    return (
      Millones(data.enteros) +
      " " +
      data.letrasMonedaPlural +
      (data.centavos > 0 ? ` CON ${data.letrasCentavos}` : "")
    );
  }
}

function convertirCentavos(num: number): string {
  if (num === 1) {
    return "UN " + "CENTAVO";
  } else if (num < 10) {
    return Unidades(num) + " " + "CENTAVOS";
  } else if (num >= 10) {
    return Decenas(num) + " " + "CENTAVOS";
  } else {
    return "";
  }
}
