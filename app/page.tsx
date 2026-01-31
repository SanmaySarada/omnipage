export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <h1 className="text-4xl font-bold text-foreground">
        Omni Card Foundation
      </h1>
      <p className="text-muted-foreground">
        Design tokens are working correctly.
      </p>

      {/* Color swatches */}
      <div className="flex gap-4">
        <div className="size-16 rounded-lg bg-primary" title="Primary" />
        <div className="size-16 rounded-lg bg-secondary" title="Secondary" />
        <div className="size-16 rounded-lg bg-accent" title="Accent" />
        <div className="size-16 rounded-lg bg-muted" title="Muted" />
      </div>

      {/* Shadow samples */}
      <div className="flex gap-4">
        <div className="size-16 rounded-lg bg-card shadow-sm" />
        <div className="size-16 rounded-lg bg-card shadow-md" />
        <div className="size-16 rounded-lg bg-card shadow-lg" />
      </div>

      {/* Radius samples */}
      <div className="flex gap-4">
        <div className="size-16 bg-primary rounded-sm" />
        <div className="size-16 bg-primary rounded-md" />
        <div className="size-16 bg-primary rounded-lg" />
        <div className="size-16 bg-primary rounded-xl" />
      </div>
    </main>
  )
}
