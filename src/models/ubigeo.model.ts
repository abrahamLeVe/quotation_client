// export interface UbigeoInterface {
//   "1": _1;
//   "2": _1;
//   "3": _1;
//   "4": _1;
//   "5": _1;
//   "6": _1;
//   "7": _1;
//   "8": _1;
//   "9": _1;
//   "10": _1;
//   "11": _1;
//   "12": _1;
//   "13": _1;
//   "14": _1;
//   "15": _1;
//   "16": _1;
//   "17": _1;
//   "18": _1;
//   "19": _1;
//   "20": _1;
//   "21": _1;
//   "22": _1;
//   "23": _1;
//   "24": _1;
//   "25": _1;
// }
export interface UbigeoInterface {
  [key: string]: Departamento;
}

export interface Departamento {
  departamento: string;
  departamento_id: string;
  provincias: Provincia[];
}

export interface Provincia {
  provincia_id: string;
  provincia: string;
  distritos: Distrito[];
}

export interface Distrito {
  distrito_id: string;
  distrito: string;
}
