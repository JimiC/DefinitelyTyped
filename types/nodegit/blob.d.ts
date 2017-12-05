import { WriteStream } from 'fs';

import { Buf } from './buf';
import { Oid } from './oid';
import { Repository } from './repository';
import { TreeEntry } from './tree-entry';

export class Blob {
    /**
     * Write an in-memory buffer to the ODB as a blob.
     *
     * @param repo - The Repository where to blob will be written.
     * @param buffer - Data to be written into the blob.
     * @param len - Length of the data.
     * @returns - The id of the written blob.
     */
    static createFromBuffer(repo: Repository, buffer: Buffer, len: number): Oid;

    /**
     * Read a file from the filesystem and write its content
     * to the Object Database as a loose blob.
     *
     * @param id - The id of the written blob.
     * @param repo - The Repository where the blob will be written.
     *  this repository can be bare or not.
     * @param path - The file from which the blob will be created.
     * @returns - 0 or an error code.
     */
    static createFromDisk(id: Oid, repo: Repository, path: string): number;

    /**
     * Create a stream to write a new blob into the object db.
     *
     * This function may need to buffer the data on disk and will in
     * general not be the right choice if you know the size of the data
     * to write. If you have data in memory, use `createFromBuffer()`.
     * If you do not, but know the size of the contents
     * (and don't want/need to perform filtering), use `odb.openWstream()`.
     *
     * Don't close this stream yourself but pass it to
     * `createFromStreamCommit()` to commit the write to the
     * object db and get the object id.
     *
     * If the `hintPath` parameter is filled, it will be used to determine
     * what git filters should be applied to the object before it is written
     * to the object database.
     *
     * @param repo - The Repository where the blob will be written.
     *  This repository can be bare or not.
     * @param hintPath - If not NULL, will be used to select data filters
     *  to apply onto the content of the blob to be created.
     * @returns - A promise of `WritableStream`.
     */
    static createFromStream(repo: Repository, hintPath?: string): Promise<WriteStream>;

    /**
     * Close the stream and write the blob to the object db.
     *
     * The stream will be closed and freed.
     *
     * @param stream - The stream to close.
     * @returns - The id of the new blob.
     */
    static createFromStreamCommit(stream: WriteStream): Oid;

    /**
     * Read a file from the working folder of a repository
     * and write it to the Object Database as a loose blob.
     *
     * @param id - The id of the written blob.
     * @param repo - The Repository where the blob will be written,
     *  this repository cannot be bare.
     * @param relativePath - The file from which the blob will be created,
     *  relative to the repository's working dir.
     * @returns - 0 or an error code.
     */
    static createFromWorkdir(id: Oid, repo: Repository, relativePath: string): number;

    /**
     * Get a buffer with the filtered content of a blob.
     *
     * This applies filters as if the blob was being checked out to the
     * working directory under the specified filename. This may apply
     * CRLF filtering or other types of changes depending on the file
     * attributes set for the blob and the content detected in it.
     *
     * The output is written into a `Buf` which the caller must free
     * when done (via `free()`).
     *
     * If no filters need to be applied, then the `Buf` will just
     * be populated with the raw content of the blob. In
     * that case, be careful to *not* free the blob until done with the
     * buffer or copy it into memory you own.
     *
     * @param asPath - Path used for file attribute lookups, etc.
     * @param checkForBinaryData - Should this test if blob content contains
     *  NULL bytes / looks like binary data before applying filters?
     * @returns - The `Buf' to be fiiled.
     */
    static filteredContent(asPath: string, checkForBinaryData: number): Buf;

    /**
     * Lookup a blob object from a repository.
     *
     * @param repo - The repo to use when locating the blob.
     * @param id - Identity of the blob to locate.
     * @returns - A promise of `Blob`.
     */
    static lookup(repo: Repository, id: string | Oid | Blob): Promise<Blob>;

    /**
     * Lookup a blob object from a repository,
     * given a prefix of its identifier (short id).
     *
     * @param repo - The repo to use when locating the blob.
     * @param id - Identity of the blob to locate.
     * @param len - The length of the short identifier.
     * @returns - A promise of `Blob`.
     */
    static lookupPrefix(repo: Repository, id: Oid, len: number): Promise<Blob>;

    /**
     * Close an open blob
     *
     * IMPORTANT:
     * It *is* necessary to call this method when you stop
     * using a blob. Failure to do so will cause a memory leak.
     */
    free(): void;

    /**
     * Get the id of a blob.
     *
     * @returns - SHA1 hash for this blob.
     */
    id(): Oid;

    /**
     * Determine if the blob content is most certainly binary or not.
     *
     * The heuristic used to guess if a file is binary is taken from core git:
     * Searching for NULL bytes and looking for a reasonable ratio of printable
     * to non-printable characters among the first 8000 bytes.
     *
     * @returns - 1 if the content of the blob is detected as binary; 0 otherwise.
     */
    isBinary(): number;

    /**
     * Get the repository that contains the blob.
     *
     * @returns - The Repository that contains this blob.
     */
    owner(): Repository;

    /**
     * Get a read-only buffer with the raw content of a blob.
     *
     * @returns - The `Blob` content as a 'Buffer'.
     */
    rawcontent(): Buffer;

    /**
     * Get the size in bytes of the contents of a blob.
     *
     * @returns - The size of bytes.
     */
    rawsize(): number;

    /**
     * Create an in-memory copy of a blob. The copy must be explicitly
     * free'd or it will leak.
     *
     * @returns - A promise of `Blob`.
     */
    dup(): Promise<Blob>;

    /**
     * Retrieve the content of the Blob.
     *
     * @returns - The `Blob` content as a 'Buffer'.
     */
    content(): Buffer;

    /**
     * Retrieve the Blob's type.
     *
     * @returns - The filemode of the blob.
     */
    filemode(): TreeEntry.FileMode;

    /**
     * Retrieve the Blob's content as String.
     *
     * @returns - The `Blob` content as a string.
     */
    toString(): string;
}
