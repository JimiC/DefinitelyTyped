import { Cert } from './cert';

export class CertX509 {
    /**
     * The X.509 certificate data.
     */
    data: Buffer;

    /**
     * Length of the memory block pointed to by `data`.
     */
    len: number;

    /**
     * The parent certificate, if any.
     */
    parent: Cert;
}
