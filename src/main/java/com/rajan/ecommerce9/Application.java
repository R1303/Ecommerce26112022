package com.rajan.ecommerce9;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.ResourceUtils;

import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;

import java.io.PrintStream;
import java.io.FileOutputStream;
import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;  
@SpringBootApplication
public class Application {
	//public static FirebaseApp firebaseApp = null;
	public static final boolean checkWebsiteOrigin=false;
	public Application(){
		System.out.println("################## Application Starting #####################");
		//writeLogFile();
	}

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		/*try {
			if (firebaseApp == null)
				connectionFirebase();
		} catch (Exception e) {
			e.printStackTrace();
		}*/
	}

/*	public static FirebaseApp connectionFirebase() throws IOException {
		//if(firebaseApp.DEFAULT_APP_NAME==null) {
		long t1 = System.currentTimeMillis();
		//D:\Workspace\ecommerce.14092019\src\main\resources\config
		//classes/config/fillbasket-aace0-firebase-adminsdk-gwgny-31a7633801.json
		//ClassPathResource cpr = new ClassPathResource("fillbasket-aace0-firebase-adminsdk-gwgny-31a7633801.json");
		FileInputStream serviceAccount =new FileInputStream("D:\\Workspace\\ecommerce.14092019\\src\\main\\resources\\config\\fillbasket-aace0-a070458bb076.json"); 
		//File file = ResourceUtils.getFile("classpath:fillbasket-aace0-firebase-adminsdk-gwgny-31a7633801.json");
		//File file=cpr.getFile().getAbsoluteFile();
		//FileInputStream serviceAccount = new FileInputStream(file);
		FirebaseOptions options = FirebaseOptions.builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).setStorageBucket("fillbasket-aace0.appspot.com").build();
		try {
			firebaseApp = FirebaseApp.initializeApp(options,"fillbasket-aace0");
			System.out.println(firebaseApp.getName());
		}
		catch (Exception e) {
			System.err.println("Already Initialized");
		}
		System.out.println("Total Time Taken for Connection to Firebase :- " + (System.currentTimeMillis() - t1)+" ms");
		//}
		return firebaseApp;
	}*/

	public static void writeLogFile(){
		PrintStream out;
		try {
			String date=getTodayDate();
			out = new PrintStream(new FileOutputStream("classes/output/outputLog_"+date+".txt", true),true);
			System.setOut(out);
			System.setErr(out);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getTodayDate(){
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd_MM_yyyy");
		LocalDateTime now = LocalDateTime.now();
		return dtf.format(now);
	}

	public static String getTodayDateWithPattern(){
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy");
		LocalDateTime now = LocalDateTime.now();
		return dtf.format(now);
	}
}