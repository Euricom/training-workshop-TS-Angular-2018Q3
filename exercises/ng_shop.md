# Exercise Angular

Create Angular App to show product of our shop

## Part 1

- Start from '.../topics/angular/templates/ng-app'
- Two pages with router
    - table view (http://localhost:8080/list)
    - panel view (http://localhost:8080/)
  Navigate between view with menu
- Get products from ShopApi 'http://localhost:6657/api/products'
- Table view
    - Id
    - Sku
    - Title
    - Price
    - BasePrice
    - Stocked
- Panel view
    - Image
    - Id
    - Sku
    - Title
    - Desc
    - Stocked
    - Price

- Add model for product and pass model in components

- Create pipes
    - To format price
    - To format date

- Add unit test for
    + Pipes
    + Models
    + Http Services (productService)

- Add Error handling for failed http calls (interceptor & display error)

- Remark:
    + Keep your component so lite as possible

## Part 2

- Detail product page
    - By clicking on product in table view, and 'Add New' button.
    - Reactive based form to change/add product
- Add validation to product
    + Title: required
    + Price: required and above 0
- Add delete button in details page & table view
- Extend unit test where needed
    + Models (Product)
    + Http Services (productService)

- Remark:
    + No image upload

## Part 3

- Add shopping basket
- Add 'buy' button on product with quantity
- Update server with basket and update total price and quantity

- Add unit test for
    + Models (Basket)
    + Http Services (basketService)
