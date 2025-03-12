
interface Window {
  ethereum?: {
    request: (args: { method: string }) => Promise<string[]>;
  };
  cardano?: {
    yoroi?: {
      enable: () => Promise<void>;
    };
    nami?: {
      enable: () => Promise<void>;
    };
  };
}
