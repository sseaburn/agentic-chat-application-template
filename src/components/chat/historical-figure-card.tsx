"use client";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

interface HistoricalFigureCardProps {
  name: string;
  biography: string;
  imageBase64: string;
  mimeType: string;
}

function biographyParagraphs(text: string) {
  return text.split("\n\n").filter((p) => p.trim().length > 0);
}

export function HistoricalFigureCard({
  name,
  biography,
  imageBase64,
  mimeType,
}: HistoricalFigureCardProps) {
  const paragraphs = biographyParagraphs(biography);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Portrait Image */}
          <div className="relative flex shrink-0 items-center justify-center bg-muted/30 p-6 md:w-80">
            <Image
              src={`data:${mimeType};base64,${imageBase64}`}
              alt={`Portrait of ${name}`}
              width={320}
              height={448}
              unoptimized
              className="h-auto max-h-96 w-full rounded-xl object-cover shadow-md md:max-h-[28rem]"
            />
          </div>

          {/* Biography */}
          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-4 text-2xl font-bold tracking-tight">{name}</h2>
            <div className="text-muted-foreground space-y-3 text-sm leading-relaxed">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HistoricalFigureCardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6">
      <div className="overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Image skeleton */}
          <div className="flex shrink-0 items-center justify-center bg-muted/30 p-6 md:w-80">
            <Skeleton className="h-72 w-full rounded-xl md:h-96" />
          </div>

          {/* Biography skeleton */}
          <div className="flex flex-1 flex-col gap-4 p-6">
            <Skeleton className="h-8 w-2/3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-muted-foreground/60 mt-3 text-center text-sm">
        Generating portrait and biography...
      </p>
    </div>
  );
}
