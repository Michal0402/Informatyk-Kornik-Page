import { Phone } from "lucide-react";
import { telHref } from "@/lib/utils";

export function MobileCallBar({
  phone,
  phoneDisplay,
}: {
  phone: string;
  phoneDisplay: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] p-3 backdrop-blur-md md:hidden pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <a
        href={telHref(phone)}
        className="btn btn-primary w-full"
        aria-label={`Zadzwoń ${phoneDisplay}`}
      >
        <Phone className="h-4 w-4" aria-hidden />
        Zadzwoń • {phoneDisplay}
      </a>
    </div>
  );
}
