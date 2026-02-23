I started by creating a common Book type for the book management system, which is rendered on the UI. I used a Book[] array as an in-memory database to handle create, get, edit, and delete operations.

First, I built the BookList component, which allows scrolling when there are many rows of book data. For the SearchBar, I implemented the logic using onChange and setState, so the search feature triggers every time the user types.

For BookForm, I used a single component for both create and edit modes, separated by props, and added validation for every field. I also built a reusable TextInputField component so I don’t have to style and customize each input field individually.

I decided that ISBN should not be editable since it is unique data, so I disabled the ISBN field in edit mode. After editing, the updated book is rendered at the same index in the BookList.

Finally, I implemented soft delete by updating the book’s status to INACTIVE and disabling the edit and delete buttons in the BookList


What I want to implement but didn’t have enough time
- I planned to implement React Hook Form and Zod with the TextInputField component. This would allow me to avoid managing state in every input field and let Zod handle form validation. I actually started implementing it, but I encountered an issue that took time to fix. Due to time constraints, I decided to revert to using basic useState and onChange.
- For BookStats, I didn’t have enough time to complete it. My idea was to update the qty field to be an object that includes:
 1. qtyStockAvailable
 2. qtyStockBorrow
 3. qtyStockTotal
This would allow me to provide more detailed statistics for the dashboard (BookStats) and BookCard's details.
- I also wanted to:
  1. Add a createdAt field to each book.
  2. Implement sorting functionality for each column in the BookList table.
  3. Add custom validation for each field. For example: ISBN and qty input should accept only positive integers when user typing.
  4. Category should be implemented as a selector instead of a text input.


  How to run the project
  1. Clone the project
  2. cd frontend
  3. npm install
  4. npm run dev
  5. open http://localhost:3000
