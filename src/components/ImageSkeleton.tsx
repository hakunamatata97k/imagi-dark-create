
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImageSkeleton() {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="w-full h-96 animate-pulse-slow" />
      </CardContent>
    </Card>
  );
}
