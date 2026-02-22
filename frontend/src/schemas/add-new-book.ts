import { z } from "zod";
export const addNewBookFormSchema = z.object({
  isbn: z.string().min(13, { message: "ISBN must be 13 digits" }),
});

export type AddNewBookForm = z.infer<typeof addNewBookFormSchema>;

export const ADD_NEW_BOOK_DEFAULT_VALUES: AddNewBookForm = {
  isbn: "",
};
