import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import Results from "./pages/Results";
import Subscription from "./pages/Subscription";
import Contacts from "./pages/Contacts";
import Booking from "./pages/Booking";
import Login from "./pages/Login";

// Account pages
import AccountDashboard from "./pages/account/Dashboard";
import AccountPets from "./pages/account/Pets";
import AccountDiary from "./pages/account/Diary";
import AccountSubscription from "./pages/account/AccountSubscription";

// Master pages
import MasterPanel from "./pages/master/MasterPanel";
import NewVisit from "./pages/master/NewVisit";

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/results" component={Results} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/booking" component={Booking} />
      <Route path="/login" component={Login} />

      {/* Client account */}
      <Route path="/account" component={AccountDashboard} />
      <Route path="/account/pets" component={AccountPets} />
      <Route path="/account/pets/new" component={AccountPets} />
      <Route path="/account/diary" component={AccountDiary} />
      <Route path="/account/diary/:petId" component={AccountDiary} />
      <Route path="/account/subscription" component={AccountSubscription} />

      {/* Master panel */}
      <Route path="/master" component={MasterPanel} />
      <Route path="/master/new-visit" component={NewVisit} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
