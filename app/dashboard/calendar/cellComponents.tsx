export interface AlimentareCell {
    id: number;
    tip: string;
    litri: number;
    pret: number;
}

export interface CalendarMainCell {
    curse: CursaCell[];
    alimentari: AlimentareCell[];
    licente: LicentaCell[];
    data: Date;
  }
  
  export interface CalendarRow{
      id_masina:number,
      numar_masina: string,
      cells: CalendarMainCell[]
  }

  export interface CursaCell {
    id: number;
    km: number;
    livrare: string; 
}

export interface LicentaCell {
    id: number;
    tip: string;
    data_inceput: Date;
    data_final: Date;
}
