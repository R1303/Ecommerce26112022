package com.rajan.ecommerce9.database.config;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public class DBUtill {
   
	public static String readFile(String filename) throws IOException {
		@SuppressWarnings("resource")
		FileInputStream fileInputStream = new FileInputStream(filename);
		byte[] b = new byte[fileInputStream.available()];
		fileInputStream.read(b);
		return new String(b);
	}													

	public static void writeFile(String filename, String data,boolean isDelete)  {
		FileWriter fw;
		try {
			if(isDelete) {
				writeNull(filename);
			}
			fw = new FileWriter(filename, true);
			fw.write(data);
			fw.flush();
			fw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println("Write File Closing........");
	}
	
	public static void writeNull(String filename) {
		FileWriter fw;
		try {
			fw=new FileWriter(filename);
			fw.write("");
			fw.flush();
			fw.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static String decryptMessage(String encryptText, String encryptKey) {
		try {
			byte[] base64Decrypted = Base64.getDecoder().decode(encryptText);
			return decrypt(base64Decrypted, encryptKey);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static String decrypt(byte[] cipherText, String encryptionKey) throws Exception {
		Cipher cipher = Cipher.getInstance("AES/CBC/pkcs5padding", "SunJCE");
		SecretKeySpec key = new SecretKeySpec(encryptionKey.getBytes("UTF-8"), "AES");
		cipher.init(Cipher.DECRYPT_MODE, key, new IvParameterSpec("AODVNUASDNVVAOVF".getBytes("UTF-8")));
		return new String(cipher.doFinal(cipherText), "UTF-8");
	}

}
