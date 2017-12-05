export namespace Cert {
    const enum TYPE {
        /**
         * No information about the certificate is available. This may
         * happen when using curl.
         */
        NONE = 0,

        /**
         * The `data` argument to the callback will be the DER-encoded data.
         */
        X509 = 1,

        /**
         * The `data` argument to the callback will be a `CertHostkey`.
         */
        HOSTKEY_LIBSSH2 = 2,

        /**
         * The `data` argument to the callback will be an array
         * with `name:content` strings containing information about
         * the certificate. This is used when using curl.
         */
        STRARRAY = 3
    }

    const enum SSH {
        /** MD5 is available */
        MD5 = 1,

        /** SHA-1 is available */
        SHA1 = 2
    }
}

export class Cert {
    /**
     * Type of certificate.
     */
    certType: Cert.TYPE;
}
