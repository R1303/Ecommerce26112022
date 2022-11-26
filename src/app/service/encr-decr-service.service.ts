import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';


@Injectable({
  providedIn: 'root'
})

export class EncrDecrServiceService {
  
  constructor() { }

  
  testEncrypt(plaintext) {
    var forge = require('node-forge');
    var key = 'mykey#91mykey#91';
    var iv = 'AODVNUASDNVVAOVF';
    var cipher = forge.cipher.createCipher('AES-CBC', key);
    cipher.start({ iv: iv });
    cipher.update(forge.util.createBuffer(plaintext));
    cipher.finish();
    var encrypted = cipher.output;
    var encodedB64 = forge.util.encode64(encrypted.data);
    return encodedB64;
  }
}
