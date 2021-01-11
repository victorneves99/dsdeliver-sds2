import { SelectContainer } from "react-select/src/components/containers";
import ProductCard from "./ProductCard";
import { Product } from "./types";

export function checkIsSelcted(selectedProducts:Product[], product:Product){
  return selectedProducts.some(item=>item.id === product.id)
}