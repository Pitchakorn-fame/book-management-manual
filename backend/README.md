I started by creating a common Book type for the book management system. This helped me define the request body structure and data types used for API validation. I used a book[] array as an in-memory database to handle create, get, edit, and delete operations.

I implemented createBook, getBooks, getBookById, updateBook, and deleteBook by starting with the service layer first, then connecting it to the controller. Validation logic is handled at the controller level.

Due to time limitations, I implemented manual validation for each field and request parameter instead of using a validation library. I also added a check in createBook to ensure that the ISBN is unique and prevent duplicate entries.

For delete (soft delete), I used the PATCH method to update the book’s status to INACTIVE, so it is not permanently removed from the system.


What I want to implement but didn’t have enough time
- I want to implement a formal validation library such as Zod, so I don’t have to manually validate each field.
- Unit tests. I didn’t have enough time to write them, but below are my example planned test cases:
1. createBook (service and controller)
Create with duplicate ISBN
Create with missing body
Create with qty < 0
Create with missing required fields
Create with valid body (happy case)

2. getBooks (service and controller)
Get when there are no books
Get when books exist

3. getBookById (service and controller)
Get with invalid ID format
Get with valid ID format but ID does not exist
Get with valid ID (happy case)

How to run the project
1. Clone the project
2. cd backend
3. npm install
4. npm run start

How to run tests
npm run test
