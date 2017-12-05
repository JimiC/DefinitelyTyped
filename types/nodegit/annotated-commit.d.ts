import { Reference } from './reference';
import { Repository } from './repository';
import { Oid } from './oid';

export class AnnotatedCommit {
    /**
     * Creates an `AnnotatedCommit` from the given fetch head data.
     * The resulting AnnotatedCommit must be freed with `free`.
     *
     * @param repo - The repository that contains the given commit.
     * @param branchName - The name of the (remote) branch.
     * @param remoteUrl - The url of the remote.
     * @param id - The commit object id of the remote branch.
     * @returns - A promise of `AnnotatedCommit`
     */
    static fromFetchhead(repo: Repository, branchName: string, remoteUrl: string, id: Oid): Promise<AnnotatedCommit>;

    /**
     * Creates an `AnnotatedCommit` from the given reference.
     * The resulting AnnotatedCommit must be freed with `free`.
     *
     * @param repo - The repository that contains the given reference.
     * @param ref - The reference to use to lookup the `AnnotatedCommit`.
     * @returns - A promise of `AnnotatedCommit`
     */
    static fromRef(repo: Repository, ref: Reference): Promise<AnnotatedCommit>;

    /**
     * Creates an `AnnotatedCommit` from a revision string.
     * The resulting AnnotatedCommit must be freed with `free`.
     *
     * @param repo - The repository that contains the given commit.
     * @param revspec - The extended sha syntax string to use to lookup the commit.
     * @returns - A promise of `AnnotatedCommit`
     */
    static fromRevspec(repo: Repository, revspec: string): Promise<AnnotatedCommit>;

    /**
     * Creates an `AnnotatedCommit` from the given commit id.
     * The resulting AnnotatedCommit must be freed with `free`.
     *
     * An annotated commit contains information about how it was
     * looked up, which may be useful for functions like merge or
     * rebase to provide context to the operation. For example,
     * conflict files will include the name of the source or target
     * branches being merged. It is therefore preferable to use the
     * most specific function (eg `fromRef`)
     * instead of this one when that data is known.
     *
     * @param repo - The repository that contains the given commit.
     * @param id - The commit object id to lookup.
     * @returns - A promise of `AnnotatedCommit`
     */
    static lookup(repo: Repository, id: Oid): Promise<AnnotatedCommit>;

    /**
     * Frees an `AnnotatedCommit`.
     */
    free(): void;

    /**
     * Gets the commit ID that the given `AnnotatedCommit` refers to.
     *
     * @returns - An id object.
     */
    id(): Oid;
}
