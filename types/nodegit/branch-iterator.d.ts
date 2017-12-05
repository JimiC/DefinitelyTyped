import { Branch } from './branch';

export class BranchIterator {
    [Symbol.iterator](): Iterator<Branch>;
}
