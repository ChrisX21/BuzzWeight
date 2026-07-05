import InviteUsers from "@/components/invite-users";

export default function Settings() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage access and workspace preferences.
        </p>
      </div>

      <section className="surface-card p-6">
        <h2 className="text-lg font-semibold">Invite a team member</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Send an email invitation to give someone access to the dashboard.
        </p>
        <div className="mt-4">
          <InviteUsers />
        </div>
      </section>

      <p className="text-center text-sm text-muted-foreground">
        More features coming soon…
      </p>
    </div>
  );
}
