package com.rajan.ecommerce9;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class BcryptEncodeTest {
	static String PLAIN_TEXT = "SS18617710213463";
	static String ENCRYPTION_KEY = "mykey#91mykey#91";
	static String INITIALIZATIO_VECTOR = "AODVNUASDNVVAOVF";

	public static void main(String[] args) {
		// BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		// System.out.println(bCryptPasswordEncoder.encode("rajan@123"));
		//BcryptEncodeTest bcryptEncodeTest = new BcryptEncodeTest();
		//bcryptEncodeTest.test("xPX79V+IRgGx0W8o0F+/nBd7ydIe7gwrhTWGekD7SOg=");
		String text = "Rajan";
		String key = "123456$#@$^@1ERF"; // 128 bit key
		Key aesKey = new SecretKeySpec(key.getBytes(), "AES");
		Cipher cipher;
		try {
			cipher = Cipher.getInstance("AES");
			cipher.init(Cipher.ENCRYPT_MODE, aesKey);
			byte[] encrypted = cipher.doFinal(text.getBytes());
			System.err.println(new String(encrypted));
			cipher.init(Cipher.DECRYPT_MODE, aesKey);
			String decrypted = new String(cipher.doFinal(encrypted));
			System.err.println(decrypted);
		} catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException | IllegalBlockSizeException
				| BadPaddingException e) {
			e.printStackTrace();
		}
	}

	public void test(String encryptText) {
		try {
			System.out.println("Plain text: " + PLAIN_TEXT);
			byte[] encryptedMsg = encrypt(PLAIN_TEXT, ENCRYPTION_KEY);
			String base64Encrypted = Base64.getEncoder().encodeToString(encryptedMsg);
			System.out.println("Encrypted: " + base64Encrypted);
			byte[] base64Decrypted = Base64.getDecoder().decode(encryptText);
			String decryptedMsg = decrypt(base64Decrypted, ENCRYPTION_KEY);
			System.out.println("Decrypted: " + decryptedMsg);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static byte[] encrypt(String plainText, String encryptionKey) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/pkcs5padding", "SunJCE");
		SecretKeySpec key = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(INITIALIZATIO_VECTOR.getBytes("UTF-8")));
		return cipher.doFinal(plainText.getBytes("UTF-8"));
	}

	public static String decrypt(byte[] cipherText, String encryptionKey) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/pkcs5padding", "SunJCE");
		SecretKeySpec key = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec(INITIALIZATIO_VECTOR.getBytes("UTF-8")));
		return new String(cipher.doFinal(cipherText), "UTF-8");
	}

}
