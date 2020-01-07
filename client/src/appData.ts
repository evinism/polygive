import Home from "./layouts/Home";
import { PageManifest } from "./clientTypes";
import SuperPanel from "./pages/SuperPanel";
import IndexPage from "./pages/IndexPage";
import CharitiesList from "./pages/CharitiesList";
import DonationsList from "./pages/DonationsList";
import Profile from "./pages/Profile";
import LogInToContinue from "./pages/LogInToContiinue";
import PublicBarebones from "./layouts/PublicBarebones";
import CharityDescription from "./pages/CharityDescription";
import Payments from "./pages/Payments";

export const pageManifest: PageManifest = {
  index: {
    public: true,
    path: "/",
    exact: true,
    name: "Portfolio",
    component: IndexPage
  },
  donations: {
    path: "/donations",
    exact: false,
    name: "Donations",
    component: DonationsList,
    layout: Home
  },
  charities: {
    path: "/charities",
    exact: true,
    name: "Charities",
    component: CharitiesList,
    layout: Home
  },
  payment: {
    path: "/payment",
    exact: true,
    name: "Payment",
    component: Payments,
    layout: Home
  },
  charityDescription: {
    path: "/charities/:id",
    exact: true,
    name: "Charity",
    component: CharityDescription,
    layout: PublicBarebones
  },
  profile: {
    path: "/profile",
    exact: true,
    component: Profile,
    name: "Profile",
    layout: Home
  },
  login: {
    public: true,
    path: "/login",
    exact: false,
    name: "Login",
    component: LogInToContinue,
    layout: PublicBarebones
  },
  superPanel: {
    path: "/superpanel",
    component: SuperPanel,
    name: "Super Panel",
    layout: Home,
    super: true
  }
};

export const tabList = ["donations", "charities"];
