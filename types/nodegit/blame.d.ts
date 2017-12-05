import { BlameHunk } from './blame-hunk';
import { BlameOptions } from './blame-options';
import { Repository } from './repository';
import { Oid } from './oid';
import { Signature } from './signature';

export namespace Blame {
    /**
     * Flags for indicating option behavior for `Blame` APIs.
     */
    const enum FLAG {
        /**
         * Normal blame, the default
         */
        NORMAL = 0,

        /**
         * Track lines that have moved within a file (like `git blame -M`).
         */
        TRACK_COPIES_SAME_FILE = 1,

        /**
         * Track lines that have moved across files in the same commit (like `git blame -C`).
         */
        TRACK_COPIES_SAME_COMMIT_MOVES = 2,

        /**
         * Track lines that have been copied from another file that exists in the
         * same commit (like `git blame -CC`). Implies SAME_FILE.
         */
        TRACK_COPIES_SAME_COMMIT_COPIES = 4,

        /**
         * Track lines that have been copied from another file that exists in *any*
         * commit (like `git blame -CCC`). Implies SAME_COMMIT_COPIES.
         */
        TRACK_COPIES_ANY_COMMIT_COPIES = 8,

        /**
         * Restrict the search of commits to those reachable following only the
         * first parents.
         */
        FIRST_PARENT = 16
    }

    const OPTIONS_VERSION = 1;
}

export class Blame {
    /**
     * Get the blame for a single file.
     *
     * @param repo - Repository whose history is to be walked.
     * @param path - Path to file to consider.
     * @param [options] - Options for the blame operation. If `null`, this is treated as
     *  though default options were passed.
     * @returns - A `Blame`.
     */
    static file(repo: Repository, path: string, options?: BlameOptions): Blame;

    /**
     * Initializes a `Blame.Options` with default values. Equivalent to
     * creating an instance with default options.
     *
     * @param opts - The `Blame Options` to initialize.
     * @param version - Version of options; pass `OPTIONS_VERSION`
     * @returns - 0 on success or error code.
     */
    static initOptions(opts: BlameOptions, version: number): number;

    /**
     * Get blame data for a file that has been modified in memory.
     *
     * Lines that differ between the buffer and the committed version are marked as
     * having a zero `Oid` for their `finalCommitId`.
     *
     * @param buffer - The (possibly) modified contents of the file.
     * @param bufferLen - Number of valid bytes in the buffer.
     * @returns - A promise of `Blame`.
     */
    buffer(buffer: string, bufferLen: number): Promise<Blame>;

    /**
     * Free memory allocated by `file` or `buffer`.
     */
    free(): void;

    /**
     * Gets the blame hunk at the given index.
     *
     * @param index - Index of the hunk to retrieve.
     * @returns - The hunk at the given index, or `null` on error.
     */
    getHunkByIndex(index: number): BlameHunk;

    /**
     * Gets the hunk that relates to the given line number in the newest commit.
     *
     * @param lineNo - The (1-based) line number to find a hunk for.
     * @returns - The hunk that contains the given line, or `null` on error.
     */
    getHunkByLine(lineNo: number): BlameHunk;

    /**
     * Gets the number of hunks that exist in the blame.
     *
     * @returns - 0 on success or error code.
     */
    getHunkCount(): number;
}
