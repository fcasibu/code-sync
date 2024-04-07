declare namespace Express {
  export interface Locals extends Express.Locals {
    isAuthorized: boolean;
  }
}
