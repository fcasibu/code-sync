export class DeferredPromise<T> {
  public promise: Promise<T>;

  public resolve: (value: T | PromiseLike<T>) => void = () => undefined;
  public reject: (reason?: unknown) => void = () => undefined;

  constructor() {
    this.promise = new Promise((res, rej) => {
      this.resolve = res;
      this.reject = rej;
    });
  }
}
