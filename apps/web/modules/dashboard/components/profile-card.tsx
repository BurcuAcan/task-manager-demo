import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/card";
import { User } from "@/modules/(auth)/types/auth.types";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <p className="text-sm font-medium">Username</p>
          <p className="text-sm text-muted-foreground">{user.username}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
}

