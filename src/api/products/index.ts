import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Product} from "@/types";
import {supabase} from "@/src/app/lib/supabase";

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ['products', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
}

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from('products')
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      // @ts-ignore
      await queryClient.invalidateQueries(['products']);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: updatedProduct } = await supabase
        .from('products')
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq('id', data.id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedProduct;
    },
    async onSuccess(_, { id }) {
      // @ts-ignore
      await queryClient.invalidateQueries(['products']);
      // @ts-ignore
      await queryClient.invalidateQueries(['products', id]);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: number) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      // @ts-ignore
      await queryClient.invalidateQueries(['products']);
    },
  });
};
