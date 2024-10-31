import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Purchase {
  fileId: number;
  fileName: string;
  purchaseDate: string;
  price: number;
  downloadUrl: string;
}

interface PurchaseState {
  purchases: Purchase[];
}

const initialState: PurchaseState = {
  purchases: []
};

const purchaseSlice = createSlice({
  name: 'purchases',
  initialState,
  reducers: {
    addPurchase: (state, action: PayloadAction<Purchase>) => {
      state.purchases.push(action.payload);
    }
  }
});

export const { addPurchase } = purchaseSlice.actions;
export default purchaseSlice.reducer;