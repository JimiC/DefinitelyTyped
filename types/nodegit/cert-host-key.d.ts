import { Cert } from './cert';

export class CertHostkey {
    /** The parent certificate, if any. */
    parent: Cert;

    /**
     * A hostkey type from libssh2, either
     * `Cert.SSH.MD5` or Cert.SSH.SHA1`
     */
    type: Cert.SSH;

    /**
     * Hostkey hash. If type has `Cert.SSH.MD5` set, this will
     * have the MD5 hash of the hostkey.
     */
    hashMd5: string;

    /**
     * Hostkey hash. If type has `Cert.SSH.SHA1` set, this will
     * have the SHA-1 hash of the hostkey.
     */
    hashSha1: string;
}
