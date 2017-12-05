import { Blame } from './blame';
import { Oid } from './oid';

/**
 * Blame options
 *
 * Use zeros to indicate default settings.
 *
 * - `maxLine` is the last line in the file to blame. The default is the last
 *  line of the file.
 */
export class BlameOptions {
    /**
     * The version of the options (see 'OPTIONS_VERSION').
     */
    version?: number;

    /**
     * A combination of the `FLAG` values.
     */
    flags?: Blame.FLAG;

    /**
     * The lower bound on the number of alphanumeric
     * characters that must be detected as moving/copying within a file for it to
     * associate those lines with the parent commit. The default value is 20.
     * This value only takes effect if any of the `TRACK_COPIES_*`
     * flags are specified.
     */
    minMatchCharacters?: number;

    /**
     * The id object of the newest commit to consider. The default is HEAD.
     */
    newestCommit?: Oid;

    /**
     * The id object of the oldest commit to consider. The default
     * is the first commit encountered with a `null` parent.
     */
    oldestCommit?: Oid;

    /**
     * The first line in the file to blame. The default is 1 (line
     * numbers start with 1).
     */
    minLine?: number;

    /**
     * The last line in the file to blame. The default is the last
     * line of the file.
     */
    maxLine?: number;

    [key: string]: any;
}
