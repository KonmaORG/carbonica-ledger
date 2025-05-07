export class TokenQuantityMismatchError extends Error {
  constructor(
    public readonly unit: string,
    public readonly inputQty: bigint,
    public readonly totalOutputQty: bigint
  ) {
    super(`Token quantity mismatch for unit ${unit}`);
    this.name = "TokenQuantityMismatchError";
  }
}
