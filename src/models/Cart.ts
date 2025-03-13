/******************************************************************************
                                  Types
******************************************************************************/

export interface ICartProduct {
    productid:string;
    amount: number;
    
 }

export interface ICart {
    userId: string;
    product: ICartProduct[];
 }
    