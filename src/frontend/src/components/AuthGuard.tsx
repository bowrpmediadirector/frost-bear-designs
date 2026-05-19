import { createActor } from "@/backend";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Snowflake } from "lucide-react";
import { type ReactNode, useEffect } from "react";

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitializing, isLoggingIn, login } =
    useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const navigate = useNavigate();

  const { data: isAdmin, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  useEffect(() => {
    if (isInitializing || isLoggingIn) return;
    if (!isAuthenticated) {
      navigate({ to: "/" });
      return;
    }
    if (!isLoading && isAdmin === false) {
      navigate({ to: "/" });
    }
  }, [
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    isAdmin,
    isLoading,
    navigate,
  ]);

  if (!isAuthenticated && !isInitializing && !isLoggingIn) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
            <Snowflake className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Admin Access Required
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            Sign in with Internet Identity to access the admin panel.
          </p>
          <button
            type="button"
            onClick={login}
            data-ocid="auth_guard.login.button"
            className="px-6 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (isInitializing || isLoggingIn || isLoading) {
    return (
      <div
        className="flex flex-1 items-center justify-center min-h-[60vh]"
        data-ocid="auth_guard.loading_state"
      >
        <div className="flex flex-col items-center gap-3">
          <Snowflake className="w-8 h-8 text-primary animate-spin" />
          <p className="text-muted-foreground text-sm">Verifying access…</p>
        </div>
      </div>
    );
  }

  if (isAdmin) {
    return <>{children}</>;
  }

  return null;
}
