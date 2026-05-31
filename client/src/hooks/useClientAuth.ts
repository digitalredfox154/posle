import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useEffect } from "react";

export function useClientAuth(requireAuth = false) {
  const [, setLocation] = useLocation();
  const { data: client, isLoading } = trpc.posleClient.me.useQuery();

  useEffect(() => {
    if (requireAuth && !isLoading && !client) {
      setLocation("/login");
    }
  }, [requireAuth, isLoading, client, setLocation]);

  return { client, isLoading, isAuthenticated: !!client };
}
