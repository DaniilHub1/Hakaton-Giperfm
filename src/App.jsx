import { dataProvider } from "@refinedev/supabase";
import { supabaseClient } from "./providers/supabaseClient";
import authProvider from "./providers/authProvider";
import { liveProvider } from "@refinedev/supabase";
import { useNotificationProvider } from "@refinedev/antd";

import { EmployeeList } from "./pages/employees/list";
import { ShowEmployee } from "./pages/employees/show";
import { ListOrders } from "./pages/orders/list";

import { Refine, Authenticated } from "@refinedev/core";
import routerProvider, { NavigateToResource } from "@refinedev/react-router-v6";
import { ThemedHeaderV2, ThemedTitleV2, ThemedLayoutV2 } from "@refinedev/antd";

import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { ConfigProvider, App as AntdApp } from "antd";

import { CalendarCreatePage } from "./pages/calendar/create";
import { CalendarShowPage } from "./pages/calendar/show";
import { CalendarEditPage } from "./pages/calendar/edit";
import { CalendarPageWrapper } from "./pages/calendar";

import { Login } from "./pages/login";

import "antd/dist/reset.css";
import { ProductsList } from "./pages/products/list";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#0c1a2d",
          colorInfo: "#0c1a2d"
        },
        "components": {
          Transfer: {
            "colorError": "rgb(137, 85, 86)"
          },
          "Button": {
            borderRadius: 20,
            paddingInline: 40,
            
          },
          Card: {
            headerFontSize: 24,
            fontHeight: 28,
            padding: 8
          }
        }
      }}>
        <AntdApp>
          <Refine
            liveProvider={liveProvider(supabaseClient)}
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            notificationProvider={useNotificationProvider}
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
                meta: { label: "Продукты" },
              },
              {
                name: "orders",
                list: "/orders",
                meta: { label: "Заказы" },
              },
              {
                name:"events",
                list:"/calendar",
                create: "calendar/create",
                show:"/calendar/:id",
                edit:"calendar/edit/:id",
                meta:{label: "События" },
              },
            ]}
            options={{ liveMode: "auto" }}
            onLiveEvent={(event) => {
              console.log(event);
            }}
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
                <Route path="/orders">
                  <Route index element={<ListOrders />} />
                </Route>

              </Route>
              <Route
                      path="/calendar"
                      element={
                        <CalendarPageWrapper>
                          <Outlet />
                        </CalendarPageWrapper>
                      }
                    >
                      <Route index element={null} />
                      <Route path="show/:id" element={<CalendarShowPage />} />
                      <Route path="edit/:id" element={<CalendarEditPage />} />
                      <Route path="create" element={<CalendarCreatePage />} />
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
    </BrowserRouter >
  );
}