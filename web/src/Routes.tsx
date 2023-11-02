// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage
import { Route, Router } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/" redirect="/products" />

      <Route path="/products/new" page={ProductNewProductPage} name="newProduct" />
      <Route path="/products/{id:Int}/edit" page={ProductEditProductPage} name="editProduct" />
      <Route path="/products/{id:Int}" page={ProductProductPage} name="product" />
      <Route path="/products" page={ProductProductsPage} name="products" />

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
