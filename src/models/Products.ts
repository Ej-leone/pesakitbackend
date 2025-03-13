


/******************************************************************************
                                  Types
******************************************************************************/

export interface IProduct {
  id:string;
  title:string;
  price:string;
  thumbnail:string;
  brand:string;
    state: 'available' | 'outofstock';
    created: Date;
  }
  