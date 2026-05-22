/*
 * PhDNexus App — Scientific Precision design system
 * Routes: Home (landing), Feed (idea feed), IdeaDetail, Profile, Communities, Search
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Feed from "./pages/Feed";
import IdeaDetail from "./pages/IdeaDetail";
import Profile from "./pages/Profile";
import Communities from "./pages/Communities";
import Search from "./pages/Search";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/feed" component={Feed} />
      <Route path="/idea/:id" component={IdeaDetail} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/communities" component={Communities} />
      <Route path="/search" component={Search} />
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
