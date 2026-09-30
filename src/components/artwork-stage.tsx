import Image from "next/image";

export function ArtworkStage() {
  return <div className="artwork-stage" aria-hidden="true">
    <Image src="/art/studio-atmosphere.webp" alt="" fill priority unoptimized sizes="100vw" className="studio-background" />
  </div>;
}
