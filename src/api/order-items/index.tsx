import { InsertTables } from '@/types';
import { useMutation } from '@tanstack/react-query';
import {supabase} from "@/src/app/lib/supabase";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(items: InsertTables<'order_items'>[]) {
      const { error, data: newProduct } = await supabase
        .from('order_items')
        .insert(items)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};
