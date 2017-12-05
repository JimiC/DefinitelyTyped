import { Repository } from './repository';

export namespace Attr {
    /**
     * Possible states for an attribute.
     */
    const enum STATES {
        /**
         * The attribute has been left unspecified.
         */
        UNSPECIFIED_T = 0,

        /**
         * The attribute has been set.
         */
        TRUE_T = 1,

        /**
         * The attribute has been unset.
         */
        FALSE_T = 2,

        /**
         * This attribute has a value.
         */
        VALUE_T = 3
    }

    /**
     * Check attribute flags: Reading values from index and working directory.
     *
     * When checking attributes, it is possible to check attribute files
     * in both the working directory (if there is one) and the index (if
     * there is one). You can explicitly choose where to check and in
     * which order using the following flags.
     *
     * Core git usually checks the working directory then the index,
     * except during a checkout when it checks the index first. It will
     * use index only for creating archives or for a bare repo (if an
     * index has been specified for the bare repo).
     */
    const enum CHECK {
        FILE_THEN_INDEX = 0,
        INDEX_THEN_FILE = 1,
        INDEX_ONLY = 2,
        /**
         * Check attribute flags: Using the system attributes file.
         *
         * Normally, attribute checks include looking in the /etc (or system
         * equivalent) directory for a `gitattributes` file.  Passing this
         * flag will cause attribute checks to ignore that file.
         */
        NO_SYSTEM = 4,
    }

    type Callback = (name: string, value: string, payload?: any) => number;
}

export class Attr {
    /**
     * Add a macro definition.
     *
     * Macros will automatically be loaded from the top level `.gitattributes`
     * file of the repository (plus the build-in "binary" macro). This
     * function allows you to add others.
     *
     * @param repo - The repository.
     * @param name - The name of the macro.
     * @param values - The values of the macro.
     * @returns - 0 on success or error code.
     */
    static addMacro(repo: Repository, name: string, values: string): number;

    /**
     * Flush the gitattributes cache.
     *
     * Call this if you have reason to believe that the attributes files on
     * disk no longer match the cached contents of memory. This will cause
     * the attributes files to be reloaded the next time that an attribute
     * access function is called.
     *
     * @param repo - The repository containing the gitattributes.
     */
    static cacheFlush(repo: Repository): void;

    /**
     * Look up the value of one git attribute for path.
     *
     * @param repo - The repository containing the path.
     * @param flags - A combination of `CHECK` flags.
     * @param path - The path to check for attributes. Relative paths are
     *  interpreted relative to the repo root. The file does
     *  not have to exist, but if it does not, then it will be
     *  treated as a plain file (not a directory).
     * @param name - The name of the attribute to look up.
     * @returns - A promise of `string`.
     */
    static get(repo: Repository, flags: Attr.CHECK, path: string, name: string): Promise<string>;

    /**
     * Look up a list of git attributes for path.
     *
     * Use this if you have a known list of attributes that you want to
     * look up in a single call. This is somewhat more efficient than
     * calling `get()` multiple times.
     *
     * @param repo - The repository containing the path.
     * @param flags - A combination of `CHECK` flags.
     * @param path - The path inside the repo to check attributes. This
     *  does not have to exist, but if it does not, then
     *  it will be treated as a plain file (i.e. not a directory).
     * @param numAttr - The number of attributes being looked up.
     * @param names - An array of strings containing attribute names.
     * @returns - An array of strings containing attributes.
     */
    static getMany(repo: Repository, flags: Attr.CHECK, path: string, numAttr: number, names: string[]): string[];

    /**
     * Return the value type for a given attribute.
     *
     * @param attr - The attribute.
     * @returns - The value type for the attribute.
     */
    static value(attr: string): number;
}
