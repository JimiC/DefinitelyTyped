import { Oid } from './oid';
import { Signature } from './signature';

export class BlameHunk {
    /**
     * The number of lines in this hunk
     */
    linesInHunk: number;

    /**
     * The identity object of the commit where this line was last changed.
     */
    finalCommitId: Oid;

    /**
     * The 1-based line number where this hunk begins, in the final version of the file
     */
    finalStartLineNumber: number;

    finalSignature: Signature;

    /**
     * The `Oid` of the commit where this hunk was found. This
     * will usually be the same as `finalCommitId`, except when
     * `TRACK_COPIES_ANY_COMMIT_COPIES` has been specified.
     */
    origCommitId: Oid;

    /**
     * The path to the file where this hunk originated, as of the
     * commit specified by `origCommitId`.
     */
    origPath: string;

    /**
     * The 1-based line number where this hunk begins
     * in the file named by `origPath` in the commit specified by
     * `origCommitId`.
     */
    origStartLineNumber: number;

    origSignature: Signature;

    /**
     * 1 if the hunk has been tracked to a boundary commit (the
     * root, or the commit specified in `Blame.Options.oldestCommit)
     */
    boundary: string;
}
