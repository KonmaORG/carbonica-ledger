
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
  };
  
  cardano?: {
    yoroi?: {
      enable: () => Promise<any>;
      isYoroi?: boolean;
    };
    nami?: {
      enable: () => Promise<any>;
      isNami?: boolean;
    };
  };
}
