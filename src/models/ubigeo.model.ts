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
