import { AnnotatedCommit } from './annotated-commit';
import { BranchIterator } from './branch-iterator';
import { Commit } from './commit';
import { Reference } from './reference';
import { Repository } from './repository';

export namespace Branch {
    const enum BRANCH {
        LOCAL = 1,
        REMOTE = 2,
        ALL = LOCAL | REMOTE
    }
}

export class Branch {
    /**
     * Create a new branch pointing at a target commit.
     *
     * A new direct reference will be created pointing to
     * this target commit. If `force` is true and a reference
     * already exists with the given name, it'll be replaced.
     *
     * The returned reference must be freed by the user.
     *
     * The branch name will be checked for validity.
     * See `Tag.create` for rules about valid names.
     *
     * @param repo - The repository where to find the branch.
     * @param branchName - Name for the branch; this name is
     *  validated for consistency. It should also not conflict with
     *  an already existing branch name.
     * @param target - Commit to which this branch should point. This object
     *  must belong to the given `repo`.
     * @param force - Overwrite existing branch.
     * @returns - A promise of 'Reference'.
     */
    static create(repo: Repository, branchName: string, target: Commit, force: number): Promise<Reference>;

    /**
     * Create a new branch pointing at a target commit.
     *
     * @param repo - The repository where to find the branch.
     * @param branchName - Name for the branch; this name is
     *  validated for consistency. It should also not conflict with
     *  an already existing branch name.
     * @param commit - Annotated Commit to which this branch should point. This object
     *  must belong to the given `repo`.
     * @param force - Overwrite existing branch.
     * @returns - A promise of 'Reference'.
     */
    static createFromAnnotated(repo: Repository, branchName: string, commit: AnnotatedCommit, force: number): Promise<Reference>;

    /**
     * Delete an existing branch reference.
     *
     * If the branch is successfully deleted, the passed reference
     * object will be invalidated. The reference must be freed manually
     * by the user.
     *
     * @param branch - A valid reference representing a branch.
     * @returns - 0 or an error code.
     */
    static delete(branch: Reference): number;

    /**
     * Determine if the current local branch is pointed at by HEAD.
     *
     * @param branch - Current underlying reference of the branch.
     * @returns - 1 if HEAD points at the branch, 0 if it isn't,
     * error code otherwise.
     */
    static isHead(branch: Reference): number;

    /**
     * Create an iterator which loops over the requested branches.
     *
     * @param repo - Repository where to find the branches.
     * @param listFlags - Filtering flags for the branch listing.
     * @returns - A promise of 'BranchIterator'.
     */
    static iteratorNew(repo: Repository, listFlags: Branch.BRANCH): Promise<BranchIterator>;

    /**
     * Lookup a branch by its name in a repository.
     *
     * The generated reference must be freed by the user.
     *
     * The branch name will be checked for validity.
     * See `Tag.create` for rules about valid names.
     *
     * @param repo - The repository to look up the branch
     * @param  branchName - Name of the branch to be looked-up;
     *  this name is validated for consistency.
     * @param  branchType - Type of the considered branch. This should
     * be valued with either `LOCAL` or `REMOTE`.
     * @returns - A promise of 'Reference'.
     */
    static lookup(repo: Repository, branchName: string, branchType: Branch.BRANCH): Promise<Reference>;

    /**
     * Move/rename an existing local branch reference.
     *
     * The new branch name will be checked for validity.
     * See `Tag.create` for rules about valid names.
     *
     * @param branch - Current underlying reference of the branch.
     * @param newBranchName - Target name of the branch once the move
     *  is performed; this name is validated for consistency.
     * @param force - Overwrite existing branch.
     * @returns - A promise of 'Reference'.
     */
    static move(branch: Reference, newBranchName: string, force: number): Promise<Reference>;

    /**
     * Return the name of the given local or remote branch.
     *
     * The name of the branch matches the definition of the name
     * for git_branch_lookup. That is, if the returned name is given
     * to git_branch_lookup() then the reference is returned that
     * was given to this function.
     *
     * @param ref - The reference ideally pointing to a branch.
     * @returns - A promise of 'String'.
     */
    static name(ref: Reference): Promise<string>;

    /**
     * Set the upstream configuration for a given local branch.
     *
     * @param branch - The branch to configure.
     * @param upstreamName - The remote-tracking or local branch to set as
     *  upstream. Pass NULL to unset.
     * @returns - A promise of 'Number' (0 or an error code).
     */
    static setUpstream(branch: Reference, upstreamName: string): Promise<number>;

    /**
     * Return the reference supporting the remote tracking branch,
     * given a local branch reference.
     *
     * @param branch - Current underlying reference of the branch.
     * @returns - A promise of 'Reference'.
     */
    static upstream(branch: Reference): Promise<Reference>;

    /**
     * Retrieve the Branch's Remote Name as a String.
     *
     * @param repo - The repository to get the remote name from.
     * @param remoteRef - The reference name of the branch.
     * @returns - The remote name as a string.
     */
    static remoteName(repo: Repository, remoteRef: Reference): string;
}
