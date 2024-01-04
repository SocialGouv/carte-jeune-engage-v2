import { useAuth } from "~/providers/Auth";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      {user?.email}
    </div>
  );
}
