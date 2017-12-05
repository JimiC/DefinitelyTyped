import { Repository } from './repository';
import { CheckoutOptions } from './checkout-options';
import { Reference } from './reference';
import { Oid } from './oid';
import { Tree } from './tree';
import { Commit } from './commit';
import { Index } from './index';

export namespace Checkout {
    const enum NOTIFY {

        NONE = 0,

        /** Invokes checkout on conflicting paths. */
        CONFLICT = 1,

        /**
         * Notifies about "dirty" files, i.e. those that
         * do not need an update but no longer match the baseline.  Core git
         * displays these files when checkout runs, but won't stop the checkout.
         */
        DIRTY = 2,

        /** Sends notification for any file changed. */
        UPDATED = 4,

        /** Notifies about untracked files. */
        UNTRACKED = 8,

        /** Notifies about ignored files. */
        IGNORED = 16,

        ALL = 65535
    }

    const enum STRATEGY {
        /** default is a dry run, no actual updates */
        NONE = 0,

        /** Allow safe updates that cannot overwrite uncommitted data */
        SAFE = 1,

        /** Allow all updates to force working directory to look like index */
        FORCE = 2,

        /** Allow checkout to recreate missing files */
        RECREATE_MISSING = 4,

        /** Allow checkout to make safe updates even if conflicts are found */
        ALLOW_CONFLICTS = 16,

        /** Remove untracked files not in index (that are not ignored) */
        REMOVE_UNTRACKED = 32,

        /** Remove ignored files not in index */
        REMOVE_IGNORED = 64,

        /** Only update existing files, don't create new ones */
        UPDATE_ONLY = 128,

        /**
         * Normally checkout updates index entries as it goes; this stops that.
         * Implies `GIT_CHECKOUT_DONT_WRITE_INDEX`.
         */
        DONT_UPDATE_INDEX = 256,

        /** Don't refresh index/config/etc before doing checkout */
        NO_REFRESH = 512,

        /** Allow checkout to skip unmerged files */
        SKIP_UNMERGED = 1024,

        /** For unmerged files, checkout stage 2 from index */
        USE_OURS = 2048,

        /** For unmerged files, checkout stage 3 from index */
        USE_THEIRS = 4096,

        /** Treat pathspec as simple list of exact match file paths */
        DISABLE_PATHSPEC_MATCH = 8192,

        /** Ignore directories in use, they will be left empty */
        SKIP_LOCKED_DIRECTORIES = 262144,

        /** Don't overwrite ignored files that exist in the checkout target */
        DONT_OVERWRITE_IGNORED = 524288,

        /** Write normal merge files for conflicts */
        CONFLICT_STYLE_MERGE = 1048576,

        /** Include common ancestor data in diff3 format files for conflicts */
        CONFLICT_STYLE_DIFF3 = 2097152,

        /** Don't overwrite existing files or folders */
        DONT_REMOVE_EXISTING = 4194304,

        /** Normally checkout writes the index upon completion; this prevents that. */
        DONT_WRITE_INDEX = 8388608,

        /** Recursively checkout submodules with same options (NOT IMPLEMENTED) */
        UPDATE_SUBMODULES = 65536,

        /** Recursively checkout submodules if HEAD moved in super repo (NOT IMPLEMENTED) */
        UPDATE_SUBMODULES_IF_CHANGED = 131072
    }

    const OPTIONS_VERSION = 1;
}

export class Checkout {
    /**
     * Updates files in the index and the working tree to match the content of
     * the commit pointed at by HEAD.
     *
     * Note that this is _not_ the correct mechanism used to switch branches;
     * do not change your `HEAD` and then call this method, that would leave
     * you with checkout conflicts since your working directory would then
     * appear to be dirty. Instead, checkout the target of the branch and
     * then update `HEAD` using `Repository.setHead` to point to the
     * branch you checked out.
     *
     * @param repo - The repository to check out (must be non-bare).
     * @param [options] - The checkout options (may be `null`).
     * @returns - A promise of 'Number' (0 on success, -1 on failure)
     */
    static head(repo: Repository, options?: CheckoutOptions): Promise<number>;

    /**
     * Updates files in the working tree to match the content of the index.
     *
     * @param repo - The repository into which to check out (must be non-bare).
     * @param index - Index to be checked out (or `null` to use repository index)
     * @param [options] - The checkout options (may be `null`).
     * @returns - A promise of 'Number' (0 on success, -1 on failure)
     */
    static index(repo: Repository, index: Index, options?: CheckoutOptions): Promise<number>;

    /**
     * Initializes a `CheckoutOptions` with default values. Equivalent to
     * creating an instance with default options.
     *
     * @param opts - The options to initialize.
     * @param version - Version of options, pass `OPTIONS_VERSION`
     * @returns - Zero on success; -1 on failure.
     */
    static initOptions(opts: CheckoutOptions, version: number): number;

    /**
     * Updates files in the index and working tree to match the content of the
     * tree pointed at by the treeish.
     *
     * @param repo - The repository to check out (must be non-bare).
     * @param treeish - A commit, tag or tree which content will be used to update
     * the working directory (or `null` to use HEAD)
     * @param [options] - The checkout options (may be `null`).
     * @returns - A promise of 'Number' (0 on success, -1 on failure)
     */
    static tree(repo: Repository, treeish: Oid | Tree | Commit | Reference, options?: CheckoutOptions): Promise<number>;
}
