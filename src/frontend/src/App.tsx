import AdminGalleryPage from "@/pages/AdminGalleryPage";
import AdminInquiriesPage from "@/pages/AdminInquiriesPage";
import AdminPage from "@/pages/AdminPage";
import AdminReleasesPage from "@/pages/AdminReleasesPage";
import ContractCreatorPage from "@/pages/ContractCreatorPage";
import ContractSamplePage from "@/pages/ContractSamplePage";
import FreeReleasesPage from "@/pages/FreeReleasesPage";
import GalleryPage from "@/pages/GalleryPage";
import HomePage from "@/pages/HomePage";
import InquiryPage from "@/pages/InquiryPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ServicesPage from "@/pages/ServicesPage";
import TermsPage from "@/pages/TermsPage";
import {
  RouterProvider,
  createHashHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute();

const routes = [
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/services",
    component: ServicesPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/inquiry",
    component: InquiryPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/gallery",
    component: GalleryPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/free-releases",
    component: FreeReleasesPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/contract-creator",
    component: ContractCreatorPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/contract-sample",
    component: ContractSamplePage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/terms",
    component: TermsPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/privacy",
    component: PrivacyPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin",
    component: AdminPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin/inquiries",
    component: AdminInquiriesPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin/gallery",
    component: AdminGalleryPage,
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/admin/releases",
    component: AdminReleasesPage,
  }),
];

const routeTree = rootRoute.addChildren(routes);

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
