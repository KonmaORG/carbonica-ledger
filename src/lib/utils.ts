import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { bech32 } from "bech32";
import { ProjectDocumentUpload } from "@/types/project";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function hexToBech32(data: string) {
  const bytes: number[] = [];
  for (let i = 0; i < data.length; i += 2) {
    bytes.push(parseInt(data.substring(i, i + 2), 16));
  }
  const words = bech32.toWords(bytes);
  const bech32Address = bech32.encode("addr", words, 103);
  return bech32Address;
}

export function toAda(value: BigInt) {
  return Number(value) / 1_000_000;
}
export function toLovelace(value: number) {
  return BigInt(value * 1_000_000);
}

export function handleError(error: any) {
  const { info, message } = error;

  function toJSON(error: any) {
    try {
      const errorString = JSON.stringify(error);
      const errorJSON = JSON.parse(errorString);

      return errorJSON;
    } catch {
      return {};
    }
  }

  const { cause } = toJSON(error);
  const { failure } = cause ?? {};

  const failureCause = failure?.cause;
  const failureInfo = failureCause?.info;
  const failureMessage = failureCause?.message;

  // toast(`${failureInfo ?? failureMessage ?? info ?? message ?? error}`, {
  // type: "error",
  // });
  throw new Error(failureInfo ?? failureMessage ?? info ?? message ?? error);
}

export function getTimeRemaining(futureTimestamp) {
  const now = Date.now();
  const diff = futureTimestamp - now;

  if (diff <= 0) return "Time expired";

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days >= 1) {
    return `${days} day${days > 1 ? "s" : ""} left`;
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? "s" : ""} left`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} left`;
  }
}

export const calculateCombinedHash = async (
  documents: ProjectDocumentUpload[]
): Promise<string> => {
  try {
    if (documents.length === 0) {
      // Return a hash of an empty string for consistency, or throw an error if required
      const encoder = new TextEncoder();
      const emptyBuffer = encoder.encode("");
      const hashBuffer = await crypto.subtle.digest("SHA-256", emptyBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    // Get individual hashes
    const individualHashes = await Promise.all(
      documents.map(async (doc, index) => {
        if (!(doc.file instanceof File)) {
          throw new Error(
            `Invalid file object for document at index ${index}: ${doc.name}`
          );
        }

        // Read file contents directly from doc.file
        const buffer = await doc.file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      })
    );

    // Combine all hashes into a single string
    const combinedString = individualHashes.join("");

    // Create a final hash from the combined string
    const encoder = new TextEncoder();
    const combinedBuffer = encoder.encode(combinedString);
    const finalHashBuffer = await crypto.subtle.digest(
      "SHA-256",
      combinedBuffer
    );
    const finalHashArray = Array.from(new Uint8Array(finalHashBuffer));
    return finalHashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch (error) {
    console.error("Error calculating combined hash:", error);
    throw new Error(
      `Failed to calculate combined hash: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
};

export function formatDateToLongForm(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatISODate(isoString) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
