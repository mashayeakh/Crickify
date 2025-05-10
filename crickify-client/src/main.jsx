import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Root from './components/Root/Root.jsx'
import Error from './components/Error/Error.jsx'
import Home from './components/Home/Home.jsx'
import Categories from './components/Collections/Categories/Categories.jsx'
import Signin from './components/Accounts/Signin/Signin.jsx'
import Signup from './components/Accounts/Signup/Signup.jsx'
import AuthContextProvider from './components/Context/AuthContextProvider.jsx'
import Dashboard from './components/User_Actions/Dashboard/Dashboard.jsx'
import ProductManage from './components/User_Actions/ProductManage/ProductManage.jsx'
import BrandManage from './components/User_Actions/BrandManage/BrandManage.jsx'
import PrivateRoutes from './components/Routes/PrivateRoutes.jsx'
import AddProduct from './components/User_Actions/ProductManage/AddProduct/AddProduct.jsx'
import ShowProduct from './components/User_Actions/ProductManage/ShowProduct/ShowProduct.jsx'
import AddCategory from './components/User_Actions/ProductManage/AddCategory/AddCategory.jsx'
import AddBrand from './components/User_Actions/ProductManage/Brand/AddBrand.jsx'
import Add_Wood_Handle from './components/User_Actions/ProductManage/Wood_Handle/Add_Wood_Handle.jsx'
import InventorySetup from './components/User_Actions/ProductManage/InventorySetup/InventorySetup.jsx'
import AddBrands from './components/User_Actions/BrandManage/AddBrand/AddBrands.jsx'
import ManageBrands from './components/User_Actions/BrandManage/ManageBrands/ManageBrands.jsx'
import StoreContextProvider from './components/Context/StoreContextProvider.jsx'
import DashboardContent from './components/User_Actions/Dashboard/DashboardContent.jsx'
import ProductContextProvider from './components/Context/ProductContextProvider.jsx'
import GroundEquipment from './components/Home/GroundEquipment.jsx'
import BlogsDetails from './components/Blogs/BlogsDetails.jsx'
import FeatturedProductsDetails from './components/Home/FeatturedProductsDetails.jsx'
import CartContextProvider from './components/Context/CartContextProvider.jsx'
import Cart from './components/Checkout/Checkout.jsx'
import Checkout from './components/Checkout/Checkout.jsx'
import UserPayment from './components/Checkout/UserPayment.jsx'
import ReuseBrands from './components/Home/ReuseBrands/ReuseBrands.jsx'
import AddBrandWise_Product from './components/User_Actions/BrandManage/AddBrandWise_Product/AddBrandWise_Product.jsx'
import Jersey from './components/Home/Jersey.jsx'
import ShowJersey from './components/Home/Jersey/ShowJersey.jsx'
import AddJersey from './components/User_Actions/JerseyManage/AddJersey/AddJersey.jsx'
import JerseyDetails from './components/Home/Jersey/JerseyDetails.jsx'
import Profile from './components/User/Profile/Profile.jsx'
// import FeatturedProductsProvider from './components/Context/FeatturedProductsProvider.jsx'


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/collections/categories/:slug",
          element: <Categories />,

        },
        {
          path: "/singin",
          element: <Signin />
        },
        {
          path: "/garden_equipment/news",
          element: <GroundEquipment />
        },
        {
          path: "/singup",
          element: <Signup />
        },
        {
          path: "/signin",
          element: <Signin />
        },

        {
          path: "fetured-proeducts/:category/:id",
          element: <FeatturedProductsDetails />,
          loader: ({ params }) => fetch(`http://localhost:5000/product/${params.category}/${params.id}`)
        },

        {
          path: "/dashboard",
          element: (
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          )

        },
        {
          path: "/:category/:id/payment",
          element: <UserPayment />
        },
        {
          path: "/blog/:slug",
          element: <BlogsDetails />
        },
        {
          path: "/jerseies",
          element: <ShowJersey />
        },
        {
          path: "/jersey/:title",
          element: <JerseyDetails />,
          loader: ({ params }) => fetch(`http://localhost:5000/jersey/${params.title}`),
        },

        {
          path: "/product_management",
          element: <ProductManage />
        },
        {
          path: "/brands/:title",
          element: <ReuseBrands />,
          loader: ({ params }) => fetch(`http://localhost:5000/global-brands/${params.title}`),
        },
        {
          path: "/brand_management",
          element: <BrandManage />
        },
        {
          path: "/product_management/add-product",
          element: <AddProduct />,

          loader: async () => {
            const [handleTypeRes, woodTypeRes] = await Promise.all([
              fetch("http://localhost:5000/handles"),
              fetch("http://localhost:5000/woods"),

              // fetch(`http://localhost:5000/brands/${params.catName}`)
            ]);
            const handleType = await handleTypeRes.json();
            const woodType = await woodTypeRes.json();

            return { handleType, woodType };
          }

        },
        {
          path: "/product_management/add-category",
          element: <AddCategory />
        },
        {
          path: "/product_management/add-handle-wood-type",
          element: <Add_Wood_Handle />
        },
        {
          path: "/:category/:id/checkout",
          element: <Checkout />
        },

        {
          path: "/product_management/inventory-setup",
          element: <InventorySetup />,
          loader: async () => {
            const [categoryRes, handleRes, woodRes] = await Promise.all([
              fetch("http://localhost:5000/categories"),
              fetch("http://localhost:5000/handles"),
              fetch("http://localhost:5000/woods"),
            ])
            const category = await categoryRes.json();
            const handle = await handleRes.json();
            const wood = await woodRes.json();
            return { category, handle, wood };
          }
        },
        {
          path: "/product_management/add-brand",
          element: <AddBrand />,
          loader: () => fetch("http://localhost:5000/categories"),
        },
        {
          path: "/product_management/show-product",
          element: <ShowProduct />,
          loader: () => fetch("http://localhost:5000/products")
        },
        //!  ---------------------------------------------------------------------

        {
          path: "/brand_management/add-brands",
          element: <AddBrands />,
        },
        {
          path: "/brand_management/add-brandwise-product",
          element: <AddBrandWise_Product />,
        },
        {
          path: "/brand_management/manage-brands",
          element: <ManageBrands />,
          loader: () => fetch("http://localhost:5000/global-brands")
        },
        //!---------------------------------------------------------------------
        {
          path: "/jersey_management",
          element: <BrandManage />
        },
        {
          path: "/jersey_management/add-jersey",
          element: <AddJersey />,
        },

        //! -------------------- Profile -----------------------------------------
        {
          path: "/profile",
          element: <Profile />
        }
      ]
    }
  ]
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <StoreContextProvider>
          <ProductContextProvider>
            <RouterProvider router={router} />
          </ProductContextProvider>
        </StoreContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
