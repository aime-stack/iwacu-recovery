export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout only wraps the login page without the sidebar
  return <>{children}</>;
}

