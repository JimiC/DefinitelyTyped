export class Buf {
    /**
     * Check quickly if buffer contains a `null` byte.
     *
     * @returns -
     */
    containsNul(): number;

    /**
     * Free the memory referred to by the `Buf`.
     *
     * Note that this does not free the `git_buf` itself, just the memory
     * pointed to by `buffer->ptr`. This will not free the memory if it looks
     * like it was not allocated internally, but it will clear the buffer back
     * to the empty state.
     */
    free(): void;

    /**
     * Resize the buffer allocation to make more space.
     *
     * This will attempt to grow the buffer to accommodate the target size.
     *
     * If the buffer refers to memory that was not allocated by libgit2 (i.e.
     * the `asize` field is zero), then `ptr` will be replaced with a newly
     * allocated block of data.  Be careful so that memory allocated by the
     * caller is not lost.  As a special variant, if you pass `target_size` as
     * 0 and the memory is not allocated by libgit2, this will allocate a new
     * buffer of size `size` and copy the external data into it.
     *
     * Currently, this will never shrink a buffer, only expand it.
     *
     * If the allocation fails, this will return an error and the buffer will be
     * marked as invalid for future operations, invaliding the contents.
     *
     * @returns - A promise of 'Number' (0 on success, -1 on allocation failure).
     */
    grow(targetSize: number): Promise<number>;

    /**
     * Check quickly if buffer looks like it contains binary data
     *
     * @returns -
     */
    isBinary(): number;

    /**
     * Set buffer to a copy of some raw data.
     *
     * @returns - A promise of 'Number' (0 on success, -1 on allocation failure).
     */
    set(data: Buffer, datalen: number): Promise<number>;

    /**
     * Points to the start of the allocated memory. If it is NULL,
     * then the `git_buf` is considered empty and libgit2 will feel free
     * to overwrite it with new data.
     *
     */
    ptr: string;

    /**
     * Holds the known total amount of allocated memory if the `ptr`
     * was allocated by libgit2. It may be larger than `size`. If `ptr`
     * was not allocated by libgit2 and should not be resized and/or freed,
     * then `asize` will be set to zero.
     */
    asize: number;

    /**
     * Holds the size (in bytes) of the data that is actually used.
     */
    size: number;
}
