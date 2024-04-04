import { EProductTalles } from '../enum/product.enum';

export interface IProduct {
  id: string;
  codigo: string;
  nombre: string;
  precio: number;
  talle: EProductTalles;
  categoria: string;
}
