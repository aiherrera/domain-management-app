export interface Domain {
  id: string;
  item: string;
  provider: string;
  buyPrice: number | string;
  boughtDate: string;
  forSale: boolean;
  sellingPrice: number | null;
  soldDate: string | null;
}

export interface DomainFormData {
  item: string;
  provider: string;
  buyPrice: string;
  boughtDate: string;
  forSale: boolean;
  sellingPrice: string;
  soldDate: string;
}