import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./providers/supabaseClient";
import authProvider from "./providers/authProvider";

import { EmployeeList } from "./pages/employees/list";
import { ShowEmployee } from "./pages/employees/show";


import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ThemedHeaderV2, ThemedTitleV2, ThemedLayoutV2 } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { Login } from "./pages/login";

import "antd/dist/reset.css";
import { ProductsList } from "./pages/products/list";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AntdApp>
          <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            resources={[
              {
                name: "Employees",
                list: "/employees",
                show: "/employees/:id",
                meta: { label: "Сотрудники" }
              },
              {
                name: "products",
                list: "/products",
                show: "/products/:id",
                meta: { label: "Мерч" }
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    redirectOnFail="/login"
                  >
                    <ThemedLayoutV2
                      Title={() => <ThemedTitleV2 text="Giper.fm" />}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route
                  index
                  element={<NavigateToResource resource="Employees" />}
                />
                <Route path="/employees">
                  <Route index element={<EmployeeList />} />
                  <Route path="/employees" element={<EmployeeList />} />
                  <Route path="/employees/:id" element={<ShowEmployee />} />
                </Route>
                <Route path="/products">
                  <Route index element={<ProductsList />} />
                  <Route path="/products" element={<ProductsList />} />
                  <Route path="/products/:id" element={<ProductsList />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="Employees" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
              </Route>
            </Routes>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
}